/*
Todo - follow:
Security steps that reduce the likelihood of a successful attack are:
    Upload files to a dedicated file upload area, preferably to a non-system drive. A dedicated location makes it easier to impose security restrictions on uploaded files. Disable execute permissions on the file upload location.†
    Do not persist uploaded files in the same directory tree as the app.†
    Use a safe file name determined by the app. Don't use a file name provided by the user or the untrusted file name of the uploaded file.† HTML encode the untrusted file name when displaying it. For example, logging the file name or displaying in UI (Razor automatically HTML encodes output).
    Allow only approved file extensions for the app's design specification.†
    Verify that client-side checks are performed on the server.† Client-side checks are easy to circumvent.
    Check the size of an uploaded file. Set a maximum size limit to prevent large uploads.†
    When files shouldn't be overwritten by an uploaded file with the same name, check the file name against the database or physical storage before uploading the file.
    Run a virus/malware scanner on uploaded content before the file is stored.
*/

public class ImageService : IImageService
{
  private readonly IImageDataAccessor _imageDataAccessor;

  public ImageService(
    IImageDataAccessor imageDataAccessor)
  {
    _imageDataAccessor    = imageDataAccessor;
  }

  public async Task DeleteEntityImageAsync(string imageSrcUrl)
  {
    await _imageDataAccessor.DeleteAsync(imageSrcUrl);
  }

  public async Task<string> UploadEntityImageAsync(IFormFile imageFile, int entityId, string entityTypeName)
  {
    //TODO: add image file validation here

    string newFileName = $"${entityTypeName}s/{entityId}/images";

    string imageSrcUrl = await _imageDataAccessor.UploadAsync(
      newFileName, 
      imageFile
    );

    return imageSrcUrl;
  }
}
