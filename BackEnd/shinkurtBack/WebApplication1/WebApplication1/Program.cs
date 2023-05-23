using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CommiditiesDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("Conn")));
builder.Services.AddDbContext<CreadientialDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("Conn")));

var provider= builder.Services.BuildServiceProvider();
var configuration=provider.GetService<IConfiguration>();

builder.Services.AddCors(options =>
{

    var frontendUrl = configuration.GetValue<string>("frontend_url");

    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontendUrl).AllowAnyMethod().AllowAnyHeader();
    });

});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
