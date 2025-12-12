import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

const API_BASE = "https://sujathas-essentials-backend.onrender.com/api";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`);

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        console.log("PRODUCT DATA:", data);

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-600">
        Loading Product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-lg">
        {error || "Product not found"}
      </div>
    );
  }

  // FIXED IMAGE HANDLING
  const getImageUrl = () => {
    if (product.images?.length > 0 && product.images[0].url) {
      return product.images[0].url;
    }

    if (product.image) {
      if (product.image.startsWith("http")) return product.image;
      return `https://sujathasessentialsbackend.onrender.com/${product.image}`;
    }

    return "/images/placeholder.png";
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <img
            src={getImageUrl()}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
            loading="lazy"
            onError={(e) => (e.target.src = "/images/placeholder.png")}
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <h2 className="text-2xl font-semibold text-yellow-700 mt-6">
            ₹ {product.price}
          </h2>

          <button
            onClick={() => dispatch(addToCart({ ...product, qty: 1 }))}
            className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Add To Cart
          </button>

          <p className="text-sm mt-4 text-gray-600">
            {product.countInStock > 0
              ? `In stock (${product.countInStock})`
              : "Out of stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
