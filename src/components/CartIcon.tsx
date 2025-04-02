import { NavLink } from "react-router";
import { useCart } from "../hooks/useCart";
import CartImg from "../assets/cart.png"

export const CartIcon = () => {
  const { totalCartItems } = useCart();

  return (
    <>
          <NavLink id="cart-icon" to={"/cart"}>
              {totalCartItems
                  ? (<img id="cart-icon" src={CartImg} />)
                  :
              (<img
                id="cart-icon"
                src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
                    />)
            }
        <p>{totalCartItems}</p>
      </NavLink>
    </>
  );
};
