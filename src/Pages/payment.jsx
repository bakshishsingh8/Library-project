// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   CreditCard,
//   ArrowLeft,
//   Wallet,
//   Globe,
//   CheckCircle,
//   BookOpen,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// function Payment() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   /* ===============================
//      UNIVERSAL DATA HANDLING
//   ================================ */

//   // Buy books flow
//   const issueBooks = location.state?.issueBooks || [];

//   // Rent books flow
//   const rentedBooks = location.state?.rentedBooks || [];

//   // Decide which data to use
//   const books = rentedBooks.length > 0 ? rentedBooks : issueBooks;

//   // Calculate total (price for buy, fees for rent)
//   const totalAmount = books.reduce(
//     (sum, book) => sum + Number(book.price ?? book.fees ?? 0),
//     0
//   );

//   // Redirect if user opens payment page directly
//   useEffect(() => {
//     if (!books.length) {
//       navigate("/books");
//     }
//   }, [books, navigate]);

//   /* ===============================
//      STATES
//   ================================ */

//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     expiry: "",
//     cvv: "",
//   });
//   const [upiId, setUpiId] = useState("");
//   const [netBankingBank, setNetBankingBank] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   /* ===============================
//      HELPERS
//   ================================ */

//   const isPayEnabled = () => {
//     if (!selectedMethod) return false;

//     if (selectedMethod === "Credit/Debit Card") {
//       return cardDetails.number && cardDetails.expiry && cardDetails.cvv;
//     }

//     if (selectedMethod === "UPI / Wallet") {
//       return upiId.trim() !== "";
//     }

//     if (selectedMethod === "Net Banking") {
//       return netBankingBank.trim() !== "";
//     }

//     return false;
//   };

//   const handlePayment = () => setShowModal(true);

//   const handleCloseModal = () => {
//     setShowModal(false);
//     navigate("/books");
//   };

//   /* ===============================
//      UI
//   ================================ */

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-6 sm:p-8 md:p-10">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800">
//           Complete Your Payment
//         </h1>

//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>
//       </div>

//       {/* Main Layout */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* LEFT: PAYMENT METHODS */}
//         <motion.div
//           className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8"
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Choose Payment Method
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//             {[
//               {
//                 label: "Credit/Debit Card",
//                 icon: CreditCard,
//                 color: "from-green-500 to-emerald-600",
//               },
//               {
//                 label: "UPI / Wallet",
//                 icon: Wallet,
//                 color: "from-blue-500 to-indigo-600",
//               },
//               {
//                 label: "Net Banking",
//                 icon: Globe,
//                 color: "from-purple-500 to-fuchsia-600",
//               },
//             ].map(({ label, icon: Icon, color }) => (
//               <button
//                 key={label}
//                 onClick={() => setSelectedMethod(label)}
//                 className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white shadow-md transition-all cursor-pointer
//                   ${selectedMethod === label
//                     ? `bg-gradient-to-r ${color} scale-105`
//                     : `bg-gradient-to-r ${color} opacity-80 hover:opacity-100`
//                   }`}
//               >
//                 <Icon size={18} />
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* INPUTS */}
//           <AnimatePresence mode="wait">
//             {selectedMethod === "Credit/Debit Card" && (
//               <motion.div
//                 key="card"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-4 space-y-3"
//               >
//                 <input
//                   placeholder="Card Number"
//                   className="w-full p-3 border rounded-lg"
//                   value={cardDetails.number}
//                   onChange={(e) =>
//                     setCardDetails({ ...cardDetails, number: e.target.value })
//                   }
//                 />
//                 <div className="flex gap-3">
//                   <input
//                     placeholder="MM/YY"
//                     className="w-1/2 p-3 border rounded-lg"
//                     value={cardDetails.expiry}
//                     onChange={(e) =>
//                       setCardDetails({ ...cardDetails, expiry: e.target.value })
//                     }
//                   />
//                   <input
//                     placeholder="CVV"
//                     className="w-1/2 p-3 border rounded-lg"
//                     value={cardDetails.cvv}
//                     onChange={(e) =>
//                       setCardDetails({ ...cardDetails, cvv: e.target.value })
//                     }
//                   />
//                 </div>
//               </motion.div>
//             )}

//             {selectedMethod === "UPI / Wallet" && (
//               <motion.input
//                 key="upi"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 placeholder="Enter UPI ID"
//                 className="mt-4 w-full p-3 border rounded-lg"
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//               />
//             )}

//             {selectedMethod === "Net Banking" && (
//               <motion.select
//                 key="bank"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-4 w-full p-3 border rounded-lg"
//                 value={netBankingBank}
//                 onChange={(e) => setNetBankingBank(e.target.value)}
//               >
//                 <option value="">Select Bank</option>
//                 <option value="SBI">SBI</option>
//                 <option value="HDFC">HDFC</option>
//                 <option value="ICICI">ICICI</option>
//                 <option value="Axis">Axis</option>
//               </motion.select>
//             )}
//           </AnimatePresence>

//           {/* PAY BUTTON */}
//           {selectedMethod && (
//             <button
//               disabled={!isPayEnabled()}
//               onClick={handlePayment}
//               className={`mt-6 w-full py-3 rounded-xl font-bold transition-all
//                 ${isPayEnabled()
//                   ? "bg-green-600 text-white hover:scale-105 cursor-pointer"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//             >
//               Pay ₹{totalAmount}
//             </button>
//           )}
//         </motion.div>

//         {/* RIGHT: ORDER SUMMARY */}
//         <motion.div
//           className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8"
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//             <BookOpen className="text-amber-600" />
//             Order Summary
//           </h2>

//           <div className="max-h-60 overflow-y-auto">
//             {books.map((book) => (
//               <div
//                 key={book.id}
//                 className="flex justify-between border-b py-2"
//               >
//                 <span className="truncate">
//                   {book.title || book.bookName}
//                 </span>
//                 <span className="font-semibold">
//                   ₹{book.price ?? book.fees}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 border-t pt-4 flex justify-between text-lg font-bold">
//             <span>Total</span>
//             <span className="text-amber-700">₹{totalAmount}</span>
//           </div>
//         </motion.div>
//       </div>

//       {/* SUCCESS MODAL */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <motion.div className="bg-white p-8 rounded-2xl text-center w-96">
//               <CheckCircle className="text-green-500 mx-auto mb-4" size={56} />
//               <h2 className="text-2xl font-bold">Payment Successful</h2>
//               <p className="mt-2">
//                 You paid ₹{totalAmount} via <b>{selectedMethod}</b>
//               </p>
//               <button
//                 onClick={() => {
//                   window.location.href = "/";
//                 }} className="mt-6 bg-amber-500 text-white px-6 py-2 rounded-xl cursor-pointer"
//               >
//                 Continue
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Payment;


import { useState, useEffect } from "react";
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

  /* ===============================
      UNIVERSAL DATA HANDLING
   ================================ */

  // Buy books flow
  const issueBooks = location.state?.issueBooks || [];

  // Rent books flow
  const rentedBooks = location.state?.rentedBooks || [];

  // Decide which data to use
  const books = rentedBooks.length > 0 ? rentedBooks : issueBooks;

  // Calculate total (price for buy, fees for rent)
  const totalAmount = books.reduce(
    (sum, book) => sum + Number(book.price ?? book.fees ?? 0),
    0
  );

  // Redirect if user opens payment page directly
  useEffect(() => {
    if (!books.length) {
      navigate("/books");
    }
  }, [books, navigate]);

  /* ===============================
      STATES
   ================================ */

  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [netBankingBank, setNetBankingBank] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ===============================
      HELPERS
   ================================ */

  const isPayEnabled = () => {
    if (!selectedMethod) return false;

    if (selectedMethod === "Credit/Debit Card") {
      return cardDetails.number && cardDetails.expiry && cardDetails.cvv;
    }

    if (selectedMethod === "UPI / Wallet") {
      return upiId.trim() !== "";
    }

    if (selectedMethod === "Net Banking") {
      return netBankingBank.trim() !== "";
    }

    return false;
  };

  const handlePayment = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/books");
  };

  /* ===============================
      UI
   ================================ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 md:p-10 transition-colors duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800 dark:text-amber-500">
          Complete Your Payment
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: PAYMENT METHODS */}
        <motion.div
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-amber-200 dark:border-slate-700 rounded-2xl shadow-xl p-8 transition-colors"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
            Choose Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white shadow-md transition-all cursor-pointer
                  ${selectedMethod === label
                    ? `bg-gradient-to-r ${color} scale-105`
                    : `bg-gradient-to-r ${color} opacity-80 hover:opacity-100`
                  }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* INPUTS */}
          <AnimatePresence mode="wait">
            {selectedMethod === "Credit/Debit Card" && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-3"
              >
                <input
                  placeholder="Card Number"
                  className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />
                <div className="flex gap-3">
                  <input
                    placeholder="MM/YY"
                    className="w-1/2 p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                  />
                  <input
                    placeholder="CVV"
                    className="w-1/2 p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                  />
                </div>
              </motion.div>
            )}

            {selectedMethod === "UPI / Wallet" && (
              <motion.input
                key="upi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                placeholder="Enter UPI ID"
                className="mt-4 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            )}

            {selectedMethod === "Net Banking" && (
              <motion.select
                key="bank"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={netBankingBank}
                onChange={(e) => setNetBankingBank(e.target.value)}
              >
                <option value="" className="dark:bg-slate-800">Select Bank</option>
                <option value="SBI" className="dark:bg-slate-800">SBI</option>
                <option value="HDFC" className="dark:bg-slate-800">HDFC</option>
                <option value="ICICI" className="dark:bg-slate-800">ICICI</option>
                <option value="Axis" className="dark:bg-slate-800">Axis</option>
              </motion.select>
            )}
          </AnimatePresence>

          {/* PAY BUTTON */}
          {selectedMethod && (
            <button
              disabled={!isPayEnabled()}
              onClick={handlePayment}
              className={`mt-6 w-full py-3 rounded-xl font-bold transition-all
                ${isPayEnabled()
                  ? "bg-green-600 text-white hover:scale-105 cursor-pointer shadow-lg shadow-green-900/20"
                  : "bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-500 cursor-not-allowed"
                }`}
            >
              Pay ₹{totalAmount}
            </button>
          )}
        </motion.div>

        {/* RIGHT: ORDER SUMMARY */}
        <motion.div
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-amber-200 dark:border-slate-700 rounded-2xl shadow-xl p-8 transition-colors"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <BookOpen className="text-amber-600 dark:text-amber-500" />
            Order Summary
          </h2>

          <div className="max-h-60 overflow-y-auto">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex justify-between border-b dark:border-slate-700 py-2"
              >
                <span className="truncate dark:text-slate-300">
                  {book.title || book.bookName}
                </span>
                <span className="font-semibold dark:text-slate-100">
                  ₹{book.price ?? book.fees}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t dark:border-slate-700 pt-4 flex justify-between text-lg font-bold">
            <span className="dark:text-slate-100">Total</span>
            <span className="text-amber-700 dark:text-amber-500">₹{totalAmount}</span>
          </div>
        </motion.div>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl text-center w-full max-w-sm shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle className="text-green-500 mx-auto mb-4" size={56} />
              <h2 className="text-2xl font-bold dark:text-white">Payment Successful</h2>
              <p className="mt-2 dark:text-slate-300">
                You paid ₹{totalAmount} via <b className="dark:text-amber-500">{selectedMethod}</b>
              </p>
              <button
                onClick={() => {
                  window.location.href = "/";
                }} className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl cursor-pointer font-bold transition-all shadow-lg shadow-amber-900/20"
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
