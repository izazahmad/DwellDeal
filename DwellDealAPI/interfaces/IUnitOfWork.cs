using System.Threading.Tasks;
using DwellDealAPI.Interfaces;

namespace DwellDealAPI.interfaces
{
    public interface IUnitOfWork
    {
         ICityRepository CityRepository { get; }
         Task<bool> SaveAsync();
    }
}