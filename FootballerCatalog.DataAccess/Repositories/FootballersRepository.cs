using FootballerCatalog.Core.Models;
using FootballerCatalog.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace FootballerCatalog.DataAccess.Repositories
{
    public class FootballersRepository : IFootballersRepository
    {
        private FootballerCatalogDbContext _context;
        public FootballersRepository(FootballerCatalogDbContext context)
        {
            _context = context;
        }

        public async Task<List<Footballer>> Get()
        {
            var footballersEntities = await _context.Footballers
                .AsNoTracking()
                .ToListAsync();

            var footballers = footballersEntities
                .Select(f => Footballer.Create(f.Id, f.FirstName, f.LastName, f.Gender, f.BirthDate, f.Team, f.Country).Footballer)
                .ToList();

            return footballers;
        }

        public async Task<Guid> Create(Footballer footballer)
        {
            var footballerEntity = new FootballerEntity
            {
                Id = footballer.Id,
                FirstName = footballer.FirstName,
                LastName = footballer.LastName,
                Gender = footballer.Gender,
                BirthDate = footballer.BirthDate,
                Team = footballer.Team,
                Country = footballer.Country,
            };

            await _context.Footballers.AddAsync(footballerEntity);
            await _context.SaveChangesAsync();

            return footballerEntity.Id;
        }

        public async Task<Guid> Update(Guid id, string firstName, string lastName,
            string gender, DateOnly birthDate, string team, string country)
        {
            await _context.Footballers
                .Where(f => f.Id == id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(f => f.FirstName, f => firstName)
                    .SetProperty(f => f.LastName, f => lastName)
                    .SetProperty(f => f.Gender, f => gender)
                    .SetProperty(f => f.BirthDate, f => birthDate)
                    .SetProperty(f => f.Team, f => team)
                    .SetProperty(f => f.Country, f => country));

            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.Footballers
                .Where(f => f.Id == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
