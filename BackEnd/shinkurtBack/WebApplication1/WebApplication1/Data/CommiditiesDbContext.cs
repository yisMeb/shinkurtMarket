using CsvHelper.TypeConversion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Reflection.Metadata;
using WebApplication1.Model.Commodities;

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
        public DbSet<GoldHistory> GoldHistories { get; set; }
        public DbSet<PriceCommodities> PriceCommodity { get; set;}
        public DbSet<AluminiumHistory> aluminiumHistories { get; set;}
        public DbSet<BrentOilHistory> brentOilHistories { get; set;}
        public DbSet<CopperHistory> copperHistories { get; set;}
        public DbSet<CopperUkHistory> copperUkHistories { get; set;}
        public DbSet<CrudeOilWTIHistory> crudeOilWTIs { get; set;}
        public DbSet<FeederCattleHistory> feederCattleHistories { get; set;}
        public DbSet<GasolineHistory> gasolineHistories { get; set;}
        public DbSet<LiveCattleHistory> liveCattleHistories { get; set;}
        public DbSet<LondonCoffe> londonCoffes { get; set;}
        public DbSet<LumberHistory> lumberHistories { get; set;}
        public DbSet<NaturalGasHistory> naturalGasHistories { get; set;}
        public DbSet<OatsHistory> oatsHistories { get; set;}
        public DbSet<OrangeJuiceHistory> orangeJuiceHistories { get; set;}
        public DbSet<SilverHistory> silverHistories { get; set;}
        public DbSet<UsCornHistory> usCornHistories { get; set;}
        public DbSet<UsWheatHistory> usWheatHistories { get; set;}
        public DbSet<XAG_USD_history> xAG_USD_s { get; set;}
        public DbSet<ZincHistory> zincHistories { get; set;}
    }
}
