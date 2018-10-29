using System.Threading.Tasks;
using Application.Interfaces.Definition;
using Domain.Common.OperationHandling;
using Domain.Entities.Account;
using Domain.Repository.Account;

namespace Application.Services.Definition
{
  public class UserApplicationService : ApplicationService<User>, IUserApplicationService
  {
    public UserApplicationService(IUserRepository repository) : base(repository)
    {
    }

    public async Task<OperationResult<User>> SaveAsync(User user)
    {
      var currentUser = await Get(x => x.Uid == user.Uid);

      OperationResult<User> result;

      if (currentUser.Data != null)
      {
        currentUser.Data.Name = user.Name;
        currentUser.Data.LastName = user.LastName;
        currentUser.Data.Email = user.Email;
        currentUser.Data.Phone = user.Phone;
        currentUser.Data.City = user.City;
        currentUser.Data.Address = user.City;

        result = await Update(user.Id.ToString(), currentUser.Data);
      }
      else
      {
        result = await Create(user);
      }

      return result;
    }
  }
}
