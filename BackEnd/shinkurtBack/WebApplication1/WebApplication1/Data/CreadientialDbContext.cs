using Microsoft.EntityFrameworkCore;
using WebApplication1.Model.Commodities;
using WebApplication1.Model.User;

namespace WebApplication1.Data
{
    public class CreadientialDbContext : DbContext
    {
    
        public CreadientialDbContext(DbContextOptions<CreadientialDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Login>()
                .HasNoKey()
                .ToTable("logins");
            modelBuilder.Entity<User>(entity =>
            {
                // Set key for entity
                entity.HasKey(p => p.UId);
            });

        }
        
         public DbSet<User> Users { get; set; }
         public DbSet<Login> logins { get; set; }
        
    }

}

