using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities.Restaurant
{
  public class Restaurant
  {
    [BsonId]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [BsonElement, Required, StringLength(120)]
    public string Name { get; set; }

    [BsonElement]
    public string PhotoUrl { get; set; }

    [BsonElement, Required, StringLength(255)]
    public string Address { get; set; }

    [BsonElement, Required, StringLength(120)]
    public string City { get; set; }

    [BsonElement]
    public float Latitude { get; set; }

    [BsonElement]
    public float Longitude { get; set; }

    [BsonElement]
    public double Rating { get; set; } = 0;
  }
}
