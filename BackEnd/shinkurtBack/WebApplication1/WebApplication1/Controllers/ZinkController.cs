using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WebApplication1.Data;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Controllers
{
    public class ZinkController : Controller
    {
        private readonly CommiditiesDbContext _dbContext;

        public ZinkController(CommiditiesDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Route("GetZHistoryDate")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<DateOnly>>> GetZHistoryDate()
        {
            var ZHistoryNames = await _dbContext.zincHistories
                .Select(g => ParseDate(g.Date))
                .ToListAsync();

            var dateOnlyValues = ZHistoryNames.Select(d => new DateOnly(d.Year, d.Month, d.Day));

            return Ok(dateOnlyValues);
        }
        [Route("GetZHistoryAll")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult<IEnumerable<GoldHistory>>> GetZHistoryAll()
        {
            var all = await _dbContext.zincHistories.ToListAsync();

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
        [Route("PostZinkDataData")]
        [HttpPost]
        public async Task<IEnumerable<ZincHistory>> PostZinkDataData()
        {
            List<ZincHistory> hist = new List<ZincHistory>();
            hist = await _dbContext.zincHistories.ToListAsync();
            int LastID = _dbContext.zincHistories.Max(p => p.ZId);

            var web = new HtmlWeb();
            var doc = web.Load("https://www.investing.com/commodities/zinc-futures-historical-data?cid=956470");

            var historyNode = doc.DocumentNode.SelectNodes("//tbody/tr[1]");

            var HData = new List<ZincHistory>();

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
                        HData.Add(new ZincHistory
                        {
                            Date = d,
                            Price = p,
                            Open = o,
                            High = h,
                            Low = l,
                            Volume = vol,
                            changePercentage = chng
                        });
                        if (_dbContext.zincHistories.Any(o => o.Date.Contains(date)))
                            throw new Exception("Record Already exists! TRY ADDING TOMMORROW ;)");
                    }
                }
                try
                {
                    foreach (ZincHistory pc in HData)
                    {
                        await _dbContext.zincHistories.AddAsync(pc);
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
