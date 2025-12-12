import React, { useState } from "react";
import api from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message);
    } catch (err) {
      setMessage("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 flex justify-center px-4">
      <div className="max-w-md w-full bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm">Email Address</label>
          <input
            type="email"
            required
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
