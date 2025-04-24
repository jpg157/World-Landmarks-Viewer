using System.Text.Json;
using landmark_backend_api.Models;
using landmark_backend_api.Models.Dtos.Pagination;

namespace landmark_backend_api.Services.LandmarkService;
public class LandmarkService : ILandmarkService
{
  private readonly ILandmarkDataAccessor _landmarkDataAccessor;
  private readonly IImageService _imageService;

  public LandmarkService(
    ILandmarkDataAccessor landmarkDataAccessor,
    IImageService imageService)
  {
    _landmarkDataAccessor = landmarkDataAccessor;
    _imageService = imageService;
  }

  public PaginatedItemsDTO<Landmark> GetAllLandmarks() //TODO: Add PaginationReqParams class into params
  {
    PaginatedItemsDTO<Landmark> paginatedLandmarksDto;

    PaginatedMetadataDTO paginatedMetadataDTO = new PaginatedMetadataDTO
    {
      CurrentPageNum = 1,
      TotalNumPages = 1, // total items (attained from getAll from db)
      TotalNumItemsPerPage = 10
    };
    paginatedLandmarksDto = new PaginatedItemsDTO<Landmark>
    {
      Data = _landmarkDataAccessor.FindAll(),
      Metadata = paginatedMetadataDTO
    };

    return paginatedLandmarksDto;
  }

  public Landmark? GetLandmarkById(string id)
  {
    return _landmarkDataAccessor.FindById(id);
  }

  public void AddLandmark(Landmark landmark)
  {
    _landmarkDataAccessor.Create(landmark);

    //todo: add string filePath
    //todo: add int landmark.Id
    // _imageService.UploadImageAsync();
  }
}
