namespace landmark_backend_api.DataAccess;

public interface IImageDataAccessor
{
  Task<string> UploadAsync(string fileName, IFormFile imageFile);
  Task DeleteAsync(string imageSrcUrl);
}
