using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using DwellDealAPI.Models;

namespace DwellDealAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        public CityController()
        {
        }

        [HttpGet("")]
        public IEnumerable<string> Getstrings()
        {
            return new string[] { "Loughbrough","London","Leiceter","Manchester"};
        }
    }
}