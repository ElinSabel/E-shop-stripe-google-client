import { IOrderCreate, IOrderUpdate, Order } from "../models/Orders";
import { api, handleRequest } from "./baseService";
const ORDER_ENDPOINT = '/orders'


export const fetchAllOrders = async () => {
  return handleRequest<Order[]>(api.get(ORDER_ENDPOINT));
}

export const fetchOrder = async (id: number) => {
  return handleRequest<Order>(api.get(`${ORDER_ENDPOINT}/${id}`));
}

export const fetchOrderByPaymentId = async (id: string) => {
  return handleRequest<Order>(api.get(`${ORDER_ENDPOINT}/payment/${id}`));
}

export const createOrder = async (payload: IOrderCreate) => {
  return handleRequest<Order>(api.post(ORDER_ENDPOINT, payload));
}

export const updateOrder = async (id: number, payload: IOrderUpdate) => {
  return handleRequest<Order>(api.patch(`${ORDER_ENDPOINT}/${id}`, payload));
}

export const deleteOrder = async (id: number) => {
  return handleRequest(api.delete(`${ORDER_ENDPOINT}/${id}`));
}