public interface IImageService
{
  Task<string> UploadEntityImageAsync(IFormFile imageFile, int entityId, string entityTypeName);
  Task DeleteEntityImageAsync(string imageSrcUrl);
}
