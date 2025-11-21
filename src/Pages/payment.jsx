import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CreditCard,
  ArrowLeft,
  Wallet,
  Globe,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const issueBooks = location.state?.issueBooks || [];
  const totalAmount = issueBooks.reduce(
    (sum, book) => sum + Number(book.price || 0),
    0
  );

  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [netBankingBank, setNetBankingBank] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handlePayment = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/books");
  };

  const isPayEnabled = () => {
    if (!selectedMethod) return false;
    if (selectedMethod === "Credit/Debit Card") {
      return cardDetails.number && cardDetails.expiry && cardDetails.cvv;
    } else if (selectedMethod === "UPI / Wallet") {
      return upiId.trim() !== "";
    } else if (selectedMethod === "Net Banking") {
      return netBankingBank.trim() !== "";
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-6 sm:p-8 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800 tracking-tight">
          Complete Your Payment
        </h1>
        <button
          onClick={() => navigate("/issue-books")}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Payment Methods */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8 flex flex-col gap-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Choose Payment Method
          </h2>

          {/* Payment Options */}
          <div className="grid grid-cols-1  sm:grid-cols-3 gap-3">
            {[
              {
                label: "Credit/Debit Card",
                icon: CreditCard,
                color: "from-green-500 to-emerald-600",
              },
              {
                label: "UPI / Wallet",
                icon: Wallet,
                color: "from-blue-500 to-indigo-600",
              },
              {
                label: "Net Banking",
                icon: Globe,
                color: "from-purple-500 to-fuchsia-600",
              },
            ].map(({ label, icon: Icon, color }) => (
              <button
                key={label}
                onClick={() => setSelectedMethod(label)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white shadow-md transition-all 
                  ${selectedMethod === label
                    ? `bg-gradient-to-r ${color} scale-105`
                    : `bg-gradient-to-r ${color} opacity-80 hover:opacity-100`} `}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>

          {/* Conditional Input Fields */}
          <AnimatePresence mode="wait">
            {selectedMethod === "Credit/Debit Card" && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiry: e.target.value,
                      })
                    }
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>
              </motion.div>
            )}

            {selectedMethod === "UPI / Wallet" && (
              <motion.div
                key="upi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g., user@okhdfcbank)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </motion.div>
            )}

            {selectedMethod === "Net Banking" && (
              <motion.div
                key="bank"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                <select
                  value={netBankingBank}
                  onChange={(e) => setNetBankingBank(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  <option value="">Select Your Bank</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="SBI">SBI Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="Axis">Axis Bank</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pay Button */}
          {selectedMethod && (
            <motion.button
              onClick={handlePayment}
              disabled={!isPayEnabled()}
              whileTap={{ scale: 0.98 }}
              className={`mt-6 w-full py-3 flex items-center justify-center gap-2 font-semibold rounded-xl shadow-md transition-all 
              ${isPayEnabled()
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-[1.02] cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              <CreditCard className="w-5 h-5" />
              Pay ₹{totalAmount}
            </motion.button>
          )}
        </motion.div>

        {/* Right Side: Order Summary */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="text-amber-600" />
              Order Summary
            </h2>

            <div className="max-h-60 overflow-y-auto pr-2">
              {issueBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <span className="text-gray-700 font-medium truncate w-2/3">
                    {book.title}
                  </span>
                  <span className="text-gray-900 font-semibold">
                    ₹{book.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-800">
            <span>Total:</span>
            <span className="text-amber-700">₹{totalAmount}</span>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-2xl text-center w-[24rem]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Successful
              </h2>
              <p className="text-gray-600 mb-6">
                You have successfully paid ₹{totalAmount} via{" "}
                <strong>{selectedMethod}</strong>.
              </p>
              <button
                onClick={handleCloseModal}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl cursor-pointer font-semibold"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Payment;
