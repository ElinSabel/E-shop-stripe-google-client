import { FormEvent, useState } from "react";
import { useCustomers } from "../../hooks/useCustomers";
import { Customer, ICustomerUpdate } from "../../models/Customer";

interface IDisplayCustomerProps {
  c: Customer;
}

export const DisplayCustomer = ({ c }: IDisplayCustomerProps) => {
  const [toUpdate, setToUpdate] = useState<boolean>(false);
  const [payload, setPayload] = useState<ICustomerUpdate>({ ...c });

  const { updateCustomerHandler, deleteCustomerHandler, error } =
    useCustomers();

  const handleSubmit = async (e:FormEvent) => {
    if (JSON.stringify(payload) === JSON.stringify(c)) {
      setToUpdate(false);
      e.preventDefault()
      return;
    }
    try {
      await updateCustomerHandler(c.id, payload);
    } finally {
      setToUpdate(false);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <section className="list">
      <form className="display-list" onSubmit={(e)=> handleSubmit(e)}>
            <input disabled className="input-small" value={c.id} />
          {!toUpdate ? (
            <>
            <input disabled className="input-medium" value={c.firstname ?? ""} />
            <input disabled className="input-medium" value={c.lastname ?? ""} />
            <input disabled value={c.email ?? ""} />
            <input
              disabled
              className="input-medium"
              value={c.password ?? ""}
              type="password"
            />
            <input disabled className="input-medium" value={c.phone ?? ""} />
            <input disabled className="input-medium" value={c.street_address ?? ""} />
            <input disabled className="input-small" value={c.postal_code ?? ""} />
            <input disabled className="input-medium" value={c.city ?? ""} />
            <input disabled className="input-small" value={c.country ?? ""} />
            <button
              className="update-button"
              type="button"
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
                    "Are you sure you want to delete this customer?"
                  )
                ) {
                  deleteCustomerHandler(c.id);
                }
              }}
            >
              Delete
              </button>
              </>
          ) : (
              <>
              <input
                name="firstname"
              className="input-medium"
              value={payload.firstname}
              maxLength={100}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  firstname: e.target.value,
                }))
              }
            />
              <input
                name="lastname"
              className="input-medium"
              value={payload.lastname}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  lastname: e.target.value,
                }))
              }
            />
              <input
                name="email"
              value={payload.email}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
              <input
                name="password"
              className="input-medium"
              value={payload.password}
              type="password"
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
              <input
                name="phone"
              className="input-medium"
              value={payload.phone}
              maxLength={100}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
              <input
                name="street-address"
              className="input-medium"
              value={payload.street_address}
              maxLength={200}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  street_address: e.target.value,
                }))
              }
            />
              <input
                name="postal-code"
              className="input-small"
              value={payload.postal_code}
              maxLength={200}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
            />
              <input
                name="city"
              className="input-medium"
              value={payload.city}
              maxLength={200}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
              <input
                name="country"
              className="input-small"
              value={payload.country}
              maxLength={200}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
            />
            <button className="update-button" type="submit">
              Save
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={() => setToUpdate(false)}
            >
              Cancel
                </button>
                </>
          )}
          </form>
        <br />
      </section>
    </>
  );
};
