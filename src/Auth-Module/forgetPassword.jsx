import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../Components/blurBackground";
import LogImg from "../Components/leftSideImg";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const FORGOT_PASSWORD_URL = import.meta.env.VITE_APP_FORGOT_PASSWORD_URL;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(FORGOT_PASSWORD_URL, { email });
      setMessage(res.data.message || "OTP sent to your email.");
      setTimeout(() => navigate("/otp-reset-password", { state: { email } }), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-poppins overflow-hidden bg-gradient-to-br from-amber-950 via-amber-800 to-orange-700">
      {/* ✅ Floating Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Background />

      {/* ✅ Main Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex justify-center items-center w-[950px] h-[600px] mx-auto my-12 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-[0_0_60px_rgba(255,193,7,0.25)] border border-white/10"
      >
        {/* ✅ Left Side Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="hidden md:block w-1/2 h-full"
        >
          <LogImg />
        </motion.div>

        {/* ✅ Right Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12 h-full backdrop-blur-xl text-white bg-white/10"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent"
          >
            Forgot Password 🔑
          </motion.h1>
          <p className="text-gray-300 mb-8">
            Enter your email to reset your password
          </p>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-300 mb-3 text-sm text-center"
            >
              {message}
            </motion.p>
          )}

          {/* ✅ Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <motion.input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              className="w-full mb-4 px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus:border-amber-400 focus:shadow-[0_0_12px_rgba(255,179,71,0.5)] outline-none transition"
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 font-semibold text-white text-lg shadow-[0_0_15px_rgba(255,179,71,0.4)] hover:shadow-[0_0_25px_rgba(255,179,71,0.6)] transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Sending..." : "Send OTP"}
            </motion.button>

            <p
              onClick={() => navigate("/")}
              className="mt-5 text-sm text-gray-300 cursor-pointer text-center"
            >
              Remember your password?{" "}
              <span className="text-amber-400 hover:text-amber-300 transition">
                Log In
              </span>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
