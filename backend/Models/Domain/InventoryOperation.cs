using System.ComponentModel.DataAnnotations;

namespace backend.Models.Domain
{
    public class InventoryOperation
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }

        public int QuantityChange { get; set; }
        public Guid ProductId { get; set; } 

        public Product Product { get; set; } 
    }
}
