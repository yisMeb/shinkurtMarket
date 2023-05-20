using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public GoldHistoricalController(CommiditiesDbContext context, IConfiguration configuration)
        {
            _dbContext = context;
            _configuration = configuration;
        }

        [Route("GetGoldHistory")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult> GetGoldHistoy(int i)
        {
            List<GoldHistory> goldPice = new List<GoldHistory>();
            List<GoldHistory> Gold = new List<GoldHistory>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/gold-historical-data");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            HtmlNodeCollection rows = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div/div[5]/div/div/div[3]/div/table/tbody/tr");
            if (rows.Count > 0)
            {
                GoldHistory[] p = new GoldHistory[rows.Count];
                goldPice = await _dbContext.GoldHistories.ToListAsync();
                _dbContext.GoldHistories.RemoveRange(goldPice);

                for (int j = 0; j < rows.Count; j++)
                {
                    p[j] = new GoldHistory(); // Initialize each element of the array
                }
                int k = 0;
                foreach (HtmlNode obj in rows)
                {
                    GoldHistory pcomm = new GoldHistory();
                    HtmlNodeCollection cells = obj.SelectNodes("td");
                    p[k].Date = DateTime.Parse(cells[0].InnerText);
                    p[k].Price = double.Parse(cells[1].InnerText);
                    p[k].Open = double.Parse(cells[2].InnerText);
                    p[k].High = double.Parse(cells[3].InnerText);
                    p[k].Low = double.Parse(cells[4].InnerText);
                    p[k].Volume = cells[5].InnerText;
                    p[k].changePercentage = cells[6].InnerText;
                    Gold.Add(p[k]);
                    k++;
                }

            }
            else
            {
                return BadRequest("couldn't find the request 0");
            }
            foreach (GoldHistory pc in Gold)
            {
                await _dbContext.GoldHistories.AddAsync(pc);
            }
            await _dbContext.SaveChangesAsync();
            return Ok(Gold);
        }
    }
}
