namespace landmark_backend_api.Endpoints.LandmarksView;

public static class LandmarkEndpoints
{
  public static void Map(WebApplication app)
  {
    //confirm if this works 
    // (so don't need to put all endpoints and route handlers in program.cs)
    app.MapGet("/api/landmarks-view/landmarks", (ILandmarkService landmarkService) => {
      return landmarkService.GetAllLandmarks();
    });

    // app.MapGet()
  }
}
