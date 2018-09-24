using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities.Account
{
  public class User
  {
    [BsonId]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [BsonElement]
    public string Uid { get; set; }

    [BsonElement]
    public string Name { get; set; }

    [BsonElement]
    public string LastName { get; set; }

    [BsonElement]
    public string Email { get; set; }

    [BsonElement]
    public string Address { get; set; }

    [BsonElement]
    public string Phone { get; set; }

    [BsonElement]
    public string City { get; set; }
  }
}
