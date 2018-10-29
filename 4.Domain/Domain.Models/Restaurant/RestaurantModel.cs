using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Principal;
using System.Text;
using Domain.Entities.Account;

namespace Domain.Models.Restaurant
{
  public class RestaurantModel
  {
    [Required]
    public Entities.Restaurant.Restaurant Restaurant { get; set; }

    [Required]
    public User User { get; set; }
  }
}
