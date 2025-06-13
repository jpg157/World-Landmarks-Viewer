using landmark_backend_api.Handlers;
using landmark_backend_api.Src.Constants;

namespace landmark_backend_api.Endpoints;

public static class AntiForgeryEndpoints
{
  public static void MapAntiforgeryEndpoints(this IEndpointRouteBuilder app)
  {
    var antiforgeryRoute = app.MapGroup("/api")
                              .WithTags("Antiforgery");

    antiforgeryRoute.MapGet("/antiforgery/token/", AntiforgeryHandler.GetNewAntiforgeryToken).RequireAuthorization(AuthPolicyPermissions.READ_NEW_ANTIFORGERY);
  }
}
