using landmark_backend_api.Models;
using landmark_backend_api.Services.LandmarkService;
using Microsoft.AspNetCore.Http.HttpResults;
using landmark_backend_api.Dtos.Response;
using landmark_backend_api.Dtos.Request;
using landmark_backend_api.Validators;
using AutoMapper;

namespace landmark_backend_api.Handlers;

public static class LandmarksHandler
{
  // json serialization of service.getAll return type, response status set, content type header set done implicitly
  internal static async Task<Results<Ok<PaginatedItemsDTO<LandmarkResDto>>, InternalServerError<string>>>
  GetAllLandmarks(
    HttpRequest req,
    ILandmarkService landmarkService,
    IMapper mapper)
  {
    try
    {
      // todo: add pagination (stored in httpRequest QUERY field)

      PaginatedItemsDTO<Landmark> paginatedLandmarks = await landmarkService.GetAllLandmarks();

      List<LandmarkResDto> landmarksRes =
        mapper.Map<List<Landmark>, List<LandmarkResDto>>(
          paginatedLandmarks.Data
        );

      PaginatedItemsDTO<LandmarkResDto> paginatedLandmarksRes = new()
      {
        Data = landmarksRes,
        Metadata = paginatedLandmarks.Metadata
      };

      return TypedResults.Ok(paginatedLandmarksRes); // 200
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }

  internal static async Task<Results<Ok<LandmarkResDto>, NotFound, InternalServerError<string>>>
  GetLandmarkById(
    int id,
    ILandmarkService landmarkService,
    IMapper mapper)
  {
    try
    {
      Landmark? landmark = await landmarkService.GetLandmarkById(id);

      if (landmark == null)
      {
        return TypedResults.NotFound(); // 404
      }

      LandmarkResDto landmarkRes = mapper.Map<Landmark, LandmarkResDto>(
        landmark
      );

      return TypedResults.Ok(landmarkRes); // 200
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }

  internal static async Task<Results<Created<LandmarkResDto>, BadRequest<IEnumerable<ValidationResponseDto>>, InternalServerError<string>>>
  CreateLandmark(
    LandmarkReqDto landmarkDto,
    ILandmarkService landmarkService,
    IReqDtoValidator validator,
    IMapper mapper)
  {
    try
    {
      // Validate dto
      IEnumerable<ValidationResponseDto> validationProblems = validator.ValidateAndGetProblems(landmarkDto);

      if (validationProblems.Any())
      {
        return TypedResults.BadRequest(validationProblems);
      }

      Landmark createdLandmark = await landmarkService.CreateLandmark(landmarkDto);

      LandmarkResDto landmarkRes = mapper.Map<Landmark, LandmarkResDto>(
        createdLandmark
      );

      return TypedResults.Created($"/api/landmarks-view/landmarks/{landmarkRes.Id}", landmarkRes); // 201 created
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }

  // IFormFile parameter name needs to match the form file name in formdata from request
  internal static async Task<Results<Created<string>, BadRequest<IEnumerable<ValidationResponseDto>>, NotFound<string>, InternalServerError<string>>>
  CreateLandmarkImage(
    int id,
    IFormFile? imageFile,
    IImageService imageService,
    IReqDtoValidator validator,
    ILandmarkService landmarkService
  )
  {
    // Validate dto
    IEnumerable<ValidationResponseDto> validationProblems = validator.ValidateAndGetProblems(imageFile);

    if (validationProblems.Any())
    {
      return TypedResults.BadRequest(validationProblems);
    }
    try
    {
      string imageSrcUrl = await imageService.UploadLandmarkImageAsync(imageFile!, id);
      Landmark? updatedLandmark = await landmarkService.UpdateLandmarkImage(imageSrcUrl, id);

      if (updatedLandmark == null)
      {
        // Should never get here since landmark should be valid from previous image upload method
        return TypedResults.InternalServerError("Error while updating landmark image");
      }

      return TypedResults.Created($"/api/landmarks-view/landmarks/{id}/image", imageSrcUrl); // 201 created
    }
    catch (KeyNotFoundException error)
    {
      return TypedResults.NotFound(error.Message);
    }
    //TODO: catch cloudinary image exception
    // image validator exception (when the image doesn't match the landmark name)
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }

  internal static async Task<Results<NoContent, NotFound<string>, InternalServerError<string>>>
  DeleteLandmark(
    int id,
    ILandmarkService landmarkService)
  {
    try
    {    
      await landmarkService.DeleteLandmarkById(id);
      return TypedResults.NoContent(); // 204 success with no content
    }
    catch (KeyNotFoundException e)
    {
      return TypedResults.NotFound(e.Message);
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }
}
