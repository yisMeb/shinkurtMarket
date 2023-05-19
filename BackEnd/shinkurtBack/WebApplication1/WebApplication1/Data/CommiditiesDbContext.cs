using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Data
{
    public class CommiditiesDbContext : DbContext 
    {
        public CommiditiesDbContext(DbContextOptions<CommiditiesDbContext> options): base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
            // Configure other options for your DbContext
        }
        public DbSet<PriceCommodities> PriceCommodity { get; set;}
    }
}
