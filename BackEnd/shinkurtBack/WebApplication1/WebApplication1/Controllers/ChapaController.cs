using Microsoft.AspNetCore.Mvc;
using System;
using ChapaNET;
using WebApplication1.Data;
using WebApplication1.Model.User;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapaController : Controller
    {
        Chapa chapa = new Chapa("CHASECK_TEST-UZgWOX2QgptKbnjcSi0TXRTHJmwByvLH");
        private readonly PremiumDbContext _dbContext;
        public ChapaController(PremiumDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }
        [Route("GetChapaListBank")]
        [HttpGet]
        public async Task<List<string>> GetChapaListBank()
        {
            var id = Chapa.GetUniqueRef();
            var banks = await chapa.GetBanksAsync();
            string retb = string.Join(',', banks.AsEnumerable());
            List<string> bankList = retb.Split(',').ToList();

            return bankList;
        }

        [Route("ChapaPay")]
        [HttpPost]
        public async Task<string> ChapaPay([FromBody] PremiumUser puser)
        {
            var Request = new ChapaRequest(
                 amount: puser.amount,
                 email: puser.Eamil,
                 firstName: puser.fName,
                 lastName: puser.lName,
                 tx_ref: puser.Id,
                 callback_url: "http://localhost:3000/chapa"
                );
            var Result = await chapa.RequestAsync(Request);
             var isValid = await chapa.VerifyAsync(puser.Id);
            if (Result.Status == "success")
            {
                var dbPrem = new PremiumUser
                {
                    Id = puser.Id,
                    Eamil = puser.Eamil,
                    fName = puser.fName,
                    lName = puser.lName,
                    amount = puser.amount,
                    isPaid = true
                };
                await _dbContext.premiumUsers.AddAsync(dbPrem);
                 _dbContext.SaveChanges();
              return Result.CheckoutUrl;
            }
            return Result.Message;
        }

    }
}
