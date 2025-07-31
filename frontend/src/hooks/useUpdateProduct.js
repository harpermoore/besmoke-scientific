import { useState } from 'react'
import { updateProduct } from '../api/ProductApi'

export default function useUpdateProduct() {
     const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
    
      const saveChange = async (productId, values) => {
        setIsLoading(true);
        setError(null);
    
        try {
          const updatedProduct = {
            Id: productId,
            Name: values.Name,
            TypeId: values.TypeId,
            MaterialId: values.MaterialId,
            SizeId: values.SizeId,
          };
    
          await updateProduct(productId, updatedProduct);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
    
      return { saveChange, isLoading, error };
}