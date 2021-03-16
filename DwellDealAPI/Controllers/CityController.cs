//using System;
//using System.Collections.Generic;
//using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DwellDealAPI.Dtos;
using DwellDealAPI.interfaces;
//using DwellDealAPI.Data;
using DwellDealAPI.Interfaces;
using DwellDealAPI.Models;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using DwellDealAPI.Models;

namespace DwellDealAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        //private readonly DataContext dc;
        //private readonly ICityRepository repo;
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(/* DataContext dc, ICityRepository repo*/IUnitOfWork uow, IMapper mapper)
        {
            //this.repo = repo;
            this.uow = uow;
            this.mapper = mapper;
            //this.dc = dc;
        }
        // GET api/city
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            //var cities= await dc.Cities.ToListAsync();
            var cities= await uow.CityRepository.GetCitiesAsync();

            //Manualy mapping entities and dto
            // var citiesDto = from c in cities
            // select new CityDto()
            // {
            //     Id=c.Id,
            //     Name=c.Name
            // };

            //Automapper
            var citiesDto= mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(citiesDto);
        }
        //Insert single string value like city name
        // POST api/city/add?cityname=Nottingham
        /*[HttpPost("add")]
        // POST api/city/add/Wigston
        [HttpPost("add/{cityname}")]
        public async Task<IActionResult> AddCity(string cityName)
        {
            City city= new City();
            city.Name=cityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }*/
        //Insert Multiple value through object(JSON Format data)
        /*
            POST->http://localhost:5000/api/city/post
            Select 'body' at below options
            select 'row' at below options
            with row select JSON at the end
            now enter {"name": "Bristol"} at below box
        */
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto citydto)
        {
            //Manually mapping
            // var city = new City {
            //     Name = citydto.Name,
            //     LastUpdatedBy=1,
            //     LastUpdatedOn= DateTime.Now
            // };
            //Auto mapper (reverse)
            var city = mapper.Map<City>(citydto);
            // other properties which is not in source
            city.LastUpdatedBy=1;
            city.LastUpdatedOn= DateTime.Now;
            //await dc.Cities.AddAsync(city);
            //await dc.SaveChangesAsync();
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            // var city = await dc.Cities.FindAsync(id);
            // dc.Cities.Remove(city);
            // await dc.SaveChangesAsync();
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}