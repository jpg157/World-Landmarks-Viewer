using landmark_backend_api.Handlers;

namespace landmark_backend_api.Endpoints;
public static class LandmarkEndpoints
{
  public static void RegisterLandmarkEndpoints(this IEndpointRouteBuilder app)
  {
    var landmarksRoute = app.MapGroup("/api/landmarks-view/landmarks");

    landmarksRoute.MapGet("/", LandmarksHandler.GetAllLandmarks);
    landmarksRoute.MapGet("/{id}", LandmarksHandler.GetLandmarkById);
    landmarksRoute.MapPost("/", LandmarksHandler.CreateLandmark);//.RequireAuthorization(); // LOGGED IN USERS ONLY
    landmarksRoute.MapPost("/{id}/image", LandmarksHandler.CreateLandmarkImage);//.RequireAuthorization(); // LOGGED IN USERS ONLY
    // landmarksRoute.MapDelete("/{id}", LandmarksHandler.DeleteLandmark).RequireAuthorization(); // ADMIN ONLY
  }
}
