namespace landmark_backend_api.Models;
public class LandmarkLocationData
{
  public required double XCoord {get; set;}
  public required double YCoord {get; set;}

  // public override string ToString()
  // {
  //   return $"{XCoord}, {YCoord}";
  // }
}

public class Landmark
{
  public required int? Id {get; set;}
  public required string Name {get; set;}
  public required string? LandmarkCreationDate {get; set;}
  public required string Description {get; set;}
  public required string? ImageApiUrl {get; set;}
  public required LandmarkLocationData? LandmarkLocation {get; set;}

  // public IFormFile? LandmarkImage {get; set;}

  // public override string ToString()
  // {
  //   return $"{Id}, {Name}, {LandmarkCreationDate}, {Description}, {ImageApiUrl}, {LandmarkLocation}";
  // }
}

// TO REMOVE
public class LandmarksWrapper
{
  public List<Landmark> Landmarks {get; set;} = [];
}
