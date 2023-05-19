using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Data
{
    public class CommiditiesDbContext : DbContext 
    {
        public CommiditiesDbContext(DbContextOptions<CommiditiesDbContext> options): base(options)
        {
        }

        public DbSet<PriceCommodities> PriceCommodity { get; set;}
    }
}
