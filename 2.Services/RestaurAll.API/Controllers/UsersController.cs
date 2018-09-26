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

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> Get(string id)
    {
      var objectId = id.GetInternalId();

      if (objectId == ObjectId.Empty)
        return BadRequest("Invalid ID supplied");

      var response = await _userApplicationService.Get(x => x.Id == objectId);

      if (response == null)
        return NotFound($"User not found");

      return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<OperationResult<User>>> Create([FromBody] User user)
    {
      var result = await _userApplicationService.Create(user);
      return result;
    }
  }
}