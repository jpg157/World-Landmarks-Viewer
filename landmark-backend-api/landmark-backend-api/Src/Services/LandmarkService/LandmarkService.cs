using System.Text.Json;
using landmark_backend_api.Models;
using landmark_backend_api.Models.Pagination;

class LandmarkService : ILandmarkService
{
  
  // TODO: update
  private readonly PaginatedItemsDTO<Landmark> _landmarksInMemoryCollection;

  public LandmarkService()
  {
    PaginatedMetadataDTO paginatedMetadataDTO = new PaginatedMetadataDTO
    {
      CurrentPageNum = 1,
      TotalNumPages = 1, // total items (attained from getAll from db)
      TotalNumItemsPerPage = 10
    };
    
    _landmarksInMemoryCollection = new PaginatedItemsDTO<Landmark>
    {
      Data = [],
      Metadata = paginatedMetadataDTO
    };

    using (FileStream openStream = File.OpenRead(JsonConstants.LANDMARKS_JSON_FILE_PATH))
    {
      var landmarkData = JsonSerializer.Deserialize<LandmarksWrapper>(openStream);
      
      // leave in-memory data as empty list
      if (landmarkData?.Landmarks == null){
          return;
      }

      // load landmarks into in-memory data
      foreach (Landmark landmark in landmarkData.Landmarks)
      {
        _landmarksInMemoryCollection.Data.Add(landmark);
      }
    }
  }

  public void AddLandmark(Landmark landmark)
  {
    _landmarksInMemoryCollection.Data.Add(landmark);
  }

  public PaginatedItemsDTO<Landmark> GetAllLandmarks()
  {
    return _landmarksInMemoryCollection;
  }

  public Landmark? GetLandmarkById(string id)
  {
    return _landmarksInMemoryCollection.Data.SingleOrDefault(landmark => landmark.Id == id);
  }
}
