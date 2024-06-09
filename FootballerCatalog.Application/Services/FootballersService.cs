using FootballerCatalog.DataAccess.Repositories;

namespace FootballerCatalog.Application.Services
{
    public class FootballersService
    {
        private readonly IFootballersRepository _footballersRepository;

        public FootballersService(IFootballersRepository footballersRepository)
        {
            _footballersRepository = footballersRepository;
        }
    }
}
