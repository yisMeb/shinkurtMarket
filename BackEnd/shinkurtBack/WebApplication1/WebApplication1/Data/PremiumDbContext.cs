using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Data
{
    public class PremiumDbContext : DbContext
    {
        public PremiumDbContext(DbContextOptions<PremiumDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);            
            modelBuilder.Entity<PremiumUser>().HasKey(p => p.Id);
        }
        public DbSet<PremiumUser> premiumUsers { get; set; }

    }
}
