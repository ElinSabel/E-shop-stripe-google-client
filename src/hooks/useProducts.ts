import { useEffect, useState } from "react";
import { IProductCreate, IProductUpdate, Product } from "../models/Products";
import {createProduct, deleteProduct, fetchAllProducts, fetchProduct, updateProduct,} from "../services/productServices";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const cachedProducts = getFromLocalStorage("products") 
    return cachedProducts ? cachedProducts : []
  });
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  useEffect(() => {    
    const cachedProducts = getFromLocalStorage("products");
    if (cachedProducts) {
      setProducts(cachedProducts);
      return;
    }
    fetchAllProductsHandler();
  }, []);

  const fetchAllProductsHandler = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      saveToLocalStorage("products",data);
      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductByIdHandler = async (id: number) => {
    setLoading(true);
    try {
      const data = await fetchProduct(id)
      setProduct(data)
    } catch (error) {
      setError("Error fetching product");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const createProductHandler = async (payload: IProductCreate) => {
    setLoading(true);
    try {
      await createProduct(payload);
      alert("Product Added Succesfully");
      setProducts(products);
    } catch (error: unknown) {
      setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const updateProductHandler = async (id:number, product: IProductUpdate) => {
    if (!product) return;
    setLoading(true);
    try {
      await updateProduct(id, product);
      alert("Product Update Complete");
    } catch (error: unknown) {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProductHandler = async (id: number) => {
    setLoading(true);
    try {
      await deleteProduct(id); 
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id));
      alert("Products Deleted Succesflly");
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete product"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    createProductHandler,
    deleteProductHandler,
    updateProductHandler,
    fetchProductByIdHandler,
    products,
    product,
    loading,
    error,
  };
};
