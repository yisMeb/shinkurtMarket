using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class commodityHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "aluminiumHistories",
                columns: table => new
                {
                    al_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_aluminiumHistories", x => x.al_Id);
                });

            migrationBuilder.CreateTable(
                name: "brentOilHistories",
                columns: table => new
                {
                    brt_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_brentOilHistories", x => x.brt_Id);
                });

            migrationBuilder.CreateTable(
                name: "copperHistories",
                columns: table => new
                {
                    co_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_copperHistories", x => x.co_Id);
                });

            migrationBuilder.CreateTable(
                name: "copperUkHistories",
                columns: table => new
                {
                    cuk_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_copperUkHistories", x => x.cuk_Id);
                });

            migrationBuilder.CreateTable(
                name: "crudeOilWTIs",
                columns: table => new
                {
                    crd_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_crudeOilWTIs", x => x.crd_Id);
                });

            migrationBuilder.CreateTable(
                name: "feederCattleHistories",
                columns: table => new
                {
                    fd_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_feederCattleHistories", x => x.fd_Id);
                });

            migrationBuilder.CreateTable(
                name: "gasolineHistories",
                columns: table => new
                {
                    gasoline_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gasolineHistories", x => x.gasoline_Id);
                });

            migrationBuilder.CreateTable(
                name: "GoldHistory",
                columns: table => new
                {
                    GId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoldHistory", x => x.GId);
                });

            migrationBuilder.CreateTable(
                name: "liveCattleHistories",
                columns: table => new
                {
                    cattle_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_liveCattleHistories", x => x.cattle_Id);
                });

            migrationBuilder.CreateTable(
                name: "londonCoffes",
                columns: table => new
                {
                    lcoffee_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_londonCoffes", x => x.lcoffee_Id);
                });

            migrationBuilder.CreateTable(
                name: "lumberHistories",
                columns: table => new
                {
                    lumber_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lumberHistories", x => x.lumber_Id);
                });

            migrationBuilder.CreateTable(
                name: "naturalGasHistories",
                columns: table => new
                {
                    ngas_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_naturalGasHistories", x => x.ngas_Id);
                });

            migrationBuilder.CreateTable(
                name: "oatsHistories",
                columns: table => new
                {
                    oat_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_oatsHistories", x => x.oat_Id);
                });

            migrationBuilder.CreateTable(
                name: "orangeJuiceHistories",
                columns: table => new
                {
                    orange_d = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orangeJuiceHistories", x => x.orange_d);
                });

            migrationBuilder.CreateTable(
                name: "silverHistories",
                columns: table => new
                {
                    slv_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_silverHistories", x => x.slv_Id);
                });

            migrationBuilder.CreateTable(
                name: "usCornHistories",
                columns: table => new
                {
                    uscorn_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usCornHistories", x => x.uscorn_Id);
                });

            migrationBuilder.CreateTable(
                name: "usWheatHistories",
                columns: table => new
                {
                    usw_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usWheatHistories", x => x.usw_Id);
                });

            migrationBuilder.CreateTable(
                name: "xAG_USD_s",
                columns: table => new
                {
                    xagId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_xAG_USD_s", x => x.xagId);
                });

            migrationBuilder.CreateTable(
                name: "zincHistories",
                columns: table => new
                {
                    ZId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Open = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Volume = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    changePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_zincHistories", x => x.ZId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "aluminiumHistories");

            migrationBuilder.DropTable(
                name: "brentOilHistories");

            migrationBuilder.DropTable(
                name: "copperHistories");

            migrationBuilder.DropTable(
                name: "copperUkHistories");

            migrationBuilder.DropTable(
                name: "crudeOilWTIs");

            migrationBuilder.DropTable(
                name: "feederCattleHistories");

            migrationBuilder.DropTable(
                name: "gasolineHistories");

            migrationBuilder.DropTable(
                name: "GoldHistory");

            migrationBuilder.DropTable(
                name: "liveCattleHistories");

            migrationBuilder.DropTable(
                name: "londonCoffes");

            migrationBuilder.DropTable(
                name: "lumberHistories");

            migrationBuilder.DropTable(
                name: "naturalGasHistories");

            migrationBuilder.DropTable(
                name: "oatsHistories");

            migrationBuilder.DropTable(
                name: "orangeJuiceHistories");

            migrationBuilder.DropTable(
                name: "silverHistories");

            migrationBuilder.DropTable(
                name: "usCornHistories");

            migrationBuilder.DropTable(
                name: "usWheatHistories");

            migrationBuilder.DropTable(
                name: "xAG_USD_s");

            migrationBuilder.DropTable(
                name: "zincHistories");
        }
    }
}
