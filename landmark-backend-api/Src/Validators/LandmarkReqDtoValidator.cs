using FluentValidation;
using landmark_backend_api.Dtos.Request;

namespace landmark_backend_api.Validators;

public class LandmarkReqDtoValidator : AbstractValidator<LandmarkReqDto>
{
  // LandmarkDto constants
  private const int MIN_LANDMARK_NAME_LENGTH = 1;
  private const int MAX_LANDMARK_NAME_LENGTH = 100;
  private const int MIN_LANDMARK_DESCRIPTION_LENGTH = 1;
  private const int MAX_LANDMARK_DESCRIPTION_LENGTH = 1000;

  // LandmarkLocationDataDto constants
  private const double MIN_LANDMARK_LOCATION_COORDS_VALUE = 0.0;
  public LandmarkReqDtoValidator()
  {
    RuleFor(x => x).NotNull()
      .WithMessage(
        $"Missing landmark data"
      );
    RuleFor(x => x.Name).NotNull().NotEmpty().Length(MIN_LANDMARK_NAME_LENGTH, MAX_LANDMARK_NAME_LENGTH)
      .WithMessage(
        $"Landmark name length must be between {MIN_LANDMARK_NAME_LENGTH} and {MAX_LANDMARK_NAME_LENGTH} characters"
      );
    RuleFor(x => x.Description).NotNull().NotEmpty().Length(MIN_LANDMARK_DESCRIPTION_LENGTH, MAX_LANDMARK_DESCRIPTION_LENGTH)
      .WithMessage(
        $"Landmark description length must be between {MIN_LANDMARK_DESCRIPTION_LENGTH} and {MAX_LANDMARK_DESCRIPTION_LENGTH} characters"
      );
    RuleFor(x => x.LandmarkLocation).NotNull().ChildRules(landmarkLocation =>
    {
      landmarkLocation.RuleFor(x => x!.XCoord).NotNull().GreaterThanOrEqualTo(MIN_LANDMARK_LOCATION_COORDS_VALUE)
        .WithMessage(
          $"Minimum landmark x coordinate value must be {MIN_LANDMARK_LOCATION_COORDS_VALUE}"
        );
      landmarkLocation.RuleFor(x => x!.YCoord).NotNull().GreaterThanOrEqualTo(MIN_LANDMARK_LOCATION_COORDS_VALUE)
        .WithMessage(
          $"Minimum landmark x coordinate value must be {MIN_LANDMARK_LOCATION_COORDS_VALUE}"
        );
    });
  }
}
