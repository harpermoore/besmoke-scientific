using System.ComponentModel.DataAnnotations;
using backend.Models.Domain;

namespace backend.Models.DTOs
{
    public class UpdateProductRequestDto
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "Product name cannot exceed 100 characters.")]
        public string Name { get; set; }
        [Required]
        public int TypeId { get; set; }
        [Required]
        public int SizeId { get; set; }
        [Required]
        public int MaterialId { get; set; }


    }
}
