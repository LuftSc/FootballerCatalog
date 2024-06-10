using FootballerCatalog.Application.Services;
using FootballerCatalog.DataAccess;
using FootballerCatalog.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FootballerCatalog
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<FootballerCatalogDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(FootballerCatalogDbContext)));
            });

            builder.Services.AddScoped<IFootballersService, FootballersService>();
            builder.Services.AddScoped<IFootballersRepository, FootballersRepository>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
