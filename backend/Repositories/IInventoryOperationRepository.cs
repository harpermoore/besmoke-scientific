using backend.Models.Domain;

namespace backend.Repositories
{
    public interface IInventoryOperationRepository
    {
        public Task<List<InventoryOperation>> GetAllInventoryOperationAsync(int? type = null);

        public Task<InventoryOperation> CreateInventoryOperationAsync();


    }
}
