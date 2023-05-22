using Microsoft.AspNetCore.Identity;
using WebApplication1.Model.User;

namespace WebApplication1.Repo
{
    public interface IUserRepository
    {
        Task<IdentityResult> CreateUser(User user);
        Task<bool> Login(string userName, string password, string qrCode);
        Task<User> GetUserByUsername(string username);
    }
}
