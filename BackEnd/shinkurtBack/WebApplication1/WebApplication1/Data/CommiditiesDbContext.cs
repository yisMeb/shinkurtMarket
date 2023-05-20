using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Reflection.Metadata;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PriceCommodities>(entity =>
            {
                // Set key for entity
                entity.HasKey(p => p.id);
            });

            base.OnModelCreating(modelBuilder);
        }


        public DbSet<PriceCommodities> PriceCommodity { get; set;}
    }
}
