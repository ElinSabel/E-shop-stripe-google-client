import { IOrderItemUpdate, OrderItem } from "../models/OrderItem";
import { api, handleRequest } from "./baseService";
const ORDERITEM_ENDPOINT = '/order-items'

export const updateOrderItem = async (id: number, payload: IOrderItemUpdate) => {
  return handleRequest<OrderItem>(api.patch(`${ORDERITEM_ENDPOINT}/${id}`, payload));
}

export const deleteOrderItem = async (id: number) => {
  return handleRequest(api.delete(`${ORDERITEM_ENDPOINT}/${id}`));
}