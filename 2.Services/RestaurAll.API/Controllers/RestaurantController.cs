using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces.Definition;
using Domain.Common.OperationHandling;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurAll.API.Base;

namespace RestaurAll.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RestaurantController : BaseController
  {
    private readonly IRestaurantApplicationService _restaurantApplicationService;

    public RestaurantController(IRestaurantApplicationService restaurantApplicationService)
    {
      _restaurantApplicationService = restaurantApplicationService;
    }

    //public async Task<ActionResult<OperationResult<>>>
  }
}