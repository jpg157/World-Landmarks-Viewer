public interface IImageService
{
  Task<string> UploadLandmarkImageAsync(IFormFile imageFile, int landmarkId); // todo
}