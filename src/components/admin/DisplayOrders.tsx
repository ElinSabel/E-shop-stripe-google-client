import { useState } from "react";
import { Link } from "react-router";
import { useOrders } from "../../hooks/useOrders";
import { IOrderUpdate, Order } from "../../models/Orders";
import { formatDate } from "../../utils/dateUtils";

interface IDisplayAdminOrderProps {
  o: Order | any;
}

export const DisplayOrders = ({ o }: IDisplayAdminOrderProps) => {
  const [payload, setPayload] = useState<IOrderUpdate>({ ...o });
  const [toUpdate, setToUpdate] = useState<boolean>(false);

  const { updateOrderHandler, deleteOrderHandler, error } = useOrders();

  const handleSubmit = async () => {
    if (JSON.stringify(payload) === JSON.stringify(o)) {
      setToUpdate(false);
      return;
    }
    try {
      await updateOrderHandler(o.id, payload);
    } finally {
      setToUpdate(false);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <section id="orders-container">
        <section id="order-container" key={o.id}>
          <div id="order-customer-info">
            <p>Order Id: {o.id}</p>
            <p>{formatDate(o.created_at)}</p>
            <p>
              {o.customer_firstname} {o.customer_lastname}
            </p>
            <p>{o.customer_country}</p>
            <br />
            <button className="read-more-button">
              <Link to={`${o.id}`}>Read More</Link>
            </button>
          </div>
          <form id="order-info" onSubmit={handleSubmit}>
            {!toUpdate ? (
              <>
                <label>Payment Status</label>
                <input disabled value={o.payment_status ?? ""} />
                <label>Payment Id</label>
                <input disabled value={o.payment_id ?? ""} />
                <label>Order Status</label>
                <input disabled value={o.order_status ?? ""} />
                <div id="order-buttons">
                  <button
                    className="update-button"
                    onClick={(e) => {
                      setToUpdate(true);
                      e.preventDefault();
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this order?"
                        )
                      ) {
                        deleteOrderHandler(o.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <label>Payment Status</label>
                <input
                  value={payload.payment_status ?? ""}
                  maxLength={30}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      payment_status: e.target.value,
                    }))
                  }
                />
                <label>Payment Id</label>
                <input
                  value={payload.payment_id ?? ""}
                  maxLength={200}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      payment_id: e.target.value,
                    }))
                  }
                />
                <label>Order Status</label>
                <input
                  value={payload.order_status ?? ""}
                  maxLength={30}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      order_status: e.target.value,
                    }))
                  }
                />
                <div id="order-buttons">
                  <button className="update-button" type="submit">
                    Save
                  </button>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteOrderHandler(o.id)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
      </section>
    </>
  );
};
