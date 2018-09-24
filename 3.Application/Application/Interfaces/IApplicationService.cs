using Domain.Common.OperationHandling;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Application.Interfaces
{
  public interface IApplicationService<TEntity> : IDisposable where TEntity : class
  {
    Task<OperationResult<TEntity>> Create(TEntity entity);

    Task<OperationResult<TEntity>> Update(string id, TEntity entity);

    Task<OperationResult<bool>> Remove(string id);

    Task<OperationResult<long>> Remove(Expression<Func<TEntity, bool>> predicate);

    Task<IEnumerable<TEntity>> Query(Expression<Func<TEntity, bool>> predicate);

    Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate);
  }
}