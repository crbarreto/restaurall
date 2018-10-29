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

    Task<OperationResult<TEntity>> Get(Expression<Func<TEntity, bool>> predicate);

    Task<OperationResult<IEnumerable<TEntity>>> GetAll();

    Task<OperationResult<IEnumerable<TEntity>>> Query(Expression<Func<TEntity, bool>> predicate);

    Task<OperationResult<bool>> Remove<TKey>(TKey id);

    Task<OperationResult<long>> Remove(Expression<Func<TEntity, bool>> predicate);

    Task<OperationResult<TEntity>> Update<TKey>(TKey id, TEntity entity);
  }
}