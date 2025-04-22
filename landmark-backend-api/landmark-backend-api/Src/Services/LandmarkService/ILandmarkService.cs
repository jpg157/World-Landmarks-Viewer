using landmark_backend_api.Models;
using landmark_backend_api.Models.Dtos.Pagination;

namespace landmark_backend_api.Services.LandmarkService;
public interface ILandmarkService
{
  PaginatedItemsDTO<Landmark> GetAllLandmarks();
  Landmark? GetLandmarkById(string id);
  void AddLandmark(Landmark landmark);
}
