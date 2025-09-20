import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContextProvider";
import axios from "axios";

function LoginSignup() {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { name, email, password } = formData;

      if (state === "SignUp") {
        const { data } = await axios.post(backendUrl + "/api/v1/user/register", {
          name,
          email,
          password,
        });
        if (data.token) {
          console.log("Signup response:", data);
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Signup successful!");
        } else {
          console.log("Signup failed:", data);
          toast.error("Signup failed!");
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/v1/user/login", {
          email,
          password,
        });
        if (data.token) {
          console.log("Login response:", data);
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          console.log("Login failed:", data);
          toast.error("Login failed!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

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
            name="name"
            value={formData.name || ""}
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
