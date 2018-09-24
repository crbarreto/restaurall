using Application.IoC;
using DataAccess.Account.IoC;
using SimpleInjector;

namespace CrossCutting.IoC
{
  public static class SimpleInjectorBootstrapper
  {
    public static void RegisterDependencies(this Container container)
    {
      container.RegisterAccountRepository();

      container.RegisterServices();
    }

    public static void RegisterDependenciesScoped(this Container container)
    {
      container.RegisterAccountRepositoryScoped();

      container.RegisterServicesScoped();
    }
  }
}