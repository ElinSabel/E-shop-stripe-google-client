import { FormEvent, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { IProductUpdate, Product } from "../../models/Products";

interface IDisplayAdminProductProps {
  p: Product;
}

export const DisplayAdminProduct = ({ p }: IDisplayAdminProductProps) => {
  const [toUpdate, setToUpdate] = useState(false);
  const { deleteProductHandler, updateProductHandler } = useProducts();
  const [payload, setPayload] = useState<IProductUpdate>({ ...p });

  const handleSubmit = async (e:FormEvent) => {
    if (JSON.stringify(payload) === JSON.stringify(p)) {
      setToUpdate(false);
      e.preventDefault()
      return;
    }
    try {
      await updateProductHandler(p.id, payload);
    } finally {
      setToUpdate(false);
    }
  };

  return (
    <>
      <section key={p.id}>
      <form className="display-list" onSubmit={(e)=>handleSubmit(e)}>
            <input disabled className="input-small" value={`Id: ${p.id}`} />
          {!toUpdate ? (
            <>
            <input disabled value={p.name} />
            <input disabled value={p.description} />
            <input
              disabled
              type="number"
              className="input-small"
              value={p.price}
            />
            <input
              disabled
              type="number"
              className="input-small"
              value={p.stock}
            />
            <input disabled value={p.category} />
            <input disabled value={p.image} />
            <button
              className="update-button"
              type="button"
              onClick={(e) => {
                setToUpdate(true);
                e.preventDefault();
              }}
            >
              Update
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this product?")) {
                  deleteProductHandler(p.id);
                }
              }}
            >
              Delete
            </button>
            </>
        ) : (
          <>
            <input
              name="name"
              value={payload.name}
              maxLength={100}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <input
              name="description"
              value={payload.description}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <input
              name="price"
              type="number"
              className="input-small"
              value={payload.price}
              max={99999}
              min={0}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />
            <input
              name="stock"
              type="number"
              className="input-small"
              value={payload.stock}
              max={9999}
              min={0}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  stock: Number(e.target.value),
                }))
              }
            />
            <input
              name="category"
              value={payload.category}
              maxLength={100}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
            <input
              name="image"
              value={payload.image}
              maxLength={200}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />
            <button className="update-button" type="submit">
              Save
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={() => setToUpdate(false)}
            >
              Cancel
            </button>
          </>
          )}
          </form>
        <br />
      </section>
    </>
  );
};
