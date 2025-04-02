import { useState } from "react";
import { deleteOrderItem, updateOrderItem } from "../services/orderItemServices";
import { IOrderItemUpdate, OrderItem } from "../models/OrderItem";

export const useOrderItems = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderItem] = useState<OrderItem>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const updateOrderItemHandler = async ( id: number, orderItem: IOrderItemUpdate) => {
    if (!orderItem) return;
    setLoading(true);
    try {
      console.log(id, orderItem)
      await updateOrderItem( id, orderItem);
      alert("Update Complete");
    } catch (err) {
      setError("Failed to update OrderItem");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrderItemHandler = async (id: number) => {
    setLoading(true);
    try {
      await deleteOrderItem(id); 
      setOrderItems((prevOrderItems) =>
        prevOrderItems.filter((OrderItem) => OrderItem.id !== id));
      alert("Deleted Succesflly");
    } catch (error) {
      console.error("Error deleting OrderItem:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete OrderItem"
      );
    } finally {
      setLoading(false);
    }
  };


  return {
    deleteOrderItemHandler,
    updateOrderItemHandler,
    orderItems,
    orderItem,
    loading,
    error,
  };
};
