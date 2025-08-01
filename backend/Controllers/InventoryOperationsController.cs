using backend.Models.Domain;
using backend.Models.DTOs;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryOperationsController : ControllerBase
    {
        private readonly IInventoryOperationRepository _operationRepository;

        public InventoryOperationsController(IInventoryOperationRepository operationrepository)
        {
          _operationRepository = operationrepository;
        }


        // Display inventory report for all products
        // Allowing filtering of inventory report by product type
        [HttpGet]
        public async Task<IActionResult> GetAllInventoryOperations([FromQuery] int? typeId)
        {
            var operations = await _operationRepository.GetAllInventoryOperationAsync(typeId);
            var operationDtos = operations.Select(o => new InventoryOperationDto
            {
                Id = o.Id,
                Name = o.Product.Name,
                Timestamp = o.Timestamp.ToString("yyyy-MM-dd HH:mm:ss"),
                QuantityChange = o.QuantityChange, 
                ProductId = o.ProductId
            }).ToList();

            return Ok(operationDtos);
        }
    }
}
