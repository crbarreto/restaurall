using Domain.Common.OperationHandling;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Domain.Repository
{
  public interface IRepository<TEntity> where TEntity : class
  {
    Task<OperationResult<TEntity>> Create(TEntity entity);

    void Dispose();

    Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate);

    Task<IEnumerable<TEntity>> GetAll();

    Task<IEnumerable<TEntity>> Query(Expression<Func<TEntity, bool>> predicate);

    Task<OperationResult<bool>> Remove(string id);

    Task<OperationResult<long>> Remove(Expression<Func<TEntity, bool>> predicate);

    Task<OperationResult<TEntity>> Update(string id, TEntity entity);
  }
}