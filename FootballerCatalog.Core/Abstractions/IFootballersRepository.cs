//using FootballerCatalog.Core.Models;
using FootballerCatalog.Core.Models;

namespace FootballerCatalog.DataAccess.Repositories
{
    public interface IFootballersRepository
    {
        Task<Guid> Create(Footballer footballer);
        Task<Guid> Delete(Guid id);
        Task<List<Footballer>> Get();
        Task<Guid> Update(Guid id, string firstName, string lastName, string gender, DateOnly birthDate, string team, string country);
    }
}