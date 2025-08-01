import axios from 'axios';

export const getAllOperations = (typeId) => {
  const url = typeId != null ? `https://localhost:7025/api/inventoryoperations?typeId=${typeId}` : `https://localhost:7025/api/inventoryoperations`;
  console.log(url)
  return axios.get(url);
};

export const createOperation = (newOperation) => {
  return axios.post("https://localhost:7025/api/inventoryoperations", newOperation)
}


