using landmark_backend_api.Models;
using landmark_backend_api.Models.Dtos.Pagination;
using landmark_backend_api.Services.LandmarkService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace landmark_backend_api.Handlers;

public static class LandmarksHandler
{
  // json serialization of service.getAll return type, response status set, content type header set done implicitly
  internal static async Task<Results<Ok<PaginatedItemsDTO<Landmark>>, InternalServerError<string>>> GetAllLandmarks(HttpRequest req, ILandmarkService landmarkService)
  {
    try
    {
      // todo: add pagination (stored in httpRequest QUERY field) - double check if need request or is there a better way

      PaginatedItemsDTO<Landmark> landmarks = await landmarkService.GetAllLandmarks();

      return TypedResults.Ok(landmarks); // 200
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }

  internal static async Task<Results<Ok<Landmark>, NotFound, InternalServerError<string>>> GetLandmarkById(int id, ILandmarkService landmarkService)
  {
    try
    {
      Landmark? landmark = await landmarkService.GetLandmarkById(id);

      return landmark is null
        ? TypedResults.NotFound() // 404
        : TypedResults.Ok(landmark); // 200
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }

  internal static async Task<Results<Created<Landmark>, BadRequest<string>, InternalServerError<string>>> CreateLandmark(Landmark landmark, ILandmarkService landmarkService)
  {
    try
    {
      // Todo: add validation for the Landmark object (in landmark service) - return BadRequest on validation error
      // - not a valid landmark name (landmark doesn't exist)

      Landmark newLandmark = await landmarkService.AddLandmark(landmark);

      // Console.WriteLine(
      //   $"id: {landmark.Id}\nname: {landmark.Name}\ncreation date: {landmark?.LandmarkCreationDate}\ndescription: {landmark?.Description}\nimg api url: {landmark?.ImageApiUrl}\nxcoord: {landmark?.LandmarkLocation?.XCoord}\ny coord: {landmark?.LandmarkLocation?.YCoord}"
      // );

      return TypedResults.Created($"/api/landmarks-view/landmarks/{newLandmark.Id}", newLandmark); // 201 created
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }

  // IFormFile parameter name needs to match the form file name in formdata from request
  internal static async Task<Results<Created<string>, BadRequest<string>, InternalServerError<string>>> CreateLandmarkImage(
    int id,
    IFormFile? imageFile,
    IImageService imageService,
    ILandmarkService landmarkService
  )
  {
    if (imageFile == null)
    {
      return TypedResults.BadRequest("Missing Landmark image file");
    }

    try
    {
      string imageSrcUrl = await imageService.UploadLandmarkImageAsync(imageFile, id);

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
      return TypedResults.BadRequest(error.Message);
    }
    //TODO: catch cloudinary image exception
    // image validator exception (when the image doesn't match the landmark name)
    catch (Exception e)
    {
      Console.WriteLine(e.Message);
      return TypedResults.InternalServerError(e.Message);
    }
  }

  internal static async Task<Results<NoContent, BadRequest, InternalServerError<string>>> DeleteLandmark(int id, ILandmarkService landmarkService)
  {
    try
    {
      await landmarkService.DeleteLandmarkById(id);
      return TypedResults.NoContent(); // 204 success with no content
    }
    catch (Exception e)
    {
      return TypedResults.InternalServerError(e.Message);
    }
  }
}
