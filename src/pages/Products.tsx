import { useState } from "react";
import { DisplayProducts } from "../components/DisplayProducts"
import { useProducts } from "../hooks/useProducts";

export const Products = () => {
    const { products, loading } = useProducts();
      const [searchName, setSearchName] = useState<string>("");
      
    
      const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchName.toLowerCase())
      );
    return (
        <>
      {loading && <h1>Loading...</h1>}
      <section id="search-field-section">
        <input
          id="search-field"
          type="text"
          placeholder="Search for a product..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
            </section>
            <section id="products-container">
        {products.length === 0 ? (
          <h2>No Products Listed</h2>
        ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
                <DisplayProducts key={p.id} p={p} />
            ))
        ) : (
          <h2>No products were found, try another search</h2>
        )}
      </section>
        </>
    )
}