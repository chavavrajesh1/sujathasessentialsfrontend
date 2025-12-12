import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data || []);
      } catch (err) {
        console.error("Order History Error:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-600 text-lg">
        Loading Orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="pt-24 pb-10 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center mt-6 text-gray-500">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-5 border">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-semibold">{order._id}</span>
                  </p>
                  <p>
                    Date:{" "}
                    {new Date(order.createdAt || order.CreatedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <Link
                  to={`/track/${order._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Track Order
                </Link>
              </div>

              {/* Items */}
              <div className="mt-3">
                <p className="font-semibold text-gray-800">
                  {order.orderItems.length} Item{order.orderItems.length > 1 ? "s" : ""}
                </p>

                <div>
                  {order.orderItems.slice(0, 2).map((item) => (
                    <p key={item._id}>
                      {item.name} × {item.qty}
                    </p>
                  ))}
                  {order.orderItems.length > 2 && (
                    <p className="text-blue-600 mt-1">+ {order.orderItems.length - 2} more item(s)...</p>
                  )}
                </div>
              </div>

              {/* Total & Status */}
              <div className="mt-4 flex justify-between items-center border-t pt-3">
                <p className="font-bold text-lg">₹ {order.totalAmount.toFixed(2)}</p>

                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
