using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace landmark_backend_api.Data.ExternalApis;

public class CloudinaryImageApi : IImageDataAccessor
{
  private readonly Cloudinary cloudinary;
  public CloudinaryImageApi(Cloudinary cloudinary) { this.cloudinary = cloudinary; }

  public async Task<string> UploadAsync(string fileName, IFormFile imageFile)
  {
    Stream imageFileStream = imageFile.OpenReadStream();

    var uploadParams = new ImageUploadParams
    {
      File = new FileDescription
      {
        FileName = fileName,
        Stream = imageFileStream
      }
    };

    ImageUploadResult imageUploadResult = await cloudinary.UploadAsync(uploadParams);

    // get the cloudinary secure url value of the uploaded image
    string imageSrcUrl = imageUploadResult.SecureUrl.ToString();

    return imageSrcUrl;
  }
}
