using Application.Interfaces.Definition;
using Application.Services.Definition;
using SimpleInjector;

namespace Application.IoC
{
  public static class SimpleInjectorBootstrapper
  {
    public static void RegisterServices(this Container container)
    {
      container.Register<IUserApplicationService, UserApplicationService>();
    }

    public static void RegisterServicesScoped(this Container container)
    {
      container.Register<IUserApplicationService, UserApplicationService>(Lifestyle.Scoped);
    }
  }
}
