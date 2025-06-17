namespace landmark_backend_api.Dtos.Response;

public class ValidationResponseDto
{
  public required string PropertyName { get; set; }
  public required string ErrorMessage { get; set; }
}
