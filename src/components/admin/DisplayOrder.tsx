import { useEffect, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { useOrderItems } from "../../hooks/useOrderItems";
import { useParams } from "react-router";
import { IOrderItemUpdate } from "../../models/OrderItem";

export const DisplayOrder = () => {
  const [payload, setPayload] = useState<IOrderItemUpdate>({quantity:0});
  const { order, loading, fetchOrderByIdHandler} = useOrders();
  const { updateOrderItemHandler, deleteOrderItemHandler, error } =
    useOrderItems();
    const {id} = useParams()
  
  useEffect(() => {
    if (!id) return;
      fetchOrderByIdHandler(Number(id))
    }, [id]);
  
  return (
    <>
      {error && <p>{error}</p>}
      {loading && <h1>Loading...</h1>}
      <section className="single-order-container">
            <div>
                  <p><b>Order Id:</b> <i>{order?.id}</i></p>
                  <p><b>Customer Name:</b> <i>{order?.customer_firstname} {order?.customer_lastname}</i></p>
                  <p><b>Customer Email:</b> <i>{order?.customer_email}</i></p>
                  <p><b>Customer Phone:</b> <i>{order?.customer_phone}</i></p>
                  <p><b>Customer Addres:</b> <i>{order?.customer_street_address} - {order?.customer_postal_code} {order?.customer_city} - {order?.customer_country}</i></p>
        </div>
        <div id="order-items-container">
          {order?.order_items.map((o) => (
        <div key={o.id}>
            <p><b>OrderItem Id:</b> <i>{o.id}</i></p>
            <p><b>Product Name:</b> <i>{o.product_name}</i></p>
              <p><b>Product Price:</b> <i>{o.unit_price} $</i></p>
              <img className="small-image" src={o.product_image} />
            <form
              className="quantity-div"
              key={o.id}
              onSubmit={() => updateOrderItemHandler(o.id, payload)}
            >
              <label><b>Quantity:</b></label>
              <input
                className="input-small"
                type="number"
                defaultValue={o.quantity ?? ""}
                min={1}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...(prev || o),
                    quantity: parseInt(e.target.value),
                  }))
                }
              />
              <button
                className="update-button"
                type="submit">
                Update</button>
              <button
                className="delete-button"
                type="button"
                onClick={() => deleteOrderItemHandler(o.id)}
              >
                Delete
              </button>
              </form>
              <br/>
            </div>
          
          ))}
          </div>
      </section>
    </>
  );
};
