using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections;
using System.Linq;
using WebApplication1.Data;
using WebApplication1.Model;
using static Azure.Core.HttpHeader;

namespace WebApplication1.Controllers
{
     

    [Route("api/[controller]")]
    [ApiController]
    public class ScrappingPriceController : ControllerBase
    {
        private readonly CommiditiesDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public ScrappingPriceController(CommiditiesDbContext context, IConfiguration configuration)
        {
            _dbContext = context;
            _configuration = configuration;
        }

        [Route("GetScrappName")]
        [AcceptVerbs("GET")]
        public async Task<ActionResult> GetScrappName(int i)
        {
            List<PriceCommodities> priceCommodities = new List<PriceCommodities>(); 
            List<PriceCommodities> commodities = new List<PriceCommodities>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            HtmlNodeCollection rows = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr");
                
                if (rows.Count > 0 ) {
                    PriceCommodities[] p = new PriceCommodities[rows.Count];
                    
                    for (int j = 0; j < rows.Count; j++)
                    {
                        p[j] = new PriceCommodities(); // Initialize each element of the array
                    }
                    int k = 0;
                    foreach (HtmlNode obj in rows)
                    {
                        
                        PriceCommodities pcomm = new PriceCommodities();
                        HtmlNodeCollection cells = obj.SelectNodes("td");
                        p[k].Name  = cells[0].InnerText;
                        p[k].Month = cells[1].InnerText;
                        p[k].Last = double.Parse(cells[2].InnerText);
                        p[k].High = double.Parse(cells[3].InnerText);
                        p[k].Low = double.Parse(cells[4].InnerText);
                        p[k].Change = cells[5].InnerText;
                        p[k].ChangePercentage = cells[6].InnerText;
                        if (TimeOnly.TryParse(cells[7].InnerText, out TimeOnly time))
                        {
                           p[k].Time= time;
                        }
                        else
                        {
                          p[k].Time = null;
                        }
                        commodities.Add(p[k]);
                       k++;
                    }
                     
                }
                else
                {
                    return BadRequest("couldn't find the request 0");
                }
                foreach (PriceCommodities pc in commodities)
                {
                    await _dbContext.PriceCommodity.AddAsync(pc);
                }
                    await _dbContext.SaveChangesAsync();
               return Ok(commodities);
        }
    }
}
