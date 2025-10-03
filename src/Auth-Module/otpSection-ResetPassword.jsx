import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "../Components/blurBackground";
import LogImg from "../Components/leftSideImg";
import axios from "axios";

function OtpSectionResetPassword() {
  const OTP_LENGTH = 6;
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get email passed from ForgotPassword page
  const email = location.state?.email || "";

  // ✅ API URL from .env
  const RESET_PASSWORD_URL = import.meta.env.VITE_APP_RESET_PASSWORD_URL;

  // ✅ States
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); // ✅ Toggle new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ✅ Toggle confirm password
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  // ✅ OTP input handlers
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ✅ Countdown timer for OTP
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // ✅ Resend OTP logic
  const handleResendOtp = async () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0].focus();
    console.log("Resend OTP API call here");
    // TODO: call FORGOT_PASSWORD_URL API to resend OTP
  };

  // ✅ Submit new password
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ Call reset password API
      const res = await axios.post(RESET_PASSWORD_URL, {
        email,
        otp: otp.join(""),
        newPassword,
      });

      setMessage(res.data.message || "Password reset successfully!");
      
      // ✅ Redirect to login after success
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-poppins">
      <Background />
      <div className="relative flex justify-center items-center w-[950px] h-[600px] mx-auto my-12 rounded-2xl overflow-hidden">
        <LogImg />

        {/* ✅ Right Form Section */}
        <div className="w-106 flex flex-col justify-center px-10 py-10 h-full backdrop-blur-xl text-white bg-amber-900/30">
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-300 mb-6">
            Enter the OTP sent to your email and set a new password
          </p>

          {/* Display error/success messages */}
          {error && <p className="text-red-400 mb-2">{error}</p>}
          {message && <p className="text-amber-300 mb-2">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* ✅ OTP Inputs */}
            <div className="flex gap-3 mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/70 focus:border-amber-400 focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
                />
              ))}
            </div>

            {/* ✅ Timer & Resend */}
            <div className="flex justify-between items-center mb-4 text-gray-300">
              <span>
                OTP expires in: {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend}
                className={`ml-4 text-sm font-semibold ${
                  canResend
                    ? "text-amber-400 hover:text-orange-400"
                    : "text-gray-500 cursor-not-allowed"
                } transition`}
              >
                Resend OTP
              </button>
            </div>

            {/* ✅ New Password Field with Eye Toggle */}
            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/70 focus:border-amber-400 focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
              />
              <span
                className="absolute right-3 top-3 text-gray-400 text-lg cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "🙈" : "👁"}
              </span>
            </div>

            {/* ✅ Confirm Password Field with Eye Toggle */}
            <div className="relative mb-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/70 focus:border-amber-400 focus:shadow-[0_0_8px_rgba(255,179,71,0.5)] outline-none transition"
              />
              <span
                className="absolute right-3 top-3 text-gray-400 text-lg cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </span>
            </div>

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
              {loading ? "Resetting..." : "Set New Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpSectionResetPassword;
