using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace landmark_backend_api.DataAccess.ExternalApis;

public class CloudinaryImageApi : IImageDataAccessor
{
  private readonly Cloudinary _cloudinary;
  public CloudinaryImageApi(Cloudinary cloudinary) { _cloudinary = cloudinary; }

  public async Task DeleteAsync(string imageSrcUrl)
  {
    // Split cloudinary url by / delimiter
    string[] splitUrl = imageSrcUrl.Split("/");

    // Get the public id and file extension portion from the split url, and
    // remove the extension (.png)
    string publicId = splitUrl[7].Split(".")[0];

    var deleteParams = new DeletionParams(publicId);

    DeletionResult deletionResult = await _cloudinary.DestroyAsync(deleteParams);
    
    if (deletionResult.Result != "ok")
    {
      throw new KeyNotFoundException("The resource with the url was not found");
    }
  }

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

    ImageUploadResult imageUploadResult = await _cloudinary.UploadAsync(uploadParams);

    // get the cloudinary secure url value of the uploaded image
    string imageSrcUrl = imageUploadResult.SecureUrl.ToString();

    return imageSrcUrl;
  }
}
