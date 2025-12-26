// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CreditCard, Trash2, ArrowLeft, BookOpen } from "lucide-react"; // Added ArrowLeft, BookOpen
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { removeRentedBook } from "../Redux/issueBooksSlice";

// function IssueBooksTable() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get the real data from Redux
//   const tableData = useSelector((state) => state.issueBooks.rentedBooks);

//   // Calculate total (Ensure fees are treated as numbers)
//   const totalAmount = tableData.reduce((sum, item) => sum + Number(item.fees), 0);

//   // Calculate total days
//   const calculateDays = (issueDate, returnDate) => {
//     if (!issueDate || !returnDate) return 0;
//     const start = new Date(issueDate);
//     const end = new Date(returnDate);
//     const diffTime = end - start;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? diffDays : 0;
//   };

//  const handlePayment = () => {
//   console.log("Sending rented books:", tableData);

//   navigate("/payment", {
//     state: {
//       rentedBooks: tableData,
//     },
//   });
// };


//   const handleDelete = (id) => {
//     dispatch(removeRentedBook(id)); // Remove book from Redux
//   };

//   return (
//     <motion.div
//       className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 flex flex-col md:pb-0 pb-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* --- HEADER SECTION (Copied & Adapted) --- */}
//       <motion.div
//         className="sticky top-0 z-30 bg-gradient-to-r from-orange-400 to-amber-400 shadow-md px-4 py-3 md:px-6 md:h-16 flex justify-between items-center"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h2 className="text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-sm flex items-center gap-2">
//           <BookOpen size={20} />
//           <span className="hidden sm:inline">Issue Records</span>
//           <span className="sm:hidden">Records</span>
//           <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
//             {tableData.length}
//           </span>
//         </h2>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate(-1)} // Navigates back one step
//           className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-amber-50 text-amber-700 text-sm md:text-base font-medium rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </motion.button>
//       </motion.div>

//       {/* --- MAIN CONTENT AREA --- */}
//       <div className="flex-grow p-4 md:px-20 md:py-6 pb-32 md:pb-10">
//         <motion.div
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="max-w-7xl mx-auto" // Increased width slightly for the larger table
//         >
//           {/* Sub-header with Desktop Payment Button */}
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
//               Active Issues
//             </h3>

//             {tableData.length > 0 && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handlePayment}
//                 className="hidden md:flex bg-green-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg hover:bg-green-700 gap-2 items-center transition-all"
//               >
//                 <CreditCard size={18} />
//                 Proceed to Payment
//               </motion.button>
//             )}
//           </div>

//           {/* TABLE */}
//           <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
//             {tableData.length === 0 ? (
//               <div className="p-10 text-center text-gray-500 flex flex-col items-center">
//                 <BookOpen size={48} className="text-gray-300 mb-4" />
//                 <p>No books currently issued on rent.</p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="bg-amber-50 text-gray-700 uppercase text-sm tracking-wider border-b border-gray-200">
//                     <tr>
//                       <th className="py-4 px-6 text-left">S.No</th>
//                       <th className="py-4 px-6 text-left">Student Name</th>
//                       <th className="py-4 px-6 text-left">Book Name</th>
//                       <th className="py-4 px-6 text-left">Category</th>
//                       <th className="py-4 px-8 text-center">Issue Date</th>
//                       <th className="py-4 px-6 text-center">Return Date</th>
//                       <th className="py-4 px-6 text-center">Days</th>
//                       <th className="py-4 px-6 text-center">Fees</th>
//                       <th className="py-4 px-6 text-center">Action</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-100">
//                     <AnimatePresence>
//                       {tableData.map((item, index) => (
//                         <motion.tr
//                           key={item.id}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: 20 }}
//                           className="hover:bg-orange-50/50 transition-colors"
//                         >
//                           <td className="py-4 px-6 text-gray-600 font-medium">
//                             {index + 1}
//                           </td>
//                           <td className="py-4 px-6 font-semibold text-gray-800">
//                             {item.studentName}
//                           </td>
//                           <td className="py-4 px-6 text-gray-700">
//                             {item.bookName}
//                           </td>
//                           <td className="py-4 px-6 text-gray-600">
//                             {item.category}
//                           </td>
//                           <td className="py-4 px-6 text-center text-gray-700">
//                             {item.issueDate}
//                           </td>
//                           <td className="py-4 px-6 text-center text-gray-700">
//                             {item.returnDate}
//                           </td>
//                           <td className="py-4 px-6 text-center text-gray-700 font-medium">
//                             {calculateDays(item.issueDate, item.returnDate)}
//                           </td>
//                           <td className="py-4 px-6 text-center font-bold text-amber-700">
//                             ₹{item.fees}
//                           </td>
//                           <td className="py-4 px-6 text-center">
//                             <button
//                               onClick={() => handleDelete(item.id)}
//                               className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 cursor-pointer rounded-full transition-colors"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </AnimatePresence>
//                   </tbody>

//                   <tfoot className="bg-gray-50 border-t border-gray-200">
//                     <tr>
//                       <td colSpan="9" className="py-4 px-6">
//                         <div className="flex justify-between items-center text-lg">
//                           <span className="text-gray-600 font-medium">
//                             Total Records: {tableData.length}
//                           </span>
//                           <span className="text-amber-700 font-bold text-xl">
//                             Total Amount: ₹{totalAmount}
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* --- MOBILE FIXED BOTTOM BAR (Sticky Footer) --- */}
//       {tableData.length > 0 && (
//         <motion.div
//           className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6"
//           initial={{ y: 100 }}
//           animate={{ y: 0 }}
//         >
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-gray-500 font-medium text-sm">
//               Total Amount
//             </span>
//             <span className="text-2xl font-bold text-gray-900">
//               ₹{totalAmount}
//             </span>
//           </div>

//           <button
//             onClick={handlePayment}
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

// export default IssueBooksTable;



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Trash2, ArrowLeft, BookOpen } from "lucide-react"; // Added ArrowLeft, BookOpen
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeRentedBook } from "../Redux/issueBooksSlice";

function IssueBooksTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the real data from Redux
  const tableData = useSelector((state) => state.issueBooks.rentedBooks);

  // Calculate total (Ensure fees are treated as numbers)
  const totalAmount = tableData.reduce((sum, item) => sum + Number(item.fees), 0);

  // Calculate total days
  const calculateDays = (issueDate, returnDate) => {
    if (!issueDate || !returnDate) return 0;
    const start = new Date(issueDate);
    const end = new Date(returnDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handlePayment = () => {
    console.log("Sending rented books:", tableData);

    navigate("/payment", {
      state: {
        rentedBooks: tableData,
      },
    });
  };


  const handleDelete = (id) => {
    dispatch(removeRentedBook(id)); // Remove book from Redux
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col md:pb-0 pb-6 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* --- HEADER SECTION (Copied & Adapted) --- */}
      <motion.div
        className="sticky top-0 z-30 bg-gradient-to-r from-orange-400 to-amber-400 dark:from-slate-800 dark:to-slate-900 shadow-md px-4 py-3 md:px-6 md:h-16 flex justify-between items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-sm flex items-center gap-2">
          <BookOpen size={20} />
          <span className="hidden sm:inline">Issue Records</span>
          <span className="sm:hidden">Records</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {tableData.length}
          </span>
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)} // Navigates back one step
          className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-400 text-sm md:text-base font-medium rounded-xl shadow hover:shadow-md transition-all cursor-pointer border dark:border-slate-600"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>
      </motion.div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-grow p-4 md:px-20 md:py-6 pb-32 md:pb-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-7xl mx-auto" // Increased width slightly for the larger table
        >
          {/* Sub-header with Desktop Payment Button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-slate-100">
              Active Issues
            </h3>

            {tableData.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
                className="hidden md:flex bg-green-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg hover:bg-green-700 gap-2 items-center transition-all"
              >
                <CreditCard size={18} />
                Proceed to Payment
              </motion.button>
            )}
          </div>

          {/* TABLE */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-amber-100 dark:border-slate-700 overflow-hidden transition-colors">
            {tableData.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-slate-400 flex flex-col items-center">
                <BookOpen size={48} className="text-gray-300 dark:text-slate-700 mb-4" />
                <p>No books currently issued on rent.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-amber-50 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300 uppercase text-sm tracking-wider border-b border-gray-200 dark:border-slate-700">
                    <tr>
                      <th className="py-4 px-6 text-left">S.No</th>
                      <th className="py-4 px-6 text-left">Student Name</th>
                      <th className="py-4 px-6 text-left">Book Name</th>
                      <th className="py-4 px-6 text-left">Category</th>
                      <th className="py-4 px-8 text-center">Issue Date</th>
                      <th className="py-4 px-6 text-center">Return Date</th>
                      <th className="py-4 px-6 text-center">Days</th>
                      <th className="py-4 px-6 text-center">Fees</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    <AnimatePresence>
                      {tableData.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="hover:bg-orange-50/50 dark:hover:bg-slate-700/30 transition-colors"
                        >
                          <td className="py-4 px-6 text-gray-600 dark:text-slate-400 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-semibold text-gray-800 dark:text-slate-200">
                            {item.studentName}
                          </td>
                          <td className="py-4 px-6 text-gray-700 dark:text-slate-300">
                            {item.bookName}
                          </td>
                          <td className="py-4 px-6 text-gray-600 dark:text-slate-400">
                            {item.category}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-700 dark:text-slate-300">
                            {item.issueDate}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-700 dark:text-slate-300">
                            {item.returnDate}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-700 dark:text-slate-300 font-medium">
                            {calculateDays(item.issueDate, item.returnDate)}
                          </td>
                          <td className="py-4 px-6 text-center font-bold text-amber-700 dark:text-amber-500">
                            ₹{item.fees}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 cursor-pointer rounded-full transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>

                  <tfoot className="bg-gray-50 dark:bg-slate-700/30 border-t border-gray-200 dark:border-slate-700">
                    <tr>
                      <td colSpan="9" className="py-4 px-6">
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-gray-600 dark:text-slate-400 font-medium">
                            Total Records: {tableData.length}
                          </span>
                          <span className="text-amber-700 dark:text-amber-500 font-bold text-xl">
                            Total Amount: ₹{totalAmount}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* --- MOBILE FIXED BOTTOM BAR (Sticky Footer) --- */}
      {tableData.length > 0 && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6 transition-colors"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 dark:text-slate-400 font-medium text-sm">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{totalAmount}
            </span>
          </div>

          <button
            onClick={handlePayment}
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

export default IssueBooksTable;