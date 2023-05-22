using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WebApplication1.Data;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Controllers
{
    public class OJuiceController : Controller
    {
        private readonly CommiditiesDbContext _dbContext;

        public OJuiceController(CommiditiesDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Route("GetOjuiceHistoryDate")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<DateOnly>>> GetOjuiceHistoryDate()
        {
            var OJHistoryNames = await _dbContext.orangeJuiceHistories
                .Select(g => ParseDate(g.Date))
                .ToListAsync();

            var dateOnlyValues = OJHistoryNames.Select(d => new DateOnly(d.Year, d.Month, d.Day));

            return Ok(dateOnlyValues);
        }
        [Route("GetOjuiceHistoryAll")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<GoldHistory>>> GetOjuiceHistoryAll()
        {
            var all = await _dbContext.orangeJuiceHistories.ToListAsync();

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
