using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ProductwithuniqueKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductMaterials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductMaterials", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductSizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    SizeId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_ProductMaterials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "ProductMaterials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_ProductSizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "ProductSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_ProductTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "ProductTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InventoryOperations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    QuantityChange = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryOperations_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InventoryStatuses",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryStatuses", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_InventoryStatuses_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ProductMaterials",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Glass" },
                    { 2, "Plastic" }
                });

            migrationBuilder.InsertData(
                table: "ProductSizes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "1 mL" },
                    { 2, "10 mL" },
                    { 3, "50 mL" },
                    { 4, "250 mL" },
                    { 5, "500 mL" },
                    { 6, "1 L" }
                });

            migrationBuilder.InsertData(
                table: "ProductTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Erlenmeyer Flask" },
                    { 2, "Dewar Flask" },
                    { 3, "Beaker" },
                    { 4, "Vial" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "MaterialId", "Name", "SizeId", "TypeId" },
                values: new object[,]
                {
                    { new Guid("b1a2b345-1111-4c7f-a111-1234567890ab"), 1, "250 mL Glass Erlenmeyer Flask", 4, 1 },
                    { new Guid("b1a2b345-2222-4c7f-a222-1234567890ab"), 2, "50 mL Plastic Vial", 3, 4 },
                    { new Guid("b1a2b345-3333-4c7f-a333-1234567890ab"), 1, "1 L Glass Dewar Flask", 6, 2 },
                    { new Guid("b1a2b345-4444-4c7f-a444-1234567890ab"), 2, "10 mL Plastic Beaker", 2, 3 }
                });

            migrationBuilder.InsertData(
                table: "InventoryStatuses",
                columns: new[] { "ProductId", "Quantity" },
                values: new object[,]
                {
                    { new Guid("b1a2b345-1111-4c7f-a111-1234567890ab"), 30 },
                    { new Guid("b1a2b345-2222-4c7f-a222-1234567890ab"), 20 },
                    { new Guid("b1a2b345-3333-4c7f-a333-1234567890ab"), 30 },
                    { new Guid("b1a2b345-4444-4c7f-a444-1234567890ab"), 10 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_InventoryOperations_ProductId",
                table: "InventoryOperations",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_MaterialId",
                table: "Products",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SizeId",
                table: "Products",
                column: "SizeId");

            migrationBuilder.CreateIndex(
                name: "UX_Product_Attribute",
                table: "Products",
                columns: new[] { "TypeId", "SizeId", "MaterialId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InventoryOperations");

            migrationBuilder.DropTable(
                name: "InventoryStatuses");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "ProductMaterials");

            migrationBuilder.DropTable(
                name: "ProductSizes");

            migrationBuilder.DropTable(
                name: "ProductTypes");
        }
    }
}
