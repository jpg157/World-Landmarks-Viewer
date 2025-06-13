
using dotenv.net;

namespace landmark_backend_api;

/// <summary>
/// Config class for environment and .env files.
/// </summary>
public static class EnvConfig
{
  private const string BASE_ENV_PATH = "./.env";
  private const string DEV_ENV = $"{BASE_ENV_PATH}.Development";

  // private const string PROD_ENV = $"{BASE_ENV_PATH}.Production";

  // private static readonly string[] ENV_FILES = [
  //     BASE_ENV_PATH,
  //     string.Equals(
  //       Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
  //       "Development",
  //       StringComparison.OrdinalIgnoreCase
  //     ) ? DEV_ENV : PROD_ENV
  //   ];

  /// <summary>
  /// Loads from dev .env file if in development
  /// </summary>
  internal static void LoadEnv()
  {
    if (string.Equals(
        Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
        "Development",
        StringComparison.OrdinalIgnoreCase)
    )
    {
      // Load environment variables from .env file
      DotEnv.Load(options:
        new DotEnvOptions()
        .WithEnvFiles(DEV_ENV)
        .WithOverwriteExistingVars()
      );
    }
  }
}
