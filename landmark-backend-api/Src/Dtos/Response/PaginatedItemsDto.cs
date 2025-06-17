namespace landmark_backend_api.Dtos.Response;

/// <summary>
/// Contains data - the collection of items, and metadata for pagination.
/// </summary>
/// <typeparam name="T"></typeparam>
public record PaginatedItemsDTO<T>
{
  public required List<T> Data {get; init;}

  public required PaginatedMetadataDTO Metadata {get; init;}
}
