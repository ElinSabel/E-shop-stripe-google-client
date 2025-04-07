import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Item } from "../models/Items";
import { useProducts } from "../hooks/useProducts";
import { DisplayProducts } from "../components/DisplayProducts";
import { DisplayItems } from "../components/DisplayItems";

export const Products = () => {
  const { products, loading } = useProducts();
  const [searchText, setSearchText] = useState<string>("");
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);

  const handleSearch = async () => {
    if (searchText.length <= 3) {
      setError("Must type a longer search text");
      return;
    }

    try {
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            q: searchText,
            key: "AIzaSyD-pSm29b7SJH-HrRUJZ36uJ-oAynV7L7o",
            cx: "70f20256d8fff4c0d",
            start: pageIndex,
          },
        }
      );

      if (!response.data.items) {
        throw new Error("No Search Results");
      }

      setItems(response.data.items);
      setError("");
      console.log(items);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (searchText.length > 3) {
      handleSearch();
    }
  }, [pageIndex]);

  useEffect(() => {
    setPageIndex(1);
  }, [searchText]);

  return (
    <>
      <section id="search-field-section">
        <form id="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            id="search-field"
            type="text"
            placeholder="Search for a donut"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
          <button
            className="border border-gray-400 rounded p-1"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </section>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <h1>Loading...</h1>}

      <section id="products-container">
        {searchText === "" ? (
          products.map((p) => <DisplayProducts key={p.id} p={p} />)
        ) : (
          <>
            {items &&
              items.map((item) => <DisplayItems key={item.link} i={item} />)}
            {items && (
              <div className="mt-4 flex gap-2">
                <button
                  className="border border-gray-400 rounded p-1"
                  onClick={() => setPageIndex((prev) => Math.max(1, prev - 10))}
                  disabled={pageIndex <= 1}
                >
                  Previous Page
                </button>
                <button
                  className="border border-gray-400 rounded p-1"
                  onClick={() => setPageIndex((prev) => prev + 10)}
                  disabled={items.length < 10}
                >
                  Next Page
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};
