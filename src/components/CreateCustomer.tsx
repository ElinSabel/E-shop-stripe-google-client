import { FormEvent, useEffect, useState } from "react";
import { ICustomerCreate } from "../models/Customer";
import { useCustomers } from "../hooks/useCustomers";

const defaultPayload: ICustomerCreate = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  street_address: "",
  postal_code: "",
  city: "",
  country: "",
};

export const CreateCustomer = () => {
  const [payload, setPayload] = useState<ICustomerCreate>(
    () => {
      const cachedCustomer = localStorage.getItem("customer")
      return cachedCustomer ? JSON.parse(cachedCustomer) : defaultPayload
    });
  
  useEffect(() => {
      localStorage.setItem("customer", JSON.stringify(payload))
    }, [payload])

  const handleChange = (key: keyof ICustomerCreate, value: string) => {
    setPayload((prev) => {
      const updatedPayload = { ...prev, [key]: value };
      localStorage.setItem("customer", JSON.stringify(updatedPayload));
      return updatedPayload;
    });
  };

  return (<>
                    <label><i>Customer Information</i></label>
                    <input
                      required
                      placeholder="Firstname*"
                      maxLength={100}
                      value={payload.firstname}
                      onChange={(e) =>
                        handleChange("firstname", e.target.value)
                      }
                    />
                    <input
                      required
                      placeholder="Lastname*"
                      maxLength={100}
                      value={payload.lastname}
                      onChange={(e) => handleChange("lastname", e.target.value)}
                    />
                    <input
                      required
                      placeholder="E-mail*"
                      maxLength={200}
                      value={payload.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <input
                      placeholder="Password"
                      maxLength={60}
                      value={payload.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <input
                      required
                      placeholder="Phone Number*"
                      maxLength={30}
                      value={payload.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    <label><i>Shipping Information</i></label>
                    <input
                      required
                      placeholder="Address*"
                      maxLength={100}
                      value={payload.street_address}
                      onChange={(e) =>
                        handleChange("street_address", e.target.value)
                      }
                    />
                    <input
                      required
                      placeholder="Postal Code*"
                      maxLength={30}
                      value={payload.postal_code}
                      onChange={(e) =>
                        handleChange("postal_code", e.target.value)
                      }
                    />
                    <input
                      required
                      placeholder="City*"
                      maxLength={50}
                      value={payload.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                    <input
                      required
                      placeholder="Country*"
                      maxLength={50}
                      value={payload.country}
                      onChange={(e) => handleChange("country", e.target.value)}
    />
    </>
                   
  );
};