using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Model;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Controllers
{
    public class CryptoController : Controller
    {
        private readonly cryptoDbContext _dbContext;
        private readonly HttpClient _httpClient;

        public CryptoController(cryptoDbContext dbContext, IHttpClientFactory httpClientFactory)
        {
            _dbContext = dbContext;
            _httpClient = httpClientFactory.CreateClient();
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36");
        }
        ///Add
        [Route("GetCryptoData")]
            [HttpGet]
        public async Task<IActionResult> GetCryptoData()
        {
            try
            {
                string url = "https://coinmarketcap.com/";
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Failed to retrieve data from CoinMarketCap.");
                }
                List<crypto> cr = new List<crypto>();
                cr = await _dbContext.crypt.ToListAsync();
                _dbContext.crypt.RemoveRange(cr);
                //reset our Id to start from 1
                string tableName = "crypt";
                string resetQuery = $"DBCC CHECKIDENT ('{tableName}', RESEED, 0);";
                _dbContext.Database.ExecuteSqlRaw(resetQuery);
                var content = await response.Content.ReadAsStringAsync();
                 var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(content);

                if (htmlDocument.DocumentNode == null)
                {
                    return StatusCode(500, "Failed to parse HTML content from CoinMarketCap.");
                }
                var cryptoList = new List<crypto>();

                var tableRows = htmlDocument.DocumentNode.SelectNodes("//table[contains(@class, 'cmc-table')]/tbody/tr")
                    ?.Take(100);
                Console.WriteLine($"Number of rows found: {tableRows?.Count()}");

                foreach (var row in tableRows)
                {
                    var columns = row.SelectNodes("td");
                    if (columns == null || columns.Count < 8) // Adjusted to check for at least 8 columns
                    {
                        continue; // Skip incomplete rows
                    }

                    var crypto = new crypto
                    {
                        name = columns[2].InnerText.Trim(),
                        price = columns[3].InnerText.Trim(),
                        hour = columns[4].InnerText.Trim(),
                        day = columns[5].InnerText.Trim(),
                        marketCap = columns[7].InnerText.Trim(),
                        Volume = columns[8].InnerText.Trim()
                    };

                    cryptoList.Add(crypto);
                }
                foreach (crypto pc in cryptoList)
                {
                    await _dbContext.crypt.AddAsync(pc);
                }
                _dbContext.SaveChanges();
                return Ok(cryptoList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while scraping data: {ex.Message}");
            }
        }
        }
        /////
}
