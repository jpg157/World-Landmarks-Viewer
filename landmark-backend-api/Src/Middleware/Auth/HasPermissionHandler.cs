using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace landmark_backend_api.Middleware.Auth;

public class HasPermissionHandler : AuthorizationHandler<HasPermissionRequirement>
{
  private static bool IsPermissionTypeClaimAndMatchingIssuer(Claim claim, HasPermissionRequirement requirement)
  {
    return  claim.Type == "permissions" &&
            claim.Issuer == requirement.Issuer;
  }

  protected override Task HandleRequirementAsync(
    AuthorizationHandlerContext context,
    HasPermissionRequirement requirement
  )
  {
    ClaimsPrincipal claimsPrincipal = context.User;

    // Ensure the OIDC provider issued the "permissions" claim after authentication
    if (!claimsPrincipal.HasClaim(
      claim => IsPermissionTypeClaimAndMatchingIssuer(claim, requirement)
      )
    )
    {
      return Task.CompletedTask;
    }

    // Extract the permissions claim(s) from the collection of claims
    IEnumerable<Claim> permissionClaims = claimsPrincipal.FindAll(claim => IsPermissionTypeClaimAndMatchingIssuer(claim, requirement));//!.Value.Split(' ');

    // Convert to array of permissions as strings
    string[] listOfPermissions = [];

    listOfPermissions = permissionClaims
      .Select(claim => claim.Value)
      .ToArray();
    
    // Check if list of permissions contains the required permission
    if (listOfPermissions.Any(permission => permission == requirement.Permission))
    {
      context.Succeed(requirement);
    }
    return Task.CompletedTask;
  }
}
