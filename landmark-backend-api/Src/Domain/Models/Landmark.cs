using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace landmark_backend_api.Models;

// [Owned]
[Table("LandmarkLocations")]
public class LandmarkLocationData
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }
  public required double XCoord { get; set; }

  public required double YCoord { get; set; }

  public int LandmarkId { get; set; }
  public Landmark? Landmark { get; set; }
}

[Table("Landmarks")]
public class Landmark
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }
  public required string Name { get; set; }

  [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
  public DateTime LandmarkCreationDate { get; set; }
  public required string Description { get; set; }
  public string? ImageApiUrl { get; set; }
  public required LandmarkLocationData LandmarkLocation { get; set; }
}
