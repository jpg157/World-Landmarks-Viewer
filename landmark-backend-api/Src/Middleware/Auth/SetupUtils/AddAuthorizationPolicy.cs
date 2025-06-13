using Microsoft.AspNetCore.Authorization;

namespace landmark_backend_api.Middleware.Auth.SetupUtils;

public static class AuthorizationSetup
{
  // Creates a new authorization policy with a permission requirement. The permission name is the same as the authorization policy name.
  internal static void AddAuthorizationPolicy(this AuthorizationOptions options, string permissionName, string authServerDomain)
  {
    options.AddPolicy(permissionName, policy => policy.Requirements.Add(
      new HasPermissionRequirement(permissionName, authServerDomain)
    ));
  }
}
