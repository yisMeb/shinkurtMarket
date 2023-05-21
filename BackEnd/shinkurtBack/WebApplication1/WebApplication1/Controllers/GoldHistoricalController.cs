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
        private readonly IConfiguration _configuration;

        public GoldHistoricalController(CommiditiesDbContext dbContext, IConfiguration configuratio)
        {
            _dbContext = dbContext;
            _configuration = configuratio;
        }
        [Route("GetGoldHistoryName")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult> GetGoldHistoryName(int i)
        {
            List<GoldHistory> priceCommodities = new List<GoldHistory>();
            List<GoldHistory> commodities = new List<GoldHistory>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/gold-historical-data");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            HtmlNodeCollection rows = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div/div[5]/div/div/div[3]/div/table/tbody/tr");

            if (rows.Count > 0)
            {
                GoldHistory[] p = new GoldHistory[rows.Count];
                priceCommodities = await _dbContext.GoldHistories.ToListAsync();
                _dbContext.GoldHistories.RemoveRange(priceCommodities);

                for (int j = 0; j < rows.Count; j++)
                {
                    p[j] = new GoldHistory(); // Initialize each element of the array
                }
                int k = 0;
                foreach (HtmlNode obj in rows)
                {
                    GoldHistory pcomm = new GoldHistory();
                    HtmlNodeCollection cells = obj.SelectNodes("td");
                    if (DateOnly.TryParse(cells[0].InnerText, out DateOnly time))
                    {
                        p[k].Date = time;
                    }
                    p[k].Price = cells[1].InnerText;
                    p[k].Open = cells[2].InnerText;
                    p[k].High = cells[3].InnerText;
                    p[k].Low = cells[4].InnerText;
                    p[k].Volume = cells[5].InnerText;
                    p[k].changePercentage = cells[6].InnerText;
                    commodities.Add(p[k]);
                    k++;
                }

            }
            else
            {
                return BadRequest("couldn't find the request 0");
            }
            foreach (GoldHistory pc in commodities)
            {
                await _dbContext.GoldHistories.AddAsync(pc);
            }
            await _dbContext.SaveChangesAsync();
            return Ok(commodities);
        }
    }
}