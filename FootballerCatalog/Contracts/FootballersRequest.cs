namespace FootballerCatalog.API.Contracts
{
    public record FootballersRequest(string firstName, string lastName,
        string gender, DateOnly birthDate, string team, string country)
    {
    }
}
