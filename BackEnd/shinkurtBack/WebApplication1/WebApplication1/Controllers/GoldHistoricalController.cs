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

        ///Add
        [Route("PostGoldDataData")]
        [HttpPost]
        public async Task<IEnumerable<GoldHistory>> PostGoldDataData()
        {
            List<GoldHistory> hist = new List<GoldHistory>();
            hist= await _dbContext.GoldHistories.ToListAsync();
            int LastID = _dbContext.GoldHistories.Max(p => p.g_id);


            var web = new HtmlWeb();
            var doc = web.Load("https://www.investing.com/commodities/gold-historical-data");


            var historyNode = doc.DocumentNode.SelectNodes("//tbody/tr[1]");

            var HData = new List<GoldHistory>();

            if (historyNode != null)
            {
                foreach (var cryptoNode in historyNode)
                {
                    var Date = cryptoNode.SelectSingleNode(".//td[1]/time");
                    var Price = cryptoNode.SelectSingleNode(".//td[2]");
                    var Open = cryptoNode.SelectSingleNode(".//td[3]");
                    var High = cryptoNode.SelectSingleNode(".//td[4]");
                    var Low = cryptoNode.SelectSingleNode(".//td[5]");
                    var Vol = cryptoNode.SelectSingleNode(".//td[6]");
                    var Chng = cryptoNode.SelectSingleNode(".//td[7]");


                    var date = Date?.InnerText.Trim();
                    var price = Price?.InnerText.Trim();
                    var open = Open?.InnerText.Trim();
                    var high = High?.InnerText.Trim();
                    var low = Low?.InnerText.Trim();
                    var vol = Vol?.InnerText.Trim();
                    var chng = Chng?.InnerText.Trim();
         
                    if (!string.IsNullOrEmpty(date) && !string.IsNullOrEmpty(price) && !string.IsNullOrEmpty(open))
                    {
                        HData.Add(new GoldHistory
                        {
                            Date = date,
                            Price = price,
                            Open = open,
                            High=high,
                            Low=low,
                            Volume=vol,
                            changePercentage=chng
                        });
                        if (_dbContext.GoldHistories.Any(o => o.Date.Contains(date)))
                            throw new Exception("Record Already exists! TRY ADDING TOMMORROW ;)");
                    }
                }
                try { 
                foreach (GoldHistory pc in HData)
                {
                    await _dbContext.GoldHistories.AddAsync(pc);
                }
                }
                catch 
                {
                    throw new Exception();
                }
                _dbContext.SaveChanges();
            }
                return HData;
        }
        ///
    }
}