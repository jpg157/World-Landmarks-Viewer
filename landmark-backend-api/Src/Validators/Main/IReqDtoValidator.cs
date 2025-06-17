using landmark_backend_api.Dtos.Response;

namespace landmark_backend_api.Validators;

public interface IReqDtoValidator
{
  IEnumerable<ValidationResponseDto> ValidateAndGetProblems<T>(T dto);
}
