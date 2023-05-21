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

        public GoldHistoricalController(CommiditiesDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Route("GetGoldHistoryDate")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<DateOnly>>> GetGoldHistoryDate()
        {
            var goldHistoryNames = await _dbContext.GoldHistories
                .Select(g => ParseDate(g.Date))
                .ToListAsync();

            var dateOnlyValues = goldHistoryNames.Select(d => new DateOnly(d.Year, d.Month, d.Day));

            return Ok(dateOnlyValues);
        }
        [Route("GetGoldHistoryAll")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<GoldHistory>>> GetGoldHistoryAll()
        {
            var all = await _dbContext.GoldHistories.ToListAsync();

            return Ok(all);
        }

        private static DateTime ParseDate(string dateString)
        {
            var formats = new[] { "M/d/yyyy", "d/M/yyyy", "dd/MM/yyyy" };
            foreach (var format in formats)
            {
                if (DateTime.TryParseExact(dateString, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out var result))
                    return result.Date;
            }

            throw new FormatException($"String '{dateString}' was not recognized as a valid date.");
        }
    }
}