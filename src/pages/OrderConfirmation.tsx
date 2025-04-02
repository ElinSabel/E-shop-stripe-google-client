import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useOrders } from "../hooks/useOrders";
import { Order } from "../models/Orders";

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const { fetchOrderByPaymentIdHandler } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const completedOrder = await fetchOrderByPaymentIdHandler(
          sessionId || ""
        );
        if (completedOrder) {
          setOrder(completedOrder);
          console.log(completedOrder)
          localStorage.removeItem("cart");
          localStorage.removeItem("customer");
        } else {
          console.log("Order not found.");
        }
      } catch (err: any) {
        console.error("Error fetching order:", err);
      }
    };

    fetchOrder();
  }, [sessionId]);

  return (
    <>
      <h1>Thanks for your order!</h1>
      <h2>
        {order?.customer_firstname} {order?.customer_lastname}
      </h2>
      <br />
      <p>
        An order confirmation has been sent to: <b>{order?.customer_email}</b>
      </p>
    
      <div>
        <p>Your order consist of: </p>
        <br />
      <div className="order-container">
        {order?.order_items.map((o) => (
          <div key={o.product_id}>
            <h3>{o.product_name}</h3>
            <img className="small-image" src={o.product_image} />
            <p>Quantity: {o.quantity}</p>
            <p>Price: ${o.unit_price.toFixed(2)}</p>
          </div>
        ))}
        </div>
      </div>
      <br/>
      <p>
        We appreciate your business! If you have any questions, please email{" "}
        <a href="mailto:orders@example.com">orders@example.com</a>
      </p>
    </>
  );
};
