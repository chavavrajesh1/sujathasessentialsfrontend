import { useEffect, useState } from "react";
import axios from "../utils/api";

const Podulu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodulu = async () => {
      try {
        const { data } = await axios.get(
          "/products?category=podulu"
        );
        setProducts(data.products);
      } catch (err) {
        console.error("Error loading podulu", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodulu();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Podulu</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border rounded p-3">
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="font-semibold mt-2">{p.name}</h2>
              <p className="text-sm text-gray-600">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Podulu;
