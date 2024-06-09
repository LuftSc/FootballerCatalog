using FootballerCatalog.Core.Models;

namespace FootballerCatalog.DataAccess.Repositories
{
    public class FootballerRepository
    {
        private FootballerCatalogDbContext _context;
        public FootballerRepository(FootballerCatalogDbContext context)
        {
            _context = context;
        }

        public async Task<List<Footballer>> GetFootballers()
        {

        }
    }
}
