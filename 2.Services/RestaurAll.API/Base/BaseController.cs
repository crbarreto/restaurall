using System.Security.Claims;
using Application.Interfaces.Definition;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace RestaurAll.API.Base
{
  public class BaseController : ControllerBase
  {
    private readonly IUserApplicationService _userApplicationService;

    public BaseController()
    {
      _userApplicationService = HttpContext.RequestServices.GetService(typeof(IUserApplicationService)) as IUserApplicationService;
    }

    protected User CurrentUser
    {
      get
      {
        if (!(base.User.Identity is ClaimsIdentity currentClaimsIdentity)) return null;
        var user = JsonConvert.DeserializeObject<User>(currentClaimsIdentity.FindFirst("customUser")?.Value);
        if (user == null)
        {
          var uid = currentClaimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
          if (string.IsNullOrEmpty(uid))
            return null;

          var customUser = _userApplicationService.Get(x => x.Uid == uid).Result;
          currentClaimsIdentity.AddClaim(new Claim("customUser", JsonConvert.SerializeObject(customUser)));
          return customUser;
        }
        else
        {
          return user;
        }
      }
    }
  }
}
