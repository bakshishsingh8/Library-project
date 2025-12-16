// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { CreditCard, ArrowLeft, Wallet, Globe, CheckCircle, BookOpen, ShoppingBag } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// function CombinedPayment() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // 1. Retrieve Data passed from CombinedOrderView
//   const { buyItems = [], rentItems = [], grandTotal = 0 } = location.state || {};

//   // Redirect if no data
//   useEffect(() => {
//     if (buyItems.length === 0 && rentItems.length === 0) {
//       navigate("/combined-orders"); // or wherever your main view is
//     }
//   }, [buyItems, rentItems, navigate]);

//   /* --- STATES (Same as your original Payment) --- */
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
//   const [upiId, setUpiId] = useState("");
//   const [netBankingBank, setNetBankingBank] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   /* --- HELPERS --- */
//   const isPayEnabled = () => {
//     if (!selectedMethod) return false;
//     if (selectedMethod === "Card") return cardDetails.number && cardDetails.expiry && cardDetails.cvv;
//     if (selectedMethod === "UPI") return upiId.trim() !== "";
//     if (selectedMethod === "NetBanking") return netBankingBank.trim() !== "";
//     return false;
//   };

//   const handlePayment = () => setShowModal(true);

//   const handleCloseModal = () => {
//     setShowModal(false);
//     navigate("/"); // Navigate to home or dashboard after success
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 pb-24 md:pb-10">

//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md  shadow-sm border-b border-amber-200 mb-15 px-6 py-[10px] flex justify-between items-center">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800">Checkout</h1>
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-5 py-2  cursor-pointer hover:bg-white text-amber-800 bg-amber-100 font-medium rounded-xl shadow transition-all">
//           <ArrowLeft size={18} /> Back
//         </button>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* --- LEFT: PAYMENT METHODS (Identical logic to your original) --- */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           className="bg-gradient-to-r from-orange-200 to-amber-100 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8"
//         >
//           <h2 className="text-xl font-semibold text-gray-800 pl-4 bg-amber-50 rounded-2xl p-3 mb-4 pb-4 border-b">
//   Payment Method
// </h2>


//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3  mb-6">
//             {[
//               {
//                 id: "Card",
//                 label: "Card",
//                 icon: CreditCard,
//                 // Define full Tailwind classes explicitly so JIT picks them up
//                 borderColor: "border-green-500",
//                 activeText: "text-green-600"
//               },
//               {
//                 id: "UPI",
//                 label: "UPI",
//                 icon: Wallet,
//                 borderColor: "border-blue-500",
//                 activeText: "text-blue-600"
//               },
//               {
//                 id: "NetBanking",
//                 label: "NetBanking",
//                 icon: Globe,
//                 borderColor: "border-purple-500",
//                 activeText: "text-purple-600"
//               },
//             ].map((m) => (
//               <button
//                 key={m.id}
//                 onClick={() => setSelectedMethod(m.id)}
//                 // Use the explicit classes directly
//                 className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
//         ${selectedMethod === m.id
//                     ? `${m.borderColor} bg-gray-50 text-gray-900 shadow-inner`
//                     : "border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200"
//                   }`}
//               >
//                 {/* Optional: Use the specific color for the icon too */}
//                 <m.icon
//                   size={24}
//                   className={selectedMethod === m.id ? m.activeText : "text-gray-400"}
//                 />
//                 <span className="font-semibold">{m.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* Form Inputs based on selection */}
//           <div className="min-h-[150px]">
//             {selectedMethod === "Card" && (
//               <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
//                 <input placeholder="Card Number" className="w-full p-3 border rounded-lg bg-gray-50"
//                   value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })} />
//                 <div className="flex gap-3">
//                   <input placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg bg-gray-50"
//                     value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
//                   <input placeholder="CVV" className="w-1/2 p-3 border rounded-lg bg-gray-50"
//                     value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
//                 </div>
//               </div>
//             )}
//             {selectedMethod === "UPI" && (
//               <input placeholder="Enter UPI ID (e.g. user@oksbi)" className="w-full p-3 border rounded-lg bg-gray-50 animate-in fade-in slide-in-from-bottom-4"
//                 value={upiId} onChange={e => setUpiId(e.target.value)} />
//             )}
//             {selectedMethod === "NetBanking" && (
//               <select className="w-full p-3 border rounded-lg bg-gray-50 animate-in fade-in slide-in-from-bottom-4"
//                 value={netBankingBank} onChange={e => setNetBankingBank(e.target.value)}>
//                 <option value="">Select Bank</option>
//                 <option value="HDFC">HDFC</option>
//                 <option value="SBI">SBI</option>
//               </select>
//             )}
//             {!selectedMethod && <p className="text-gray-400 text-center pt-8">Select a method to proceed</p>}
//           </div>

//           <button
//             disabled={!isPayEnabled()}
//             onClick={handlePayment}
//             className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all
//               ${isPayEnabled() ? "bg-gradient-to-r from-orange-400 to-amber-300 cursor-pointer text-white hover:bg-amber-400 shadow-lg hover:scale-[1.02]" : "bg-gray-200 text-gray-400"}`}
//           >
//             Pay ₹{grandTotal}
//           </button>
//         </motion.div>

//         {/* --- RIGHT: COMBINED ORDER SUMMARY --- */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//           className="bg-gradient-to-r to-orange-200 from-amber-100 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8 flex flex-col h-fit"
//         >
//           <h2 className="text-xl font-semibold text-gray-800 bg-amber-50 pl-4 rounded-2xl p-3  mb-4 pb-4 border-b">Order Summary</h2>

//           <div className="flex-1 overflow-y-auto max-h-[400px] space-y-6 pr-2">

//             {/* 1. Buying Section */}
//             {buyItems.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-2">
//                   <ShoppingBag size={14} /> Purchasing
//                 </h3>
//                 {buyItems.map((item, i) => (
//                   <div key={`buy-${i}`} className="flex justify-between py-2 text-sm">
//                     <span className="text-gray-700 truncate w-2/3">{item.title}</span>
//                     <span className="font-semibold">₹{item.price}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* 2. Renting Section */}
//             {rentItems.length > 0 && (
//               <div className={`${buyItems.length > 0 ? "border-t pt-4" : ""}`}>
//                 <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-2">
//                   <BookOpen size={14} /> Renting
//                 </h3>
//                 {rentItems.map((item, i) => (
//                   <div key={`rent-${i}`} className="flex justify-between py-2 text-sm">
//                     <span className="text-gray-700 truncate w-2/3">
//                       {item.bookName} <span className="text-xs text-gray-400">({item.studentName})</span>
//                     </span>
//                     <span className="font-semibold">₹{item.fees}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="mt-6 border-t pt-6">
//             <div className="flex justify-between text-xl font-extrabold text-gray-900">
//               <span>Total Amount</span>
//               <span>₹{grandTotal}</span>
//             </div>
//             <p className="text-xs text-gray-500 mt-2 text-right">
//               Includes all taxes and rental fees
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       {/* SUCCESS MODAL */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
//               className="bg-white p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl"
//             >
//               <CheckCircle className="text-green-500 mx-auto mb-6" size={64} />
//               <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
//               <p className="text-gray-600 mt-2">
//                 You have successfully paid <span className="font-bold text-gray-900">₹{grandTotal}</span>
//               </p>
//               <div className="mt-4 bg-gray-50 p-4 rounded-xl text-sm text-left space-y-1">
//                 <p>Books Bought: <b>{buyItems.length}</b></p>
//                 <p>Books Rented: <b>{rentItems.length}</b></p>
//               </div>
//               <button onClick={handleCloseModal} className="mt-6 w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700">
//                 Continue Shopping
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default CombinedPayment;




import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, ArrowLeft, Wallet, Globe, CheckCircle, BookOpen, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CombinedPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Retrieve Data passed from CombinedOrderView
  const { buyItems = [], rentItems = [], grandTotal = 0 } = location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (buyItems.length === 0 && rentItems.length === 0) {
      navigate("/combined-orders");
    }
  }, [buyItems, rentItems, navigate]);

  /* --- STATES --- */
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [netBankingBank, setNetBankingBank] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* --- HELPERS --- */
  const isPayEnabled = () => {
    if (!selectedMethod) return false;
    if (selectedMethod === "Card") return cardDetails.number && cardDetails.expiry && cardDetails.cvv;
    if (selectedMethod === "UPI") return upiId.trim() !== "";
    if (selectedMethod === "NetBanking") return netBankingBank.trim() !== "";
    return false;
  };

  const handlePayment = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/"); 
  };

  return (
    // Matches Payment Page Background
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-6 sm:p-8 md:p-10 font-sans">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800">
          Checkout
        </h1>

        <button
          onClick={() => navigate(-1)}
          // Matches Payment Page Back Button
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* --- LEFT: PAYMENT METHODS --- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
          // Matches Payment Page Card Style (Glassmorphism + Amber Border)
          className="bg-white/80 backdrop-blur-lg h-115 border border-amber-200 rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
             Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              {
                id: "Card",
                label: "Card",
                icon: CreditCard,
                // Matches Payment Page Gradients
                color: "from-green-500 to-emerald-600"
              },
              {
                id: "UPI",
                label: "UPI",
                icon: Wallet,
                color: "from-blue-500 to-indigo-600"
              },
              {
                id: "NetBanking",
                label: "NetBanking",
                icon: Globe,
                color: "from-purple-500 to-fuchsia-600"
              },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                // Matches Payment Page Button Logic
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-semibold text-white shadow-md transition-all cursor-pointer
                  ${selectedMethod === m.id
                    ? `bg-gradient-to-r ${m.color} scale-105`
                    : `bg-gradient-to-r ${m.color} opacity-80 hover:opacity-100`
                  }`}
              >
                <m.icon size={24} />
                <span className="text-sm">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Form Inputs based on selection */}
          <div className="min-h-[150px]">
            <AnimatePresence mode="wait">
              {selectedMethod === "Card" && (
                <motion.div 
                  key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <input placeholder="Card Number" className="w-full p-3 border rounded-lg"
                    value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })} />
                  <div className="flex gap-3">
                    <input placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg"
                      value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                    <input placeholder="CVV" className="w-1/2 p-3 border rounded-lg"
                      value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                  </div>
                </motion.div>
              )}
              {selectedMethod === "UPI" && (
                <motion.input 
                  key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  placeholder="Enter UPI ID (e.g. user@oksbi)" className="w-full p-3 border rounded-lg"
                  value={upiId} onChange={e => setUpiId(e.target.value)} />
              )}
              {selectedMethod === "NetBanking" && (
                <motion.select 
                  key="netbanking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full p-3 border rounded-lg"
                  value={netBankingBank} onChange={e => setNetBankingBank(e.target.value)}>
                  <option value="">Select Bank</option>
                  <option value="HDFC">HDFC</option>
                  <option value="SBI">SBI</option>
                  <option value="ICICI">ICICI</option>
                  <option value="Axis">Axis</option>
                </motion.select>
              )}
            </AnimatePresence>
            {!selectedMethod && <p className="text-gray-400 text-center pt-8">Select a method above</p>}
          </div>

          <button
            disabled={!isPayEnabled()}
            onClick={handlePayment}
            // Matches Payment Page "Pay" Button (Green when active)
            className={`mt-6 w-full py-3 rounded-xl font-bold transition-all
              ${isPayEnabled() 
                ? "bg-green-600 text-white hover:scale-105 cursor-pointer shadow-lg" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            Pay ₹{grandTotal}
          </button>
        </motion.div>

        {/* --- RIGHT: COMBINED ORDER SUMMARY --- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8 flex flex-col h-fit"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
             <ShoppingBag className="text-amber-600" />
             Order Summary
          </h2>

          <div className="flex-1 overflow-y-auto  p-2 rounded-2xl max-h-[400px] space-y-6 pr-2">
            {/* 1. Buying Section */}
            {buyItems.length > 0 && (
              <div className="bg-amber-100 p-2 px-3 rounded-2xl">
                <h3 className="text-sm font-bold text-amber-700  uppercase tracking-wider mb-2 flex items-center gap-2">
                  Purchasing
                </h3>
                {buyItems.map((item, i) => (
                  <div key={`buy-${i}`} className="flex justify-between py-2 text-sm border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 truncate w-2/3">{item.title}</span>
                    <span className="font-semibold text-gray-900">₹{item.price}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Renting Section */}
            {rentItems.length > 0 && (
              <div className={`${buyItems.length > 0 ? "border-t border-dashed px-3 bg-blue-100 p-2 rounded-2xl border-amber-300 pt-4" : ""}`}>
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  Renting
                </h3>
                {rentItems.map((item, i) => (
                  <div key={`rent-${i}`} className="flex justify-between py-2 text-sm border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 truncate w-2/3">
                      {item.bookName} <span className="text-xs text-gray-400">({item.studentName})</span>
                    </span>
                    <span className="font-semibold text-gray-900">₹{item.fees}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-amber-200 pt-6">
            <div className="flex justify-between text-xl font-extrabold text-gray-800">
              <span>Total Amount</span>
              <span className="text-amber-700">₹{grandTotal}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">
              Includes all taxes
            </p>
          </div>
        </motion.div>
      </div>

      {/* SUCCESS MODAL (Matches Payment Page Modal) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="bg-white p-8 rounded-2xl text-center max-w-sm w-full shadow-2xl"
            >
              <CheckCircle className="text-green-500 mx-auto mb-6" size={56} />
              <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
              <p className="text-gray-600 mt-2">
                You paid <span className="font-bold text-gray-900">₹{grandTotal}</span> via <b>{selectedMethod}</b>
              </p>
              
              <div className="mt-4 bg-gray-50 p-4 rounded-xl text-sm text-left space-y-1">
                <p>Books Bought: <b>{buyItems.length}</b></p>
                <p>Books Rented: <b>{rentItems.length}</b></p>
              </div>

              <button onClick={handleCloseModal} className="mt-6 w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 shadow-lg">
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CombinedPayment;