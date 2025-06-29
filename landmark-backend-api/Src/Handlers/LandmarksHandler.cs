using landmark_backend_api.Models;
using landmark_backend_api.Services.LandmarkService;
using Microsoft.AspNetCore.Http.HttpResults;
using landmark_backend_api.Dtos.Response;
using landmark_backend_api.Dtos.Request;
using landmark_backend_api.Validators;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace landmark_backend_api.Handlers;

public static class LandmarksHandler
{
  private const int MAX_NUM_ENTRIES_BULK_CREATE = 50;

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
    catch (Exception)
    {
      return TypedResults.InternalServerError("Internal Server Error");
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
    catch (Exception)
    {
      return TypedResults.InternalServerError("Internal Server Error");
    }
  }

  internal static async Task<Results<Created<LandmarkResDto>, BadRequest<IEnumerable<ValidationResponseDto>>, InternalServerError<string>>>
  CreateLandmark(
    LandmarkReqDto landmarkReqDto,
    ILandmarkService landmarkService,
    IReqDtoValidator validator,
    IMapper mapper)
  {
    try
    {
      // Validate dto
      IEnumerable<ValidationResponseDto> validationProblems = validator.ValidateAndGetProblems(landmarkReqDto);

      if (validationProblems.Any())
      {
        return TypedResults.BadRequest(validationProblems);
      }

      Landmark createdLandmark = await landmarkService.CreateLandmark(landmarkReqDto);

      LandmarkResDto landmarkRes = mapper.Map<Landmark, LandmarkResDto>(
        createdLandmark
      );

      return TypedResults.Created($"/api/landmarks-view/landmarks/{landmarkRes.Id}", landmarkRes); // 201 created
    }
    catch (Exception)
    {
      return TypedResults.InternalServerError("Internal Server Error");
    }
  }

  internal static async Task<Results<Created, BadRequest<string>, InternalServerError<string>>>
  BulkCreateLandmarks(
    [FromBody] List<LandmarkReqDto> landmarkReqDtos,
    ILandmarkService landmarkService,
    IReqDtoValidator validator
  )
  {
    try
    {
      if (landmarkReqDtos.Count == 0)
      {
        return TypedResults.BadRequest("Formatting error in json file - list of landmarks is empty");
      }

      if (landmarkReqDtos.Count > MAX_NUM_ENTRIES_BULK_CREATE)
      {
        return TypedResults.BadRequest($"Cannot create more than {MAX_NUM_ENTRIES_BULK_CREATE} per request");
      }

      foreach (LandmarkReqDto landmarkReqDto in landmarkReqDtos)
      {
        // Validate dto
        IEnumerable<ValidationResponseDto> validationProblems = validator.ValidateAndGetProblems(landmarkReqDto);
        if (validationProblems.Any())
        {
          //todo: create more informative bad request message
          return TypedResults.BadRequest($"Validation error in json file for landmark with name {landmarkReqDto}");
        }
      }

      IEnumerable<Landmark> landmarkResDtos = await landmarkService.BulkCreateLandmarks(landmarkReqDtos);

      return TypedResults.Created();
    }
    catch (Exception)
    {
      return TypedResults.InternalServerError("Internal Server Error");
    }
  }

  internal static async Task<Results<NoContent, BadRequest<IEnumerable<ValidationResponseDto>>, NotFound<string>, InternalServerError>>
  UpdateLandmark(
    int id,
    LandmarkReqDto landmarkReqDto,
    IReqDtoValidator validator,
    ILandmarkService landmarkService
  )
  {
    try
    {
      IEnumerable<ValidationResponseDto> validationProblems = validator.ValidateAndGetProblems(landmarkReqDto);

      if (validationProblems.Any())
      {
        return TypedResults.BadRequest(validationProblems);
      }

      Landmark? updatedLandmark = await landmarkService.UpdateLandmark(id, landmarkReqDto);

      if (updatedLandmark == null)
      {
        return TypedResults.NotFound("Invalid landmark id");
      }

      return TypedResults.NoContent();
    }
    catch (KeyNotFoundException e)
    {
      return TypedResults.NotFound(e.Message);
    }
    catch (Exception)
    {
      return TypedResults.InternalServerError();
    }
  }

  // IFormFile parameter name needs to match the form file name in formdata from request
  internal static async Task<Results<Created<string>, BadRequest<IEnumerable<ValidationResponseDto>>, NotFound<string>, InternalServerError<string>>>
  UploadLandmarkImage(
    int id,
    IFormFile? imageFile,
    IReqDtoValidator validator,
    ILandmarkService landmarkService
  )
  {
    try
    {
      // Validate dto
      IEnumerable<ValidationResponseDto> validationProblems = validator.ValidateAndGetProblems(imageFile);

      if (validationProblems.Any())
      {
        return TypedResults.BadRequest(validationProblems);
      }

      Landmark? updatedLandmark = await landmarkService.UploadLandmarkImage(imageFile!, id);

      if (updatedLandmark == null)
      {
        return TypedResults.NotFound("Invalid landmark id");
      }

      return TypedResults.Created($"/api/landmarks-view/landmarks/{id}/image", updatedLandmark.ImageApiUrl); // 201 created
    }
    //TODO: catch cloudinary image exception
    // image validator exception (when the image doesn't match the landmark name)
    catch (Exception)
    {
      return TypedResults.InternalServerError("Internal Server Error");
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
    catch (Exception)
    {
      return TypedResults.InternalServerError("Internal Server Error");
    }
  }
}
