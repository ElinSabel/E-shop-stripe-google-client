import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router";
import { Product } from "../models/Products";
import { useCart } from "../hooks/useCart";

interface IDisplayProductsProps {
  p: Product;
}

export const DisplayProducts = ({ p }: IDisplayProductsProps) => {
  const { handleAddToCart } = useCart();
  const [cartValue, setCartValue] = useState<number>(1);
  const { error, loading } = useProducts();

  return (
    <>
      {error && <p>{error}</p>}
        <article id="product-card">
          <img id="product-image" src={p.image} />
          <div id="product-info">
            <h3 className="product-title">{p.name}</h3>
            <p className="product-description"><i>{p.description}</i></p>
            <br />
            <h3 className="product-price">{p.price} $</h3>
            {p.stock < 0 ? (
              <h4 className="not-in-stock">Out of Stock</h4>
            ) : p.stock < 2 ? (
              <h4 className="almost-sold-out">Almost Sold Out</h4>
            ) : (
              <h4 className="in-stock">In Stock</h4>
            )}
          </div>
          <div className="add-to-cart">
            <input
              disabled={loading}
              className="add-to-cart-input"
              min={1}
              max={p.stock}
              value={cartValue}
              type="number"
              onChange={(e) => setCartValue(Number(e.target.value))}
            />
            <button
              disabled={loading || p.stock < 0}
              className="add-to-cart-button"
              onClick={() => {
                handleAddToCart(p, cartValue);
                setCartValue(1);
              }}
            >
              Add to cart
            </button>
            <button className="read-more-button">
              <Link to={`/products/${p.id}`}>Read More</Link>
            </button>
          </div>
        </article>
    </>
  );
};
