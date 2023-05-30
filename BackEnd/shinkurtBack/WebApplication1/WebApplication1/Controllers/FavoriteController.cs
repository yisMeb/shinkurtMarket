using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using WebApplication1.Data;
using WebApplication1.Model;
using WebApplication1.Model.User;

namespace WebApplication1.Controllers
{
    public class FavoriteController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly FavoriteDbContext _dbContext;

        public FavoriteController(UserManager<IdentityUser> userManager, FavoriteDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [Route("Favorite")]
        [AcceptVerbs("POST")]
        public async Task<IActionResult> Favorite([FromBody] Favorite FavModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newFavorite = new Favorite
            {
                FavoriteName = FavModel.FavoriteName,
                email = FavModel.email
            };

            await _dbContext.favorites.AddAsync(newFavorite);
            await _dbContext.SaveChangesAsync();

            return Ok("Added successfully!");
        }
        [Route("FavoriteNames")]
        [AcceptVerbs("POST")]
        public async Task<IActionResult> FavoriteNames([FromBody] Favorite FavModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var users = await _dbContext.favorites.Where(f => f.email == FavModel.email).ToListAsync();
            if (users.Count == null)
                return BadRequest("email not found");
            //select a favoritename column from the data base with same email
            List<string> favoriteNames = users.Select(u => u.FavoriteName).ToList();

            return Ok(favoriteNames);
        }
        [Route("FavoriteRemove")]
        [HttpPost]
        public async Task<IActionResult> FavoriteRemove([FromBody] Favorite FavModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var favorite = await _dbContext.favorites.FirstOrDefaultAsync(fav => fav.email == FavModel.email);
            var favname= await _dbContext.favorites.FirstOrDefaultAsync(fn=>fn.FavoriteName == FavModel.FavoriteName);

            if (favorite == null && favname==null)
            {
                return BadRequest("Email not found");
            }

            _dbContext.favorites.Remove(favname);
            await _dbContext.SaveChangesAsync();

            return Ok("Successfully removed");
        }


    }
}
