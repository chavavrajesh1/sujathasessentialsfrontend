import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";

const API_BASE = "https://sujathas-essentials-backend.onrender.com/api";

const Pickles = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchPickles = useCallback(async (currentFilter) => {
    setLoading(true);

    try {
      let url = `${API_BASE}/products?category=pickles`;

      if (currentFilter !== "all") {
        url += `&subCategory=${currentFilter}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data.products || []);
    } catch (err) {
      console.error("Error loading pickles:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPickles("all");
  }, [fetchPickles]);

  const applyFilter = (type) => {
    setFilter(type);
    fetchPickles(type);
  };

  return (
    <div className="pt-24 pb-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Andhra & Telangana Pickles
      </h1>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {["all", "veg", "nonveg", "andhra", "telangana"].map((f) => (
          <button
            key={f}
            onClick={() => applyFilter(f)}
            className={`px-4 py-2 rounded capitalize transition ${
              filter === f
                ? "bg-yellow-600 text-white shadow"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {f === "all" ? "All Pickles" : f}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading Pickles...</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No pickles available for this filter.
        </p>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Pickles;
