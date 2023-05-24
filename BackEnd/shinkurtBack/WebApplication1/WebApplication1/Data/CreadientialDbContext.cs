using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace WebApplication1.Data
{
    public class CreadientialDbContext : IdentityDbContext
    {

        public CreadientialDbContext(DbContextOptions<CreadientialDbContext> options) : base(options)
        {
        }
       // public DbSet<User> Users { get; set; }
       // public DbSet<Login> logins { get; set; }


    }

}

