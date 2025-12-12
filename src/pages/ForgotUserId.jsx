import React, { useState } from "react";
import api from "../utils/api";

export default function ForgotUserId() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/forgot-userid", { email });
      setMessage(data.message);
    } catch {
      setMessage("Failed to send User ID email");
    }
  };

  return (
    <div className="pt-24 flex justify-center px-4">
      <div className="max-w-md w-full bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot User ID</h2>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm">Registered Email</label>
          <input
            type="email"
            required
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full bg-purple-600 text-white py-2 rounded">
            Send My User ID
          </button>
        </form>
      </div>
    </div>
  );
}
