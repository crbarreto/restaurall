using DataAccess.Repository;
using Domain.Common.Configuration;
using Domain.Repository.Restaurant;
using Microsoft.Extensions.Options;
using System;

namespace DataAccess.Restaurant
{
  public class RestaurantRepository : Repository<Domain.Entities.Restaurant.Restaurant>, IRestaurantRepository
  {
    public RestaurantRepository(IOptions<MongoConnection> options) : base(options)
    {
    }
  }
}
