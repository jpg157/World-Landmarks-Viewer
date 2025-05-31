// Delete after adding pgsql db

public static class JsonConstants {
  private static readonly string BASE_DIR_PATH = AppDomain.CurrentDomain.BaseDirectory;
  private static readonly string PATH_TO_JSON_FILE_DATA = Path.Combine("Src", "TempDatabase", "landmarkData_TEMP", "json");

  // JSON FILE NAME ===
  private static readonly string LANDMARK_DATA_JSON_FILE_NAME = "landmarkData.json";

  // Public Constants ===
  public static readonly string LANDMARKS_JSON_FILE_PATH = Path.Combine(BASE_DIR_PATH, PATH_TO_JSON_FILE_DATA, LANDMARK_DATA_JSON_FILE_NAME);
}
