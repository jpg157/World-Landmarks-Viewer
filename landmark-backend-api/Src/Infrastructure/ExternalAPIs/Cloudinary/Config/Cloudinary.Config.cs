using CloudinaryDotNet;

namespace landmark_backend_api.Infrastructure.Config;
public static class CloudinaryConfig
{
  public static Cloudinary CreateCloudinary(string? cloudinaryUrl)
  {
    Cloudinary cloudinary = new Cloudinary(cloudinaryUrl);
    cloudinary.Api.Secure = true;
    return cloudinary;
  }
}
