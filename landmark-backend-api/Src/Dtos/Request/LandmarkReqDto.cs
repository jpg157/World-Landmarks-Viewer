namespace landmark_backend_api.Dtos.Request;

public class LandmarkLocationDataReqDto
{
  public double? XCoord { get; set; }
  public double? YCoord { get; set; }
}

public class LandmarkReqDto
{
  public string? Name { get; set; }
  public string? Description { get; set; }
  public LandmarkLocationDataReqDto? LandmarkLocation { get; set; }
}
