using FluentValidation;

namespace landmark_backend_api.Validators;

public class LandmarkImageFileValidator : AbstractValidator<IFormFile>
{
  private const int MAX_LANDMARK_FILE_SIZE_MB = 4;
  private const long MAX_LANDMARK_FILE_SIZE_BYTES = MAX_LANDMARK_FILE_SIZE_MB * 1000000L;

  public LandmarkImageFileValidator()
  {
    RuleFor(x => x).NotNull()
      .WithMessage(
        $"Missing Landmark image file"
      );
    RuleFor(x => x.Length).LessThanOrEqualTo(MAX_LANDMARK_FILE_SIZE_BYTES)
      .WithMessage(
        $"Landmark image file must be less then {MAX_LANDMARK_FILE_SIZE_MB} MB"
      );
  }
}
