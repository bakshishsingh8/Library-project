// import React from "react";
// import { Trash2, ArrowLeft, CreditCard } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { removeBook } from "../Redux/issueBooksSlice.js";
// import { motion, AnimatePresence } from "framer-motion";

// function IssueBooks() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // ✅ Select issued books from Redux
//   const issueBooks = useSelector((state) => state.issueBooks.books || []);

//   // ✅ Remove a book from issued list
//   const handleRemove = (bookId) => {
//     dispatch(removeBook(bookId));
//   };

//   // ✅ Calculate total price
//   const totalPrice = issueBooks.reduce(
//     (sum, book) => sum + Number(book.price || 0),
//     0
//   );

//   return (
//     <motion.div
//       className="station-page overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Header Section */}
//       <motion.div
//         className="station-header bg-gradient-to-r from-orange-400 to-amber-400 h-15 flex justify-between items-center px-6 py-3 shadow-md"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h2 className="text-white text-lg font-semibold tracking-wide drop-shadow-sm">
//           Selected Books (Total: {issueBooks.length})
//         </h2>
//         <div className="station-header-buttons">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/books")}
//             className="flex items-center gap-2 px-5 py-2 bg-amber-50 text-amber-700 font-medium rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
//           >
//             <ArrowLeft size={16} />
//             Back to Books
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Table Container */}
//       <motion.div
//         className="station-table-container mx-5 sm:mx-20 mt-6"
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//       >
//         <div className="station-table-card bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-amber-100 backdrop-blur-sm">
//           <div className="station-table-title flex justify-between items-center mb-4">
//             <motion.h3
//               className="text-xl font-semibold text-gray-800"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               Selected Books List
//             </motion.h3>

//             {/* Proceed to Payment Button */}
//             {issueBooks.length > 0 && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/payment", { state: { issueBooks } })}
//                 className="bg-green-600 text-white font-semibold border-none rounded-xl px-5 py-2 hover:bg-green-700 shadow-md flex items-center gap-2 cursor-pointer transition-all"
//               >
//                 <CreditCard size={16} />
//                 Proceed to Payment
//               </motion.button>
//             )}
//           </div>

//           {/* Empty State */}
//           {issueBooks.length === 0 ? (
//             <motion.p
//               className="text-gray-500 text-center py-8 italic"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//             >
//               No books have been added yet.
//             </motion.p>
//           ) : (
//             <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//               <table className="min-w-full custom-table">
//                 <thead className="sticky top-0 z-10 backdrop-blur-md shadow-sm bg-amber-50">
//                   <tr>
//                     <th className="pt-2 pb-2">S.No</th>
//                     <th>Book</th>
//                     <th>Price</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <AnimatePresence>
//                   <tbody>
//                     {issueBooks.map((book, index) => (
//                       <motion.tr
//                         key={book.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.4 }}
//                         className="hover:bg-amber-50 transition-colors"
//                       >
//                         <td className="text-center font-medium text-gray-700">
//                           {index + 1}
//                         </td>
//                         <td className="flex items-center gap-3 pl-3 py-2">
//                           <motion.img
//                             whileHover={{ scale: 1.1 }}
//                             src={book.img}
//                             alt={book.title}
//                             className="w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
//                           />
//                           <span className="font-medium text-gray-800">
//                             {book.title}
//                           </span>
//                         </td>
//                         <td className="text-amber-700 text-center font-semibold">
//                           ₹{book.price}
//                         </td>
//                         <td className="w-60 text-center">
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => handleRemove(book.id)}
//                             className="flex items-center justify-center gap-2 px-3 py-1.5 ml-17 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-sm transition-all cursor-pointer"
//                           >
//                             <Trash2 size={15} />
//                             Remove
//                           </motion.button>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </AnimatePresence>
//               </table>

//               {/* Footer Total Bar */}
//               <motion.div
//                 className="border-t border-gray-200 px-6 py-3 flex justify-between items-center bg-gray-50 sticky bottom-0 rounded-b-xl shadow-sm"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//               >
//                 <span className="font-semibold text-gray-700">
//                   Total Books: {issueBooks.length}
//                 </span>
//                 <span className="font-bold text-amber-700">
//                   Total Amount: ₹{totalPrice}
//                 </span>
//               </motion.div>
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default IssueBooks;


import React from "react";
import { Trash2, ArrowLeft, CreditCard, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeBook } from "../Redux/issueBooksSlice.js";
import { motion, AnimatePresence } from "framer-motion";

function IssueBooks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const issueBooks = useSelector((state) => state.issueBooks.books || []);

  const handleRemove = (bookId) => {
    dispatch(removeBook(bookId));
  };

  const totalPrice = issueBooks.reduce(
    (sum, book) => sum + Number(book.price || 0),
    0
  );

  return (
    <motion.div
      className="station-page bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen md:pb-0 pb-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* --- Header Section --- */}
      <motion.div
        className="sticky top-0 z-30 bg-gradient-to-r from-orange-400 to-amber-400 shadow-md px-4 py-3 md:px-6 md:h-16 flex justify-between items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-sm flex items-center gap-2">
          <ShoppingBag size={20} />
          <span className="hidden sm:inline">Selected Books</span>
          <span className="sm:hidden">Cart</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {issueBooks.length}
          </span>
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/books")}
          className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-amber-50 text-amber-700 text-sm md:text-base font-medium rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>
      </motion.div>

      {/* --- Main Content Area --- */}
      <div className="flex-grow p-4 md:px-20 md:py-6 pb-32 md:pb-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Title & Desktop Checkout Button */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Selected Books</h3>
            {issueBooks.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/payment", { state: { issueBooks } })}
                className="bg-green-600 text-white font-semibold rounded-xl px-6 py-2.5 hover:bg-green-700 shadow-lg flex items-center gap-2 transition-all"
              >
                <CreditCard size={18} />
                Proceed to Payment
              </motion.button>
            )}
          </div>

          {/* --- Empty State --- */}
          {issueBooks.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <p className="text-lg font-medium">No books added yet.</p>
              <button
                onClick={() => navigate("/books")}
                className="mt-4 text-orange-500 underline cursor-pointer"
              >
                Browse Books
              </button>
            </motion.div>
          ) : (
            <>
              {/* --- DESKTOP VIEW: TABLE (Hidden on Mobile) --- */}
              <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-amber-50 text-gray-600 uppercase text-sm tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="py-4 px-6 text-left">S.No</th>
                      <th className="py-4 px-6 text-left">Book Details</th>
                      <th className="py-4 px-6 text-center">Price</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <AnimatePresence>
                      {issueBooks.map((book, index) => (
                        <motion.tr
                          key={book.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="hover:bg-orange-50/50 transition-colors"
                        >
                          <td className="py-4 px-6 text-gray-500 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={book.img}
                                alt={book.title}
                                className="w-14 h-14 object-cover rounded-lg shadow-sm border border-gray-200"
                              />
                              <span className="font-medium text-gray-800 text-lg">
                                {book.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center font-bold text-amber-700 text-lg">
                            ₹{book.price}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleRemove(book.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              title="Remove Book"
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                  {/* Desktop Footer Total */}
                  <tfoot className="bg-gray-50 border-t border-gray-200">
                    <tr>
                      <td colSpan="4" className="py-4 px-6">
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-gray-600 font-medium">
                            Total Books: {issueBooks.length}
                          </span>
                          <span className="text-amber-700 font-bold text-xl">
                            Total: ₹{totalPrice}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* --- MOBILE VIEW: CARDS (Hidden on Desktop) --- */}
              <div className="md:hidden space-y-4">
                <AnimatePresence>
                  {issueBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-4 rounded-xl shadow-sm border border-amber-100 flex items-center gap-4"
                    >
                      <img
                        src={book.img}
                        alt={book.title}
                        className="w-20 h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">
                          {book.title}
                        </h4>
                        <p className="text-amber-700 font-bold text-lg">
                          ₹{book.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(book.id)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 active:scale-95 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* --- Mobile Fixed Bottom Bar (Sticky Footer) --- */}
      {issueBooks.length > 0 && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 font-medium text-sm">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">
              ₹{totalPrice}
            </span>
          </div>
          <button
            onClick={() => navigate("/payment", { state: { issueBooks } })}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex justify-center items-center gap-2"
          >
            <CreditCard size={20} />
            Proceed to Pay
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default IssueBooks;