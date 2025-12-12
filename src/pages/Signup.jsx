import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerUser(form)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      });
    },
    [dispatch, form, navigate]
  );

  return (
    <div className="flex justify-center items-center min-h-screen pt-24 pb-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl text-center font-bold mb-6">Create Account</h2>

        {error && (
          <p
            className="text-center text-red-500 mb-3"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={changeHandler}
              autoComplete="name"
              placeholder="John Doe"
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              autoComplete="email"
              placeholder="example@gmail.com"
              className="w-full p-2 border rounded mt-1"
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
              name="password"
              value={form.password}
              onChange={changeHandler}
              autoComplete="new-password"
              placeholder="********"
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          {/* Submit */}
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating..." : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?
            <Link to="/login" className="text-yellow-600 ml-1 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
