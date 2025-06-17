using AutoMapper;
using landmark_backend_api.Models;

public class MappingProfile : Profile
{
  // Only maps properties that exist in both the source and destination classes
  public MappingProfile()
  {
    CreateLandmarkMappingProfile();
  }

  private void CreateLandmarkMappingProfile()
  {
    CreateMap<LandmarkLocationData, LandmarkLocationDataResDto>();
    CreateMap<Landmark, LandmarkResDto>();
  }
}
