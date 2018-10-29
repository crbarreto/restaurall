using System.Threading.Tasks;
using Domain.Common.OperationHandling;
using Domain.Entities.Account;

namespace Application.Interfaces.Definition
{
  public interface IUserApplicationService : IApplicationService<User>
  {
    Task<OperationResult<User>> SaveAsync(User user);
  }
}
