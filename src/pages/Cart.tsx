import { useCart } from "../hooks/useCart";
import { EmbeddedCheckoutProvider, EmbeddedCheckout} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { ICustomerCreate } from "../models/Customer";
import { useOrders } from "../hooks/useOrders";
import { CountrySelect } from "../components/CountrySelect";

const stripePromise = loadStripe(
  "pk_test_51R4J42FC5bkJD5ptsh8bU6weX4xSsF5tjxfu6MWEq94xMRkgYaR8fQElp6frJV7S9rayfnvQiLj5ciRNTQ3HkTY900xsSe1vCC"
);

export const Cart = () => {
  const { createOrderHandler } = useOrders();
  const { fetchCustomerByEmailHandler, createCustomerHandler } = useCustomers();
  const { cart, totalCartPrice, handleChangeQuantity, handleRemoveFromCart, handleResetCart, } = useCart();
  const [ orderId, setOrderId] = useState<number | any>(0)
  const [checkoutModePay, setCheckoutModePay] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [payload, setPayload] = useState<ICustomerCreate>(() => {
    const cachedCustomer = localStorage.getItem("customer");
    return cachedCustomer
    ? JSON.parse(cachedCustomer)
    : {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      street_address: "",
      postal_code: "",
      city: "",
      country: "",
    };
  });
  const [ customerEmail, setCustomerEmail] = useState<string>(payload.email)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let customer = await fetchCustomerByEmailHandler(payload.email);
      if (!customer) {
        customer = await createCustomerHandler(payload);
      }
      if (!customer) throw new Error("Failed to create or fetch customer.");
      
      const newOrder = await createOrderHandler({
        customer_id: customer.id,
        payment_status: "Unpaid",
        payment_id: "",
        order_status: "Pending",
        order_items: cart.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.image,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
      });
      
      setCustomerEmail(customer.email)
      setOrderId(newOrder?.id)
      setCheckoutModePay(true);
      console.log(newOrder)
    } catch (error) {
      console.error("Error processing checkout:", error);
    }
  };

  useEffect(() => {
    if (!orderId || !customerEmail) return; 
  
    console.log("Fetching client secret with:", { orderId, customerEmail, cart }); // ser till att apiet får den datan den behöver innan checkout
  
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/stripe/create-checkout-session-embedded",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ cart, orderId, customerEmail }),
          }
        );
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };
  
    fetchClientSecret();
  }, [orderId, customerEmail, cart]); 

  const handleChange = (key: keyof ICustomerCreate, value: string) => {
    setPayload((prev) => {
      const updatedPayload = { ...prev, [key]: value };
      localStorage.setItem("customer", JSON.stringify(updatedPayload));
      return updatedPayload;
    });
  };

  return (
    <>
      <h1>Cart</h1>
      <section>
        {cart.length === 0 ? (
          <h1>Your cart is empty, add products to cart to proceed</h1>
        ) : (
          <>
            {!checkoutModePay ? (
              <>
                <section>
                  {cart.map((item) => (
                    <div id="cart-product" key={item.product.id}>
                      <img
                        className="small-image"
                        src={item.product.image}
                        alt={item.product.name}
                      />
                      <h4>{item.product.name}</h4>
                      <div className="quantity-div">
                        <button
                          className="cart-button"
                          onClick={() => handleChangeQuantity(item.product, 1)}
                        >
                          +
                        </button>
                        <button
                          className="cart-button"
                          onClick={() => handleChangeQuantity(item.product, -1)}
                        >
                          -
                        </button>
                      </div>
                      <p>
                        {item.quantity} x {item.product.price} $
                      </p>
                      <button
                        className="delete-button"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div id="cart-summary">
                    <h3>Total Amount: {totalCartPrice.toFixed(2)} $</h3>
                    <button className="delete-button" onClick={handleResetCart}>
                      Reset Cart
                    </button>
                  </div>
                </section>
                <hr />
                <section id="customer-info">
                  <form id="create-product" onSubmit={handleSubmit}>
                    <label>
                      <i>Customer Information</i>
                    </label>
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
                    <label>
                      <i>Shipping Information</i>
                    </label>
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
                    <select
                      required
                      defaultValue={payload.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                    >
                      <CountrySelect />
                    </select>
                    <button className="create-product-button" type="submit">
                      <b>Proceed To Payment</b>
                    </button>
                  </form>
                </section>
              </>
            ) : (
              <section id="pay">
                <button
                  className="delete-button"
                  onClick={() => setCheckoutModePay(false)}
                >
                  Return To Cart
                </button>
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={{ clientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
};