using FluentValidation;
using FluentValidation.Results;
using landmark_backend_api.Dtos.Response;

namespace landmark_backend_api.Validators;

public class ReqDtoValidator : IReqDtoValidator
{
  private readonly IServiceProvider _serviceProvider;

  public ReqDtoValidator(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  public IEnumerable<ValidationResponseDto> ValidateAndGetProblems<T>(T dto)
  {
    IEnumerable<ValidationResponseDto> validationProblems = [];

    if (dto == null)
    {
      ValidationResponseDto validationProblem = new()
      {
        PropertyName = "",
        ErrorMessage = "No content was entered"
      };

      validationProblems.Append(validationProblem);

      return validationProblems;
    }
    
    // resolve the validator service at runtime based on the the dto type using service provider
    IValidator<T>? validator = _serviceProvider.GetService<IValidator<T>>();

    if (validator == null)
    {
      throw new Exception("Server Error");
    }

    // perform validation
    ValidationResult validationResult = validator.Validate(dto);

    // create list of validation problems if the dto was invalid
    if (!validationResult.IsValid)
    {
      validationProblems = validationResult.Errors
        .Select(error => new ValidationResponseDto
        {
          PropertyName = error.PropertyName,
          ErrorMessage = error.ErrorMessage
        })
        .ToList();
    }

    return validationProblems;
  }
}
