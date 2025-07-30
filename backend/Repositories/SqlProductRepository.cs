using backend.Data;
using backend.Models.Domain;
using backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SqlProductRepository : IProductRepository
    {
        private readonly ProductDbContext _context;

        public SqlProductRepository(ProductDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products
                                .Include(p => p.ProductType)
                                .Include(p => p.ProductSize)
                                .Include(p => p.ProductMaterial)
                                .Include(p => p.InventoryStatus)
                                .Include(p => p.InventoryOperations)
                                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(Guid id)
        {
            return await _context.Products
                           .Include(p => p.ProductType)
                           .Include(p => p.ProductSize)
                           .Include(p => p.ProductMaterial)
                           .Include(p => p.InventoryStatus)
                           .Include(p => p.InventoryOperations)
                           .FirstOrDefaultAsync(p => p.Id == id);

            // null checking is in controller layer.
        }


        public async Task<Product> UpdateProductAsync(Guid id, UpdateProductRequestDto updateProductRequestDto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id); 
            // *********************** 這裡返回的product沒有包含導航屬性 ****************************************

            if (product == null)
            {

                return null;
            }

            // Can be refactor to service layer
            if (!await _context.ProductSizes.AnyAsync(s => s.Id == updateProductRequestDto.SizeId))
            {
                throw new ArgumentException("Invalid Size ID.");
            }

            if (!await _context.ProductTypes.AnyAsync(s => s.Id == updateProductRequestDto.TypeId))
            {
                throw new ArgumentException("Invalid Type ID.");
            }

            if (!await _context.ProductMaterials.AnyAsync(s => s.Id == updateProductRequestDto.MaterialId))
            {
                throw new ArgumentException("Invalid Material ID.");
            }

            product.Name = updateProductRequestDto.Name;
            product.TypeId = updateProductRequestDto.TypeId;
            product.SizeId = updateProductRequestDto.SizeId;
            product.MaterialId = updateProductRequestDto.MaterialId;

            await _context.SaveChangesAsync();

            return product;

        }
    }
}
