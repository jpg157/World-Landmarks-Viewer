
using System.Text.Json;
using landmark_backend_api.Models;
using landmark_backend_api.Src.Constants;

public class LandmarkRepository : ILandmarkDataAccessor
{


  //Delete _currentId, CurrentId after adding db

  private int _currentId;
  public int CurrentId
  {
    get => _currentId;
    private set
    {
      _currentId = value;
    }
  }

  public LandmarkRepository()
  {
    // Count entries

    using (FileStream openStream = File.OpenRead(JsonConstants.LANDMARKS_JSON_FILE_PATH))
    {
      var landmarkData = JsonSerializer.Deserialize<LandmarksWrapper>(openStream);

      // leave in-memory data as empty list
      if (landmarkData?.Landmarks != null)
      {
        CurrentId = landmarkData.Landmarks.Count;
      }
      
      // Start either at 1 or at the number of json entries + 1 
      CurrentId++;
    }
  }

  public async Task<List<Landmark>> FindAll() //TODO: find in specified pagination range
  {
    List<Landmark> landmarks = await GetAllLandmarksFromJsonFile();
    return landmarks;
  }

  public async Task<Landmark?> FindById(int id)
  {
    List<Landmark> landmarks = await GetAllLandmarksFromJsonFile();
    return landmarks.SingleOrDefault(landmark => landmark.Id == id);
  }

  public async Task<Landmark> Create(Landmark landmark)
  {
    //TODO: make sql db create an id, then get and return the landmark with that id added

    // Update the not set landmark fields
    landmark.Id = CurrentId;
    landmark.LandmarkCreationDate = DateTime.Now.ToString(LandmarkConstants.LANDMARK_CREATION_DATETIME_FMT);
    // landmark.LandmarkLocation = new LandmarkLocationData { XCoord = 0.0, YCoord = 0.0 }; //TODO
    landmark.ImageApiUrl = "_";

    CurrentId++;

    // Add to collection and rewrite to json file
    await AddOrUpdateLandmarkInJsonFile(landmark);

    return landmark;
  }

  public async Task<Landmark?> UpdateImageSrcUrl(string imageSrcUrl, int landmarkId)
  {   
    // Find the landmark by id from json file collection
    Landmark? landmark = await FindById(landmarkId);

    if (landmark == null)
    {
      return null;
    }

    landmark.ImageApiUrl = imageSrcUrl;

    // Add to collection and rewrite to json file
    await AddOrUpdateLandmarkInJsonFile(landmark);

    return landmark;
  }

  // Remove once created sql database
  private async Task<List<Landmark>> GetAllLandmarksFromJsonFile()
  {
    List<Landmark> landmarksCollection = [];

    using (FileStream openStream = File.OpenRead(JsonConstants.LANDMARKS_JSON_FILE_PATH))
    {
      var landmarkData = await JsonSerializer.DeserializeAsync<LandmarksWrapper>(openStream);

      // leave in-memory data as empty list
      if (landmarkData?.Landmarks != null)
      {
        landmarksCollection = landmarkData.Landmarks;
      }
    }
    return landmarksCollection;
  }

  // Adds the entry to the collection and rewrite to json file
  private async Task AddOrUpdateLandmarkInJsonFile(Landmark landmark)
  {
    Console.WriteLine(
      $"id: {landmark.Id}\nname: {landmark.Name}\ncreation date: {landmark?.LandmarkCreationDate}\ndescription: {landmark?.Description}\nimg api url: {landmark?.ImageApiUrl}\nxcoord: {landmark?.LandmarkLocation?.XCoord}\ny coord: {landmark?.LandmarkLocation?.YCoord}"
    );

    List<Landmark> landmarks = await GetAllLandmarksFromJsonFile();

    int indexOfExistingLandmark = landmarks.FindIndex(lmEntry => lmEntry.Id == landmark.Id);

    if (indexOfExistingLandmark == -1)
    {
      Console.WriteLine("landmark is null - doesn't exist in data source");
      // add new (create)
      landmarks.Add(landmark);
    }
    else
    {
      Console.WriteLine("landmark is NOT null - it already exists in data source");
      // replace previous (update)
      landmarks[indexOfExistingLandmark] = landmark;
    }

    LandmarksWrapper landmarkData = new LandmarksWrapper
    {
      Landmarks = landmarks
    };

    // Overwrite JSON file data
    // write and serialize the json object to the same json file (overwriting previous contents with the additional landmark added)
    using (FileStream writeStream = File.Create(JsonConstants.LANDMARKS_JSON_FILE_PATH)) // File.Create mode overwrites the existing landmarkData.json file
    {
      await JsonSerializer.SerializeAsync(writeStream, landmarkData, new JsonSerializerOptions { WriteIndented = true });
    }
  }
}
