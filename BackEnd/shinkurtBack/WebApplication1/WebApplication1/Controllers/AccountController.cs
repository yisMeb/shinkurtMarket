using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Model.User;
using WebApplication1.Repo;

namespace WebApplication1.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserRepository iuserrepository;
        private readonly SignInManager<User> _signInManager;

        public AccountController(IUserRepository iuserrepository, SignInManager<User> signInManager)
        {
            this.iuserrepository = iuserrepository;
            _signInManager = signInManager;
        }
      
        [HttpPost]
        public async Task<IActionResult> SignUp(User signupModel)
        {
            if (ModelState.IsValid)
            {
                var result = await iuserrepository.CreateUser(signupModel);
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    return View(signupModel);
                }
                ModelState.Clear();
            }
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(Login loginModel)
        {  
            if (ModelState.IsValid)
            {
                    var result = await _signInManager.PasswordSignInAsync(loginModel.UserName, loginModel.Password, false, false);

                    if (result.Succeeded)
                    {
                        return Ok("Logged in successfully!");
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    }
              }

         return BadRequest(ModelState);
        }
    }
    
}
