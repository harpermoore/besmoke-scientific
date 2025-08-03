using backend.Models.Domain;
using backend.Models.DTOs;

namespace backend.Repositories
{
    public interface IInventoryOperationRepository
    {


        public Task<List<InventoryOperation>> GetAllInventoryOperationAsync(int? type = null);

        public Task<InventoryOperation> CreateInventoryOperationAsync(CreateInventoryOperationRequestDto createInventoryOperationRequestDto);

        public Task<List<ProductSalesDto>> GetAllSale();
     }
}
