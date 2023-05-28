using Microsoft.AspNetCore.Identity;
using WebApplication1.Model.User;
 
namespace WebApplication1.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;

        public UserRepository(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<IdentityResult> CreateUser(User usr)
        {
            var user = new IdentityUser()
            {
                Email = usr.Email,
                UserName = usr.UserName,
            };

            var result = await userManager.CreateAsync(user, usr.Password);
            return result;
        }

        public async Task<bool> Login(string userName, string password)
        {
            
                var user = await userManager.FindByNameAsync(userName);
                if (user != null)
                {
                    var signInResult = await signInManager.CheckPasswordSignInAsync(user, password, false);
                    return signInResult.Succeeded;
                }
                return false;
            
        }
        public async Task<User> GetUserByUsername(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user != null)
            {
                var userModel = new User
                {
                    UserName = user.UserName,
                    Email = user.Email
                };

                return userModel;
            }

            return null;
        }
        

    }

}
