using landmark_backend_api.Src.Constants;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http.HttpResults;

namespace landmark_backend_api.Handlers;

public class AntiforgeryHandler
{
  internal static Ok GetNewAntiforgeryToken(HttpContext httpContext, IAntiforgery antiforgery)
  {
    AntiforgeryTokenSet tokens = antiforgery.GetAndStoreTokens(httpContext);

    httpContext.Response.Cookies.Append(
      AntiforgeryToken.XSRF_TOKEN_NAME,
      tokens.RequestToken!,
      new CookieOptions
      {
        HttpOnly = true // can use true here since accessing cookie in nextjs server action, not client side browser
      }
    );

    return TypedResults.Ok();
  }
}
