namespace FootballerCatalog.API.Contracts
{
    public record FootballersResponse(Guid id, string firstName, string lastName, 
        string gender, DateOnly birthDate, string team, string country)
    {
    }

    
}
