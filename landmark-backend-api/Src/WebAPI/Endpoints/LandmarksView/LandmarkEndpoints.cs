using landmark_backend_api.Services.LandmarkService;

namespace landmark_backend_api.WebAPI.Endpoints.LandmarksView;
public static class LandmarkEndpoints
{
  public static void RegisterLandmarkEndpoints(this WebApplication app)
  {
    var landmarksRoute = app.MapGroup("/api/landmarks-view/landmarks");

    landmarksRoute.MapGet("/", (ILandmarkService landmarkService) => landmarkService.GetAllLandmarks()); // json serialization, response status , content type header set implicitly
    // app.MapGet()
  }
}
