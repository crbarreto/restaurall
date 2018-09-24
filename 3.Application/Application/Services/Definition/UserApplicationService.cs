using Application.Interfaces.Definition;
using Domain.Entities.Account;
using Domain.Repository.Account;

namespace Application.Services.Definition
{
  public class UserApplicationService : ApplicationService<User>, IUserApplicationService
  {
    public UserApplicationService(IUserRepository repository) : base(repository)
    {
    }
  }
}
