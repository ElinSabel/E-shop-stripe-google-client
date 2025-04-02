import { IProductCreate, IProductUpdate, Product } from "../models/Products";
import { api, handleRequest } from "./baseService";
const PRODUCT_ENDPOINT = '/products'


export const fetchAllProducts = async () => {
  return handleRequest<Product[]>(api.get(PRODUCT_ENDPOINT));
}

export const fetchProduct = async (id: number) => {
  return handleRequest<Product>(api.get(`${PRODUCT_ENDPOINT}/${id}`));
}

export const createProduct = async (payload: IProductCreate) => {
  return handleRequest<Product>(api.post(PRODUCT_ENDPOINT, payload));
}

export const updateProduct = async (id: number, payload: IProductUpdate) => {
  return handleRequest<Product>(api.patch(`${PRODUCT_ENDPOINT}/${id}`, payload));
}

export const deleteProduct = async (id: number) => {
  return handleRequest(api.delete(`${PRODUCT_ENDPOINT}/${id}`));
}