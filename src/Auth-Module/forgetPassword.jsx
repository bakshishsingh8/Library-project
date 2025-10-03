import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Components/blurBackground";
import LogImg from "../Components/leftSideImg";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  // ✅ API URL from .env
  const FORGOT_PASSWORD_URL = import.meta.env.VITE_APP_FORGOT_PASSWORD_URL;

  // ✅ State to store email input
  const [email, setEmail] = useState("");

  // ✅ State for messages (success/error)
  const [message, setMessage] = useState("");

  // ✅ State for loading button
  const [loading, setLoading] = useState(false);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Call backend API to send OTP
      const res = await axios.post(FORGOT_PASSWORD_URL, { email });

      // ✅ Show success message from backend
      setMessage(res.data.message || "OTP sent to your email.");

      // ✅ Navigate to OTP reset page and pass email via state
      setTimeout(() => navigate("/otp-reset-password", { state: { email } }), 1500);
    } catch (err) {
      // ✅ Show error message from backend or default
      setMessage(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-poppins">
      {/* ✅ Blurred Background */}
      <Background />

      <div className="relative flex justify-center items-center w-[950px] h-[600px] mx-auto my-12 rounded-2xl overflow-hidden">
        {/* ✅ Left Image Section */}
        <LogImg />

        {/* ✅ Right Form Section */}
        <div className="w-106 flex flex-col justify-center px-10 py-10 h-full backdrop-blur-xl text-white bg-amber-900/30">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-300 mb-6">Enter your email to reset your password</p>

          {/* ✅ Display success/error message */}
          {message && <p className="mb-4 text-sm text-center text-amber-300">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* ✅ Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/70 focus:border-amber-400 focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
            />

            {/* ✅ Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer py-3 mt-2 rounded-xl font-semibold text-white text-lg transform transition 
                ${loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-orange-400 to-amber-400 hover:from-amber-400 hover:to-orange-400 hover:-translate-y-1"
                }`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            {/* ✅ Redirect to login */}
            <p onClick={() => navigate("/")} className="mt-4 text-sm text-gray-400 cursor-pointer">
              Remember your password?{" "}
              <span className="text-amber-400 hover:text-amber-300 transition">Log In</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
