
using System.Text.Json;
using landmark_backend_api.Models;

public class LandmarkRepository: ILandmarkDataAccessor
{


  //Delete _landmarksInMemoryCollection after adding db


  private readonly List<Landmark> _landmarksInMemoryCollection;

  public LandmarkRepository()
  {
    _landmarksInMemoryCollection = new List<Landmark>();
  }

  public List<Landmark> FindAll()
  {
    using (FileStream openStream = File.OpenRead(JsonConstants.LANDMARKS_JSON_FILE_PATH))
    {
      var landmarkData = JsonSerializer.Deserialize<LandmarksWrapper>(openStream);
      
      // leave in-memory data as empty list
      if (landmarkData?.Landmarks != null)
      {
        // load landmarks into in-memory data
        foreach (Landmark landmark in landmarkData.Landmarks)
        {
          _landmarksInMemoryCollection.Add(landmark);
        }
      }

      return _landmarksInMemoryCollection;
    }
  }

  public Landmark? FindById(string id)
  {
    return _landmarksInMemoryCollection.SingleOrDefault(landmark => landmark.Id == id);
  }

  public void Create(Landmark landmark)
  {
    _landmarksInMemoryCollection.Add(landmark);
  }
}
