import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllOperations = (typeId) => {
  const url = typeId != null
    ? `${API_BASE_URL}/api/inventoryoperations?typeId=${typeId}`
    : `${API_BASE_URL}/api/inventoryoperations`;
  return axios.get(url);
};

export const createOperation = (newOperation) => {
  return axios.post(`${API_BASE_URL}/api/inventoryoperations`, newOperation);
};

export const getAllSale = (timeFrame) => {
  return axios.get(`${API_BASE_URL}/api/inventoryoperations/sales-report?timeFrame=${timeFrame}`);
}
