import { CreateProducts } from "../../components/admin/CreateProducts"
import { DisplayAdminProduct } from "../../components/admin/DisplayAdminProduct";
import { useProducts } from "../../hooks/useProducts";


export const AdminProducts = () => {
      const { products, loading, error } = useProducts();

     return (
         <>
             <div>
                 <h1>Add New Products</h1>
                 <CreateProducts />
             </div>
             <hr />
             <div>
                 <h1>Products</h1>
           {loading && <h1>Loading...</h1>}
           {error && <p>{error}</p>}
                       <section className="list">
                         {products.map((p) => (
                           <DisplayAdminProduct key={p.id} p={p} />
                         ))}
                       </section>
             </div >
        </>
      )
      }
