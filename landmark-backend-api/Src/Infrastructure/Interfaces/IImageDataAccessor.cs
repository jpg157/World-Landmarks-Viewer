using CloudinaryDotNet.Actions;

public interface IImageDataAccessor
{
  Task<ImageUploadResult> AddImageAsync(string filePath);
}