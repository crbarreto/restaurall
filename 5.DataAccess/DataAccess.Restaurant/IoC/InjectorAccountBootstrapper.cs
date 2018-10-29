using DataAccess.Restaurant.Repository;
using Domain.Repository.Restaurant;
using SimpleInjector;

namespace DataAccess.Restaurant.IoC
{
  public static class InjectorAccountBootstrapper
  {

    public static void RegisterRestaurantRepository(this Container container)
    {
      container.Register<IRestaurantRepository, RestaurantRepository>();
    }

    public static void RegisterRestaurantRepositoryScoped(this Container container)
    {
      container.Register<IRestaurantRepository, RestaurantRepository>(Lifestyle.Scoped);
    }
  }
}
