using landmark_backend_api.Models;
using landmark_backend_api.Dtos.Request;
using landmark_backend_api.Dtos.Response;

namespace landmark_backend_api.Services.LandmarkService;

public interface ILandmarkService
{
  Task<PaginatedItemsDTO<Landmark>> GetAllLandmarks();
  Task<Landmark?> GetLandmarkById(int id);
  Task<Landmark> CreateLandmark(LandmarkReqDto landmarkDto);
  Task<IEnumerable<Landmark>> BulkCreateLandmarks(IEnumerable<LandmarkReqDto> landmarkDtos);
  Task<Landmark?> UpdateLandmark(int id, LandmarkReqDto landmarkDto);
  Task<Landmark?> UploadLandmarkImage(IFormFile landmarkImage, int landmarkId);
  Task DeleteLandmarkById(int id);
}
