import axios from 'axios';

export const getAllOperations = (typeId) => {
  const url = typeId != null ? `https://localhost:7025/api/inventoryoperations?typeId=${typeId}` : `https://localhost:7025/api/inventoryoperations`;
  return axios.get(url);
};


