using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Model;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptoController : Controller
    {
        private readonly cryptoDbContext _dbContext;
        private readonly HttpClient _httpClient;

        public CryptoController(cryptoDbContext dbContext, IHttpClientFactory httpClientFactory)
        {
            _dbContext = dbContext;
            _httpClient = httpClientFactory.CreateClient();
        }
        ///Add
            [HttpGet]
            public async Task<IEnumerable<crypto>> GetCryptoData()
            {
                var cryptoDataList = new List<crypto>();
                List<crypto> cr = new List<crypto>();
                cr = await _dbContext.crypt.ToListAsync();
               _dbContext.crypt.RemoveRange(cr);
            //reset our Id to start from 1
            string tableName = "crypt";
            string resetQuery = $"DBCC CHECKIDENT ('{tableName}', RESEED, 0);";
            _dbContext.Database.ExecuteSqlRaw(resetQuery);

            var url = "https://www.coingecko.com/";

                var web = new HtmlWeb();
                var doc = web.Load(url);

                var rows = doc.DocumentNode.SelectNodes("//tr");

                foreach (var row in rows.Skip(1)) // Skip header row
                {
                    var columns = row.SelectNodes("td");

                    var n = columns[2].InnerText.Trim();
                    var p = columns[3].InnerText.Trim();
                    var one1hr = columns[4].InnerText.Trim();
                    var day24hr = columns[5].InnerText.Trim();
                    var vol = columns[7].InnerText.Trim();
                    var mcap = columns[8].InnerText.Trim();
                                         
                    var cryptoData = new crypto
                    {
                         name=n,
                         price=p,
                         hour= one1hr,
                         day= day24hr,
                         marketCap=mcap,
                         Volume=vol
                    };

                    cryptoDataList.Add(cryptoData);
                }
            foreach (crypto pc in cryptoDataList)
            {
                await _dbContext.crypt.AddAsync(pc);
            }
            await _dbContext.SaveChangesAsync();
            return cryptoDataList;
            }
        }
        /////
}
