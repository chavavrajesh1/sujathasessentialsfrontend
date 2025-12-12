import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="pt-24 text-center text-gray-600">Loading orders...</p>;
  }

  if (error) {
    return <p className="pt-24 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Paid</th>
                <th className="p-3 text-left">Delivered</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{o.user?.email || "N/A"}</td>
                  <td className="p-3 font-semibold">₹{o.totalPrice}</td>
                  <td className={`p-3 ${o.isPaid ? "text-green-600" : "text-red-600"}`}>
                    {o.isPaid ? "Yes" : "No"}
                  </td>
                  <td
                    className={`p-3 ${o.isDelivered ? "text-green-600" : "text-red-600"}`}
                  >
                    {o.isDelivered ? "Yes" : "No"}
                  </td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
