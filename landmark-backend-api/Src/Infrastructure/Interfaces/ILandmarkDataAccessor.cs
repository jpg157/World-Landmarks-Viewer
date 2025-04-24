using landmark_backend_api.Models;

public interface ILandmarkDataAccessor
{
  List<Landmark> FindAll();

  Landmark? FindById(string id);

  void Create(Landmark landmark);
}
