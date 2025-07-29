using System.ComponentModel.DataAnnotations;

namespace backend.Models.Domain
{
    public class ProductMaterial
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
    }
}
