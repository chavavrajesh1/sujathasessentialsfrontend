import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", mobile: "" });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: "", type: "success" }); // type: success | error

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setUser({ name: data.name, email: data.email, mobile: data.mobile });
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "success" });

    try {
      await api.put("/users/profile", user);
      setMsg({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setMsg({ text: "Profile update failed.", type: "error" });
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "success" });

    try {
      await api.put("/users/change-password", passwords);
      setMsg({ text: "Password changed successfully!", type: "success" });
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (error) {
      setMsg({ text: "Password change failed.", type: "error" });
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (loading) return <div className="pt-24 text-center text-xl">Loading Profile...</div>;

  return (
    <div className="pt-24 pb-10 px-4 flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

        {msg.text && (
          <p className={`text-center mb-4 ${msg.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {msg.text}
          </p>
        )}

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
            {user.name.charAt(0)}
          </div>
        </div>

        {/* Personal Info Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>

          {["name", "email", "mobile"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder={field === "name" ? "Full Name" : field === "email" ? "Email" : "Mobile Number"}
              value={user[field]}
              onChange={(e) => setUser({ ...user, [field]: e.target.value })}
              required
            />
          ))}

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Save Changes
          </button>
        </form>

        {/* Password Change Form */}
        <form onSubmit={handlePasswordChange} className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Change Password</h2>

          {["oldPassword", "newPassword"].map((field) => (
            <input
              key={field}
              type="password"
              className="w-full px-4 py-3 border rounded-lg"
              placeholder={field === "oldPassword" ? "Old Password" : "New Password"}
              value={passwords[field]}
              onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
              required
            />
          ))}

          <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition">
            Update Password
          </button>
        </form>

        {/* Actions */}
        <div className="mt-10 flex justify-between">
          <button onClick={() => navigate("/orders")} className="text-blue-600 font-medium hover:underline">
            View Order History
          </button>

          <button onClick={logout} className="text-red-600 font-medium hover:underline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
