import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        console.error("Order Fetch Error:", err);
        setError("Failed to load order. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="pt-24 text-center text-gray-600">Loading order...</p>;

  if (error)
    return (
      <div className="pt-24 text-center text-red-600">
        ❌ {error}
        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="pt-24 pb-10 text-center px-4">
      <h1 className="text-3xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>
      <p className="mt-3 text-gray-600">Thank you for shopping with us.</p>

      <div className="mt-6 bg-white shadow p-6 rounded max-w-xl mx-auto">
        <h2 className="font-semibold text-lg">Order Summary</h2>

        {order.orderItems.length ? (
          order.orderItems.map((item) => (
            <div key={item._id} className="flex justify-between mt-2 border-b py-1">
              <span>{item.name} × {item.qty}</span>
              <span>₹ {(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="mt-2 text-gray-500">No items found in this order.</p>
        )}

        <div className="mt-4 border-t pt-3 font-bold text-lg">
          Total Paid: ₹ {order.totalAmount.toFixed(2)}
        </div>

        <Link
          to={`/track/${order._id}`}
          className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Track Your Order
        </Link>
      </div>

      <Link
        to="/"
        className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
