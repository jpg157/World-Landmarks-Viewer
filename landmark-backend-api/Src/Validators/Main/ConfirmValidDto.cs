using System.Reflection;

namespace landmark_backend_api.Validators;

public static class ConfirmValidDto<T>
{
  /// <summary>
  /// Confirms that the dto object has no null properties via reflection.
  /// (confirm that dto validation occured before it was passed into the calling method parameter).
  /// </summary>
  /// <param name="dto"></param>
  /// <exception cref="InvalidOperationException"></exception>
  public static void NoNullProperties(T? dto)
  {
    if (dto == null)
    {
      throw new InvalidOperationException($"Dto object was expected to be non-null after validation");
    }

    Type type = dto.GetType();

    PropertyInfo[] properties = type.GetProperties();

    foreach (PropertyInfo property in properties)
    {
      // get the value of the property from the dto object
      object? value = property.GetValue(dto);
      if (value == null)
      {
        throw new InvalidOperationException($"{property.Name} in {type.Name} was expected to be non-null after validation");
      }
    }
  }
}
