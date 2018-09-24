using MongoDB.Bson;

namespace Domain.Common.Extensions
{
  public static class StringExtensions
  {
    public static ObjectId GetInternalId(this string id)
    {
      ObjectId internalId;
      if (!ObjectId.TryParse(id, out internalId))
        internalId = ObjectId.Empty;
      return internalId;
    }
  }
}
