using Domain.Common.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DataAccess
{
  public class RestaurAllContext<TEntity> where TEntity : class
  {
    private readonly IMongoDatabase _database;

    public RestaurAllContext(IOptions<MongoConnection> options)
    {

      var client = new MongoClient(options.Value.ConnectionString);

      if (client != null)
        _database = client.GetDatabase(options.Value.Database);

    }

    public IMongoCollection<TEntity> Collection
    {
      get
      {
        return _database.GetCollection<TEntity>(typeof(TEntity).Name);
      }
    }
  }
}
