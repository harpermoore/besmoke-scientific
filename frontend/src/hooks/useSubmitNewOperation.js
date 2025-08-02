import { useState } from "react";
import { createOperation } from "../api/InventoryOperationApi"

export default function useSubmitNewOperation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
    

  const create = async (values, selectedProduct, messageApi) => {
    setIsLoading(true);
    setError(null);

    // Stock out 
    let finalQuantity = values.quantity;
    if (values.actionType < 0) {
        finalQuantity = - values.quantity 
    } 

    // When infufficient stock 
    if ((finalQuantity + selectedProduct.inventoryStatus) < 0){
        messageApi.error("Insufficient stock.");
        setIsLoading(false);
        return { success: false };
    }

    try {
      const newOperation = {
        ProductId : selectedProduct.id,
        Timestamp : values.date.format('YYYY-MM-DD'),
        QuantityChange: finalQuantity, 
      };
      await createOperation(newOperation);
    messageApi.success("Operation created successfully!");
      return { success: true };
    } catch (err) {
        messageApi.error(err.message || "An error occurred");
         return { success: false};
    } finally {
        setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}