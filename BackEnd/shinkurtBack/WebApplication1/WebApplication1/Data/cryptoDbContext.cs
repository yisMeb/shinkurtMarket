using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;
using WebApplication1.Model.Commodities;

namespace WebApplication1.Data
{
    public class cryptoDbContext : DbContext
    {

        public cryptoDbContext(DbContextOptions<cryptoDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<crypto>(entity =>
            {
                // Set key for entity
                entity.HasKey(p => p.id);
            });
            base.OnModelCreating(modelBuilder);

        }
        public DbSet<crypto> crypt { get; set; }

    }

}
