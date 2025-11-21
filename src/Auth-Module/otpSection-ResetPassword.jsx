import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../Components/blurBackground";
import LogImg from "../Components/leftSideImg";
import axios from "axios";

function OtpSectionResetPassword() {
  const OTP_LENGTH = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const RESET_PASSWORD_URL = import.meta.env.VITE_APP_RESET_PASSWORD_URL;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  // ✅ OTP input logic
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < OTP_LENGTH - 1) inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ✅ OTP countdown
  useEffect(() => {
    if (timeLeft === 0) return setCanResend(true);
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResendOtp = async () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    console.log("Resend OTP API call here");
  };

  // ✅ Reset password submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return setError("Passwords do not match");

    setError("");
    setLoading(true);
    try {
      const res = await axios.post(RESET_PASSWORD_URL, {
        email,
        otp: otp.join(""),
        newPassword,
      });
      setMessage(res.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-poppins overflow-hidden bg-gradient-to-br from-amber-950 via-amber-800 to-orange-700">
      {/* ✅ Floating Animated Background Circles */}
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

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex justify-center items-center w-[950px] h-[600px] mx-auto my-12 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-[0_0_60px_rgba(255,193,7,0.25)] border border-white/10"
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="hidden md:block w-1/2 h-full"
        >
          <LogImg />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12 h-full backdrop-blur-xl text-white bg-white/10"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Reset Password 🔐
          </h1>
          <p className="text-gray-300 mb-8">
            Enter the OTP sent to your email and set your new password
          </p>

          {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}
          {message && <p className="text-amber-300 mb-3 text-sm">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* ✅ OTP Inputs */}
            <div className="flex justify-between mb-6">
              {otp.map((value, index) => (
                <motion.input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg rounded-xl border border-white/20 bg-white/10 text-white focus:border-amber-400 focus:shadow-[0_0_12px_rgba(255,179,71,0.5)] outline-none transition"
                  whileFocus={{ scale: 1.1 }}
                />
              ))}
            </div>

            {/* ✅ Timer & Resend */}
            <div className="flex justify-between items-center mb-5 text-gray-300 text-sm">
              <span>
                OTP expires in: {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend}
                className={`ml-4 font-semibold ${
                  canResend
                    ? "text-amber-400 hover:text-orange-400"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                Resend OTP
              </button>
            </div>

            {/* ✅ New Password */}
            <motion.div className="relative mb-4" whileFocus={{ scale: 1.02 }}>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus:border-amber-400 focus:shadow-[0_0_12px_rgba(255,179,71,0.5)] outline-none transition"
              />
              <span
                onClick={() => setShowNewPassword((p) => !p)}
                className="absolute right-3 top-3 text-gray-300 text-lg cursor-pointer select-none"
              >
                {showNewPassword ? "🙈" : "👁"}
              </span>
            </motion.div>

            {/* ✅ Confirm Password */}
            <motion.div className="relative mb-6" whileFocus={{ scale: 1.02 }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 focus:border-amber-400 focus:shadow-[0_0_12px_rgba(255,179,71,0.5)] outline-none transition"
              />
              <span
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute right-3 top-3 text-gray-300 text-lg cursor-pointer select-none"
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </span>
            </motion.div>

            {/* ✅ Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 font-semibold text-white text-lg shadow-[0_0_15px_rgba(255,179,71,0.4)] hover:shadow-[0_0_25px_rgba(255,179,71,0.6)] transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Resetting..." : "Set New Password"}
            </motion.button>
          </form>

          <motion.p
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            className="mt-6 cursor-pointer text-center text-amber-400 hover:underline"
          >
            Back to Login
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default OtpSectionResetPassword;
