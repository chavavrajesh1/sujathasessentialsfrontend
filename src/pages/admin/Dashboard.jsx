import { useEffect, useState } from "react";
import api from "../../utils/api"; // ✅ Make sure path is correct

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalTours: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <p className="pt-24 text-center text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* PRODUCTS */}
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-4xl font-bold mt-3">{stats.totalProducts}</p>
        </div>

        {/* TOURS */}
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Tours</h2>
          <p className="text-4xl font-bold mt-3">{stats.totalTours}</p>
        </div>

        {/* ORDERS */}
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-4xl font-bold mt-3">{stats.totalOrders}</p>
        </div>

        {/* USERS */}
        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-3">{stats.totalUsers}</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
