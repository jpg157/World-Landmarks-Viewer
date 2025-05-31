
using landmark_backend_api.Handlers;

namespace landmark_backend_api.Endpoints;

public static class AuthEndpoints
{
  internal static void RegisterAuthEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGroup("/api/auth");

    app.MapPost("/login", AuthHandler.Login);
  }
}
