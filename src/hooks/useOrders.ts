import { useEffect, useState } from "react";
import {IOrderCreate, IOrderUpdate, Order} from "../models/Orders"
import { createOrder, deleteOrder, fetchAllOrders, fetchOrder, fetchOrderByPaymentId, updateOrder } from "../services/orderServices";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const cahcedOrders = localStorage.getItem("orders");
    return cahcedOrders ? JSON.parse(cahcedOrders) : [];
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (orders.length > 0) return;
    fetchAllOrdersHandler();
  }, []);

  const fetchAllOrdersHandler = async () => {
      setLoading(true);
      try {
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (error) {
        setError("Failed to fetch Orders");
      } finally {
        setLoading(false);
      }
    };
  
    const fetchOrderByIdHandler = async (id: number) => {
      setLoading(true);
  
      try {
        const data = await fetchOrder(id)
        setOrder(data)
      } catch (error) {
        setError("Error fetching Order");
        throw error;
      } finally {
        setLoading(false);
      }
    }
  
    const fetchOrderByPaymentIdHandler = async (id: string) => {
      setLoading(true);
      try {
        const data = await fetchOrderByPaymentId(id);
        return data; 
      } catch (error) {
        setError("Error fetching Order");
        return null; 
      } finally {
        setLoading(false);
      }
    };

    const createOrderHandler = async (payload: IOrderCreate) => {
      setLoading(true);
      try {
        const createdOrder = await createOrder(payload);
        setOrders((prevOrders) => [...prevOrders, createdOrder]);
        return createdOrder;
      } catch (error: unknown) {
        setError("Failed to create order");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
  
  const updateOrderHandler = async (id: number, order: IOrderUpdate) => {
    if (!order) return;
    setLoading(true);
    try {
      await updateOrder(id, order);
      alert("Order Update Complete");
    } catch (err) {
      setError("Failed to update Order");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrderHandler = async (id: number) => {
    setLoading(true);
    try {
      await deleteOrder(id);
      setOrders((prevOrders) =>
        prevOrders.filter((Order) => Order.id !== id)
      );
    } catch (error) {
      console.error("Error deleting Order:", error);
      setError( "Failed to delete Order");
    } finally {
      setLoading(false);
    }
  };

  


  return {
    createOrderHandler,
    deleteOrderHandler,
    updateOrderHandler,
    fetchOrderByIdHandler,
    fetchOrderByPaymentIdHandler,
    orders,
    order,
    loading,
    error,
  };
};

