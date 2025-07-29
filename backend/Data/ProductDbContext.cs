using System.Drawing;
using backend.Models.Domain;
using Microsoft.EntityFrameworkCore;


namespace backend.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<InventoryStatus> InventoryStatuses { get; set; }
        public DbSet<InventoryOperation> InventoryOperations { get; set; }

        public DbSet<ProductMaterial> ProductMaterials { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasOne(p => p.InventoryStatus).WithOne(i => i.Product).HasForeignKey<InventoryStatus>(s => s.ProductId);
            modelBuilder.Entity<Product>().HasOne(p => p.ProductMaterial).WithMany(m => m.Products).HasForeignKey(p => p.MaterialId);
            modelBuilder.Entity<Product>().HasOne(p => p.ProductType).WithMany(t => t.Products).HasForeignKey(p => p.TypeId);
            modelBuilder.Entity<Product>().HasOne(p => p.ProductSize).WithMany(t => t.Products).HasForeignKey(p => p.SizeId);
            modelBuilder.Entity<Product>().HasMany(p => p.InventoryOperations).WithOne(o => o.Product).HasForeignKey(o => o.ProductId);

            var materials = new List<ProductMaterial>
            {
                new ProductMaterial { Id = 1, Name = "Glass" },
                new ProductMaterial { Id = 2, Name = "Plastic" },
            };

            var sizes = new List<ProductSize>
             {
                new ProductSize { Id = 1, Name = "1 mL"},
                new ProductSize { Id = 2, Name = "10 mL"},
                new ProductSize { Id = 3, Name = "50 mL"},
                new ProductSize{ Id = 4, Name = "250 mL"},
                new ProductSize{ Id = 5, Name = "500 mL"},
                new ProductSize { Id = 6, Name = "1 L"}
             };

            var types = new List<ProductType>
             {
               new ProductType { Id = 1, Name = "Erlenmeyer Flask" },
               new ProductType { Id = 2, Name = "Dewar Flask" },
               new ProductType { Id = 3, Name = "Beaker" },
               new ProductType { Id = 4, Name = "Vial" }
             };

            var products = new List<Product>
                {
                    new Product
                    {
                        Id = Guid.Parse("b1a2b345-1111-4c7f-a111-1234567890ab"),
                        Name = "250 mL Glass Erlenmeyer Flask",
                        TypeId = 1,     // Erlenmeyer Flask
                        SizeId = 4,     // 250 mL
                        MaterialId = 1  // Glass
                    },
                    new Product
                    {
                        Id = Guid.Parse("b1a2b345-2222-4c7f-a222-1234567890ab"),
                        Name = "50 mL Plastic Vial",
                        TypeId = 4,     // Vial
                        SizeId = 3,     // 50 mL
                        MaterialId = 2  // Plastic
                    },
                    new Product
                    {
                        Id = Guid.Parse("b1a2b345-3333-4c7f-a333-1234567890ab"),
                        Name = "1 L Glass Dewar Flask",
                        TypeId = 2,     // Dewar Flask
                        SizeId = 6,     // 1 L
                        MaterialId = 1  // Glass
                    },
                    new Product
                    {
                        Id = Guid.Parse("b1a2b345-4444-4c7f-a444-1234567890ab"),
                        Name = "10 mL Plastic Beaker",
                        TypeId = 3,     // Beaker
                        SizeId = 2,     // 10 mL
                        MaterialId = 2  // Plastic
                    }
                };

            var inventoryStatus = new List<InventoryStatus>
            {
            new InventoryStatus
            {
                ProductId = Guid.Parse("b1a2b345-1111-4c7f-a111-1234567890ab"),
                Quantity = 30
            },
            new InventoryStatus
            {
                ProductId = Guid.Parse("b1a2b345-2222-4c7f-a222-1234567890ab"),
                Quantity = 20
            },
            new InventoryStatus
            {
                ProductId = Guid.Parse("b1a2b345-3333-4c7f-a333-1234567890ab"),
                Quantity = 30
            },
            new InventoryStatus
            {
                ProductId = Guid.Parse("b1a2b345-4444-4c7f-a444-1234567890ab"),
                Quantity = 10
            }

            };

            modelBuilder.Entity<ProductMaterial>().HasData(materials);
            modelBuilder.Entity<ProductSize>().HasData(sizes);
            modelBuilder.Entity<ProductType>().HasData(types);
            modelBuilder.Entity<Product>().HasData(products);
            modelBuilder.Entity<InventoryStatus>().HasData(inventoryStatus);
            modelBuilder.Entity<InventoryOperation>()
            .Property(o => o.Timestamp)
            .HasDefaultValueSql("GETUTCDATE()");

        }
    }

}