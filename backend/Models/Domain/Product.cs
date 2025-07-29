using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Models.Domain
{


    public class Product
    {
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
        
        public ProductType ProductType { get; set; }   
        public ProductSize ProductSize { get; set; }
        public ProductMaterial ProductMaterial { get; set; }   
        public InventoryStatus InventoryStatus { get; set; }
        public List<InventoryOperation> InventoryOperations { get; set; } = new List<InventoryOperation>();
        
    }
}
