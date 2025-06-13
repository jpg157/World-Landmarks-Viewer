using CloudinaryDotNet;

namespace landmark_backend_api.Data.ExternalApis.Config;
public static class CloudinaryConfig
{
  public static Cloudinary CreateCloudinary(string? cloudinaryUrl)
  {
    Cloudinary cloudinary = new Cloudinary(cloudinaryUrl);
    cloudinary.Api.Secure = true;
    return cloudinary;
  }
}
