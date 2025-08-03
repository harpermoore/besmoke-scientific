
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllProducts = (typeId) => {
  const url = typeId != null ? 
  `${API_BASE_URL}/api/Products?typeId=${typeId}` : 
  `${API_BASE_URL}/api/Products`; 

  return axios.get(url);
};


export const addNewProduct = (newProduct) => {
  return axios.post(`${API_BASE_URL}/api/Products`, newProduct);
};

export const updateProduct = (productId, updatedProduct) => {
  return axios.put(`${API_BASE_URL}/api/Products/${productId}`, updatedProduct)
}

export const deleteProduct = (productId) => {
  return axios.delete(`${API_BASE_URL}/api/Products/${productId}`)
}