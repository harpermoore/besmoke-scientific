using backend.Models.Domain;

namespace backend.Models.DTOs
{
    public class InventoryOperationDto
    {
        public int Id { get; set; }
        public string Timestamp { get; set; }

        public int QuantityChange { get; set; }
        public Guid ProductId { get; set; }

    }
}
