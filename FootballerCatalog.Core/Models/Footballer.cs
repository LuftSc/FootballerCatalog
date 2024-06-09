namespace FootballerCatalog.Core.Models
{
    public class Footballer
    {
        public static readonly string[] ALLOWED_COUNTRIES = { "Россия", "США", "Италия" };
        private Footballer(Guid id, string firstName, string lastName, string gender, 
            DateTime birthDate, string team, string country)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Gender = gender;
            BirthDate = birthDate;
            Team = team;
            Country = country;
        }
        public Guid Id { get;}

        public string FirstName { get; } = string.Empty;

        public string LastName { get; } = string.Empty;

        public string Gender { get; } = string.Empty;

        public DateTime BirthDate { get; }

        public string Team { get; } = string.Empty;

        public string Country { get; } = string.Empty;

        public static (Footballer footballer, string Error) Create(Guid id, string firstName, 
            string lastName, string gender,DateTime birthDate, string team, string country)
        {
            var error = String.Empty;

            if (string.IsNullOrEmpty(country) || !ALLOWED_COUNTRIES.Any(country.Contains))
            {
                error = "country can only be (Россия, США, Италия)";
            }

            var footballer = new Footballer(id, firstName, lastName, gender, birthDate, team, country);

            return (footballer, error);
        }
    }
}
