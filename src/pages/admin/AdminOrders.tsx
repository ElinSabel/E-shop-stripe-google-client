import { DisplayOrders } from "../../components/admin/DisplayOrders";
import { useOrders } from "../../hooks/useOrders";


export const AdminOrders = () => {
      const { orders, loading } = useOrders();
    return (
        <>
            <h1>Orders</h1>
             {loading && <h1>Loading...</h1>}
                  <section id="orders-container">
                    {orders.map((o) => (
                      <DisplayOrders key={o.id} o={o} />
                    ))}
                  </section>
        </>
    )
}