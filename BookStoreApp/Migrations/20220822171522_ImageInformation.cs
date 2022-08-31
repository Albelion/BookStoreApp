using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStoreApp.Migrations
{
    public partial class ImageInformation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Picture",
                table: "Books",
                newName: "ImageName");

            migrationBuilder.AddColumn<int>(
                name: "Qty",
                table: "Ratings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Qty",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "ImageName",
                table: "Books",
                newName: "Picture");
        }
    }
}
