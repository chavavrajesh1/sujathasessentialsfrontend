import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ---------------------------
  // TOGGLE USER ADMIN ROLE
  // ---------------------------
  const toggleAdmin = async (id, currentStatus) => {
    const confirmMsg = currentStatus
      ? "Remove admin access from this user?"
      : "Make this user an admin?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await api.put(`/users/${id}/admin`);
      loadUsers(); // refresh list
    } catch (err) {
      console.error("Failed to update admin role:", err);
      alert("Failed to update user role");
    }
  };

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading users...</p>
      )}

      {!loading && users.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No users found.
        </p>
      )}

      {!loading && users.length > 0 && (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Admin</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>

                  <td className="p-3 font-semibold">
                    {u.isAdmin ? (
                      <span className="text-green-600 font-bold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-bold">No</span>
                    )}
                  </td>

                  {/* ACTION BUTTON */}
                  <td className="p-3 text-right">
                    <button
                      onClick={() => toggleAdmin(u._id, u.isAdmin)}
                      className={`px-3 py-1 rounded text-white ${
                        u.isAdmin
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {u.isAdmin ? "Remove Admin" : "Make Admin"}
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
}
