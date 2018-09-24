using Domain.Common.Configuration;
using Domain.Common.OperationHandling;
using Domain.Repository;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
  public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
  {
    private readonly RestaurAllContext<TEntity> _context;

    public Repository(IOptions<MongoConnection> options)
    {
      _context = new RestaurAllContext<TEntity>(options);
    }

    public async Task<OperationResult<TEntity>> Create(TEntity entity)
    {
      var result = new OperationResult<TEntity>();
      try
      {
        await _context.Collection.InsertOneAsync(entity);
        result.Data = entity;
        return result;
      }
      catch (Exception e)
      {
        result.Status = false;
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
        return result;
      }
    }

    public void Dispose()
    {
      GC.SuppressFinalize(this);
    }

    public async Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate)
    {
      try
      {
        return await _context.Collection
                        .Find(predicate)
                        .FirstOrDefaultAsync();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public async Task<IEnumerable<TEntity>> GetAll()
    {
      try
      {
        return await _context.Collection
                .Find(_ => true).ToListAsync();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
    public async Task<IEnumerable<TEntity>> Query(Expression<Func<TEntity, bool>> predicate)
    {
      try
      {
        var query = _context.Collection.Find(predicate);
        return await query.ToListAsync();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public async Task<OperationResult<bool>> Remove(string id)
    {
      var result = new OperationResult<bool>();
      try
      {
        DeleteResult actionResult
            = await _context.Collection.DeleteOneAsync(
                Builders<TEntity>.Filter.Eq("Id", id));
        result.Status = actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        return result;
      }
      catch (Exception e)
      {
        result.Status = false;
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
        return result;
      }
    }

    public async Task<OperationResult<long>> Remove(Expression<Func<TEntity, bool>> predicate)
    {
      var result = new OperationResult<long>();
      try
      {
        DeleteResult actionResult = await _context.Collection.DeleteManyAsync(predicate);
        result.Status = actionResult.IsAcknowledged;
        result.Data = actionResult.DeletedCount;
        return result;
      }
      catch (Exception e)
      {
        result.Status = false;
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
        return result;
      }
    }

    public async Task<OperationResult<TEntity>> Update(string id, TEntity entity)
    {
      var result = new OperationResult<TEntity>();
      try
      {
        ReplaceOneResult actionResult
            = await _context.Collection
                            .ReplaceOneAsync(Builders<TEntity>.Filter.Eq("Id", id)
                                    , entity
                                    , new UpdateOptions { IsUpsert = true });

        result.Data = entity;
        result.Status = actionResult.IsAcknowledged && actionResult.ModifiedCount > 0;
        return result;
      }
      catch (Exception e)
      {
        result.Status = false;
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
        return result;
      }
    }
  }
}