
namespace landmark_backend_api.Services.ImageService;

public interface IImageService
{
  Task<string> UploadEntityImageAsync(IFormFile imageFile, int entityId, string entityTypeName);
  Task DeleteEntityImageAsync(string imageSrcUrl);
}
