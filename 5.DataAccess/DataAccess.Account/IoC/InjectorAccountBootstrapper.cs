using DataAccess.Account.Repository;
using Domain.Repository.Account;
using SimpleInjector;

namespace DataAccess.Account.IoC
{
  public static class InjectorAccountBootstrapper
  {

    public static void RegisterAccountRepository(this Container container)
    {
      container.Register<IUserRepository, UserRepository>();
    }

    public static void RegisterAccountRepositoryScoped(this Container container)
    {
      container.Register<IUserRepository, UserRepository>(Lifestyle.Scoped);
    }
  }
}
