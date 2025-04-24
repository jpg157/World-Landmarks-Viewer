namespace landmark_backend_api.Models;
public class LandmarkLocationData
{
  public required decimal XCoord {get; set;}
  public required decimal YCoord {get; set;}

  // public override string ToString()
  // {
  //   return $"{XCoord}, {YCoord}";
  // }
}

public class Landmark
{
  public required string Id {get; set;}
  public required string Name {get; set;}
  public required string? LandmarkCreationDate {get; set;}
  public required string Description {get; set;}
  public required string ImageAPIUrl {get; set;}
  public required LandmarkLocationData LandmarkLocation {get; set;}
  // public override string ToString()
  // {
  //   return $"{Id}, {Name}, {LandmarkCreationDate}, {Description}, {ImageAPIUrl}, {LandmarkLocation}";
  // }
}

// TO REMOVE
public class LandmarksWrapper
{
  public List<Landmark> Landmarks {get; set;} = [];
}
