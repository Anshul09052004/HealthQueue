import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const navigate = useNavigate();
  const [state, setState] = useState("Login"); // "Login" or "SignUp"
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Signup
  const SignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Signup Successful!");
      setTimeout(() => {
        setState("Login");
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error("Network error during signup");
    }
  };

  // ✅ Login
  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Login Successful!");
      if (data.token) {
        localStorage.setItem("token", data.token);
        // 👇 Navbar ko turant update karne ke liye
        window.dispatchEvent(new Event("storage"));
      }

      setTimeout(() => navigate("/shop"), 1500);
    } catch (error) {
      toast.error("Network error during login");
    }
  };

  const submitHandler = (e) => {
    if (state === "SignUp") {
      SignUp(e);
    } else {
      Login(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={submitHandler}
        className="bg-white/90 backdrop-blur-lg w-full max-w-md mx-4 p-8 rounded-2xl shadow-xl border border-white/30"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {state === "SignUp" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {state === "SignUp"
            ? "Sign up to get started with Shopper"
            : "Login to continue your journey"}
        </p>

        {state === "SignUp" && (
          <input
            name="fullName"
            value={formData.fullName || ""}
            onChange={changeHandler}
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 bg-gray-50 mb-4 outline-none rounded-lg py-3 px-4 transition"
            type="text"
            placeholder="Full Name"
            required
          />
        )}

        <input
          name="email"
          value={formData.email || ""}
          onChange={changeHandler}
          className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 bg-gray-50 mb-4 outline-none rounded-lg py-3 px-4 transition"
          type="email"
          placeholder="Email Address"
          required
        />

        <input
          name="password"
          value={formData.password || ""}
          onChange={changeHandler}
          className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 bg-gray-50 mb-6 outline-none rounded-lg py-3 px-4 transition"
          type="password"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700 transition-all py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl active:scale-95"
        >
          {state === "SignUp" ? "Sign Up" : "Log In"}
        </button>

        {state === "SignUp" ? (
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setState("Login")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log In
            </button>
          </p>
        ) : (
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => setState("SignUp")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        )}

        <ToastContainer position="top-center" autoClose={2000} />
      </form>
    </div>
  );
}

export default LoginSignup;
