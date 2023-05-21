using CsvHelper;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;
using System.Globalization;
using WebApplication1.Data;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoldHistoricalController : ControllerBase
    {
        private readonly CommiditiesDbContext _dbContext;
            public GoldHistoricalController(CommiditiesDbContext dbContext )
            {
                _dbContext = dbContext;
                
            }

            [HttpPost("insert-csv")]
            public IActionResult InsertDataFromCsv(IFormFile file)
            {
                if (file == null || file.Length <= 0)
                    return BadRequest("No file uploaded.");

                try
                {
                    using (var reader = new StreamReader(file.OpenReadStream()))
                    using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                    {
                        var records = csv.GetRecords<GoldHistory>().ToList();

                       _dbContext.GoldHistories.AddRange(records);
                        _dbContext.SaveChanges();

                        return Ok(records);
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"An error occurred while inserting data: {ex.Message}");
                }
            }
        }
}