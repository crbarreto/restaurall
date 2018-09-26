using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities.Account
{
  public class User
  {
    [BsonId]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [BsonElement, Required]
    public string Uid { get; set; }

    [BsonElement, Required, StringLength(120)]
    public string Name { get; set; }

    [BsonElement, Required, StringLength(120)]
    public string LastName { get; set; }

    [BsonElement, Required, StringLength(255), EmailAddress]
    public string Email { get; set; }

    [BsonElement, Required, StringLength(255)]
    public string Address { get; set; }

    [BsonElement, Required, DataType(DataType.PhoneNumber), StringLength(120)]
    public string Phone { get; set; }

    [BsonElement, Required, StringLength(120)]
    public string City { get; set; }
  }
}
