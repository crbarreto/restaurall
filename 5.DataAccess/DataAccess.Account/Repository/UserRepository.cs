using DataAccess.Repository;
using Domain.Common.Configuration;
using Domain.Entities.Account;
using Domain.Repository.Account;
using Microsoft.Extensions.Options;

namespace DataAccess.Account.Repository
{
  public class UserRepository : Repository<User>, IUserRepository
  {
    public UserRepository(IOptions<MongoConnection> options) : base(options)
    {
    }
  }
}
