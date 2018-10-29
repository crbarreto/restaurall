using Application.Interfaces;
using Domain.Common.OperationHandling;
using Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Application.Services
{
  public class ApplicationService<TEntity> : IApplicationService<TEntity> where TEntity : class
  {
    private readonly IRepository<TEntity> _repository;

    public ApplicationService(IRepository<TEntity> repository)
    {
      _repository = repository;
    }

    public async Task<OperationResult<TEntity>> Create(TEntity entity)
    {
      return await _repository.Create(entity);
    }

    public void Dispose()
    {
      GC.SuppressFinalize(this);
    }

    public async Task<OperationResult<TEntity>> Get(Expression<Func<TEntity, bool>> predicate)
    {
      return await _repository.Get(predicate);
    }

    public async Task<OperationResult<IEnumerable<TEntity>>> Query(Expression<Func<TEntity, bool>> predicate)
    {
      return await _repository.Query(predicate);
    }

    public async Task<OperationResult<bool>> Remove(string id)
    {
      return await _repository.Remove(id);
    }

    public async Task<OperationResult<long>> Remove(Expression<Func<TEntity, bool>> predicate)
    {
      return await _repository.Remove(predicate);
    }

    public async Task<OperationResult<TEntity>> Update<TKey>(TKey id, TEntity entity)
    {
      return await _repository.Update(id, entity);
    }
  }
}
