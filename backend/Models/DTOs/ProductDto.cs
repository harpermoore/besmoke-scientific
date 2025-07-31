using backend.Models.Domain;

namespace backend.Models.DTOs
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public string Material { get; set; }
        
        public int InventoryStatus { get; set; }

        public bool IsStockLow { get; set; }

        public List<InventoryOperationDto> InventoryOperations { get; set; } = new List<InventoryOperationDto>();
     
    }
}

