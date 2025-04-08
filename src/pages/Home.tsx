import { useProducts } from "../hooks/useProducts"

export const Home = () => {
    const { products } = useProducts();
    
    const filteredProducts = products.filter((p) =>
        p.category.toLowerCase().includes("limited".toLowerCase())
      );
    return (
        <>
            <h1>Celebrate Easter With The Limited Edition Donuts</h1>

            <section id="hero-product-container">
            {filteredProducts.map((p) => (
                <div key={p.id}>
                    <img src={p.image} alt={p.name} />
                </div>
            ))}
            </section>
        </>
    )
}