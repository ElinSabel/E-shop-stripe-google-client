import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { IProductCreate } from "../../models/Products";

export const CreateProducts = () => {
  const [addImg, setAddImg] = useState<Boolean>(false)
  const [payload, setPayload] = useState<IProductCreate>({
    name: "",
    description: "",
    price: 1,
    stock: 1,
    category: "",
    image: "",
  });
  const { createProductHandler, loading } = useProducts();

  const handleSubmit = async () => {
    try {
      await createProductHandler(payload);
    } finally {
      setPayload({
        name: "",
        description: "",
        price: 1,
        stock: 1,
        category: "",
        image: "",
      });
      setAddImg(false);
    }
  };

  return (
    <div id="create-product-container">
      <form id="create-product" onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={payload.name}
          maxLength={100}
          required
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Product Description"
          value={payload.description} 
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />
        <input
          type="number"
          max={99999}
          min={0}
          placeholder="Price $"
          required
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
        />
        <input
          type="number"
          maxLength={9999}
          min={0}
          placeholder="Stock"
          required
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, stock: Number(e.target.value) }))
          }
        />
        <input
          placeholder="Product Category"
          value={payload.category}
          maxLength={100}
          required
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, category: e.target.value }))
          }
        />
        <input
          placeholder="Product Image Link"
          value={payload.image}
          maxLength={200}
          required
          onChange={(e) => {
            setPayload((prev) => ({ ...prev, image: e.target.value }))
          setAddImg(true)}
          }
        />
        <button
          className="create-product-button"
          type="submit">
          {loading ? "Loading..." : "Add New Product"}
        </button>
      </form>
      <div id="create-product-image-div">
        {addImg ? (
          <img id="create-product-image"
            src={payload.image}
            alt="product image"
          />) : ( <h3><i>Image will appear here</i></h3>)
        }
        </div>
    </div>
  );
};
