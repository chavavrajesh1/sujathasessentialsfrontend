import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tours");
      setTours(data);
    } catch (err) {
      console.error("Error fetching tours:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const deleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      await api.delete(`/tours/${id}`);
      loadTours();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete tour");
    }
  };

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="relative mb-6 py-2">
        <h1 className="text-2xl font-bold text-center">Tours</h1>

        <Link
          to="/admin/tours/add"
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Tour
        </Link>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading tours...</p>
      )}

      {/* ================= NO TOURS ================= */}
      {!loading && tours.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No tours found.
        </p>
      )}

      {/* ================= TABLE ================= */}
      {!loading && tours.length > 0 && (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tours.map((t) => (
                <tr key={t._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{t.title}</td>
                  <td className="p-3">{t.duration}</td>
                  <td className="p-3 font-semibold">₹{t.price}</td>
                  <td className="p-3 text-right flex justify-end gap-2">
                    <Link
                      to={`/admin/tours/edit/${t._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTour(t._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TourList;
