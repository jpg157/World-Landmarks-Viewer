using Microsoft.AspNetCore.Authorization;

namespace landmark_backend_api.Middleware.Auth;

public class HasPermissionRequirement : IAuthorizationRequirement
{
  public string Issuer { get; }
  public string Permission { get; }

  public HasPermissionRequirement(string permission, string issuer)
  {
    ArgumentNullException.ThrowIfNull(permission);
    ArgumentNullException.ThrowIfNull(issuer);
    this.Permission = permission;
    this.Issuer = issuer;
  }
}
