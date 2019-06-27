using MongoDB.Bson;

namespace Domain.Common.Extensions
{
  public static class StringExtensions
  {
    public static ObjectId GetInternalId(this string id)
    {
      if (!ObjectId.TryParse(id, out var internalId))
        internalId = ObjectId.Empty;
      return internalId;
    }
  }
}

