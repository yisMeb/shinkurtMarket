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
            //PriceCommodities pcomm =new PriceCommodities();
            List<PriceCommodities> priceCommodities = new List<PriceCommodities>();

           //try
           {  
            List<PriceCommodities> commodities = new List<PriceCommodities>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
                HtmlNodeCollection rows = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr");
                //
                // 
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
                        p[k].Month = "Jul 23";//cells[1].InnerText;
                        p[k].Last = double.Parse(cells[2].InnerText);
                        p[k].High = double.Parse(cells[3].InnerText);
                        p[k].Low = double.Parse(cells[4].InnerText);
                        p[k].Change = cells[5].InnerText;
                        p[k].ChangePercentage = cells[6].InnerText;
                        //pcomm.Time = TimeOnly.Parse("14:20:05");
                        commodities.Add(p[k]);
                        k++;
                    }
                    /*
                     foreach (var item in HeaderNames)
                     {
                      pcomm.Name +=item.InnerText;
                        }

                  commodities.Add(pcomm);
                     */
                    ////FROM HERE
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
            //catch
            //{
            //    return BadRequest("couldn't find the request error occured");
            //}
        }


        [Route("GetScrappMonth")]
        [AcceptVerbs("GET")]
        public async Task<List<string>> GetScrappMonth()
        {
            List<string> Datalist = new List<string>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            var HeaderNames = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr/td[2]");
            foreach (var item in HeaderNames)
            {
                Datalist.Add(item.InnerText);
            }
            return Datalist;
        }
        [Route("GetScrappLast")]
        [AcceptVerbs("GET")]
        public async Task<List<string>> GetScrappLast()
        {
            List<string> Datalist = new List<string>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            var HeaderNames = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr/td[3]");
            foreach (var item in HeaderNames)
            {
                Datalist.Add(item.InnerText);
            }
            return Datalist;
        }
        [Route("GetScrappHigh")]
        [AcceptVerbs("GET")]
        public async Task<List<string>> GetScrappHigh()
        {
            List<string> Datalist = new List<string>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            var HeaderNames = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr/td[4]");
            foreach (var item in HeaderNames)
            {
                Datalist.Add(item.InnerText);
            }
            return Datalist;
        }
        [Route("GetScrappLow")]
        [AcceptVerbs("GET")]
        public async Task<List<string>> GetScrappLow()
        {
            List<string> Datalist = new List<string>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            var HeaderNames = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr/td[5]");
            foreach (var item in HeaderNames)
            {
                Datalist.Add(item.InnerText);
            }
            return Datalist;
        }
        [Route("GetScrappChange")]
        [AcceptVerbs("GET")]
        public async Task<List<string>> GetScrappChange()
        {
            List<string> Datalist = new List<string>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            var HeaderNames = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr/td[6]");
            foreach (var item in HeaderNames)
            {
                Datalist.Add(item.InnerText);
            }
            return Datalist;
        }
        [Route("GetScrappChangePercent")]
        [AcceptVerbs("GET")]
        public async Task<List<string>> GetScrappChangePercent()
        {
            List<string> Datalist = new List<string>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            var HeaderNames = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr/td[7]");
            foreach (var item in HeaderNames)
            {
                Datalist.Add(item.InnerText);
            }
            return Datalist;
        }
        [Route("GetScrappChangeTime")]
        [AcceptVerbs("GET")]
        public async Task<List<string>> GetScrappChangeTime()
        {
            List<string> Datalist = new List<string>();
            HttpClient hc = new HttpClient();
            HttpResponseMessage result = await hc.GetAsync($"https://www.investing.com/commodities/real-time-futures");
            Stream stream = await result.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            var HeaderNames = doc.DocumentNode.SelectNodes("//*[@id=\"__next\"]/div[2]/div/div/div[2]/main/div[3]/div[2]/table/tbody/tr/td[8]");
            foreach (var item in HeaderNames)
            {
                Datalist.Add(item.InnerText);
            }
            return Datalist;
        }

    }
}
