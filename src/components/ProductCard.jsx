// src/components/ProductCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product, onToggleWishlist, isWished }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  // Fix image loading
  let img = "/images/placeholder.png";

  if (product.images?.length > 0 && product.images[0].url) {
    img = product.images[0].url;
  } else if (product.image) {
    img = product.image;
  }

  const handleAdd = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col transition hover:shadow-lg hover:scale-[1.02] duration-200">
      <div className="relative">
        <img
          src={img}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
          loading="lazy"
        />

        <button
          onClick={onToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 
            ${isWished ? "bg-red-500 text-white scale-110" : "bg-white text-gray-700 shadow hover:scale-110"}`}
        >
          ♥
        </button>
      </div>

      <div className="mt-3 flex-1 flex flex-col">
        <Link to={`/product/${product._id}`} className="font-semibold hover:underline">
          {product.name}
        </Link>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">₹ {product.price}</div>
            <div className="text-xs text-gray-500">
              {product.subCategory || product.category}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.countInStock <= 0}
            className={`mt-2 px-3 py-1 rounded text-white transition-all duration-200
              ${product.countInStock > 0 ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
