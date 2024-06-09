
namespace FootballerCatalog.DataAccess.Entities
{
    public class FootballerEntity
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public DateOnly BirthDate { get; set; }

        public string Team { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;
    }
}
