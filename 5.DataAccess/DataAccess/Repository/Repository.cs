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

    public async Task<OperationResult<TEntity>> Get(Expression<Func<TEntity, bool>> predicate)
    {
      var result = new OperationResult<TEntity>();
      try
      {
        var data = await _context.Collection
          .Find(predicate)
          .FirstOrDefaultAsync();

        result.Data = data;

        if(data == null)
          result.Errors.Add("Not found record");        
      }
      catch (Exception e)
      {
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
      }

      return result;
    }

    public async Task<OperationResult<IEnumerable<TEntity>>> GetAll()
    {
      var result = new OperationResult<IEnumerable<TEntity>>();
      try
      {
        var data = await _context.Collection
                .Find(_ => true).ToListAsync();

        result.Data = data;
      }
      catch (Exception e)
      {
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
      }

      return result;
    }
    public async Task<OperationResult<IEnumerable<TEntity>>> Query(Expression<Func<TEntity, bool>> predicate)
    {
      var result = new OperationResult<IEnumerable<TEntity>>();
      try
      {
        var query = _context.Collection.Find(predicate);
        var data = await query.ToListAsync();

        result.Data = data;
      }
      catch (Exception e)
      {
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
      }

      return result;
    }

    public async Task<OperationResult<bool>> Remove<TKey>(TKey id)
    {
      var result = new OperationResult<bool>();
      try
      {
        var actionResult
            = await _context.Collection.DeleteOneAsync(
                Builders<TEntity>.Filter.Eq("Id", id));

        var data = actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        result.Data = data;

        if (!data)
          result.Errors.Add("Not is acknowledged or not is possible delete");

        return result;
      }
      catch (Exception e)
      {        
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
        var actionResult = await _context.Collection.DeleteManyAsync(predicate);
        var data = actionResult.IsAcknowledged;

        if (!data)
          result.Errors.Add("Not is acknowledged");

        result.Data = actionResult.DeletedCount;
        return result;
      }
      catch (Exception e)
      {
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
        return result;
      }
    }

    public async Task<OperationResult<TEntity>> Update<TKey>(TKey id, TEntity entity)
    {
      var result = new OperationResult<TEntity>();
      try
      {
        var actionResult
            = await _context.Collection
                            .ReplaceOneAsync(Builders<TEntity>.Filter.Eq("Id", id)
                                    , entity
                                    , new UpdateOptions { IsUpsert = true });

        result.Data = entity;

        var data = actionResult.IsAcknowledged && actionResult.ModifiedCount > 0;

        if (!data)
          result.Errors.Add("Not is acknowledged or not is possible delete");

        return result;
      }
      catch (Exception e)
      {        
        result.Errors.Add(e.Message);
        if (e.InnerException != null)
          result.Errors.Add(e.InnerException.Message);
        return result;
      }
    }
  }
}