import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const API_BASE = "https://sujathasessentialsbackend.onrender.com/api";

const Sweets = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (type) => {
    setLoading(true);
    try {
      let url = `${API_BASE}/products?category=sweets`;
      if (type !== "all") {
        url += `&subCategory=${type}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to load sweets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts("all");
  }, []);

  return (
    <div className="pt-24 px-6 pb-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sweets & Hot Foods
      </h1>

      {/* FILTER */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "sweet", "hot"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              fetchProducts(f);
            }}
            className={`px-4 py-2 rounded capitalize ${
              filter === f
                ? "bg-yellow-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {f === "all" ? "All Items" : f}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">
          No products found
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Sweets;
