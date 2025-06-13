namespace landmark_backend_api.Src.Constants;

/// <summary>
/// Scopes/permissions that endpoints can require clients/user access tokens to have, when authorization is required
/// </summary>
public static class AuthPolicyPermissions
{
  // Required user permissions
  public static readonly string UPDATE_OWN_LANDMARKS = "update:own_landmarks";
  public static readonly string UPDATE_ALL_LANDMARKS = "update:all_landmarks";
  public static readonly string CREATE_LANDMARKS = "create:landmarks";
  public static readonly string DELETE_LANDMARKS = "delete:landmarks";

  // Required scope (permission) for frontend app
  public static readonly string READ_NEW_ANTIFORGERY = "read:new_antiforgery";
}
