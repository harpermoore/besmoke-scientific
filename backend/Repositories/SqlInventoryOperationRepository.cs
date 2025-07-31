using backend.Data;
using backend.Models.Domain;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace backend.Repositories
{
    public class SqlInventoryOperationRepository : IInventoryOperationRepository
    {
        private readonly ProductDbContext _context;

        public SqlInventoryOperationRepository(ProductDbContext context)
        {
            _context = context;
        }

        public async Task<List<InventoryOperation>> GetAllInventoryOperationAsync(int? type = null)
        {
            var operations = _context.InventoryOperations.Include(io => io.Product).ThenInclude(p => p.ProductType).AsQueryable();

            if (type != null) {
                operations = operations.Where(io => io.Product.TypeId == type);
            }

            return await operations.ToListAsync();


        }
        public Task<InventoryOperation> CreateInventoryOperationAsync()
        {
            throw new NotImplementedException();
        }

    }
}
