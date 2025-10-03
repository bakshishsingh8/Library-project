import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../Components/blurBackground";
import LogImg from "../Components/leftSideImg";

// ✅ API base URL from .env file (Vite uses import.meta.env)
const LOGIN_URL = import.meta.env.VITE_APP_LOGIN_URL;


function LogIn() {
  const navigate = useNavigate(); // ✅ Hook to programmatically navigate between routes

  // ✅ React state to store form data, loading status, errors, and password toggle
  const [email, setEmail] = useState(""); // User email input
  const [password, setPassword] = useState(""); // User password input
  const [error, setError] = useState(""); // API error messages
  const [loading, setLoading] = useState(false); // Loading state for login button
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  // ✅ Redirect already logged-in users automatically
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check if token exists
    if (token) {
      // If user already logged in, redirect to /books
      // 'replace: true' prevents using the back button to go back to login
      navigate("/books", { replace: true });
    }
  }, []);

  // ✅ Function called on form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Reset previous error messages
    setLoading(true); // Set loading to true to disable button and show feedback

    try {
      // ✅ Send POST request to login API
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      // ✅ Save returned token in localStorage for authentication
      localStorage.setItem("authToken", response.data.token);

      // ✅ Navigate user to protected /books page after successful login
      navigate("/books", { replace: true }); // Replace prevents back button
    } catch (err) {
      console.error(err); // Log error for debugging

      // ✅ Display backend error message or fallback message
      setError(err.response?.data?.message || "Login failed! Please enter valid info.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // ✅ Function to toggle password visibility
  const togglePassword = () => {
    setShowPassword((prev) => !prev); // Switch between true/false
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-poppins">
      {/* ✅ Blurred background component */}
      <Background />

      <div className="relative flex justify-center items-center w-[950px] h-[600px] mx-auto my-12 rounded-2xl overflow-hidden">
        {/* ✅ Left side image component */}
        <LogImg />

        {/* ✅ Right side login form */}
        <div className="w-106 flex flex-col justify-center px-10 py-10 h-full backdrop-blur-xl text-white bg-amber-900/30">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-300 mb-6">Please enter your details</p>

          {/* ✅ Login form */}
          <form className="flex flex-col" onSubmit={handleLogin}>
            {/* ✅ Display error message if login fails */}
            {error && <p className="text-red-400 mb-3">{error}</p>}

            {/* ✅ Email input field */}
            <input
              type="email"
              placeholder="Email"
              required
              value={email} // Bind state to input
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              className="w-full mb-4 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/70 focus:border-amber-400 focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
            />

            {/* ✅ Password input field with visibility toggle */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"} // Show/hide password
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/70 focus:border-amber-400 focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
              />
              {/* 👁 Icon to toggle password */}
              <span
                className="absolute right-3 top-3 text-gray-400 text-lg cursor-pointer select-none"
                onClick={togglePassword}
              >
                {showPassword ? "🙈" : "👁"} {/* Change icon based on state */}
              </span>
            </div>

            {/* ✅ Login button */}
            <button
              type="submit"
              disabled={loading} // Disable button while waiting for API
              className="w-full cursor-pointer py-3 mt-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-400 font-semibold text-white text-lg hover:from-amber-400 hover:to-orange-400 transform hover:-translate-y-1 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"} {/* Show loading text */}
            </button>

            {/* ✅ Link to signup page */}
            <p
              onClick={() => navigate("/signup")}
              className="mt-4 text-sm text-gray-400 cursor-pointer"
            >
              Don&apos;t have an account?{" "}
              <span className="text-amber-400 hover:text-amber-300 transition">
                Sign Up
              </span>
            </p>
          </form>

          {/* ✅ Divider line */}
          <div className="flex items-center text-gray-400 text-sm my-6">
            <span className="flex-1 h-px bg-white/20 mx-2"></span>
            OR
            <span className="flex-1 h-px bg-white/20 mx-2"></span>
          </div>

          {/* ✅ Forgot password link */}
          <div className="flex justify-center mt-4">
            <p
              onClick={() => navigate("/forgot-password")}
              className="cursor-pointer text-amber-400 hover:underline"
            >
              Forgot Password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
