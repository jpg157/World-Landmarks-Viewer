public interface IImageService
{
  Task<string> UploadLandmarkImageAsync(IFormFile imageFile, int landmarkId);
  Task DeleteLandmarkImageAsync(string imageSrcUrl);
}
