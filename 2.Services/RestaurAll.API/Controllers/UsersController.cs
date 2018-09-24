using Application.Interfaces.Definition;
using Domain.Common.Extensions;
using Domain.Common.OperationHandling;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
      return await _userApplicationService.Get(x => x.Id == id.GetInternalId()) ?? new User();
    }

    [HttpPost]
    public async Task<ActionResult<OperationResult<User>>> Create([FromBody] User user)
    {
      var result = await _userApplicationService.Create(user);
      return result;
    }
  }
}