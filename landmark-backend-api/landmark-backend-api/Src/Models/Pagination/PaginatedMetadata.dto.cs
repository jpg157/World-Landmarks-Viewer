namespace landmark_backend_api.Models.Pagination;

/// <summary>
/// Pagination response metadata.
/// </summary>
public record PaginatedMetadataDTO
{
  public required int CurrentPageNum {get; init;}
  public required int TotalNumPages {get; init;}
  public required int TotalNumItemsPerPage {get; init;}
}
