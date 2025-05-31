using landmark_backend_api.Models;
using landmark_backend_api.Models.Dtos.Pagination;

namespace landmark_backend_api.Services.LandmarkService;

public interface ILandmarkService
{
  Task<PaginatedItemsDTO<Landmark>> GetAllLandmarks();
  Task<Landmark?> GetLandmarkById(int id);
  Task<Landmark> AddLandmark(Landmark landmark);
  Task<Landmark?> UpdateLandmarkImage(string imageSrcUrl, int landmarkId);
  Task DeleteLandmarkById(int id);
}
