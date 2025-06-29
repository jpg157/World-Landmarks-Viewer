using landmark_backend_api.Models;

namespace landmark_backend_api.DataAccess;

public interface ILandmarkDataAccessor
{
  Task<List<Landmark>> FindAll(); //TODO: find in specified pagination range
  Task<Landmark?> FindById(int id);
  Task<Landmark> Create(Landmark landmark);
  Task<IEnumerable<Landmark>> CreateMany(IEnumerable<Landmark> landmarks);
  Task<Landmark?> Update(int landmarkId, Landmark landmark);
  Task<Landmark?> UpdateImageSrcUrl(string imageSrcUrl, int landarkId);
  Task DeleteById(int id);
}
