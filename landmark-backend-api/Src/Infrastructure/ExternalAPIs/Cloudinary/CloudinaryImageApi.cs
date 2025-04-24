using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

public class CloudinaryImageApi : IImageDataAccessor
{
  private readonly Cloudinary cloudinary;
  public CloudinaryImageApi(Cloudinary cloudinary){ this.cloudinary = cloudinary; }

  public async Task<ImageUploadResult> AddImageAsync(string filePath)
  {
    var uploadParams = new ImageUploadParams{
      File = new FileDescription($"{filePath}")
    };

    var imageUploadResult = await cloudinary.UploadAsync(uploadParams);
    
    return imageUploadResult;
  }
}
