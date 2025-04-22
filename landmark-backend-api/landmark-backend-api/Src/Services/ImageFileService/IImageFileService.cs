
using Microsoft.AspNetCore.Mvc;

namespace landmark_backend_api.Services.ImageFileService;
public interface IImageFileService
{
  Task<FileStreamResult> GetImageById(int id);
}
