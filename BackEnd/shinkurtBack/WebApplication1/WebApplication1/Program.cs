using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Globalization;
using WebApplication1.Data;


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
builder.Services.AddDbContext<cryptoDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("Conn")));
builder.Services.AddHttpClient();

//localization
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

var supportedCultures = new[]
{
    new CultureInfo("en-US"),
    new CultureInfo("am-ET"),
    // Add more supported cultures as needed
};

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.DefaultRequestCulture = new RequestCulture("en-US");
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;
});

var provider = builder.Services.BuildServiceProvider();
var configuration=provider.GetService<IConfiguration>();

builder.Services.AddIdentity<IdentityUser, IdentityRole>(config =>
{
    config.Password.RequiredLength = 3;
    config.Password.RequireDigit = false;
    config.Password.RequireNonAlphanumeric = false;
    config.Password.RequireUppercase = false;

}).AddEntityFrameworkStores<CreadientialDbContext>();

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
var localizationOptions = app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>();
app.UseRequestLocalization(localizationOptions.Value);

app.UseHttpsRedirection();
app.UseCors();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
