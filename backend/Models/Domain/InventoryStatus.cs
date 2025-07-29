using System.ComponentModel.DataAnnotations;

namespace backend.Models.Domain
{
    public class InventoryStatus
    {
        [Key]
        public Guid ProductId { get; set; }

        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        public Product Product { get; set; }
        
    }
}
