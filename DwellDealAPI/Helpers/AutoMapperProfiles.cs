using AutoMapper;
using DwellDealAPI.Dtos;
using DwellDealAPI.Models;

namespace DwellDealAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
        }
        
    }
}