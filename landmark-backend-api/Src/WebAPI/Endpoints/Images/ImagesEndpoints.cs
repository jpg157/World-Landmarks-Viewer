using landmark_backend_api.Services.ImageFileService;

namespace landmark_backend_api.WebAPI.Endpoints.Images;
public static class ImageEndpoints
{
  public static void RegisterImageEndpoints(this WebApplication app)
  {
    var imagesRoute = app.MapGroup("/api/images");
    
    imagesRoute.MapGet("/api/images/{id}", async (int id, IImageFileService imageFileService) => {await imageFileService.GetImageById(id);});
  }
}
