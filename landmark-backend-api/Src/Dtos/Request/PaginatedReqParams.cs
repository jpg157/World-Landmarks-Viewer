namespace landmark_backend_api.Dtos.Request;

/// <summary>
/// Params from request data. No required properties.
/// </summary>
public record PaginatedReqParams
{
  private const int MAX_PAGE_SIZE = 100;
  public int CurrentPageNum {get; init;} = 1;
  
  private int _totalNumItemsPerPage = 10;
  public int TotalNumItemsPerPage
  {
    get => _totalNumItemsPerPage;
    init => _totalNumItemsPerPage = value <= MAX_PAGE_SIZE ? value : MAX_PAGE_SIZE;
  }

  // If time, add sorttype, sortorder, and sortby
}
