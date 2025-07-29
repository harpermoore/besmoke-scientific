using backend.Models.Domain;

namespace backend.Repositories
{
    public interface IProductRepository 
    {
        public Task<List<Product>> GetProductsAsync();

        public Task<Product> GetProductByIdAsync(Guid id);
        public Task<Product> UpdateProductAsync(Product product);


    }
}
