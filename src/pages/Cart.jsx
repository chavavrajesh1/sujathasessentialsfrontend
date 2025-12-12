// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/cartSlice";
import { calculateTotals } from "../utils/priceUtils";
import { Link, useNavigate } from "react-router-dom";

// Available coupons
const COUPONS = {
  PICKLE10: { code: "PICKLE10", type: "percent", value: 10 },
  FESTIVE20: { code: "FESTIVE20", type: "percent", value: 20 },
  FLAT50: { code: "FLAT50", type: "flat", value: 50 },
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems || []);

  // Save For Later
  const [saveForLater, setSaveForLater] = useState(
    JSON.parse(localStorage.getItem("saveForLater")) || []
  );

  // Dropdown menu
  const [openMenu, setOpenMenu] = useState(false);

  // Coupons
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(
    JSON.parse(localStorage.getItem("appliedCoupon")) || null
  );
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    localStorage.setItem("saveForLater", JSON.stringify(saveForLater));
  }, [saveForLater]);

  useEffect(() => {
    localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  // Move to save for later
  const moveToSaveForLater = (itemId) => {
    const item = cartItems.find((x) => x._id === itemId);
    if (!item) return;

    dispatch(removeFromCart(itemId));
    setSaveForLater((prev) =>
      prev.find((p) => p._id === itemId) ? prev : [...prev, item]
    );
  };

  // Move from saved → cart
  const moveToCartFromSaved = (itemId) => {
    const item = saveForLater.find((x) => x._id === itemId);
    if (!item) return;

    setSaveForLater((prev) => prev.filter((p) => p._id !== itemId));
    dispatch({ type: "cart/addToCart", payload: item });
  };

  const removeSaved = (itemId) => {
    setSaveForLater((prev) => prev.filter((p) => p._id !== itemId));
  };

  // Coupon logic
  const handleApplyCoupon = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();

    if (!code) return setCouponError("Enter a coupon code");

    const found = COUPONS[code];
    if (!found) return setCouponError("Invalid coupon code");

    setAppliedCoupon(found);
    setCouponCode("");
  };

  const handleRemoveCoupon = () => setAppliedCoupon(null);

  // Totals
  const { itemsTotal, discount, gst, shipping, total } = calculateTotals(
    cartItems,
    appliedCoupon
  );

  const proceedToCheckout = () => {
    if (!cartItems.length) {
      return alert("Your cart is empty");
    }

    // Ensure qty & price are numbers
    const checkoutItems = cartItems.map((item) => ({
      _id: item._id,
      name: item.name,
      price: Number(item.price),
      qty: Number(item.qty || 1),
      images: item.images
    }));

    // Save to localStorage
    localStorage.setItem("checkoutCart", JSON.stringify(checkoutItems));

    navigate("/checkout");
  };

  return (
    <div className="pt-24 px-4 md:px-10 pb-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {/* ---------------- EMPTY CART ---------------- */}
      {cartItems.length === 0 ? (
        <div className="w-full flex justify-center mt-10">
          {/* <div className="relative group">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
            >
              Continue Shopping ▼
            </button>

            {openMenu && (
              <div className="dropdown-animate absolute bg-white shadow-lg rounded-md mt-2 w-64 p-2 z-50">
                <Link
                  to="/pickle"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Pickles (Veg & Non-Veg Andhra & Telangana)
                </Link>
                <Link
                  to="/temple"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Temple Products
                </Link>
              </div>
            )}
          </div> */}
          <Link to="/" className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        /* ---------------- CART HAS ITEMS ---------------- */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE: CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow rounded-lg p-4"
              >

                {/* ❤️ Wishlist Heart Icon */}
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition text-xl"
                  title="Add to Wishlist"
                >
                  ❤️
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.images?.[0]?.url ||
                      item.image ||
                      "/images/placeholder.png"
                    }
                    alt={item.name}
                    className="w-24 h-24 rounded object-cover border"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-600 text-sm">{item.category}</p>
                    {/* Subcategory */}
                    {item.subCategory && (
                      <p className="text-sm text-gray-600">
                        Type: <span className="font-medium">{item.subCategory}</span>
                      </p>
                    )}

                    {/* In Stock / Out of Stock */}
                    <p className={`text-sm font-semibold mt-1 ${item.countInStock > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                      {item.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description || "No description available"}
                    </p>

                    <p className="text-gray-700 font-semibold">₹ {item.price}</p>

                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => dispatch(decreaseQty(item._id))}
                        className="px-3 py-1 bg-gray-200 rounded-l"
                      >
                        -
                      </button>
                      <div className="px-3 py-1 border">{item.qty}</div>
                      <button
                        onClick={() => dispatch(increaseQty(item._id))}
                        className="px-3 py-1 bg-gray-200 rounded-r"
                      >
                        +
                      </button>

                      <button
                        onClick={() => moveToSaveForLater(item._id)}
                        className="ml-4 text-sm text-blue-600 hover:underline"
                      >
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-600 font-semibold mb-2"
                  >
                    Remove
                  </button>
                  <div className="text-sm text-gray-600">
                    Subtotal: ₹ {(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            {/* SAVE FOR LATER SECTION */}
            {saveForLater.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Saved for later</h3>
                <div className="space-y-3">
                  {saveForLater.map((s) => (
                    <div
                      key={s._id}
                      className="flex items-center justify-between bg-white p-3 rounded shadow"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            s.images?.[0]?.url ||
                            s.image ||
                            "/images/placeholder.png"
                          }
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="font-semibold">{s.name}</div>
                          <div className="text-sm text-gray-600">
                            ₹ {s.price}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveToCartFromSaved(s._id)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeSaved(s._id)}
                          className="px-3 py-1 border rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: BILLING SUMMARY */}
          <aside className="bg-white shadow rounded-lg p-5 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Items ({cartItems.length})</span>
              <span>₹ {itemsTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>- ₹ {discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>GST (18%)</span>
              <span>₹ {gst.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>₹ {shipping.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            {/* Coupon Box */}
            <div className="mt-4">
              {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{appliedCoupon.code}</div>
                      <div className="text-sm text-gray-600">
                        {appliedCoupon.type === "percent"
                          ? `${appliedCoupon.value}% off`
                          : `₹ ${appliedCoupon.value} off`}
                      </div>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 border px-3 py-2 rounded"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponError && (
                <div className="text-red-500 text-sm mt-2">{couponError}</div>
              )}

              <div className="text-xs text-gray-500 mt-2">
                Try codes: PICKLE10, FESTIVE20, FLAT50
              </div>
            </div>

            <button
              onClick={proceedToCheckout}
              className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded text-lg"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="mt-3 w-full border border-gray-300 py-2 rounded text-sm"
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
