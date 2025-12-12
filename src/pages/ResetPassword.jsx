import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      setMessage(data.message);
    } catch (err) {
      setMessage("Invalid or expired token");
    }
  };

  return (
    <div className="pt-24 flex justify-center px-4">
      <div className="max-w-md w-full bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {message && <p className="text-center text-green-600 mb-3">{message}</p>}

        <form onSubmit={handleReset}>
          <label className="block mb-2 text-sm">New Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm">Confirm Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
