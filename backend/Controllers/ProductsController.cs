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
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepository.GetProductsAsync();

            return Ok(products);
        }

       // Get product by Id
       [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetProductById([FromRoute] Guid id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            
            if (product == null)
            {
                return BadRequest("");
            }

            return Ok(product);

        }

        // Add New products?




        //// Update products 
        //[HttpPut]
        //[Route("{id:Guid}")]
        //public async Task<IActionResult> UpdateProduct([FromRoute]Guid id, [FromBody] UpdateProductRequestDto updateRequestDto)
        //{
        //    var productDomain = new Product
        //    {
        //        Id = id,
        //        Name = updateRequestDto.Name ?? 
        //    }

        //}



    }
}
