import { useState } from "react";
import { addNewProduct } from "../api/ProductApi";

export default function useSubmitAddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (values, messageApi) => {
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
      messageApi.success("Operation created successfully!");
      return {success : true}

    } catch (err) {
      setError(err);
      messageApi.error("Product already exists.")
      return {success : false}
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
}