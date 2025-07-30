using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Storage;

namespace backend.Models.DTOs
{
    public class AddNewProductRequestDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Product name cannot exceed 100 characters.")]
        public string Name { get; set; }

        [Required]
        public int TypeId { get; set; }
        [Required]
        public int SizeId   { get; set; }
        [Required]
        public int MaterialId { get; set; }
        [Required]
        public int Quantity { get; set; } 
        
    }
}
