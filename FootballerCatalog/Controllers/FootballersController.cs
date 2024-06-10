using FootballerCatalog.API.Contracts;
using FootballerCatalog.Application.Services;
using FootballerCatalog.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace FootballerCatalog.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FootballersController : ControllerBase
    {
        private readonly IFootballersService _footballersService;

        public FootballersController(IFootballersService footballersService)
        {
            _footballersService = footballersService;
        }

        [HttpGet]
        public async Task<ActionResult<FootballersResponse>> GetFootballers()
        {
            var footballers = await _footballersService.GetAllFootballers();

            var response = footballers.Select(f => new FootballersResponse(f.Id,
                f.FirstName, f.LastName, f.Gender, f.BirthDate, f.Team, f.Country));

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateFootballer([FromBody] FootballersRequest request)
        {
            var (footballer, error) = Footballer.Create(
                Guid.NewGuid(),
                request.firstName,
                request.lastName,
                request.gender,
                request.birthDate,
                request.team,
                request.country
                );

            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(error);
            }

            var footballerId = await _footballersService.CreateFootballer(footballer);

            return Ok(footballerId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateFootballer(Guid id, [FromBody] FootballersRequest request)
        {
            var footballerId = await _footballersService.UpdateFootballer(id,
                request.firstName, request.lastName, request.gender,
                request.birthDate, request.team, request.country);

            return Ok(footballerId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteFootballer(Guid id)
        {
            return Ok(await _footballersService.DeleteFootballer(id));
        }
    }
}
