using landmark_backend_api.Models;

public interface ILandmarkDataAccessor
{
  Task<List<Landmark>> FindAll(); //TODO: find in specified pagination range

  Task<Landmark?> FindById(int id);

  Task<Landmark> Create(Landmark landmark);

  Task<Landmark?> UpdateImageSrcUrl(string imageSrcUrl, int landarkId);
}
