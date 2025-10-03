// ✅ Import required modules and components
import Background from "../Components/blurBackground";  // Custom blurred background component
import LogImg from "../Components/leftSideImg";        // Left-side image component
import { useNavigate } from "react-router-dom";       // For programmatic navigation after signup
import { useState } from "react";                     // For managing form state, loading, messages
import axios from "axios";                            // For making API requests

function SignUp() {
  const navigate = useNavigate(); // ✅ Hook to redirect users after signup

  // ✅ Load API URL from .env file (Vite env variables must start with VITE_)
  const REGISTER_URL = import.meta.env.VITE_APP_REGISTER_URL;

  // ✅ State for storing user input
  const [formData, setFormData] = useState({
    name: "",      // Full name
    email: "",     // Email address
    password: "",  // Password
  });

  // ✅ State for showing success/error messages
  const [message, setMessage] = useState("");

  // ✅ State for showing loading animation
  const [loading, setLoading] = useState(false);

  // ✅ State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle input changes for all fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();   // Prevent page reload
    setLoading(true);     // Start loading
    setMessage("");       // Clear previous messages

    try {
      // ✅ Send POST request to backend /register endpoint
      const res = await axios.post(REGISTER_URL, formData);

      // ✅ Show success message from backend or default
      setMessage(res.data.message || "User registered successfully!");

      // ✅ Redirect to login page after 1.5 seconds
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      // ✅ Show error message if API fails
      setMessage(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // ✅ Stop loading animation
    }
  };

  // ✅ Toggle password visibility
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-poppins">
      {/* ✅ Blurred Background Component */}
      <Background />

      {/* ✅ Main signup container */}
      <div className="relative flex justify-center items-center w-[950px] h-[600px] mx-auto my-12 rounded-2xl overflow-hidden">

        {/* ✅ Left side image */}
        <LogImg />

        {/* ✅ Right side - Signup form section */}
        <div className="w-106 flex flex-col justify-center px-10 py-10 h-full backdrop-blur-xl text-white bg-amber-900/30">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-300 mb-6">Please enter your details</p>

          {/* ✅ Display success or error message */}
          {message && (
            <p className="mb-4 text-sm text-center text-amber-300">{message}</p>
          )}

          {/* ✅ Signup Form */}
          <form className="flex flex-col" onSubmit={handleSubmit}>

            {/* Full Name Input */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white 
              placeholder-white/70 focus:border-amber-400 
              focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
            />

            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white 
              placeholder-white/70 focus:border-amber-400 
              focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
            />

            {/* Password Input with toggle eye */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"} // ✅ Toggle type
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white 
                placeholder-white/70 focus:border-amber-400 
                focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
              />
              {/* ✅ Eye icon to toggle visibility */}
              <span
                className="absolute right-3 top-3 text-gray-400 text-lg cursor-pointer select-none"
                onClick={togglePassword}
              >
                {showPassword ? "🙈" : "👁"} {/* Change icon on toggle */}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading} // ✅ Disable button while loading
              className={`w-full cursor-pointer py-3 mt-2 rounded-xl font-semibold text-white text-lg transform transition 
                ${loading 
                  ? "bg-gray-400 cursor-not-allowed" // Disabled style
                  : "bg-gradient-to-r from-orange-400 to-amber-400 hover:from-amber-400 hover:to-orange-400 hover:-translate-y-1" // Normal style
                }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* Redirect to login if user already has an account */}
            <p
              onClick={() => navigate("/")}
              className="mt-4 text-sm text-gray-400 cursor-pointer"
            >
              Already have an account?{" "}
              <span className="text-amber-400 hover:text-amber-300 transition">
                Log In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
