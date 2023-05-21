using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WebApplication1.Data;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Controllers
{
    public class CrudeOilController : ControllerBase
    {
        private readonly CommiditiesDbContext _dbContext;

        public CrudeOilController(CommiditiesDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Route("GetCrudeHistoryDate")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<DateOnly>>> GetCrudeHistoryDate()
        {
            var crudeHistoryNames = await _dbContext.crudeOilWTIs
                .Select(g => ParseDate(g.Date))
                .ToListAsync();

            var dateOnlyValues = crudeHistoryNames.Select(d => new DateOnly(d.Year, d.Month, d.Day));

            return Ok(dateOnlyValues);
        }
        [Route("GetCrudeHistoryAll")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<GoldHistory>>> GetCrudeHistoryAll()
        {
            var all = await _dbContext.crudeOilWTIs.ToListAsync();

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
