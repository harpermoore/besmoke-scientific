using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class CreateInventoryOperationRequestDto
    {
        [Required]
        public string ProductId { get; set; }
        [Required]
        public int QuantityChange { get; set; }
        [Required]
        public string  Timestamp { get; set; }
        
        
    }
}
