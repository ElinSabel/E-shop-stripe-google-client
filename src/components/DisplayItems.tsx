import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart";
import { Item } from "../models/Items";

interface IDisplayItemsProps {
  i: Item;
}

export const DisplayItems = ({ i }: IDisplayItemsProps) => {
  const { products } = useProducts();
  const { handleAddToCart } = useCart();
  const [cartValue, setCartValue] = useState<number>(1);
  const { error, loading } = useProducts();

  const linkMap: Record<string, string> = {
    "https://www.krispykreme.com/menu/doughnuts/original-glazed-doughnut": "http://localhost:5173/products/5",
    "https://www.krispykreme.com/menu/doughnuts/chocolate-iced-with-sprinkles": "http://localhost:5173/products/6",
    "https://www.krispykreme.com/menu/doughnuts/10-count-original-glazed-doughnut-dots": "http://localhost:5173/products/8",
    "https://www.krispykreme.com/menu/doughnuts/10-count-assorted-doughnut-dots": "http://localhost:5173/products/9",
    "https://www.krispykreme.com/menu/doughnuts/chocolate-iced-doughnut": "http://localhost:5173/products/10",
    "https://www.krispykreme.com/menu/doughnuts/original-glazed-raspberry-filled-doughnut": "http://localhost:5173/products/11",
    "https://www.krispykreme.com/menu/doughnuts/original-glazed-blueberry-cake-doughnut": "http://localhost:5173/products/12",
    "https://www.krispykreme.com/menu/doughnuts/original-glazed-lemon-filled-doughnut": "http://localhost:5173/products/13",
    "https://www.krispykreme.com/menu/doughnuts/mini-chocolate-iced-with-sprinkles": "http://localhost:5173/products/14",
    "https://www.krispykreme.com/menu/doughnuts/mini-strawberry-iced-with-sprinkles": "http://localhost:5173/products/15",
    "https://www.krispykreme.com/menu/doughnuts/cake-batter-doughnut": "http://localhost:5173/products/16",
    "https://www.krispykreme.com/menu/doughnuts/strawberry-iced-with-spring-sprinkles": "http://localhost:5173/products/18",
    "https://www.krispykreme.com/menu/doughnuts/bouncing-bunny-doughnut": "http://localhost:5173/products/19",
    "https://www.krispykreme.com/menu/doughnuts/marshmallow-bunny-doughnut": "http://localhost:5173/products/20",
  };
  
  const getInternalProductLink = (externalLink: string): string => {
    return linkMap[externalLink] ?? externalLink;
  };

  return (
    <>
      {error && <p>{error}</p>}
        <article id="product-card" key={i.link}>
          <img id="product-image" src={
                      i.pagemap?.cse_image?.[0]?.src ??
                      i.pagemap?.cse_thumbnail?.[0]?.src ??
                      "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg"
                    }
                    alt={i.title}

                  />
          <div id="product-info">
            <h3 className="product-title">{i.title}</h3>
            <p className="product-description"><i>{i.snippet}</i></p>
            <br />
            <h3 className="product-price">5 $</h3>
              <h4 className="in-stock">In Stock</h4>
          </div>
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
            disabled={loading}
              className="add-to-cart-button"
              onClick={() => {
                handleAddToCart(i, cartValue);
                setCartValue(1);
              }}
            >
              Add to cart
            </button>
            <button className="read-more-button">
              <Link to={getInternalProductLink(i.link)}>Read More</Link>
            </button>
          </div>
        </article>
    </>
  );
};
