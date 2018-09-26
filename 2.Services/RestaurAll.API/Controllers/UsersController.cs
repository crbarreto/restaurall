using System.Threading.Tasks;
using Application.Interfaces.Definition;
using Domain.Common.Extensions;
using Domain.Common.OperationHandling;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace RestaurAll.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly IUserApplicationService _userApplicationService;

    public UsersController(IUserApplicationService userApplicationService)
    {
      _userApplicationService = userApplicationService;
    }

    [HttpGet("{uid}")]
    public async Task<ActionResult<User>> GetByUid(string uid)
    {
      var response = await _userApplicationService.Get(x => x.Uid == uid);

      if (response == null)
        return NotFound();

      return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<OperationResult<User>>> Create([FromBody] User user)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var result = await _userApplicationService.Create(user);

      if (!result.Status)
        return BadRequest(result);

      return Ok();
    }

  }
}