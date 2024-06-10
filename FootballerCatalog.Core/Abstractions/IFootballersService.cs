using FootballerCatalog.Core.Models;

namespace FootballerCatalog.Application.Services
{
    public interface IFootballersService
    {
        Task<Guid> CreateFootballer(Footballer footballer);
        Task<Guid> DeleteFootballer(Guid id);
        Task<List<Footballer>> GetAllFootballers();
        Task<Guid> UpdateFootballer(Guid id, string firstName, string lastName, string gender, DateOnly birthDate, string team, string country);
    }
}