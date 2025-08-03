using backend.Models.Domain;
using backend.Models.DTOs;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;           
        }


        // Get all products -> Display list of products 
        [HttpGet]
        public async Task<IActionResult> GetAllProducts(int? typeId = null)
        {
            var products = await _productRepository.GetProductsAsync(typeId);
            var productDtos = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Type = p.ProductType?.Name ?? "N/A",
                Size = p.ProductSize?.Name ?? "N/A",
                Material = p.ProductMaterial?.Name ?? "N/A",
                InventoryStatus = p.InventoryStatus?.Quantity ?? 0,
                IsStockLow = p.InventoryStatus?.Quantity < 50 ? true : false,
                InventoryOperations = p.InventoryOperations.Select(op => new InventoryOperationDto
                {
                    Id = op.Id,
                    Name = p.Name,
                    Timestamp = op.Timestamp.ToString("yyyy-MM-dd HH:mm:ss"),
                    QuantityChange = op.QuantityChange,
                    ProductId = op.ProductId,
                }).ToList()
            }).ToList();

            return Ok(productDtos);

        }

        // Get product by Id
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetProductById([FromRoute] Guid id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound("Product does not exist.");
            }

            var productDto = new ProductDto
            {
                Id = product.Id, 
                Name = product.Name,
                Type = product.ProductType?.Name ?? "N/A",
                Size = product.ProductSize?.Name ?? "N/A",
                Material = product.ProductMaterial?.Name ?? "N/A",
                InventoryStatus = product.InventoryStatus?.Quantity ?? 0,

                InventoryOperations = product.InventoryOperations.Select(op => new InventoryOperationDto
                {
                    Id = op.Id,
                    Timestamp = op.Timestamp.ToString("yyyy-MM-dd HH:mm:ss"),
                    QuantityChange = op.QuantityChange,
                    ProductId = op.ProductId,
                }).ToList()
            }; 

            return Ok(productDto);

        }

        // Update products 
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] string id, [FromBody] UpdateProductRequestDto updateProductRequestDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _productRepository.UpdateProductAsync(id, updateProductRequestDto);

            if (product == null)
            {
                return NotFound("Can not find the product.");
            }

            var updatedProductDto = new UpdatedProductDto
            {
                Name = product.Name,
                Material = product.ProductMaterial.Name,
                Type = product.ProductType.Name,
                Size = product.ProductSize.Name,
            };

            return Ok(updatedProductDto);


        }

        // Add new product 
        [HttpPost]
        public async Task<IActionResult> AddNewProduct([FromBody] AddNewProductRequestDto addNewProductRequestDto) 
        {
            
            var product = await _productRepository.AddNewProductAsync(addNewProductRequestDto);

            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Material = product.ProductMaterial.Name,
                Type = product.ProductType.Name,
                Size = product.ProductSize.Name,
                InventoryStatus = product.InventoryStatus.Quantity
            };

            return Ok(productDto);
           
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] string id)
        {
            var isDelete = await _productRepository.DeleteProductAsync(id);

            if (!isDelete)
            {
                return BadRequest("Product not found.");
            }

            return NoContent();

        }


    }
}                                                              
