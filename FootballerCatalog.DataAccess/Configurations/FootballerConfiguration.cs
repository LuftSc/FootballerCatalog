using FootballerCatalog.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FootballerCatalog.DataAccess.Configurations
{
    public class FootballerConfiguration : IEntityTypeConfiguration<FootballerEntity>
    {
        public void Configure(EntityTypeBuilder<FootballerEntity> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(f => f.FirstName).IsRequired();
            builder.Property(f => f.LastName).IsRequired();
            builder.Property(f => f.Gender).IsRequired();
            builder.Property(f => f.BirthDate).IsRequired();
            builder.Property(f => f.Team).IsRequired();
            builder.Property(f => f.Country).IsRequired();
        }
    }
}
