import { NavLink } from "react-router";
import { CartIcon } from "./CartIcon";

export const Nav = () => {
  return (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/products"}>Products</NavLink>
      <NavLink to={"/admin"}>Admin</NavLink>
      <CartIcon />
    </>
  );
};
