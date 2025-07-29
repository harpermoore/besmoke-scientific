using System.ComponentModel.DataAnnotations;
using backend.Models.Domain;

namespace backend.Models.DTOs
{
    public class UpdateProductRequestDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public ProductType Type { get; set; }
        [Required]
        public ProductSize Size { get; set; }
        [Required]
        public ProductMaterial Material { get; set; }


    }
}
