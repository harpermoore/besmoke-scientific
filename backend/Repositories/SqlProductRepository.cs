using backend.Data;
using backend.Models.Domain;
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
        }


        public Task<Product> UpdateProductAsync(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
