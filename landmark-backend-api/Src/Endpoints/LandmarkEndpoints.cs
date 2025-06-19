using landmark_backend_api.Handlers;
using landmark_backend_api.Src.Constants;

namespace landmark_backend_api.Endpoints;

public static class LandmarkEndpoints
{
  public static void MapLandmarkEndpoints(this IEndpointRouteBuilder app)
  {
    var landmarksRoute = app.MapGroup("/api/landmarks-view/landmarks")
                            .WithTags("Landmarks");

    landmarksRoute.MapGet("/", LandmarksHandler.GetAllLandmarks);
    landmarksRoute.MapGet("/{id}", LandmarksHandler.GetLandmarkById);
    landmarksRoute.MapPost("/", LandmarksHandler.CreateLandmark).RequireAuthorization(AuthPolicyPermissions.CREATE_LANDMARKS);
    landmarksRoute.MapPost("/multiple", LandmarksHandler.BulkCreateLandmarks).RequireAuthorization(AuthPolicyPermissions.CREATE_MULTIPLE_LANDMARKS);
    landmarksRoute.MapPost("/{id}/image", LandmarksHandler.UploadLandmarkImage).RequireAuthorization(AuthPolicyPermissions.CREATE_LANDMARKS);
    landmarksRoute.MapDelete("/{id}", LandmarksHandler.DeleteLandmark).RequireAuthorization(AuthPolicyPermissions.DELETE_LANDMARKS);
  }
}
