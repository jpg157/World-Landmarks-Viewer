
namespace landmark_backend_api.Models;

public class UserDto
{
  public required string UserId { get; init; }
  public required string Role { get; init; }
  // public required string FirstName { get; init; }
  // public required string LastName { get; init; }
  public required string Email { get; init; }
}
