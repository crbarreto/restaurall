using Application.Interfaces.Definition;
using Domain.Entities.Restaurant;
using Domain.Repository;

namespace Application.Services.Definition
{
  public class RestaurantApplicationService : ApplicationService<Restaurant>, IRestaurantApplicationService
  {
    public RestaurantApplicationService(IRepository<Restaurant> repository) : base(repository)
    {
    }
  }
}