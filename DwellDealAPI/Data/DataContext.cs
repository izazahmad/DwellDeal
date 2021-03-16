using DwellDealAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DwellDealAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
            
        }
        public DbSet<City> Cities { get; set; }
        
    }
}