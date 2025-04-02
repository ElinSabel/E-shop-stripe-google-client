import { RouterProvider } from "react-router"
import { router } from "./Router"
import { CartProvider } from "./context/CartContext"

function App() {

  return (
    <>
      <CartProvider>
      <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </>
  )
}

export default App
