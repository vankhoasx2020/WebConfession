using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebConfession.Migrations
{
    public partial class AddCfsDbo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cfs",
                columns: table => new
                {
                    ConfessionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConfessionSendTime = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ConfessionSender = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ConfessionRecipient = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ConfessionContent = table.Column<string>(type: "ntext", nullable: false),
                    ConfessionImg = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    ConfessionAproved = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cfs", x => x.ConfessionId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cfs");
        }
    }
}
