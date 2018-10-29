using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces.Definition;
using Domain.Common.Extensions;
using Domain.Common.OperationHandling;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using RestaurAll.API.Base;

namespace RestaurAll.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : BaseController
  {
    private readonly IUserApplicationService _userApplicationService;

    public UsersController(IUserApplicationService userApplicationService)
    {
      _userApplicationService = userApplicationService;
    }

    [HttpPost]
    public async Task<ActionResult<OperationResult<User>>> Create([FromBody] User user)
    {      
      var result = new OperationResult<User>();
      if (!ModelState.IsValid)
      {
        result.Errors.AddRange(ModelStateErrors());
        return BadRequest(result);
      }        

      result = await _userApplicationService.SaveAsync(user);

      if (!result.Status)
        return BadRequest(result);

      return Ok(result);
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<User>> GetByUid(string uid)
    {
      var result = await _userApplicationService.Get(x => x.Uid == uid);

      if (result.Data == null)
        return NotFound(result);

      return Ok(result);
    }

    [HttpPut]
    public async Task<ActionResult<OperationResult<User>>> Update([FromBody] User user)
    {
      var result = new OperationResult<User>();

      if (!ModelState.IsValid)
      {        
        result.Errors.AddRange(ModelStateErrors());
        return BadRequest(result);
      }        

      result = await _userApplicationService.SaveAsync(user);

      if (!result.Status)
        return BadRequest(result);

      return Ok(result);
    }

  }
}