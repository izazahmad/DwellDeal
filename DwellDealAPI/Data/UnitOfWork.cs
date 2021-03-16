using System.Threading.Tasks;
using DwellDealAPI.Data.Repo;
using DwellDealAPI.interfaces;
using DwellDealAPI.Interfaces;

namespace DwellDealAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public ICityRepository CityRepository =>
                new CityRepository(dc);

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}