using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Data
{
    public class FavoriteDbContext : DbContext
    {

        public FavoriteDbContext(DbContextOptions<FavoriteDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            // Configure the foreign key relationship between MyModel and AspNetUsers
            modelBuilder.Entity<Favorite>()
           .HasKey(nameof(Favorite.email), nameof(Favorite.FavoriteName));
        }

        public DbSet<Favorite> favorites { get; set; }
    }
}
