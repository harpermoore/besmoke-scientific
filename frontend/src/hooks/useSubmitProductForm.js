import { useState } from "react";
import { addNewProduct } from "../api/ProductApi";

export default function useSubmitProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      const newProduct = {
        Name: values.Name,
        TypeId: values.TypeId,
        MaterialId: values.MaterialId,
        SizeId: values.SizeId,
        Quantity: parseInt(values.Quantity, 10)
      };

      await addNewProduct(newProduct);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
}