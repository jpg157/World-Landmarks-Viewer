public interface IImageDataAccessor
{
  Task<string> UploadAsync(string fileName, IFormFile imageFile);
}
