using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class CommodityDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PriceCommodity",
                columns: table => new
                {
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Month = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Last = table.Column<double>(type: "float", nullable: true),
                    High = table.Column<double>(type: "float", nullable: true),
                    Low = table.Column<double>(type: "float", nullable: true),
                    Change = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangePercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceCommodity", x => x.Name);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PriceCommodity");
        }
    }
}
