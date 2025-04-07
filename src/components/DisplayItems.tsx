import { useProducts } from "../hooks/useProducts";
import { Item } from "../models/Items";
import { DisplayProducts } from "./DisplayProducts";

interface IDisplayItemsProps {
  i: Item;
}

export const DisplayItems = ({ i }: IDisplayItemsProps) => {
  const { products} = useProducts();

  const extractQueryFromLink = (link: string) => {
    try {
      const url = new URL(link);
      const segments = url.pathname.split("/").filter(Boolean);
      return segments[segments.length - 1]; 
    } catch {
      return "";
    }
  };

  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  const querySlug = extractQueryFromLink(i.link);

  const matchedProduct = products.find(
    (product) => slugify(product.name) === querySlug
  );

  if (matchedProduct) {
    return (
      <DisplayProducts p={matchedProduct} key={matchedProduct.id}/>
    );
  }

  return (
    <article id="product-card" key={i.link}>
      <img
        id="product-image"
        src={
          i.pagemap?.cse_image?.[0]?.src ??
          i.pagemap?.cse_thumbnail?.[0]?.src ??
          "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg"
        }
        alt={i.title}
      />
      <div id="product-info">
        <h3 className="product-title">{i.title}</h3>
        <p className="product-description">
          <i>{i.snippet}</i>
        </p>
        <h4 className="not-in-stock">Out of Stock</h4>
      </div>
    </article>
  );
};