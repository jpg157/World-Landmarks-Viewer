using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.HttpResults;

namespace landmark_backend_api.Handlers;

public class AuthHandler
{
  internal static Task<Results<Ok<string>, UnauthorizedHttpResult, BadRequest>> Login(LoginCredentials loginCredentials, IAuthenticationService authService)
  {

  }
}