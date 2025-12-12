import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginUser({ email, password })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      });
    },
    [dispatch, email, password, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center pt-28 px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

        {error && (
          <p
            className="text-red-500 text-center mb-3"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full p-2 border rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-3">
            No account?{" "}
            <Link to="/signup" className="text-yellow-600 font-medium">
              Sign Up
            </Link>
          </p>
        </form>
        <div className="text-sm mt-3 flex justify-between">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/forgot-userid" className="text-purple-600 hover:underline">
            Forgot User ID?
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;
