using landmark_backend_api.Services.ImageFileService;

public static class ImageEndpoints
{
  public static void RegisterImageEndpoints(this WebApplication app)
  {
    var imagesRoute = app.MapGroup("/api/images");
    
    imagesRoute.MapGet("/api/images/{id}", (int id, IImageFileService imageFileService) => imageFileService.GetImageById(id));
  }
}
