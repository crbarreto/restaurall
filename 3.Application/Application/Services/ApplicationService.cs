using Application.Interfaces;
using Domain.Common.OperationHandling;
using Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Application.Services.Definition
{
  public class ApplicationService<TEntity> : IApplicationService<TEntity> where TEntity : class
  {
    private IRepository<TEntity> Repository;

    public ApplicationService(IRepository<TEntity> repository)
    {
      Repository = repository;
    }

    public async Task<OperationResult<TEntity>> Create(TEntity entity)
    {
      return await Repository.Create(entity);
    }

    public void Dispose()
    {
      GC.SuppressFinalize(this);
    }

    public async Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate)
    {
      return await Repository.Get(predicate);
    }

    public async Task<IEnumerable<TEntity>> Query(Expression<Func<TEntity, bool>> predicate)
    {
      return await Repository.Query(predicate);
    }

    public async Task<OperationResult<bool>> Remove(string id)
    {
      return await Repository.Remove(id);
    }

    public async Task<OperationResult<long>> Remove(Expression<Func<TEntity, bool>> predicate)
    {
      return await Repository.Remove(predicate);
    }

    public async Task<OperationResult<TEntity>> Update(string id, TEntity entity)
    {
      return await Repository.Update(id, entity);
    }
  }
}
