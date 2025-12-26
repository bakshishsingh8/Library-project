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
//       navigate("/combined-orders");
//     }
//   }, [buyItems, rentItems, navigate]);

//   /* --- STATES --- */
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
//     navigate("/");
//   };

//   return (
//     // Matches Payment Page Background
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-6 sm:p-8 md:p-10 font-sans">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800">
//           Checkout
//         </h1>

//         <button
//           onClick={() => navigate(-1)}
//           // Matches Payment Page Back Button
//           className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* --- LEFT: PAYMENT METHODS --- */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
//           // Matches Payment Page Card Style (Glassmorphism + Amber Border)
//           className="bg-white/80 backdrop-blur-lg h-115 border border-amber-200 rounded-2xl shadow-xl p-8"
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Payment Method
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
//             {[
//               {
//                 id: "Card",
//                 label: "Card",
//                 icon: CreditCard,
//                 // Matches Payment Page Gradients
//                 color: "from-green-500 to-emerald-600"
//               },
//               {
//                 id: "UPI",
//                 label: "UPI",
//                 icon: Wallet,
//                 color: "from-blue-500 to-indigo-600"
//               },
//               {
//                 id: "NetBanking",
//                 label: "NetBanking",
//                 icon: Globe,
//                 color: "from-purple-500 to-fuchsia-600"
//               },
//             ].map((m) => (
//               <button
//                 key={m.id}
//                 onClick={() => setSelectedMethod(m.id)}
//                 // Matches Payment Page Button Logic
//                 className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-semibold text-white shadow-md transition-all cursor-pointer
//                   ${selectedMethod === m.id
//                     ? `bg-gradient-to-r ${m.color} scale-105`
//                     : `bg-gradient-to-r ${m.color} opacity-80 hover:opacity-100`
//                   }`}
//               >
//                 <m.icon size={24} />
//                 <span className="text-sm">{m.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* Form Inputs based on selection */}
//           <div className="min-h-[150px]">
//             <AnimatePresence mode="wait">
//               {selectedMethod === "Card" && (
//                 <motion.div
//                   key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//                   className="space-y-3"
//                 >
//                   <input placeholder="Card Number" className="w-full p-3 border rounded-lg"
//                     value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })} />
//                   <div className="flex gap-3">
//                     <input placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg"
//                       value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
//                     <input placeholder="CVV" className="w-1/2 p-3 border rounded-lg"
//                       value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
//                   </div>
//                 </motion.div>
//               )}
//               {selectedMethod === "UPI" && (
//                 <motion.input
//                   key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//                   placeholder="Enter UPI ID (e.g. user@oksbi)" className="w-full p-3 border rounded-lg"
//                   value={upiId} onChange={e => setUpiId(e.target.value)} />
//               )}
//               {selectedMethod === "NetBanking" && (
//                 <motion.select
//                   key="netbanking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//                   className="w-full p-3 border rounded-lg"
//                   value={netBankingBank} onChange={e => setNetBankingBank(e.target.value)}>
//                   <option value="">Select Bank</option>
//                   <option value="HDFC">HDFC</option>
//                   <option value="SBI">SBI</option>
//                   <option value="ICICI">ICICI</option>
//                   <option value="Axis">Axis</option>
//                 </motion.select>
//               )}
//             </AnimatePresence>
//             {!selectedMethod && <p className="text-gray-400 text-center pt-8">Select a method above</p>}
//           </div>

//           <button
//             disabled={!isPayEnabled()}
//             onClick={handlePayment}
//             // Matches Payment Page "Pay" Button (Green when active)
//             className={`mt-6 w-full py-3 rounded-xl font-bold transition-all
//               ${isPayEnabled()
//                 ? "bg-green-600 text-white hover:scale-105 cursor-pointer shadow-lg"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
//           >
//             Pay ₹{grandTotal}
//           </button>
//         </motion.div>

//         {/* --- RIGHT: COMBINED ORDER SUMMARY --- */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
//           className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl shadow-xl p-8 flex flex-col h-fit"
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//             <ShoppingBag className="text-amber-600" />
//             Order Summary
//           </h2>

//           <div className="flex-1 overflow-y-auto  p-2 rounded-2xl max-h-[400px] space-y-6 pr-2">
//             {/* 1. Buying Section */}
//             {buyItems.length > 0 && (
//               <div className="bg-amber-100 p-2 px-3 rounded-2xl">
//                 <h3 className="text-sm font-bold text-amber-700  uppercase tracking-wider mb-2 flex items-center gap-2">
//                   Purchasing
//                 </h3>
//                 {buyItems.map((item, i) => (
//                   <div key={`buy-${i}`} className="flex justify-between py-2 text-sm border-b border-gray-100 last:border-0">
//                     <span className="text-gray-700 truncate w-2/3">{item.title}</span>
//                     <span className="font-semibold text-gray-900">₹{item.price}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* 2. Renting Section */}
//             {rentItems.length > 0 && (
//               <div className={`${buyItems.length > 0 ? "border-t border-dashed px-3 bg-blue-100 p-2 rounded-2xl border-amber-300 pt-4" : ""}`}>
//                 <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
//                   Renting
//                 </h3>
//                 {rentItems.map((item, i) => (
//                   <div key={`rent-${i}`} className="flex justify-between py-2 text-sm border-b border-gray-100 last:border-0">
//                     <span className="text-gray-700 truncate w-2/3">
//                       {item.bookName} <span className="text-xs text-gray-400">({item.studentName})</span>
//                     </span>
//                     <span className="font-semibold text-gray-900">₹{item.fees}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="mt-6 border-t border-amber-200 pt-6">
//             <div className="flex justify-between text-xl font-extrabold text-gray-800">
//               <span>Total Amount</span>
//               <span className="text-amber-700">₹{grandTotal}</span>
//             </div>
//             <p className="text-xs text-gray-500 mt-2 text-right">
//               Includes all taxes
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       {/* SUCCESS MODAL (Matches Payment Page Modal) */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
//               className="bg-white p-8 rounded-2xl text-center max-w-sm w-full shadow-2xl"
//             >
//               <CheckCircle className="text-green-500 mx-auto mb-6" size={56} />
//               <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
//               <p className="text-gray-600 mt-2">
//                 You paid <span className="font-bold text-gray-900">₹{grandTotal}</span> via <b>{selectedMethod}</b>
//               </p>

//               <div className="mt-4 bg-gray-50 p-4 rounded-xl text-sm text-left space-y-1">
//                 <p>Books Bought: <b>{buyItems.length}</b></p>
//                 <p>Books Rented: <b>{rentItems.length}</b></p>
//               </div>

//               <button
//                 onClick={() => {
//                   window.location.href = "/";
//                 }}
//                 className="mt-6 w-full bg-amber-500 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-amber-600 shadow-lg"
//               >
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

//////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { CreditCard, ArrowLeft, Wallet, Globe, CheckCircle, ShoppingBag, Layers, ShieldCheck, Lock } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Background from "../Components/blurBackground";

// function CombinedPayment() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { buyItems = [], rentItems = [], grandTotal = 0 } = location.state || {};

//   // Calculate separate totals
//   const buyTotal = buyItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
//   const rentTotal = rentItems.reduce((sum, item) => sum + Number(item.fees || 0), 0);

//   useEffect(() => {
//     if (buyItems.length === 0 && rentItems.length === 0) {
//       navigate("/combined-orders");
//     }
//   }, [buyItems, rentItems, navigate]);

//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
//   const [upiId, setUpiId] = useState("");
//   const [netBankingBank, setNetBankingBank] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const isPayEnabled = () => {
//     if (!selectedMethod) return false;
//     if (selectedMethod === "Card") return cardDetails.number && cardDetails.expiry && cardDetails.cvv;
//     if (selectedMethod === "UPI") return upiId.trim() !== "";
//     if (selectedMethod === "NetBanking") return netBankingBank.trim() !== "";
//     return false;
//   };

//   return (
//     <div className="relative h-screen w-full bg-transparent overflow-hidden flex flex-col antialiased
//                     bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200">
//       <Background />

//       {/* Header */}
//       <div className="bg-white/70 backdrop-blur-md z-50 border-b border-amber-200 px-6 py-4 flex justify-between items-center shadow-sm shrink-0">
//         <h1 className="text-xl md:text-2xl font-extrabold text-amber-900 flex items-center gap-2">
//           <Layers className="text-orange-500" />
//           Checkout Console
//         </h1>
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white text-amber-800 border border-amber-200 font-semibold rounded-xl transition-all cursor-pointer shadow-sm"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 w-full max-w-[1300px] mx-auto p-4 md:p-10 overflow-hidden">
//         <div className="flex flex-col lg:flex-row gap-8 items-start justify-center h-full overflow-hidden">
          
//           {/* --- LEFT: PAYMENT METHODS (Lighter Blur) --- */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
//             className="w-full lg:w-[500px] bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl flex flex-col h-full overflow-hidden"
//           >
//             <div className="bg-amber-500/10 p-6 border-b border-amber-100 flex justify-between items-center">
//               <h2 className="font-black text-xl text-amber-950 flex items-center gap-2">
//                 <ShieldCheck size={24} className="text-orange-600"/> Payment
//               </h2>
//               <Lock size={18} className="text-amber-900" />
//             </div>

//             <div className="p-8 space-y-8 flex-1 overflow-y-auto scrollbar-hide">
//               <div className="grid grid-cols-3 gap-3">
//                 {[
//                   { id: "Card", label: "Card", icon: CreditCard, color: "from-orange-500 to-amber-600" },
//                   { id: "UPI", label: "UPI", icon: Wallet, color: "from-orange-400 to-orange-500" },
//                   { id: "NetBanking", label: "Net", icon: Globe, color: "from-amber-600 to-orange-700" },
//                 ].map((m) => (
//                   <button
//                     key={m.id}
//                     onClick={() => setSelectedMethod(m.id)}
//                     className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl font-bold transition-all cursor-pointer border-2
//                       ${selectedMethod === m.id 
//                         ? `bg-gradient-to-br ${m.color} text-white border-transparent scale-105 shadow-lg` 
//                         : `bg-white/60 text-amber-900 border-amber-100 hover:border-orange-200`}`}
//                   >
//                     <m.icon size={24} />
//                     <span className="text-[10px] uppercase tracking-wider">{m.label}</span>
//                   </button>
//                 ))}
//               </div>

//               <div className="space-y-4">
//                 <AnimatePresence mode="wait">
//                   {selectedMethod ? (
//                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
//                       {selectedMethod === "Card" && (
//                         <div className="space-y-3">
//                            <input placeholder="Card Number" className="w-full p-4 bg-white/90 border border-amber-100 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none shadow-sm" 
//                             value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })} />
//                           <div className="flex gap-3">
//                             <input placeholder="MM/YY" className="w-1/2 p-4 bg-white/90 border border-amber-100 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none shadow-sm" 
//                               value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
//                             <input placeholder="CVV" className="w-1/2 p-4 bg-white/90 border border-amber-100 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none shadow-sm" 
//                               value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
//                           </div>
//                         </div>
//                       )}
//                       {selectedMethod === "UPI" && (
//                         <input placeholder="Enter UPI ID" className="w-full p-4 bg-white/90 border border-amber-100 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
//                           value={upiId} onChange={e => setUpiId(e.target.value)} />
//                       )}
//                       {selectedMethod === "NetBanking" && (
//                         <select className="w-full p-4 bg-white/90 border border-amber-100 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
//                           value={netBankingBank} onChange={e => setNetBankingBank(e.target.value)}>
//                           <option value="">Select Bank</option>
//                           <option value="HDFC">HDFC Bank</option>
//                           <option value="SBI">SBI</option>
//                         </select>
//                       )}
//                     </motion.div>
//                   ) : (
//                     <div className="text-center py-12 border-2 border-dashed border-amber-200/50 rounded-3xl">
//                       <p className="text-amber-800/40 font-bold italic text-sm">Choose a payment mode</p>
//                     </div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
            
//             <div className="p-6 bg-white/30 border-t border-amber-100">
//                <button
//                   onClick={() => setShowModal(true)}
//                   disabled={!isPayEnabled()}
//                   className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg
//                     ${isPayEnabled() 
//                       ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white cursor-pointer hover:brightness-110" 
//                       : "bg-amber-100 text-amber-300 cursor-not-allowed"}`}
//                 >
//                   Pay ₹{grandTotal}
//                 </button>
//             </div>
//           </motion.div>

//           {/* --- RIGHT: LIGHT THEME SUMMARY (More Clear Blur) --- */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//             className="w-full lg:flex-1 h-full overflow-hidden"
//           >
//             <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl flex flex-col h-full overflow-hidden">
//               <div className="bg-orange-500/10 p-6 border-b border-orange-100">
//                 <h2 className="font-black text-xl text-amber-950 flex items-center gap-2">
//                   <ShoppingBag size={24} className="text-orange-600"/> Order Summary
//                 </h2>
//               </div>

//               <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
//                 {/* Buying - Lite Amber */}
//                 {buyItems.length > 0 && (
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center mb-1">
//                       <h3 className="text-[11px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
//                         Purchasing ({buyItems.length})
//                       </h3>
//                       <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-lg">Subtotal: ₹{buyTotal}</span>
//                     </div>
//                     <div className="bg-amber-400/5 rounded-2xl p-4 border border-amber-100/50 space-y-2">
//                       {buyItems.map((item, i) => (
//                         <div key={i} className="flex justify-between items-center text-sm">
//                           <span className="text-amber-950 font-medium truncate w-2/3">{item.title}</span>
//                           <span className="text-amber-700 font-bold">₹{item.price}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Renting - Lite Blue */}
//                 {rentItems.length > 0 && (
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center mb-1">
//                       <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
//                         Rentals ({rentItems.length})
//                       </h3>
//                       <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg">Subtotal: ₹{rentTotal}</span>
//                     </div>
//                     <div className="bg-blue-400/5 rounded-2xl p-4 border border-blue-100/50 space-y-2">
//                       {rentItems.map((item, i) => (
//                         <div key={i} className="flex justify-between items-center text-sm">
//                           <span className="text-blue-900 font-medium truncate w-2/3">{item.bookName}</span>
//                           <span className="text-blue-700 font-bold">₹{item.fees}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Final Footer Area */}
//               <div className="p-8 bg-white/20 border-t border-amber-100">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-[10px] font-black text-amber-800/60 uppercase tracking-widest">Grand Total</p>
//                     <h4 className="text-5xl font-black text-orange-600 tracking-tight">₹{grandTotal}</h4>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-[11px] font-bold text-amber-900">Final Amount</p>
//                     <p className="text-[10px] text-gray-400 italic">Secure checkout enabled</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//         </div>
//       </div>

//       {/* Success Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div className="fixed inset-0 bg-amber-950/30 backdrop-blur-md flex items-center justify-center z-[100]"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} 
//               className="bg-white p-10 rounded-[3rem] text-center max-w-sm w-full shadow-2xl border border-amber-100">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                  <CheckCircle className="text-green-500" size={48} />
//               </div>
//               <h2 className="text-2xl font-black text-amber-950">Payment Success!</h2>
//               <p className="text-gray-500 mt-2 italic">You successfully paid ₹{grandTotal}</p>
//               <button onClick={() => window.location.href = "/"}
//                 className="mt-8 w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-black py-4 cursor-pointer rounded-2xl shadow-lg">
//                 Continue
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
import { CreditCard, ArrowLeft, Wallet, Globe, CheckCircle, ShoppingBag, Layers, ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../Components/blurBackground";

function CombinedPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { buyItems = [], rentItems = [], grandTotal = 0 } = location.state || {};

  // Calculate separate totals
  const buyTotal = buyItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const rentTotal = rentItems.reduce((sum, item) => sum + Number(item.fees || 0), 0);

  useEffect(() => {
    if (buyItems.length === 0 && rentItems.length === 0) {
      navigate("/combined-orders");
    }
  }, [buyItems, rentItems, navigate]);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [netBankingBank, setNetBankingBank] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isPayEnabled = () => {
    if (!selectedMethod) return false;
    if (selectedMethod === "Card") return cardDetails.number && cardDetails.expiry && cardDetails.cvv;
    if (selectedMethod === "UPI") return upiId.trim() !== "";
    if (selectedMethod === "NetBanking") return netBankingBank.trim() !== "";
    return false;
  };

  return (
    <div className="relative h-screen w-full bg-transparent overflow-hidden flex flex-col antialiased
                    bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <Background />

      {/* Header */}
      <div className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-amber-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm shrink-0 transition-colors">
        <h1 className="text-xl md:text-2xl font-extrabold text-amber-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="text-orange-500" />
          Checkout Console
        </h1>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-amber-800 dark:text-slate-200 border border-amber-200 dark:border-slate-700 font-semibold rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1300px] mx-auto p-4 md:p-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center h-full overflow-hidden">
          
          {/* --- LEFT: PAYMENT METHODS (Lighter Blur) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[500px] bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl flex flex-col h-full overflow-hidden transition-colors"
          >
            <div className="bg-amber-500/10 dark:bg-orange-500/5 p-6 border-b border-amber-100 dark:border-slate-700 flex justify-between items-center">
              <h2 className="font-black text-xl text-amber-950 dark:text-slate-100 flex items-center gap-2">
                <ShieldCheck size={24} className="text-orange-600"/> Payment
              </h2>
              <Lock size={18} className="text-amber-900 dark:text-slate-400" />
            </div>

            <div className="p-8 space-y-8 flex-1 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "Card", label: "Card", icon: CreditCard, color: "from-orange-500 to-amber-600" },
                  { id: "UPI", label: "UPI", icon: Wallet, color: "from-orange-400 to-orange-500" },
                  { id: "NetBanking", label: "Net", icon: Globe, color: "from-amber-600 to-orange-700" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl font-bold transition-all cursor-pointer border-2
                      ${selectedMethod === m.id 
                        ? `bg-gradient-to-br ${m.color} text-white border-transparent scale-105 shadow-lg` 
                        : `bg-white/60 dark:bg-slate-700/60 text-amber-900 dark:text-slate-300 border-amber-100 dark:border-slate-600 hover:border-orange-200 dark:hover:border-orange-500`}`}
                  >
                    <m.icon size={24} />
                    <span className="text-[10px] uppercase tracking-wider">{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {selectedMethod ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      {selectedMethod === "Card" && (
                        <div className="space-y-3">
                            <input placeholder="Card Number" className="w-full p-4 bg-white/90 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-400 dark:text-white dark:placeholder-slate-500 outline-none shadow-sm transition-all" 
                            value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })} />
                          <div className="flex gap-3">
                            <input placeholder="MM/YY" className="w-1/2 p-4 bg-white/90 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-400 dark:text-white dark:placeholder-slate-500 outline-none shadow-sm transition-all" 
                              value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                            <input placeholder="CVV" className="w-1/2 p-4 bg-white/90 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-400 dark:text-white dark:placeholder-slate-500 outline-none shadow-sm transition-all" 
                              value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                          </div>
                        </div>
                      )}
                      {selectedMethod === "UPI" && (
                        <input placeholder="Enter UPI ID" className="w-full p-4 bg-white/90 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-400 dark:text-white dark:placeholder-slate-500 outline-none shadow-sm transition-all"
                          value={upiId} onChange={e => setUpiId(e.target.value)} />
                      )}
                      {selectedMethod === "NetBanking" && (
                        <select className="w-full p-4 bg-white/90 dark:bg-slate-800 border border-amber-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-400 dark:text-white outline-none shadow-sm transition-all"
                          value={netBankingBank} onChange={e => setNetBankingBank(e.target.value)}>
                          <option value="" className="dark:bg-slate-900">Select Bank</option>
                          <option value="HDFC" className="dark:bg-slate-900">HDFC Bank</option>
                          <option value="SBI" className="dark:bg-slate-900">SBI</option>
                        </select>
                      )}
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-amber-200/50 dark:border-slate-700 rounded-3xl transition-colors">
                      <p className="text-amber-800/40 dark:text-slate-500 font-bold italic text-sm">Choose a payment mode</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="p-6 bg-white/30 dark:bg-slate-900/30 border-t border-amber-100 dark:border-slate-700 transition-colors">
               <button
                  onClick={() => setShowModal(true)}
                  disabled={!isPayEnabled()}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg
                    ${isPayEnabled() 
                      ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white cursor-pointer hover:brightness-110 shadow-orange-500/20" 
                      : "bg-amber-100 dark:bg-slate-800 text-amber-300 dark:text-slate-600 cursor-not-allowed"}`}
                >
                  Pay ₹{grandTotal}
                </button>
            </div>
          </motion.div>

          {/* --- RIGHT: LIGHT THEME SUMMARY (More Clear Blur) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="w-full lg:flex-1 h-full overflow-hidden"
          >
            <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl flex flex-col h-full overflow-hidden transition-colors">
              <div className="bg-orange-500/10 dark:bg-orange-500/5 p-6 border-b border-orange-100 dark:border-slate-700">
                <h2 className="font-black text-xl text-amber-950 dark:text-slate-100 flex items-center gap-2">
                  <ShoppingBag size={24} className="text-orange-600"/> Order Summary
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {/* Buying - Lite Amber */}
                {buyItems.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[11px] font-black text-amber-600 dark:text-orange-400 uppercase tracking-widest flex items-center gap-2">
                        Purchasing ({buyItems.length})
                      </h3>
                      <span className="text-xs font-bold text-amber-600 dark:text-orange-400 bg-amber-100 dark:bg-orange-950/40 px-2 py-0.5 rounded-lg">Subtotal: ₹{buyTotal}</span>
                    </div>
                    <div className="bg-amber-400/5 dark:bg-slate-900/40 rounded-2xl p-4 border border-amber-100/50 dark:border-slate-700 space-y-2 transition-colors">
                      {buyItems.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-amber-950 dark:text-slate-300 font-medium truncate w-2/3">{item.title}</span>
                          <span className="text-amber-700 dark:text-orange-500 font-bold">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Renting - Lite Blue */}
                {rentItems.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        Rentals ({rentItems.length})
                      </h3>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/40 px-2 py-0.5 rounded-lg">Subtotal: ₹{rentTotal}</span>
                    </div>
                    <div className="bg-blue-400/5 dark:bg-slate-900/40 rounded-2xl p-4 border border-blue-100/50 dark:border-slate-700 space-y-2 transition-colors">
                      {rentItems.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-blue-900 dark:text-blue-200 font-medium truncate w-2/3">{item.bookName}</span>
                          <span className="text-blue-700 dark:text-blue-400 font-bold">₹{item.fees}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Final Footer Area */}
              <div className="p-8 bg-white/20 dark:bg-slate-900/60 border-t border-amber-100 dark:border-slate-700 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-amber-800/60 dark:text-slate-500 uppercase tracking-widest">Grand Total</p>
                    <h4 className="text-5xl font-black text-orange-600 dark:text-orange-500 tracking-tight">₹{grandTotal}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-amber-900 dark:text-slate-200">Final Amount</p>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 italic">Secure checkout enabled</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-amber-950/30 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} 
              className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] text-center max-w-sm w-full shadow-2xl border border-amber-100 dark:border-slate-700 transition-colors">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                 <CheckCircle className="text-green-500" size={48} />
              </div>
              <h2 className="text-2xl font-black text-amber-950 dark:text-slate-100">Payment Success!</h2>
              <p className="text-gray-500 dark:text-slate-400 mt-2 italic">You successfully paid ₹{grandTotal}</p>
              <button onClick={() => window.location.href = "/"}
                className="mt-8 w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-black py-4 cursor-pointer rounded-2xl shadow-lg hover:brightness-110 transition-all">
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CombinedPayment;