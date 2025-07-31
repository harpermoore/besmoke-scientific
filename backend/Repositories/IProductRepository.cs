using backend.Models.Domain;
using backend.Models.DTOs;

namespace backend.Repositories
{
    public interface IProductRepository
    {
        public Task<List<Product>> GetProductsAsync();

        public Task<Product?> GetProductByIdAsync(Guid id);
        public Task<Product?> UpdateProductAsync(string id, UpdateProductRequestDto updateProductRequestDto);

        public Task<Product> AddNewProductAsync(AddNewProductRequestDto addNewProductRequestDto);

        public Task<bool> DeleteProductAsync(string id);
    }
}
