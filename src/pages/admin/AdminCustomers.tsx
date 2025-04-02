import { DisplayCustomer } from "../../components/admin/DisplayCustomer";
import { useCustomers } from "../../hooks/useCustomers";

export const AdminCustomers = () => {
    const { customers, loading} = useCustomers();
  return (
    <>
      <h1>Customers</h1>
      {loading && <h1>Loading...</h1>}
            <section className="list">
              {customers.map((c) => (
                <DisplayCustomer key={c.id} c={c} />
              ))}
            </section>
    </>
  );
};
