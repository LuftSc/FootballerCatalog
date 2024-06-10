using FootballerCatalog.Core.Models;
using FootballerCatalog.DataAccess.Repositories;

namespace FootballerCatalog.Application.Services
{
    public class FootballersService : IFootballersService
    {
        private readonly IFootballersRepository _footballersRepository;

        public FootballersService(IFootballersRepository footballersRepository)
        {
            _footballersRepository = footballersRepository;
        }

        public async Task<List<Footballer>> GetAllFootballers()
        {
            return await _footballersRepository.Get();
        }

        public async Task<Guid> CreateFootballer(Footballer footballer)
        {
            return await _footballersRepository.Create(footballer);
        }

        public async Task<Guid> UpdateFootballer(Guid id, string firstName, string lastName,
            string gender, DateOnly birthDate, string team, string country)
        {
            return await _footballersRepository.Update(id, firstName, lastName, gender,
                birthDate, team, country);
        }

        public async Task<Guid> DeleteFootballer(Guid id)
        {
            return await _footballersRepository.Delete(id);
        }
    }
}
