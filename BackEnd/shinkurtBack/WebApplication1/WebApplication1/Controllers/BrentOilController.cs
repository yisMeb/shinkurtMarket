using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WebApplication1.Data;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Controllers
{
    public class BrentOilController : ControllerBase
    {

        private readonly CommiditiesDbContext _dbContext;

        public BrentOilController(CommiditiesDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Route("GetBrentHistoryDate")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<DateOnly>>> GetBrentHistoryDate()
        {
            var BrentHistoryNames = await _dbContext.brentOilHistories
                .Select(g => ParseDate(g.Date))
                .ToListAsync();

            var dateOnlyValues = BrentHistoryNames.Select(d => new DateOnly(d.Year, d.Month, d.Day));

            return Ok(dateOnlyValues);
        }
        [Route("GetBrentHistoryAll")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<GoldHistory>>> GetBrentHistoryAll()
        {
            var all = await _dbContext.brentOilHistories.ToListAsync();

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
        [Route("PostBrentDataData")]
        [HttpPost]
        public async Task<IEnumerable<BrentOilHistory>> PostBrentDataData()
        {
            List<BrentOilHistory> hist = new List<BrentOilHistory>();
            hist = await _dbContext.brentOilHistories.ToListAsync();
            int LastID = _dbContext.brentOilHistories.Max(p => p.brt_Id);


            var web = new HtmlWeb();
            var doc = web.Load("https://www.investing.com/commodities/brent-oil-historical-data");


            var historyNode = doc.DocumentNode.SelectNodes("//tbody/tr[1]");

            var HData = new List<BrentOilHistory>();

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
                    var d = Convert.ToDateTime(date).ToString("dd/MM/yyyy");

                    var price = Price?.InnerText.Trim();
                    var p = price.Replace(",", "");
                    var open = Open?.InnerText.Trim();
                    var o = open.Replace(",", "");
                    var high = High?.InnerText.Trim();
                    var h = high.Replace(",", "");
                    var low = Low?.InnerText.Trim();
                    var l = low.Replace(",", "");
                    var vol = Vol?.InnerText.Trim();
                    var chng = Chng?.InnerText.Trim();

                    if (!string.IsNullOrEmpty(date) && !string.IsNullOrEmpty(price) && !string.IsNullOrEmpty(open))
                    {
                        HData.Add(new BrentOilHistory
                        {
                            Date = d,
                            Price = p,
                            Open = o,
                            High = h,
                            Low = l,
                            Volume = vol,
                            changePercentage = chng
                        });
                        if (_dbContext.brentOilHistories.Any(o => o.Date.Contains(date)))
                            throw new Exception("Record Already exists! TRY ADDING TOMMORROW ;)");
                    }
                }
                try
                {
                    foreach (BrentOilHistory pc in HData)
                    {
                        await _dbContext.brentOilHistories.AddAsync(pc);
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
        /////
    }
}
