using landmark_backend_api.Models;
using landmark_backend_api.Models.Pagination;

interface ILandmarkService
{
  PaginatedItemsDTO<Landmark> GetAllLandmarks();
  Landmark? GetLandmarkById(string id);
  void AddLandmark(Landmark landmark);
}
