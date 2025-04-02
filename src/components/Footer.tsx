import { NavLink } from "react-router"

export const Footer = () => {
  return (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/products"}>Products</NavLink>
      <NavLink to={"/admin"}>Admin</NavLink>
    </>
  );
};