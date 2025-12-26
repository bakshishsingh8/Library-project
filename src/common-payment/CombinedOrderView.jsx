// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Background from "../Components/blurBackground";
// import { 
//   ArrowLeft, 
//   ShoppingBag, 
//   BookOpen, 
//   CreditCard, 
//   Trash2, 
//   Layers 
// } from "lucide-react";
// import { removeBook, removeRentedBook } from "../Redux/issueBooksSlice"; // Adjust path as needed

// function CombinedOrderView() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // 1. Get Data from Redux
//   const buyItems = useSelector((state) => state.issueBooks.books || []);
//   const rentItems = useSelector((state) => state.issueBooks.rentedBooks || []);

//   // 2. Calculate Totals
//   const buyTotal = buyItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
//   const rentTotal = rentItems.reduce((sum, item) => sum + Number(item.fees || 0), 0);
//   const grandTotal = buyTotal + rentTotal;
//   const totalItems = buyItems.length + rentItems.length;

//   const handleRemoveBuy = (id) => dispatch(removeBook(id));
//   const handleRemoveRent = (id) => dispatch(removeRentedBook(id));

//   // 3. Navigation to Combined Payment
//   const handleProceedToPay = () => {
//     navigate("/combined-payment", {
//       state: {
//         buyItems,
//         rentItems,
//         grandTotal
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 pb-24 md:pb-10">
      
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm border-b border-amber-200 px-6 py-[14px] flex justify-between items-center">
//         <h1 className="text-xl md:text-2xl font-bold text-amber-800 flex items-center gap-2">
//           <Layers className="text-orange-500" />
//           All Orders
//         </h1>
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
//         >
//           <ArrowLeft size={20} /> Back
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         {/* --- LEFT COLUMN: BUY (CART) --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }} 
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-amber-50 rounded-2xl shadow-xl border border-amber-100 mb-[2px] overflow-hidden flex flex-col"
//         >
//           <div className="bg-orange-50 p-3 border-b border-orange-100  flex justify-between items-center">
//             <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//               <ShoppingBag size={20} className="text-orange-600"/> Buying ({buyItems.length})
//             </h2>
//             <span className="font-bold text-orange-700">₹{buyTotal}</span>
//           </div>
          
//           <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[500px]">
//             {buyItems.length === 0 && <p className="text-center text-gray-400 py-10">Cart is empty</p>}
//             <AnimatePresence>
//               {buyItems.map((book) => (
//                 <motion.div 
//                   key={book.id}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all bg-white"
//                 >
//                   <img src={book.img} alt={book.title} className="w-16 h-20 object-cover rounded-md" />
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-gray-800 line-clamp-1">{book.title}</h4>
//                     <p className="text-sm text-gray-500">Buying</p>
//                     <p className="font-bold text-amber-600 mt-1">₹{book.price}</p>
//                   </div>
//                   <button onClick={() => handleRemoveBuy(book.id)} className="text-red-400 cursor-pointer h-9 mt-6 hover:text-red-600 p-2">
//                     <Trash2 size={18} />
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         {/* --- RIGHT COLUMN: RENT (ISSUED) --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }} 
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-gray-100 rounded-2xl mb-[2px] shadow-xl border border-amber-100 overflow-hidden flex flex-col"
//         >
//           <div className="bg-blue-50 p-3  border-b border-blue-100 flex justify-between items-center">
//             <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//               <BookOpen size={20} className="text-blue-600"/> Renting ({rentItems.length})
//             </h2>
//             <span className="font-bold text-blue-700">₹{rentTotal}</span>
//           </div>

//           <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[500px]">
//              {rentItems.length === 0 && <p className="text-center text-gray-400 py-10">No active rentals</p>}
//              <AnimatePresence>
//               {rentItems.map((item) => (
//                 <motion.div 
//                   key={item.id}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all bg-white"
//                 >
//                   {/* ✅ LOGIC: Display Image if available, otherwise icon fallback */}
//                   {item.img ? (
//                     <img src={item.img} alt={item.bookName} className="w-16 h-20 object-cover rounded-md" />
//                   ) : (
//                     <div className="w-16 h-20 bg-blue-50 rounded-md flex items-center justify-center text-blue-300">
//                       <BookOpen size={24} />
//                     </div>
//                   )}
                  
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-gray-800 line-clamp-1">{item.bookName}</h4>
//                     <p className="text-sm text-gray-500">Student: {item.studentName}</p>
//                     <div className="flex justify-between items-center mt-1">
//                       <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
//                         Return: {item.returnDate}
//                       </span>
//                       <p className="font-bold text-blue-600">₹{item.fees}</p>
//                     </div>
//                   </div>
//                   <button onClick={() => handleRemoveRent(item.id)} className="text-red-400 mt-6 h-9 cursor-pointer
//                     hover:text-red-600 p-2">
//                     <Trash2 size={18} />
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </motion.div>
//       </div>

//       {/* --- BOTTOM BAR --- */}
//       <motion.div 
//         initial={{ y: 100 }} animate={{ y: 0 }}
//         className="fixed bottom-0 w-full bg-white border-t border-gray-200 p-[5px] shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-30"
//       >
//         <div className="max-w-4xl mx-auto flex justify-between items-center">
//           <div className="flex flex-col">
//              <span className="text-gray-500 text-sm">Grand Total ({totalItems} items)</span>
//              <span className="text-3xl font-extrabold text-gray-900">₹{grandTotal}</span>
//           </div>
          
//           <button
//             onClick={handleProceedToPay}
//             disabled={grandTotal === 0}
//             className={`flex items-center gap-2 px-5 py-[10px] rounded-xl font-bold text-lg shadow-lg transition-all
//               ${grandTotal > 0 
//                 ? "bg-gradient-to-r from-green-600 to-green-500 text-white hover:scale-105 cursor-pointer" 
//                 : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//           >
//             <CreditCard size={24} />
//             Pay Now
//           </button>
//         </div>
//       </motion.div>
//             <Background />

//     </div>
//   );
// }

// export default CombinedOrderView;
//////////////////////....................................................................................//////////////////////

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Background from "../Components/blurBackground";
// import { 
//   ArrowLeft, 
//   ShoppingBag, 
//   BookOpen, 
//   CreditCard, 
//   Trash2, 
//   Layers 
// } from "lucide-react";
// import { removeBook, removeRentedBook } from "../Redux/issueBooksSlice";

// function CombinedOrderView() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const buyItems = useSelector((state) => state.issueBooks.books || []);
//   const rentItems = useSelector((state) => state.issueBooks.rentedBooks || []);

//   const buyTotal = buyItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
//   const rentTotal = rentItems.reduce((sum, item) => sum + Number(item.fees || 0), 0);
//   const grandTotal = buyTotal + rentTotal;

//   const handleRemoveBuy = (id) => dispatch(removeBook(id));
//   const handleRemoveRent = (id) => dispatch(removeRentedBook(id));

//   const handleProceedToPay = () => {
//     navigate("/combined-payment", {
//       state: { buyItems, rentItems, grandTotal }
//     });
//   };

//   return (
//     // Fixed: Full screen height, absolutely no scrolling on the main body
//     <div className="relative h-screen w-full bg-transparent overflow-hidden flex flex-col antialiased
//                     bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200">
//       <Background />

//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-md z-50 border-b border-amber-200/50 px-6 py-4 flex justify-between items-center shadow-sm shrink-0">
//         <h1 className="text-xl md:text-2xl font-extrabold text-amber-900 flex items-center gap-2">
//           <Layers className="text-orange-500" />
//           Checkout Console
//         </h1>
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 font-semibold rounded-xl transition-all cursor-pointer shadow-sm"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 w-full max-w-[1700px] mx-auto p-4 md:p-6 lg:p-10 overflow-hidden">
//         <div className="flex flex-col lg:flex-row gap-6 items-start justify-center h-full overflow-hidden">
          
//           {/* 1. BUYING COLUMN */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
//             className="w-full lg:flex-1 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white shadow-xl flex flex-col h-full overflow-hidden"
//           >
//             <div className="bg-orange-500/10 p-5 border-b border-orange-200/50 flex justify-between items-center ">
//               <h2 className="font-bold text-lg text-amber-900 flex items-center gap-2">
//                 <ShoppingBag size={22} className="text-orange-600"/> Buying List ({buyItems.length})
//               </h2>
//               <span className="font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-sm">₹{buyTotal}</span>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
//               <AnimatePresence mode="popLayout">
//                 {buyItems.map((book) => (
//                   <motion.div key={book.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                     className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
//                   >
//                     <img src={book.img} className="w-12 h-16 object-cover rounded-lg shadow-sm" alt="" />
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-bold text-gray-800 text-sm truncate w-80">{book.title}</h4>
//                        <span className="text-[10px] uppercase tracking-wider font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">Ownership</span>
//                       <p className="font-black text-orange-600 text-lg">₹{book.price}</p>
//                     </div>
//                     <button onClick={() => handleRemoveBuy(book.id)} className="text-gray-500 hover:text-red-500 transition-colors h-8 mt-4 cursor-pointer p-2">
//                       <Trash2 size={18} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               {buyItems.length === 0 && <p className="text-center text-gray-400 mt-20 italic">No books in cart</p>}
//             </div>
//           </motion.div>

//           {/* 2. RENTING COLUMN */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             className="w-full lg:flex-1 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white shadow-xl flex flex-col h-full overflow-hidden"
//           >
//             <div className="bg-blue-500/10 p-5 border-b border-blue-200/50 flex justify-between items-center">
//               <h2 className="font-bold text-lg text-blue-900 flex items-center gap-2">
//                 <BookOpen size={22} className="text-blue-600"/> Rental List ({rentItems.length})
//               </h2>
//                <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm">₹{rentTotal}</span>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
//               <AnimatePresence mode="popLayout">
//                 {rentItems.map((item) => (
//                   <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                     className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
//                   >
//                     <div className="w-12 h-16 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
//                       {item.img ? <img src={item.img} className="w-full h-full object-cover" alt=""/> : <BookOpen className="text-blue-400" />}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-bold text-gray-800 text-sm w-80 truncate">{item.bookName} </h4>
//                       {/* <p className="text-xs text-gray-500 mb-2 font-medium">Student: {item.studentName}</p> */}
//                       <p className="text-xs text-gray-500 mb-2 font-medium">Student: {item.studentName}</p>
//                       <p className="font-black text-blue-600 text-lg">₹{item.fees}<a className="text-[10px] ml-3 text-blue-500 font-extrabold uppercase mt-1 tracking-wider">(Due: {item.returnDate}) </a></p>
//                     </div>
//                     <button onClick={() => handleRemoveRent(item.id)} className="text-gray-500 hover:text-red-500 h-8 mt-4 transition-colors cursor-pointer p-2">
//                       <Trash2 size={18} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               {rentItems.length === 0 && <p className="text-center text-gray-400 mt-20 italic">No rental books</p>}
//             </div>
//           </motion.div>

//           {/* 3. PAYMENT SECTION (Narrow Theme-Aligned Side Bar) */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//             // Fixed: Set width to 320px (w-80) for a narrow sidebar feel. 
//             // lg:w-40 (160px) is too small for text, so we use a balanced narrow width.
//             className="w-full lg:w-[320px] h-full shrink-0 z-10 overflow-hidden"
//           >
//             <div className="bg-[#c38e60] rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(69,26,3,0.4)] border border-orange-900 text-white h-full flex flex-col overflow-hidden">
//               <div className="flex-1 overflow-hidden">
//                 <h3 className="text-xl font-black mb-6 border-b border-orange-800 pb-3 tracking-tight text-orange-100">Summary</h3>
                
//                 <div className="space-y-5">
//                   <div className="flex justify-between items-center text-orange-100 text-sm">
//                     <span>Buying</span>
//                     <span className="text-white font-bold">₹{buyTotal}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-orange-100 text-sm">
//                     <span>Rentals</span>
//                     <span className="text-white font-bold">₹{rentTotal}</span>
//                   </div>
                  
//                   <div className="mt-8 pt-6 border-t border-orange-800">
//                     <span className="text-orange-100 text-[10px] font-black uppercase tracking-[0.2em]">Grand Total</span>
//                     <div className="text-4xl font-black mt-1 text-orange-100 drop-shadow-sm">
//                       ₹{grandTotal}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Actions of Summary */}
//               <div className="mt-4 shrink-0 space-y-4">
//                 <div className="bg-orange-900/40 rounded-xl p-3 border border-orange-800">
//                   <p className="text-[10px] text-orange-200/60 leading-tight uppercase font-bold text-center">
//                     Secure Checkout
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleProceedToPay}
//                   disabled={grandTotal === 0}
//                   className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-lg transition-all active:scale-95 shadow-lg
//                     ${grandTotal > 0 
//                       ? "bg-gradient-to-r from-orange-500 to-amber-600 hover:brightness-110 text-white cursor-pointer shadow-orange-950/40" 
//                       : "bg-orange-950 text-orange-900 cursor-not-allowed border border-orange-900/50"
//                     }`}
//                 >
//                   <CreditCard size={20} />
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default CombinedOrderView;



import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../Components/blurBackground";
import { 
  ArrowLeft, 
  ShoppingBag, 
  BookOpen, 
  CreditCard, 
  Trash2, 
  Layers 
} from "lucide-react";
import { removeBook, removeRentedBook } from "../Redux/issueBooksSlice";

function CombinedOrderView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buyItems = useSelector((state) => state.issueBooks.books || []);
  const rentItems = useSelector((state) => state.issueBooks.rentedBooks || []);

  const buyTotal = buyItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const rentTotal = rentItems.reduce((sum, item) => sum + Number(item.fees || 0), 0);
  const grandTotal = buyTotal + rentTotal;

  const handleRemoveBuy = (id) => dispatch(removeBook(id));
  const handleRemoveRent = (id) => dispatch(removeRentedBook(id));

  const handleProceedToPay = () => {
    navigate("/combined-payment", {
      state: { buyItems, rentItems, grandTotal }
    });
  };

  return (
    // Fixed: Full screen height, absolutely no scrolling on the main body
    <div className="relative h-screen w-full bg-transparent overflow-hidden flex flex-col antialiased
                    bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      <Background />

      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-amber-200/50 dark:border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm shrink-0 transition-colors">
        <h1 className="text-xl md:text-2xl font-extrabold text-amber-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="text-orange-500" />
          Checkout Console
        </h1>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-amber-800 dark:text-slate-200 border border-amber-200 dark:border-slate-700 font-semibold rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1700px] mx-auto p-4 md:p-6 lg:p-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center h-full overflow-hidden">
          
          {/* 1. BUYING COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="w-full lg:flex-1 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md rounded-[2rem] border border-white dark:border-slate-700 shadow-xl flex flex-col h-full overflow-hidden transition-colors"
          >
            <div className="bg-orange-500/10 dark:bg-orange-500/5 p-5 border-b border-orange-200/50 dark:border-slate-700 flex justify-between items-center ">
              <h2 className="font-bold text-lg text-amber-900 dark:text-orange-100 flex items-center gap-2">
                <ShoppingBag size={22} className="text-orange-600"/> Buying List ({buyItems.length})
              </h2>
              <span className="font-bold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 px-3 py-1 rounded-full text-sm">₹{buyTotal}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {buyItems.map((book) => (
                  <motion.div key={book.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                  >
                    <img src={book.img} className="w-12 h-16 object-cover rounded-lg shadow-sm border dark:border-slate-600" alt="" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 dark:text-slate-100 text-sm truncate w-80">{book.title}</h4>
                       <span className="text-[10px] uppercase tracking-wider font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">Ownership</span>
                      <p className="font-black text-orange-600 dark:text-orange-500 text-lg">₹{book.price}</p>
                    </div>
                    <button onClick={() => handleRemoveBuy(book.id)} className="text-gray-500 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors h-8 mt-4 cursor-pointer p-2">
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {buyItems.length === 0 && <p className="text-center text-gray-400 dark:text-slate-500 mt-20 italic">No books in cart</p>}
            </div>
          </motion.div>

          {/* 2. RENTING COLUMN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full lg:flex-1 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md rounded-[2rem] border border-white dark:border-slate-700 shadow-xl flex flex-col h-full overflow-hidden transition-colors"
          >
            <div className="bg-blue-500/10 dark:bg-blue-500/5 p-5 border-b border-blue-200/50 dark:border-slate-700 flex justify-between items-center">
              <h2 className="font-bold text-lg text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <BookOpen size={22} className="text-blue-600"/> Rental List ({rentItems.length})
              </h2>
               <span className="font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/40 px-3 py-1 rounded-full text-sm">₹{rentTotal}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {rentItems.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-16 bg-blue-50 dark:bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden border dark:border-slate-600">
                      {item.img ? <img src={item.img} className="w-full h-full object-cover" alt=""/> : <BookOpen className="text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 dark:text-slate-100 text-sm w-80 truncate">{item.bookName} </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-2 font-medium">Student: {item.studentName}</p>
                      <p className="font-black text-blue-600 dark:text-blue-400 text-lg">₹{item.fees}<a className="text-[10px] ml-3 text-blue-500 dark:text-blue-300 font-extrabold uppercase mt-1 tracking-wider">(Due: {item.returnDate}) </a></p>
                    </div>
                    <button onClick={() => handleRemoveRent(item.id)} className="text-gray-500 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 h-8 mt-4 transition-colors cursor-pointer p-2">
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {rentItems.length === 0 && <p className="text-center text-gray-400 dark:text-slate-500 mt-20 italic">No rental books</p>}
            </div>
          </motion.div>

          {/* 3. PAYMENT SECTION (Narrow Theme-Aligned Side Bar) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            // Fixed: Set width to 320px (w-80) for a narrow sidebar feel. 
            // lg:w-40 (160px) is too small for text, so we use a balanced narrow width.
            className="w-full lg:w-[320px] h-full shrink-0 z-10 overflow-hidden"
          >
            <div className="bg-[#c38e60] dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(69,26,3,0.4)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-orange-900 dark:border-slate-700 text-white h-full flex flex-col overflow-hidden transition-all">
              <div className="flex-1 overflow-hidden">
                <h3 className="text-xl font-black mb-6 border-b border-orange-800 dark:border-slate-700 pb-3 tracking-tight text-orange-100 dark:text-slate-100">Summary</h3>
                
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-orange-100 dark:text-slate-400 text-sm">
                    <span>Buying</span>
                    <span className="text-white dark:text-slate-100 font-bold">₹{buyTotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-orange-100 dark:text-slate-400 text-sm">
                    <span>Rentals</span>
                    <span className="text-white dark:text-slate-100 font-bold">₹{rentTotal}</span>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-orange-800 dark:border-slate-700">
                    <span className="text-orange-100 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Grand Total</span>
                    <div className="text-4xl font-black mt-1 text-orange-100 dark:text-amber-500 drop-shadow-sm">
                      ₹{grandTotal}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions of Summary */}
              <div className="mt-4 shrink-0 space-y-4">
                <div className="bg-orange-900/40 dark:bg-slate-800 rounded-xl p-3 border border-orange-800 dark:border-slate-700">
                  <p className="text-[10px] text-orange-200/60 dark:text-slate-500 leading-tight uppercase font-bold text-center">
                    Secure Checkout
                  </p>
                </div>

                <button
                  onClick={handleProceedToPay}
                  disabled={grandTotal === 0}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-lg transition-all active:scale-95 shadow-lg
                    ${grandTotal > 0 
                      ? "bg-gradient-to-r from-orange-500 to-amber-600 dark:from-amber-600 dark:to-orange-700 hover:brightness-110 text-white cursor-pointer shadow-orange-950/40 dark:shadow-black/40" 
                      : "bg-orange-950 dark:bg-slate-800 text-orange-900 dark:text-slate-600 cursor-not-allowed border border-orange-900/50 dark:border-slate-700"
                    }`}
                >
                  <CreditCard size={20} />
                  Pay Now
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default CombinedOrderView;