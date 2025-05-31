using landmark_backend_api.Handlers;

namespace landmark_backend_api.Endpoints;

public static class AntiForgeryEndpoints
{
  public static void RegisterAntiforgeryEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGet("/api/security/antiforgery/token/", AntiforgeryHandler.GetNewAntiforgeryToken);//.RequireAuthorization() // LOGGED IN USERS ONLY
  }
}
