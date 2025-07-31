import { deleteProduct } from "../api/ProductApi"
import { useState } from "react";


export default function useDeleteProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
      const confirmDelete = async (productId) => {
        setIsLoading(true);
        setError(null);
    
        try {
          await deleteProduct(productId);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
    
      return { confirmDelete, isLoading, error };
}