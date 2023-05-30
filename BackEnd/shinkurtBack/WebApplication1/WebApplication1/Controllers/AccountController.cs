using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Model.User;
using WebApplication1.Repo;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text;
using System.IO;

namespace WebApplication1.Controllers
{
    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> signInManager;
        public readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly CreadientialDbContext _dbContext;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, CreadientialDbContext dbContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            _dbContext = dbContext;
        }
      
       // [HttpPost]
        [Route("SignUp")]
        [AcceptVerbs("POST")]
        public async Task<IActionResult> SignUp([FromBody] User signupModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await userManager.FindByEmailAsync(signupModel.Email);
            if (user != null)
            {
                TempData["Error"] = "This Email Address is already in Use";
                return BadRequest(ModelState);
            }
            var newUser = new IdentityUser
            {
                UserName = signupModel.Email,
                Email = signupModel.Email
            };
            var result = await userManager.CreateAsync(newUser, signupModel.Password);
            if (result.Succeeded)
                return Ok("SignedUp successfully!");
            return BadRequest(ModelState);

        }
       // [HttpPost]
        [Route("Login")]
        [AcceptVerbs("POST")]
        public async Task<IActionResult> Login([FromBody] Login loginModel)
        {
            
            string returnUrl = HttpContext.Request.Query["returnUrl"];

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await userManager.FindByEmailAsync(loginModel.Email);
            if (user != null)
            {
                var passwordCheck = await userManager.CheckPasswordAsync(user, loginModel.Password);
                if (passwordCheck)
                {
                    var result = await signInManager.PasswordSignInAsync(user, loginModel.Password, false ,false);
                    if (result.Succeeded)
                    {
                        return Ok(
                            new { token = "your-auth-token", user=user}
                        );
                    }
                }
                TempData["Message"] = "Wrong Credential, Please, try again";
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }
            TempData["Message"] = "Wrong Credential, Please, try again";
            return BadRequest(ModelState);
          
        }
        [Route("Logout")]
        [AcceptVerbs("POST")]
        public async Task<IActionResult> LoginOut()
        {
            await signInManager.SignOutAsync();
            return Ok("Logged Out");
        }
    }
    
}
