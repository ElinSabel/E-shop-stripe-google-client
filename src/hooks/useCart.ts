import { useContext } from "react";
import CartContext from "../context/CartContext";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Products";
import { CartActionType } from "../reducers/CartReducer";

export const useCart = () => {
    const { cart, dispatch } = useContext(CartContext)
    
    const totalCartItems= cart.reduce(
        (total, item: CartItem) => total + item.quantity, 0
      ); 

    const totalCartPrice = cart.reduce(
      (total, item: CartItem) => total + item.quantity * item.product.price,
      0
    ); 

    const handleAddToCart = (product: Product | any, quantity: number) => {
        dispatch({
          type: CartActionType.ADD_ITEM,
          payload: new CartItem(product, quantity)
        });
      };
  
    const handleChangeQuantity = (product: Product, quantity: number) => {
      dispatch({
        type: CartActionType.CHANGE_QUANTITY,
        payload: new CartItem(product, quantity),
      });
    };
  
    const handleRemoveFromCart = (cartItem: CartItem) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        dispatch({
          type: CartActionType.REMOVE_ITEM,
          payload: cartItem,
        });
      }
    };
  
    const handleResetCart = () => {
      if (window.confirm("Are you sure you want to reset your cart?")) {
        dispatch({
          type: CartActionType.RESET_CART,
          payload: null,
        });
      }
    };

    return{cart, totalCartItems, totalCartPrice, handleAddToCart, handleChangeQuantity, handleRemoveFromCart, handleResetCart}
}