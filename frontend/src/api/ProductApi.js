
import axios from 'axios';

export const getAllProducts = () => {
  return axios.get('https://localhost:7025/api/Products');
};



  
