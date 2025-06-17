namespace landmark_backend_api.Models;

public class LandmarkLocationDataResDto
{
  public required double XCoord { get; set; }
  public required double YCoord { get; set; }
}

public class LandmarkResDto
{
  public required int Id { get; set; }
  public required string Name { get; set; }
  public DateTime LandmarkCreationDate { get; set; }
  public required string Description { get; set; }
  public string? ImageApiUrl { get; set; }
  public required LandmarkLocationDataResDto LandmarkLocation { get; set; }
}
