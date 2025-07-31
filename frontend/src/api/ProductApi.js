
import axios from 'axios';

export const getAllProducts = () => {
  return axios.get('https://localhost:7025/api/Products');
};

export const addNewProduct = (newProduct) => {
  return axios.post('https://localhost:7025/api/Products', newProduct);
};

export const updateProduct = (productId, updatedProduct) => {
  return axios.put(`https://localhost:7025/api/Products/${productId}`, updatedProduct)
}