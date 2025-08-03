using System.Globalization;
using backend.Data;
using backend.Models.Domain;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace backend.Repositories
{
    public class SqlInventoryOperationRepository : IInventoryOperationRepository
    {
        private readonly ProductDbContext _context;
        private readonly IProductRepository _productRepository;

        public SqlInventoryOperationRepository(ProductDbContext context, IProductRepository productRepository)
        {
            _context = context;
            _productRepository = productRepository;
        }

        public async Task<List<InventoryOperation>> GetAllInventoryOperationAsync(int? typeId = null)
        {
            var operations = _context.InventoryOperations.Include(io => io.Product).ThenInclude(p => p.ProductType).AsQueryable();

            if (typeId != null)
            {
                operations = operations.Where(io => io.Product.TypeId == typeId).OrderByDescending(io => io.Timestamp);
            }

            return await operations.OrderByDescending(io => io.Timestamp).ToListAsync();


        }
        public async Task<InventoryOperation> CreateInventoryOperationAsync(CreateInventoryOperationRequestDto createInventoryOperationRequestDto)
        {

            //check if the product (productId) exist 
            var productId = Guid.Parse(createInventoryOperationRequestDto.ProductId);
            if (!await _context.Products.AnyAsync(p => p.Id == productId))
            {
                throw new ArgumentException("Invalid Product ID.");
            }


            DateTime date = DateTime.ParseExact(createInventoryOperationRequestDto.Timestamp, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            date = date.Date + DateTime.UtcNow.TimeOfDay;

            DateTime utcTimestamp = DateTime.SpecifyKind(date, DateTimeKind.Utc);

            var newInventoryOperation = new InventoryOperation
            {
                ProductId = productId,
                Timestamp = utcTimestamp,
                QuantityChange = createInventoryOperationRequestDto.QuantityChange,
            };

            _context.InventoryOperations.Add(newInventoryOperation);
            await _context.SaveChangesAsync();

            var product = await _productRepository.GetProductByIdAsync(newInventoryOperation.ProductId);
            if (product?.InventoryStatus == null)
            {
                throw new InvalidOperationException("InventoryStatus not found.");
            }


            int newQuantity = product.InventoryStatus.Quantity + newInventoryOperation.QuantityChange;

            if (newQuantity < 0)
            {
                throw new InvalidOperationException("Not enough stock to complete this operation.");
            }

            product.InventoryStatus.Quantity = newQuantity;

            await _context.SaveChangesAsync();

            return newInventoryOperation;

        }

        public async Task<List<ProductSalesDto>> GetAllSale(string? timeFrame)
        {
            DateTime? startDate = null;
            DateTime? endDate = null;

            var now = DateTime.UtcNow;
            if (timeFrame == "month") { 
            // Query this month
            startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            endDate = startDate.Value.AddMonths(1);
            }

            else if (timeFrame == "year")
            {
               startDate = new DateTime(DateTime.Now.Year, 1, 1);
               endDate = startDate.Value.AddYears(1);
            }

            
            var salesByProduct = await _context.Products
                                        .AsNoTracking()
                                        .Select(p => new ProductSalesDto
                                        {
                                            ProductId = p.Id.ToString(),
                                            ProductName = p.Name,
                                            TotalSold = p.InventoryOperations
                                                .Where(op => op.QuantityChange < 0 &&
                                                 (startDate == null || op.Timestamp >= startDate) &&
                                                 (endDate == null || op.Timestamp < endDate)
                                                )
                                                .Sum(op => -op.QuantityChange)
                                        }).OrderByDescending(dto => dto.TotalSold)
                                        // from top sale to low sale
                                        .ToListAsync();
            return salesByProduct;
        }


    }
}
