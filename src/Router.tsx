import { createBrowserRouter } from "react-router";
import { Admin } from "./pages/admin/Admin";
import { AdminCustomers } from "./pages/admin/AdminCustomers";
import { AdminOrder } from "./pages/admin/AdminOrder";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { OrderConfirmation} from "./pages/OrderConfirmation";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "admin/products",
        element: <AdminProducts />,
      },
      {
        path: "admin/customers",
        element: <AdminCustomers />,
      },
      {
        path: "admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "admin/orders/:id",
        element: <AdminOrder />,
      },
    ],
  },
]);
