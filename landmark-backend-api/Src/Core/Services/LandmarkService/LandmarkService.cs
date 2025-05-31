using System.Text.Json;
using System.Threading.Tasks;
using landmark_backend_api.Models;
using landmark_backend_api.Models.Dtos.Pagination;

namespace landmark_backend_api.Services.LandmarkService;
public class LandmarkService : ILandmarkService
{
  private readonly ILandmarkDataAccessor _landmarkDataAccessor;

  public LandmarkService(
    ILandmarkDataAccessor landmarkDataAccessor)
  {
    _landmarkDataAccessor = landmarkDataAccessor;
  }

  public async Task<PaginatedItemsDTO<Landmark>> GetAllLandmarks() //TODO: Add PaginationReqParams class into params
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
      Data = await _landmarkDataAccessor.FindAll(),
      Metadata = paginatedMetadataDTO
    };

    return paginatedLandmarksDto;
  }

  public async Task<Landmark?> GetLandmarkById(int id)
  {
    return await _landmarkDataAccessor.FindById(id);
  }

  public async Task<Landmark> AddLandmark(Landmark landmark)
  {
    // todo: add validation
    Landmark newLandmark = await _landmarkDataAccessor.Create(landmark);
    return newLandmark;
  }

  public async Task<Landmark?> UpdateLandmarkImage(string imageSrcUrl, int landmarkId)
  {
    return await _landmarkDataAccessor.UpdateImageSrcUrl(imageSrcUrl, landmarkId);
  }

  //TODO
  public Task DeleteLandmarkById(int id)
  {
    throw new NotImplementedException();
  }
}
