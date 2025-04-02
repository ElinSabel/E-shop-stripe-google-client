import { useParams } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";

export const DisplayProduct = () => {
  const { product, error, loading, fetchProductByIdHandler } = useProducts();
  const { handleAddToCart } = useCart();
  const [cartValue, setCartValue] = useState<number>(1);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetchProductByIdHandler(Number(id));
  }, [id]);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <h1>Loading...</h1>}
      <section id="product-container">
        <div className="image-div">
          <img id="single-product-image" src={product?.image} />
        </div>
        <div id="product-information">
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <br />
          <h3>{product?.price} $</h3>
          <br />
          <p>
            <b>Category:</b> {product?.category}
          </p>
          <br />
          <p>
            <b>In Stock:</b> {product?.stock} pc
          </p>
          <br />
          <div className="add-to-cart">
            <input
              disabled={loading}
              className="add-to-cart-input"
              min={1}
              value={cartValue}
              type="number"
              onChange={(e) => setCartValue(Number(e.target.value))}
            />
            <button
              className="add-to-cart-button"
              disabled={loading || product?.stock === 0}
              onClick={() => {
                handleAddToCart(product, cartValue);
                setCartValue(1);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
