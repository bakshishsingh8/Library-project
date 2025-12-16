import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ShoppingBag, 
  BookOpen, 
  CreditCard, 
  Trash2, 
  Layers 
} from "lucide-react";
import { removeBook, removeRentedBook } from "../Redux/issueBooksSlice"; // Adjust path as needed

function CombinedOrderView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Get Data from Redux
  const buyItems = useSelector((state) => state.issueBooks.books || []);
  const rentItems = useSelector((state) => state.issueBooks.rentedBooks || []);

  // 2. Calculate Totals
  const buyTotal = buyItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const rentTotal = rentItems.reduce((sum, item) => sum + Number(item.fees || 0), 0);
  const grandTotal = buyTotal + rentTotal;
  const totalItems = buyItems.length + rentItems.length;

  const handleRemoveBuy = (id) => dispatch(removeBook(id));
  const handleRemoveRent = (id) => dispatch(removeRentedBook(id));

  // 3. Navigation to Combined Payment
  const handleProceedToPay = () => {
    navigate("/combined-payment", {
      state: {
        buyItems,
        rentItems,
        grandTotal
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 pb-24 md:pb-10">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm border-b border-amber-200 px-6 py-[14px] flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-amber-800 flex items-center gap-2">
          <Layers className="text-orange-500" />
          All Orders
        </h1>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow hover:scale-105 transition-transform cursor-pointer"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- LEFT COLUMN: BUY (CART) --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="bg-amber-50 rounded-2xl shadow-xl border border-amber-100 mb-[2px] overflow-hidden flex flex-col"
        >
          <div className="bg-orange-50 p-3 border-b border-orange-100  flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <ShoppingBag size={20} className="text-orange-600"/> Buying ({buyItems.length})
            </h2>
            <span className="font-bold text-orange-700">₹{buyTotal}</span>
          </div>
          
          <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[500px]">
            {buyItems.length === 0 && <p className="text-center text-gray-400 py-10">Cart is empty</p>}
            <AnimatePresence>
              {buyItems.map((book) => (
                <motion.div 
                  key={book.id}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all bg-white"
                >
                  <img src={book.img} alt={book.title} className="w-16 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 line-clamp-1">{book.title}</h4>
                    <p className="text-sm text-gray-500">Buying</p>
                    <p className="font-bold text-amber-600 mt-1">₹{book.price}</p>
                  </div>
                  <button onClick={() => handleRemoveBuy(book.id)} className="text-red-400 cursor-pointer h-9 mt-6 hover:text-red-600 p-2">
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* --- RIGHT COLUMN: RENT (ISSUED) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-100 rounded-2xl mb-[2px] shadow-xl border border-amber-100 overflow-hidden flex flex-col"
        >
          <div className="bg-blue-50 p-3  border-b border-blue-100 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600"/> Renting ({rentItems.length})
            </h2>
            <span className="font-bold text-blue-700">₹{rentTotal}</span>
          </div>

          <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[500px]">
             {rentItems.length === 0 && <p className="text-center text-gray-400 py-10">No active rentals</p>}
             <AnimatePresence>
              {rentItems.map((item) => (
                <motion.div 
                  key={item.id}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all bg-white"
                >
                  {/* ✅ LOGIC: Display Image if available, otherwise icon fallback */}
                  {item.img ? (
                    <img src={item.img} alt={item.bookName} className="w-16 h-20 object-cover rounded-md" />
                  ) : (
                    <div className="w-16 h-20 bg-blue-50 rounded-md flex items-center justify-center text-blue-300">
                      <BookOpen size={24} />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 line-clamp-1">{item.bookName}</h4>
                    <p className="text-sm text-gray-500">Student: {item.studentName}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Return: {item.returnDate}
                      </span>
                      <p className="font-bold text-blue-600">₹{item.fees}</p>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveRent(item.id)} className="text-red-400 mt-6 h-9 cursor-pointer
                    hover:text-red-600 p-2">
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }}
        className="fixed bottom-0 w-full bg-white border-t border-gray-200 p-[5px] shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-30"
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
             <span className="text-gray-500 text-sm">Grand Total ({totalItems} items)</span>
             <span className="text-3xl font-extrabold text-gray-900">₹{grandTotal}</span>
          </div>
          
          <button
            onClick={handleProceedToPay}
            disabled={grandTotal === 0}
            className={`flex items-center gap-2 px-5 py-[10px] rounded-xl font-bold text-lg shadow-lg transition-all
              ${grandTotal > 0 
                ? "bg-gradient-to-r from-green-600 to-green-500 text-white hover:scale-105 cursor-pointer" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <CreditCard size={24} />
            Pay Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CombinedOrderView;