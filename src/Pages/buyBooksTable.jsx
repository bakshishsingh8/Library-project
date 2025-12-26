// import { Trash2, ArrowLeft, CreditCard, ShoppingBag } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { removeBook } from "../Redux/issueBooksSlice.js";
// import { motion, AnimatePresence } from "framer-motion";

// function IssueBooks() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const issueBooks = useSelector((state) => state.issueBooks.books || []);

//   const handleRemove = (bookId) => {
//     dispatch(removeBook(bookId));
//   };

//   const totalPrice = issueBooks.reduce(
//     (sum, book) => sum + Number(book.price || 0),
//     0
//   );

//   return (
//     <motion.div
//       className="station-page bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen md:pb-0 pb-6 flex flex-col"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* --- Header Section --- */}
//       <motion.div
//         className="sticky top-0 z-30 bg-gradient-to-r from-orange-400 to-amber-400 shadow-md px-4 py-3 md:px-6 md:h-14 flex justify-between items-center"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h2 className="text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-sm flex items-center gap-2">
//           <ShoppingBag size={20} />
//           <span className="hidden sm:inline">Selected Books</span>
//           <span className="sm:hidden">Cart</span>
//           <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
//             {issueBooks.length}
//           </span>
//         </h2>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/books")}
//           className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-amber-50 text-amber-700 text-sm md:text-base font-medium rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </motion.button>
//       </motion.div>

//       {/* --- Main Content Area --- */}
//       <div className="flex-grow p-4 md:px-20 md:py-6 pb-32 md:pb-10">
//         <motion.div
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="max-w-5xl mx-auto"
//         >
//           {/* Title & Desktop Checkout Button */}
//           <div className="hidden md:flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-800">Selected Books</h3>
//             {issueBooks.length > 0 && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/payment", { state: { issueBooks } })}
//                 className="bg-green-600 text-white font-semibold rounded-xl px-6 py-2.5 hover:bg-green-700 shadow-lg flex items-center gap-2 transition-all cursor-pointer"
//               >
//                 <CreditCard size={18} />
//                 Proceed to Payment
//               </motion.button>
//             )}
//           </div>

//           {/* --- Empty State --- */}
//           {issueBooks.length === 0 ? (
//             <motion.div
//               className="flex flex-col items-center justify-center py-20 text-gray-500"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <ShoppingBag size={64} className="text-gray-300 mb-4" />
//               <p className="text-lg font-medium">No books added yet.</p>
//               <button
//                 onClick={() => navigate("/books")}
//                 className="mt-4 text-orange-500 underline cursor-pointer"
//               >
//                 Browse Books
//               </button>
//             </motion.div>
//           ) : (
//             <>
//               {/* --- DESKTOP VIEW: TABLE (Hidden on Mobile) --- */}
//               <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
//                 <table className="min-w-full">
//                   <thead className="bg-amber-50 text-gray-600 uppercase text-sm tracking-wider border-b border-gray-200">
//                     <tr>
//                       <th className="py-4 px-6 text-left">S.No</th>
//                       <th className="py-4 px-6 text-left">Book Details</th>
//                       <th className="py-4 px-6 text-center">Price</th>
//                       <th className="py-4 px-6 text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     <AnimatePresence>
//                       {issueBooks.map((book, index) => (
//                         <motion.tr
//                           key={book.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: 20 }}
//                           className="hover:bg-orange-50/50 transition-colors"
//                         >
//                           <td className="py-4 px-6 text-gray-500 font-medium">
//                             {index + 1}
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex items-center gap-4">
//                               <img
//                                 src={book.img}
//                                 alt={book.title}
//                                 className="w-14 h-14 object-cover rounded-lg shadow-sm border border-gray-200"
//                               />
//                               <span className="font-medium text-gray-800 text-lg">
//                                 {book.title}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6 text-center font-bold text-amber-700 text-lg">
//                             ₹{book.price}
//                           </td>
//                           <td className="py-4 px-6 text-center">
//                             <button
//                               onClick={() => handleRemove(book.id)}
//                               className="p-2 text-red-500 hover:bg-red-50 rounded-full cursor-pointer transition-colors"
//                               title="Remove Book"
//                             >
//                               <Trash2 size={20} />
//                             </button>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </AnimatePresence>
//                   </tbody>
//                   {/* Desktop Footer Total */}
//                   <tfoot className="bg-gray-50 border-t border-gray-200">
//                     <tr>
//                       <td colSpan="4" className="py-4 px-6">
//                         <div className="flex justify-between items-center text-lg">
//                           <span className="text-gray-600 font-medium">
//                             Total Books: {issueBooks.length}
//                           </span>
//                           <span className="text-amber-700 font-bold text-xl">
//                             Total: ₹{totalPrice}
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>

//               {/* --- MOBILE VIEW: CARDS (Hidden on Desktop) --- */}
//               <div className="md:hidden space-y-4">
//                 <AnimatePresence>
//                   {issueBooks.map((book) => (
//                     <motion.div
//                       key={book.id}
//                       layout
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       className="bg-white p-4 rounded-xl shadow-sm border border-amber-100 flex items-center gap-4"
//                     >
//                       <img
//                         src={book.img}
//                         alt={book.title}
//                         className="w-20 h-24 object-cover rounded-lg shadow-sm"
//                       />
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">
//                           {book.title}
//                         </h4>
//                         <p className="text-amber-700 font-bold text-lg">
//                           ₹{book.price}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleRemove(book.id)}
//                         className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 active:scale-95 transition-all"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             </>
//           )}
//         </motion.div>
//       </div>

//       {/* --- Mobile Fixed Bottom Bar (Sticky Footer) --- */}
//       {issueBooks.length > 0 && (
//         <motion.div
//           className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6"
//           initial={{ y: 100 }}
//           animate={{ y: 0 }}
//         >
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-gray-500 font-medium text-sm">Total Amount</span>
//             <span className="text-2xl font-bold text-gray-900">
//               ₹{totalPrice}
//             </span>
//           </div>
//           <button
//             onClick={() => navigate("/payment", { state: { issueBooks } })}
//             className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex justify-center items-center gap-2"
//           >
//             <CreditCard size={20} />
//             Proceed to Pay
//           </button>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

// export default IssueBooks;


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
      className="station-page bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen md:pb-0 pb-6 flex flex-col transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* --- Header Section --- */}
      <motion.div
        className="sticky top-0 z-30 bg-gradient-to-r from-orange-400 to-amber-400 dark:from-slate-800 dark:to-slate-900 shadow-md px-4 py-3 md:px-6 md:h-14 flex justify-between items-center"
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
          className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-400 text-sm md:text-base font-medium rounded-xl shadow hover:shadow-md transition-all cursor-pointer border dark:border-slate-600"
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
            <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Selected Books</h3>
            {issueBooks.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/payment", { state: { issueBooks } })}
                className="bg-green-600 text-white font-semibold rounded-xl px-6 py-2.5 hover:bg-green-700 shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <CreditCard size={18} />
                Proceed to Payment
              </motion.button>
            )}
          </div>

          {/* --- Empty State --- */}
          {issueBooks.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ShoppingBag size={64} className="text-gray-300 dark:text-slate-700 mb-4" />
              <p className="text-lg font-medium">No books added yet.</p>
              <button
                onClick={() => navigate("/books")}
                className="mt-4 text-orange-500 dark:text-orange-400 underline cursor-pointer"
              >
                Browse Books
              </button>
            </motion.div>
          ) : (
            <>
              {/* --- DESKTOP VIEW: TABLE (Hidden on Mobile) --- */}
              <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-amber-100 dark:border-slate-700 overflow-hidden transition-colors">
                <table className="min-w-full">
                  <thead className="bg-amber-50 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 uppercase text-sm tracking-wider border-b border-gray-200 dark:border-slate-700">
                    <tr>
                      <th className="py-4 px-6 text-left">S.No</th>
                      <th className="py-4 px-6 text-left">Book Details</th>
                      <th className="py-4 px-6 text-center">Price</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    <AnimatePresence>
                      {issueBooks.map((book, index) => (
                        <motion.tr
                          key={book.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="hover:bg-orange-50/50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <td className="py-4 px-6 text-gray-500 dark:text-slate-400 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={book.img}
                                alt={book.title}
                                className="w-14 h-14 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-slate-600"
                              />
                              <span className="font-medium text-gray-800 dark:text-slate-200 text-lg">
                                {book.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center font-bold text-amber-700 dark:text-amber-500 text-lg">
                            ₹{book.price}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleRemove(book.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full cursor-pointer transition-colors"
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
                  <tfoot className="bg-gray-50 dark:bg-slate-700/30 border-t border-gray-200 dark:border-slate-700">
                    <tr>
                      <td colSpan="4" className="py-4 px-6">
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-gray-600 dark:text-slate-400 font-medium">
                            Total Books: {issueBooks.length}
                          </span>
                          <span className="text-amber-700 dark:text-amber-500 font-bold text-xl">
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
                      className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-amber-100 dark:border-slate-700 flex items-center gap-4 transition-colors"
                    >
                      <img
                        src={book.img}
                        alt={book.title}
                        className="w-20 h-24 object-cover rounded-lg shadow-sm border dark:border-slate-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-slate-200 line-clamp-2 leading-tight mb-1">
                          {book.title}
                        </h4>
                        <p className="text-amber-700 dark:text-amber-500 font-bold text-lg">
                          ₹{book.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(book.id)}
                        className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-95 transition-all"
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
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6 transition-colors"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-slate-400 font-medium text-sm">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
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