using FootballerCatalog.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace FootballerCatalog.DataAccess
{
    public class FootballerCatalogDbContext : DbContext
    {
        public FootballerCatalogDbContext(DbContextOptions<FootballerCatalogDbContext> options)
            : base(options)
        {  
        }
        public DbSet<FootballerEntity> Footballers { get; set; }
    }
}
