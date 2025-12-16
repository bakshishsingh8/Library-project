// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Check, MinusCircle } from "lucide-react";
// import Header from "../Layout/header.jsx";
// import { addBook, removeBook } from "../Redux/issueBooksSlice.js";
// import { allBooksData, categories } from "../data/booksData";
// import Footer from "./footer.jsx";

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 },
//   },
//   exit: { opacity: 0, y: -20 },
// };

// function BooksList() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // ✅ 1. Get location state to find the highlighted ID
//   const location = useLocation();
//   const highlightId = location.state?.highlightId;

//   const dispatch = useDispatch();
//   const issueBooks = useSelector((state) => state.issueBooks.books);

//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilter, setShowFilter] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const filterSectionRef = useRef(null);

//   const currentCategory = categories.find(cat => cat.categorieNumber === parseInt(id));
//   const categoryName = currentCategory ? currentCategory.title : "Books Category";

//   const books = allBooksData[id] || [];

//   const filteredBooks = useMemo(() => {
//     const q = (search || "").trim().toLowerCase();
//     return books.filter((book) => {
//       const matchSearch =
//         q === "" ||
//         book.title.toLowerCase().includes(q) ||
//         (book.desc && book.desc.toLowerCase().includes(q));
//       const matchLetter = selectedLetter
//         ? book.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
//         : true;
//       return matchSearch && matchLetter;
//     });
//   }, [books, search, selectedLetter]);

//   // ✅ 2. Effect to scroll to the highlighted book
//   useEffect(() => {
//     if (highlightId && filteredBooks.length > 0) {
//       setTimeout(() => {
//         const element = document.getElementById(`book-${highlightId}`);
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//       }, 300); // 300ms delay ensures the DOM elements are rendered
//     }
//   }, [highlightId, filteredBooks]);

//   const handleAddBook = (book) => {
//     if (!issueBooks.find((b) => b.id === book.id)) {
//       dispatch(addBook(book));
//     }
//   };

//   const handleRemoveBook = (book) => {
//     dispatch(removeBook(book.id));
//   };

//   const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 md:mt-[-70px] py-2 mt-[-170px] pb-23 md:pb-15"
//     >
//       <Header
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//         search={search}
//         setSearch={setSearch}
//         selectedLetter={selectedLetter}
//         setSelectedLetter={setSelectedLetter}
//         scrollToFilterRef={filterSectionRef}
//         openPageFilter={() => setShowFilter(true)}
//         issueBooks={issueBooks}
//         setHeaderHeight={setHeaderHeight}
//       />

//       <div style={{ marginTop: headerHeight + 20 }} />

//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl mb-10 font-bold text-gray-700 text-center md:text-left"
//       >
//         {categoryName}
//       </motion.h1>

//       <AnimatePresence>
//         {filteredBooks.length > 0 ? (
//           viewMode === "grid" ? (
//             <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//               <AnimatePresence>
//                 {filteredBooks.map((item) => {
//                   // ✅ 3. Check if this is the highlighted item
//                   const isHighlighted = item.id === highlightId;

//                   return (
//                     <motion.div
//                       key={item.id}
//                       id={`book-${item.id}`} // ✅ Added ID anchor
//                       layout
//                       variants={itemVariants}
//                       initial="hidden"
//                       // ✅ 4. Visual Highlight Animation
//                       animate={isHighlighted ? {
//                         opacity: 1,
//                         y: 0,
//                         scale: [1, 1.05, 1],
//                         borderColor: "#f59e0b",
//                         boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)"
//                       } : "visible"}
//                       exit="exit"
//                       whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
//                       // ✅ 5. Apply highlight border classes
//                       className={`bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer mt-2 
//                         ${isHighlighted ? "border-amber-500 ring-4 ring-amber-200" : "border-amber-100"}`}
//                     >
//                       <img src={item.img} alt={item.title} className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl" />
//                       <div className={`p-4 flex flex-col justify-between ${isHighlighted ? "bg-amber-50" : ""}`}>
//                         <h2 className="text-base sm:text-lg h-20 font-bold text-gray-800">{item.title}</h2>
//                         <p className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2">{item.desc}</p>
//                         <div className="mt-3 flex items-center justify-between">
//                           <p className="text-amber-700 font-semibold text-lg">₹ {item.price}</p>
//                           {/* {isAdded(item) ? (
//                             <div className="flex gap-2">
//                               <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-23 px-2 bg-green-500 shadow"><Check size={16} /> Added</button>
//                               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRemoveBook(item)} className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow cursor-pointer"><MinusCircle size={16} /> Remove</motion.button>
//                             </div>
//                           ) : (
//                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAddBook(item)} className="w-40 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"><Plus size={16} /> Add</motion.button> */}
//                           {/* <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAddBook(item)} className="w-40 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"><Plus size={16} /> On Rent</motion.button>
//                           )} */}
//                           {isAdded(item) ? (
//                             <div className="flex gap-2">
//                               <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-23 px-2 bg-green-500 shadow">
//                                 <Check size={16} /> Added
//                               </button>

//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleRemoveBook(item)}
//                                 className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow cursor-pointer"
//                               >
//                                 <MinusCircle size={16} /> Remove
//                               </motion.button>
//                             </div>
//                           ) : (
//                             // FIX: wrap both buttons in a div
//                             <div className="flex gap-2">
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleAddBook(item)}
//                                 className="w-20 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"
//                               >
//                                 <Plus size={16} /> Buy
//                               </motion.button>

//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => navigate("/issue-book-form")}   // <- NEW FUNCTION
//                                 className="w-30 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 shadow"
//                               >
//                                 <Plus size={16} /> On Rent
//                               </motion.button>
//                             </div>
//                           )}

//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           ) : (
//             // LIST VIEW
//             <motion.div layout className="space-y-4">
//               <AnimatePresence>
//                 {filteredBooks.map((item) => {
//                   const isHighlighted = item.id === highlightId;

//                   return (
//                     <motion.div
//                       key={item.id}
//                       id={`book-${item.id}`} // ✅ Added ID anchor
//                       layout
//                       variants={itemVariants}
//                       initial="hidden"
//                       // ✅ Visual Highlight Animation for List View
//                       animate={isHighlighted ? {
//                         opacity: 1,
//                         y: 0,
//                         scale: [1, 1.02, 1],
//                         borderColor: "#f59e0b",
//                         boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)"
//                       } : "visible"}
//                       exit="exit"
//                       whileHover={{ scale: 1.02, x: 5, transition: { type: "spring", stiffness: 300 } }}
//                       // ✅ Highlight styling
//                       className={`flex flex-col sm:flex-row items-center p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border cursor-pointer overflow-hidden
//                         ${isHighlighted ? "bg-amber-50 border-amber-500 ring-2 ring-amber-200" : "bg-white border-amber-100"}`}
//                     >
//                       <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
//                       <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                         <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h2>
//                         <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.desc}</p>
//                         <p className="text-amber-700 font-semibold text-lg mt-2">₹ {item.price}</p>
//                       </div>
//                       <div className="ml-3 mt-3 sm:mt-0">
//                         {isAdded(item) ? (
//                           <div className="flex gap-2">
//                             <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow"><Check size={16} /> Added</button>
//                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRemoveBook(item)} className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow"><MinusCircle size={16} /> Remove</motion.button>
//                           </div>
//                         ) : (
//                           <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }} onClick={() => handleAddBook(item)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 w-22 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:from-amber-500 hover:to-orange-500 shadow-md"><Plus size={18} /> Add</motion.button>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           )
//         ) : (
//           <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center mt-10">No books found.</motion.p>
//         )}
//       </AnimatePresence>
//       <div className="  mt-20 mb-[-45px] ml-[-60px] mr-[-60px]">
//         <Footer />
//       </div>
//     </motion.div>
//   );
// }

// export default BooksList;




// // BooksList.jsx
// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User,
//   BookOpen,
//   Tags,
//   CheckCircle,
//   CalendarDays,
//   ChevronDown,
//   Plus,
//   Check,
//   MinusCircle,
// } from "lucide-react";
// import Header from "../Layout/header.jsx";
// import { addBook, removeBook } from "../Redux/issueBooksSlice.js";
// import { allBooksData, categories } from "../data/booksData";
// import Footer from "./footer.jsx";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// /* ------------------------------
//    Motion variants
// -------------------------------*/
// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 },
//   },
//   exit: { opacity: 0, y: -20 },
// };

// /* ----------------------------------------------------------
//    CategoryDropdown (uses dynamic categories from booksData)
//    - animated arrow
//    - closes on outside click
//    - returns the category TITLE (string)
// -----------------------------------------------------------*/
// function CategoryDropdown({ label, value, onChange, error }) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // use the imported categories (array of objects)
//   const catList = categories || [];

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative space-y-2" ref={dropdownRef}>
//       <label className="font-semibold text-gray-700">{label}</label>

//       <div
//         onClick={() => setOpen(!open)}
//         className="mt-2 flex items-center justify-between cursor-pointer
//                    bg-white/60 border border-gray-300 rounded-2xl px-4 py-2
//                    shadow-inner backdrop-blur-xl hover:border-indigo-500 transition-all"
//       >
//         <div className="flex items-center gap-3">
//           <Tags size={20} className="text-indigo-600" />
//           <span className={`font-medium ${value ? "text-gray-900" : "text-gray-500"}`}>
//             {value || "Select category"}
//           </span>
//         </div>

//         <motion.div animate={{ rotate: open ? 180 : 0 }}>
//           <ChevronDown size={20} className="text-gray-600" />
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.18 }}
//             className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl
//                        border border-gray-200  backdrop-blur-xl max-h-60 overflow-auto"
//           >
//             {catList.map((cat) => (
//               <li
//                 key={cat.id || cat.title}
//                 onClick={() => {
//                   onChange(cat.title); // <-- save TITLE (Option A)
//                   setOpen(false);
//                 }}
//                 className={`px-4 py-3 cursor-pointer hover:bg-indigo-50 transition-all
//                             font-medium text-gray-700 ${value === cat.title ? "bg-indigo-100 text-indigo-700" : ""
//                   }`}
//               >
//                 {cat.title}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>

//       {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
//     </div>
//   );
// }

// /* ----------------------------------------------------------
//    FancyDatePicker: uses react-day-picker and opens above/below
//    - returns JS Date objects to parent onChange
// -----------------------------------------------------------*/
// function FancyDatePicker({ label, value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const [openUp, setOpenUp] = useState(false);
//   const ref = useRef(null);

//   const toggleCalendar = () => {
//     setOpen(!open);
//     if (ref.current) {
//       const rect = ref.current.getBoundingClientRect();
//       const spaceBelow = window.innerHeight - rect.bottom;
//       const spaceAbove = rect.top;
//       setOpenUp(spaceBelow < 350 && spaceAbove > spaceBelow);
//     }
//   };

//   return (
//     <div ref={ref} className="relative w-full space-y-2">
//       <label className="text-gray-700 font-semibold block">{label}</label>

//       <div
//         onClick={toggleCalendar}
//         className="flex items-center gap-3 bg-white/60 border border-gray-300 
//                    rounded-2xl px-4 py-2 shadow-inner backdrop-blur-lg 
//                    hover:border-indigo-500 transition cursor-pointer"
//       >
//         <CalendarDays size={20} className="text-indigo-600" />
//         <span className="text-gray-700">
//           {value ? new Date(value).toLocaleDateString() : "Select Date"}
//         </span>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//             transition={{ duration: 0.18 }}
//             className={`absolute z-50 bg-white shadow-2xl rounded-3xl p-4 
//                        border border-gray-200 backdrop-blur-xl 
//                        ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
//           >
//             <DayPicker
//               mode="single"
//               selected={value ? new Date(value) : undefined}
//               onSelect={(day) => {
//                 onChange(day || null);
//                 setOpen(false);
//               }}
//               className="rounded-xl"
//               modifiersClassNames={{
//                 selected: "bg-indigo-600 text-white rounded-full",
//                 today: "text-indigo-600 font-bold underline",
//               }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ----------------------------------------------------------
//    Modal / Issue Form Component (updated)
//    - Uses CategoryDropdown (dynamic) + FancyDatePicker (dates)
//    - Auto-fills Book, Category (TITLE), Issue date, Student
//    - Saves category as TITLE (Option A)
// -----------------------------------------------------------*/
// function IssueBookModal({ open, onClose, prefillBook }) {
//   const [form, setForm] = useState({
//     studentName: "",
//     studentId: null,
//     bookName: "",
//     category: "", // will hold TITLE string
//     issueDate: null, // JS Date
//     returnDate: null, // JS Date
//     fees: 30,
//   });

//   const [errors, setErrors] = useState({});
//   const [loadingStudent, setLoadingStudent] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (!open) return;
//     const today = new Date();
//     setForm((f) => ({
//       ...f,
//       bookName: prefillBook?.title || "",
//       // if book has category title use it, otherwise try to map by categorieNumber
//       category:
//         prefillBook?.category ||
//         categories.find((c) => c.categorieNumber === prefillBook?.categorieNumber)?.title ||
//         "",
//       issueDate: today,
//       returnDate: null,
//       fees: 30,
//     }));
//     setErrors({});
//     setSuccess(false);

//     const fetchStudent = async () => {
//       setLoadingStudent(true);
//       try {
//         const res = await fetch("/api/current-student"); // adapt to your backend
//         if (!res.ok) throw new Error("Network response not ok");
//         const data = await res.json();
//         setForm((f) => ({
//           ...f,
//           studentName: data?.name || "Guest",
//           studentId: data?.id || null,
//         }));
//       } catch (err) {
//         console.warn("Could not fetch student, falling back to Guest", err);
//         setForm((f) => ({ ...f, studentName: "Guest", studentId: null }));
//       } finally {
//         setLoadingStudent(false);
//       }
//     };

//     fetchStudent();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, prefillBook]);

//   const handleChange = (name, value) => {
//     setForm((s) => ({ ...s, [name]: value }));
//     setErrors((e) => ({ ...e, [name]: undefined }));
//     setSuccess(false);
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.studentName) newErrors.studentName = "Required";
//     if (!form.bookName) newErrors.bookName = "Required";
//     if (!form.category) newErrors.category = "Required";
//     if (!form.issueDate) newErrors.issueDate = "Required";
//     if (!form.returnDate) newErrors.returnDate = "Required";
//     if (form.issueDate && form.returnDate && new Date(form.returnDate) < new Date(form.issueDate)) {
//       newErrors.returnDate = "Return date cannot be earlier than issue date";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     // Prepare payload (dates serialized as ISO strings)
//     const payload = {
//       studentName: form.studentName,
//       studentId: form.studentId,
//       bookName: form.bookName,
//       category: form.category, // TITLE (Option A)
//       issueDate: form.issueDate ? new Date(form.issueDate).toISOString() : null,
//       returnDate: form.returnDate ? new Date(form.returnDate).toISOString() : null,
//       fees: form.fees,
//     };

//     // Example: POST to backend
//     try {
//       // await fetch('/api/issue-book', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
//       console.log("Issuing book payload:", payload);
//       setSuccess(true);

//       // close after a brief success toast
//       setTimeout(() => {
//         onClose();
//         setForm({
//           studentName: "",
//           studentId: null,
//           bookName: "",
//           category: "",
//           issueDate: null,
//           returnDate: null,
//           fees: 30,
//         });
//         setSuccess(false);
//       }, 700);
//     } catch (err) {
//       console.error("Failed to issue book", err);
//       // handle and show friendly error (not blocking)
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* overlay */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.6 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black"
//         onClick={onClose}
//       />
//       {/* modal */}
//       <motion.div
//         initial={{ y: 20, opacity: 0, scale: 0.98 }}
//         animate={{ y: 0, opacity: 1, scale: 1 }}
//         exit={{ y: 10, opacity: 0, scale: 0.98 }}
//         transition={{ duration: 0.18 }}
//         className="relative z-60 w-full max-w-2xl bg-gradient-to-tl from-amber-100 to-white   rounded-3xl shadow-2xl p-6 md:p-6 mx-4"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold">Issue Book (On Rent)</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md"
//           >
//             ✕
//           </button>
//         </div>

//         {loadingStudent && <p className="text-sm text-gray-500 mb-3">Loading student info...</p>}

//         {success && (
//           <div className="mb-3 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md">
//             Issued successfully
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Student Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Student Name</label>
//             <input
//               type="text"
//               value={form.studentName}
//               onChange={(e) => handleChange("studentName", e.target.value)}
//               className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white shadow-inner"
//               placeholder="Student name"
//             />
//             {errors.studentName && <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>}
//           </div>

//           {/* Book Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Book Name</label>
//             <input
//               type="text"
//               value={form.bookName}
//               onChange={(e) => handleChange("bookName", e.target.value)}
//               className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white shadow-inner"
//               placeholder="Book name"
//             />
//             {errors.bookName && <p className="text-red-500 text-sm mt-1">{errors.bookName}</p>}
//           </div>

//           {/* Category (dynamic dropdown -> saves TITLE) */}
//           <div>
//             <CategoryDropdown
//               label="Category"
//               value={form.category}
//               onChange={(val) => handleChange("category", val)}
//               error={errors.category}
//             />
//             {/* errors rendered by CategoryDropdown as well */}
//           </div>

//           {/* Issue Date */}
//           <div>
//             <FancyDatePicker
//               label="Issue Date"
//               value={form.issueDate}
//               onChange={(date) => handleChange("issueDate", date)}
//             />
//             {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
//           </div>

//           {/* Return Date */}
//           <div>
//             <FancyDatePicker
//               label="Return Date"
//               value={form.returnDate}
//               onChange={(date) => handleChange("returnDate", date)}
//             />
//             {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
//           </div>

//           {/* Fees Section */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Fees (Constant)</label>
//             <input
//               type="number"
//               value={form.fees}
//               readOnly
//               className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-gray-100 cursor-not-allowed"
//             />
//             <p className="text-xs text-gray-500 mt-1">This amount is fixed at ₹30</p>
//           </div>


//           <div className="flex items-center justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => {
//                 // If user wants to mark as done without issuing, just close
//                 onClose();
//               }}
//               className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
//             >
//               View Details
//             </button>

//             <button
//               type="submit"
//               className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
//             >
//               Done
//             </button>
//             {/* <button
//               type="button"
//               onClick={() => {
//                 // If user wants to mark as done without issuing, just close
//                 onClose();
//               }}
//               className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
//             >
//               View Details
//             </button> */}
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-xl border bg-gray-100 border-gray-300 hover:bg-gray-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// /* ----------------------------------------------------------
//    MAIN BooksList Component (unchanged, only modal replaced)
// -----------------------------------------------------------*/
// function BooksList() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // ✅ 1. Get location state to find the highlighted ID
//   const location = useLocation();
//   const highlightId = location.state?.highlightId;

//   const dispatch = useDispatch();
//   const issueBooks = useSelector((state) => state.issueBooks.books);

//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilter, setShowFilter] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const filterSectionRef = useRef(null);

//   // Modal state
//   const [rentModalOpen, setRentModalOpen] = useState(false);
//   const [modalPrefillBook, setModalPrefillBook] = useState(null);

//   const currentCategory = categories.find((cat) => cat.categorieNumber === parseInt(id));
//   const categoryName = currentCategory ? currentCategory.title : "Books Category";

//   const books = allBooksData[id] || [];

//   const filteredBooks = useMemo(() => {
//     const q = (search || "").trim().toLowerCase();
//     return books.filter((book) => {
//       const matchSearch =
//         q === "" ||
//         book.title.toLowerCase().includes(q) ||
//         (book.desc && book.desc.toLowerCase().includes(q));
//       const matchLetter = selectedLetter
//         ? book.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
//         : true;
//       return matchSearch && matchLetter;
//     });
//   }, [books, search, selectedLetter]);

//   // Scroll to highlighted book
//   useEffect(() => {
//     if (highlightId && filteredBooks.length > 0) {
//       setTimeout(() => {
//         const element = document.getElementById(`book-${highlightId}`);
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//       }, 300);
//     }
//   }, [highlightId, filteredBooks]);

//   const handleAddBook = (book) => {
//     if (!issueBooks.find((b) => b.id === book.id)) {
//       dispatch(addBook(book));
//     }
//   };

//   const handleRemoveBook = (book) => {
//     dispatch(removeBook(book.id));
//   };

//   const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);

//   // Open modal with prefill
//   const openRentModal = (book) => {
//     setModalPrefillBook(book);
//     setRentModalOpen(true);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 md:mt-[-70px] py-2 mt-[-170px] pb-23 md:pb-15"
//     >
//       <Header
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//         search={search}
//         setSearch={setSearch}
//         selectedLetter={selectedLetter}
//         setSelectedLetter={setSelectedLetter}
//         scrollToFilterRef={filterSectionRef}
//         openPageFilter={() => setShowFilter(true)}
//         issueBooks={issueBooks}
//         setHeaderHeight={setHeaderHeight}
//       />

//       <div style={{ marginTop: headerHeight + 20 }} />

//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl mb-10 font-bold text-gray-700 text-center md:text-left"
//       >
//         {categoryName}
//       </motion.h1>

//       {/* Modal (Issue Form) */}
//       <AnimatePresence>
//         {rentModalOpen && (
//           <IssueBookModal
//             key="issue-modal"
//             open={rentModalOpen}
//             onClose={() => setRentModalOpen(false)}
//             prefillBook={modalPrefillBook}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {filteredBooks.length > 0 ? (
//           viewMode === "grid" ? (
//             <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//               <AnimatePresence>
//                 {filteredBooks.map((item) => {
//                   const isHighlighted = item.id === highlightId;

//                   return (
//                     <motion.div
//                       key={item.id}
//                       id={`book-${item.id}`}
//                       layout
//                       variants={itemVariants}
//                       initial="hidden"
//                       animate={
//                         isHighlighted
//                           ? {
//                             opacity: 1,
//                             y: 0,
//                             scale: [1, 1.05, 1],
//                             borderColor: "#f59e0b",
//                             boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)",
//                           }
//                           : "visible"
//                       }
//                       exit="exit"
//                       whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
//                       className={`bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer mt-2 
//                         ${isHighlighted ? "border-amber-500 ring-4 ring-amber-200" : "border-amber-100"}`}
//                     >
//                       <img src={item.img} alt={item.title} className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl" />
//                       <div className={`p-4 flex flex-col justify-between ${isHighlighted ? "bg-amber-50" : ""}`}>
//                         <h2 className="text-base sm:text-lg h-20 font-bold text-gray-800">{item.title}</h2>
//                         <p className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2">{item.desc}</p>
//                         <p className="text- sm:text-sm font-bold text-gray-800">Rent Fees - ₹ 30 <i className="text-red-500">(For 14 Days)</i></p>

//                         <div className="mt-3 flex items-center justify-between">
//                           <p className="text-amber-700 font-semibold text-lg">₹ {item.price}</p>

//                           {isAdded(item) ? (
//                             <div className="flex gap-2">
//                               <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-23 px-2 bg-green-500 shadow">
//                                 <Check size={16} /> Added
//                               </button>

//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleRemoveBook(item)}
//                                 className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow cursor-pointer"
//                               >
//                                 <MinusCircle size={16} /> Remove
//                               </motion.button>
//                             </div>
//                           ) : (
//                             <div className="flex gap-2">
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleAddBook(item)}
//                                 className="w-20 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"
//                               >
//                                 <Plus size={16} /> Buy
//                               </motion.button>

//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => openRentModal(item)}
//                                 className="w-30 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 shadow"
//                               >
//                                 <Plus size={16} /> On Rent
//                               </motion.button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           ) : (
//             <motion.div layout className="space-y-4">
//               <AnimatePresence>
//                 {filteredBooks.map((item) => {
//                   const isHighlighted = item.id === highlightId;

//                   return (
//                     <motion.div
//                       key={item.id}
//                       id={`book-${item.id}`}
//                       layout
//                       variants={itemVariants}
//                       initial="hidden"
//                       animate={
//                         isHighlighted
//                           ? {
//                             opacity: 1,
//                             y: 0,
//                             scale: [1, 1.02, 1],
//                             borderColor: "#f59e0b",
//                             boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)",
//                           }
//                           : "visible"
//                       }
//                       exit="exit"
//                       whileHover={{ scale: 1.01, x: 5, transition: { type: "spring", stiffness: 300 } }}
//                       className={`flex flex-col sm:flex-row items-center p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border cursor-pointer overflow-hidden
//                         ${isHighlighted ? "bg-amber-50 border-amber-500 ring-2 ring-amber-200" : "bg-white border-amber-100"}`}
//                     >
//                       <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
//                       <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                         <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h2>
//                         <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.desc}</p>
//                         <p className="text-amber-700 font-semibold text-lg mt-2">₹ {item.price}</p>
//                         <p className="text- sm:text-sm font-bold text-gray-800">Rent Fees - ₹ 30 <a className="text-red-500">(For 14 Days)</a></p>

//                       </div>
//                       <div className="ml-3 mt-3 sm:mt-0">
//                         {isAdded(item) ? (
//                           <div className="flex gap-2">
//                             <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow"><Check size={16} /> Added</button>
//                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRemoveBook(item)} className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow"><MinusCircle size={16} /> Remove</motion.button>
//                           </div>
//                         ) : (
//                           <div className="flex gap-2">
//                             <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }} onClick={() => handleAddBook(item)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 w-22 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:from-amber-500 hover:to-orange-500 shadow-md"><Plus size={18} /> Add</motion.button>

//                             <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }} onClick={() => openRentModal(item)} className="flex items-center justify-center gap-2 bg-blue-500 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:bg-blue-600 shadow-md">
//                               <Plus size={18} /> On Rent
//                             </motion.button>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           )
//         ) : (
//           <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center mt-10">No books found.</motion.p>
//         )}
//       </AnimatePresence>

//       <div className="mt-20 mb-[-45px] ml-[-60px] mr-[-60px]">
//         <Footer />
//       </div>
//     </motion.div>
//   );
// }

// export default BooksList;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // BooksList.jsx
// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User,
//   BookOpen,
//   Tags,
//   CheckCircle,
//   CalendarDays,
//   ChevronDown,
//   Plus,
//   Check,
//   MinusCircle,
// } from "lucide-react";
// import Header from "../Layout/header.jsx";
// import { addBook, removeBook, addRentedBook } from "../Redux/issueBooksSlice.js";
// import { allBooksData, categories } from "../data/booksData";
// import Footer from "./footer.jsx";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// /* ------------------------------
//    Motion variants
// -------------------------------*/
// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 },
//   },
//   exit: { opacity: 0, y: -20 },
// };

// /* ----------------------------------------------------------
//    CategoryDropdown (uses dynamic categories from booksData)
// -----------------------------------------------------------*/
// function CategoryDropdown({ label, value, onChange, error }) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const catList = categories || [];

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative space-y-2" ref={dropdownRef}>
//       <label className="font-semibold text-gray-700">{label}</label>

//       <div
//         onClick={() => setOpen(!open)}
//         className="mt-2 flex items-center justify-between cursor-pointer
//                    bg-white/60 border border-gray-300 rounded-2xl px-4 py-2
//                    shadow-inner backdrop-blur-xl hover:border-indigo-500 transition-all"
//       >
//         <div className="flex items-center gap-3">
//           <Tags size={20} className="text-indigo-600" />
//           <span className={`font-medium ${value ? "text-gray-900" : "text-gray-500"}`}>
//             {value || "Select category"}
//           </span>
//         </div>

//         <motion.div animate={{ rotate: open ? 180 : 0 }}>
//           <ChevronDown size={20} className="text-gray-600" />
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.18 }}
//             className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl
//                        border border-gray-200  backdrop-blur-xl max-h-60 overflow-auto"
//           >
//             {catList.map((cat) => (
//               <li
//                 key={cat.id || cat.title}
//                 onClick={() => {
//                   onChange(cat.title);
//                   setOpen(false);
//                 }}
//                 className={`px-4 py-3 cursor-pointer hover:bg-indigo-50 transition-all
//                             font-medium text-gray-700 ${value === cat.title ? "bg-indigo-100 text-indigo-700" : ""
//                   }`}
//               >
//                 {cat.title}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>

//       {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
//     </div>
//   );
// }

// /* ----------------------------------------------------------
//    FancyDatePicker
// -----------------------------------------------------------*/
// function FancyDatePicker({ label, value, onChange }) {
//   const [open, setOpen] = useState(false);
//   const [openUp, setOpenUp] = useState(false);
//   const ref = useRef(null);

//   const toggleCalendar = () => {
//     setOpen(!open);
//     if (ref.current) {
//       const rect = ref.current.getBoundingClientRect();
//       const spaceBelow = window.innerHeight - rect.bottom;
//       const spaceAbove = rect.top;
//       setOpenUp(spaceBelow < 350 && spaceAbove > spaceBelow);
//     }
//   };

//   return (
//     <div ref={ref} className="relative w-full space-y-2">
//       <label className="text-gray-700 font-semibold block">{label}</label>

//       <div
//         onClick={toggleCalendar}
//         className="flex items-center gap-3 bg-white/60 border border-gray-300 
//                    rounded-2xl px-4 py-2 shadow-inner backdrop-blur-lg 
//                    hover:border-indigo-500 transition cursor-pointer"
//       >
//         <CalendarDays size={20} className="text-indigo-600" />
//         <span className="text-gray-700">
//           {value ? new Date(value).toLocaleDateString() : "Select Date"}
//         </span>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//             transition={{ duration: 0.18 }}
//             className={`absolute z-50 bg-white shadow-2xl rounded-3xl p-4 
//                         border border-gray-200 backdrop-blur-xl 
//                         ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
//           >
//             <DayPicker
//               mode="single"
//               selected={value ? new Date(value) : undefined}
//               onSelect={(day) => {
//                 onChange(day || null);
//                 setOpen(false);
//               }}
//               className="rounded-xl"
//               modifiersClassNames={{
//                 selected: "bg-indigo-600 text-white rounded-full",
//                 today: "text-indigo-600 font-bold underline",
//               }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ----------------------------------------------------------
//    Modal / Issue Form Component
// -----------------------------------------------------------*/
// function IssueBookModal({ open, onClose, prefillBook }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);

//   const calculateDays = (issueDate, returnDate) => {
//     if (!issueDate || !returnDate) return 0;
//     const start = new Date(issueDate);
//     const end = new Date(returnDate);
//     const diffTime = end - start;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? diffDays : 0;
//   };

//   const calculateFees = (issueDate, returnDate) => {
//     if (!issueDate || !returnDate) return 0;
//     const start = new Date(issueDate);
//     const end = new Date(returnDate);
//     const diffTime = end - start;
//     const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return days > 0 ? days * 3 : 0;
//   };

//   const [form, setForm] = useState({
//     studentName: "",
//     studentId: null,
//     bookName: "",
//     category: "",
//     issueDate: null,
//     returnDate: null,
//     fees: 0,
//   });

//   const [errors, setErrors] = useState({});
//   const [loadingStudent, setLoadingStudent] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // Prefill & auto-load student
//   useEffect(() => {
//     if (!open) return;

//     const today = new Date();

//     setForm((f) => ({
//       ...f,
//       bookName: prefillBook?.title || "",
//       category:
//         prefillBook?.category ||
//         categories.find((c) => c.categorieNumber === prefillBook?.categorieNumber)?.title ||
//         "",
//       issueDate: today,
//       returnDate: null,
//       fees: 0,
//     }));

//     setErrors({});
//     setSuccess(false);

//     const fetchStudent = async () => {
//       setLoadingStudent(true);
//       try {
//         const res = await fetch("/api/current-student");
//         if (!res.ok) throw new Error();
//         const data = await res.json();
//         setForm((f) => ({
//           ...f,
//           studentName: data?.name || "Guest",
//           studentId: data?.id || null,
//         }));
//       } catch (err) {
//         console.warn("Student fetch failed → Using Guest");
//         setForm((f) => ({ ...f, studentName: "Guest", studentId: null }));
//       } finally {
//         setLoadingStudent(false);
//       }
//     };

//     fetchStudent();
//   }, [open, prefillBook]);

//   const handleChange = (name, value) => {
//     setForm((prev) => {
//       const updated = { ...prev, [name]: value };
//       updated.fees = calculateFees(updated.issueDate, updated.returnDate);
//       return updated;
//     });

//     setErrors((e) => ({ ...e, [name]: undefined }));
//     setSuccess(false);
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.studentName) newErrors.studentName = "Required";
//     if (!form.bookName) newErrors.bookName = "Required";
//     if (!form.category) newErrors.category = "Required";
//     if (!form.issueDate) newErrors.issueDate = "Required";
//     if (!form.returnDate) newErrors.returnDate = "Required";

//     if (
//       form.issueDate &&
//       form.returnDate &&
//       new Date(form.returnDate) < new Date(form.issueDate)
//     ) {
//       newErrors.returnDate = "Return date cannot be earlier than issue date";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const payload = {
//       id: Date.now(),
//       studentName: form.studentName,
//       studentId: form.studentId,
//       bookName: form.bookName,
//       category: form.category,
//       issueDate: form.issueDate?.toLocaleDateString("en-CA") || "",
//       returnDate: form.returnDate?.toLocaleDateString("en-CA") || "",
//       fees: form.fees,
//     };

//     dispatch(addRentedBook(payload));
//     setShowPopup(true);

//     setTimeout(() => {
//       setShowPopup(false);
//       onClose();
//     }, 1300);
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* SUCCESS POPUP */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-[999]"
//           >
//             Book Issued Successfully!
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.6 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black"
//         onClick={onClose}
//       />

//       {/* modal */}
//       <motion.div
//         initial={{ y: 20, opacity: 0, scale: 0.98 }}
//         animate={{ y: 0, opacity: 1, scale: 1 }}
//         exit={{ y: 10, opacity: 0, scale: 0.98 }}
//         transition={{ duration: 0.18 }}
//         className="relative z-60 w-full max-w-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border border-amber-200 shadow-2xl rounded-3xl p-6 md:p-8 mx-4"
//       >
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex flex-col">
//             <h3 className="text-2xl text-amber-950 font-bold tracking-tight">
//               Issue Book
//             </h3>
//             <span className="text-amber-700/60 text-sm font-medium">Rent Management</span>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 rounded-full text-amber-800/60 hover:bg-amber-100 hover:text-amber-900 cursor-pointer transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {loadingStudent && <p className="text-sm text-amber-600 mb-4 animate-pulse">Loading student info...</p>}

//         {success && (
//           <div className="mb-5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
//             <span className="font-medium">Book issued successfully!</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name</label>
//             <input
//               type="text"
//               value={form.studentName}
//               onChange={(e) => handleChange("studentName", e.target.value)}
//               className="w-full rounded-xl border border-stone-200 p-2.5 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
//               placeholder="Enter student name..."
//             />
//             {errors.studentName && (
//               <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.studentName}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Book Name</label>
//             <input
//               type="text"
//               value={form.bookName}
//               onChange={(e) => handleChange("bookName", e.target.value)}
//               className="w-full rounded-xl border border-stone-200 p-2.5 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
//               placeholder="Search book title..."
//             />
//             {errors.bookName && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.bookName}</p>}
//           </div>

//           <CategoryDropdown
//             label="Category"
//             value={form.category}
//             onChange={(val) => handleChange("category", val)}
//             error={errors.category}
//           />

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <FancyDatePicker
//                 label="Issue Date"
//                 value={form.issueDate}
//                 onChange={(date) => handleChange("issueDate", date)}
//               />
//               {errors.issueDate && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.issueDate}</p>}
//             </div>
//             <div>
//               <FancyDatePicker
//                 label="Return Date"
//                 value={form.returnDate}
//                 onChange={(date) => handleChange("returnDate", date)}
//               />
//               {errors.returnDate && (
//                 <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.returnDate}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Fees</label>
//             <div className="relative">
//               <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
//               <input
//                 type="number"
//                 value={form.fees}
//                 readOnly
//                 className="w-full rounded-xl border border-stone-200 p-2.5 pl-7 bg-stone-100 text-gray-500 cursor-not-allowed font-medium"
//               />
//             </div>
//             <p className="text-xs text-gray-900 mt-1 ml-1">Rent Charges - ₹ 3/day <a className="text-orange-900">(Charges are calculated based on selected days)</a></p>

//             {form.issueDate && form.returnDate && (
//               <p className="text-gray-700 font-medium mt-2">
//                 Total Days: <span className="text-amber-700">{calculateDays(form.issueDate, form.returnDate)}</span>
//               </p>
//             )}
//           </div>

//           <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-200/50 mt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2.5 rounded-xl cursor-pointer text-stone-600 hover:bg-stone-100 font-medium  text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate("/issue-book-form", { state: { prefillData: form } })}
//               className="px-5 py-2.5 cursor-pointer rounded-xl bg-white border border-amber-300 text-amber-900 shadow-sm hover:bg-amber-50 font-medium  text-sm  hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
//             >
//               View Details
//             </button>

//             <button
//               type="submit"
//               className="px-6 py-2.5 rounded-xl bg-gray-900 cursor-pointer text-white shadow-lg hover:bg-black hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm flex items-center gap-2"
//             >
//               <span>Confirm Issue</span>
//               <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }


// /* ----------------------------------------------------------
//    MAIN BooksList Component
// -----------------------------------------------------------*/
// function BooksList() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // ✅ 1. Get location state to find the highlighted ID
//   const location = useLocation();
//   const highlightId = location.state?.highlightId;

//   const dispatch = useDispatch();
//   const issueBooks = useSelector((state) => state.issueBooks.books);
//   const rentedBooks = useSelector((state) => state.issueBooks.rentedBooks); // Get rented books

//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilter, setShowFilter] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const filterSectionRef = useRef(null);

//   // Modal state
//   const [rentModalOpen, setRentModalOpen] = useState(false);
//   const [modalPrefillBook, setModalPrefillBook] = useState(null);

//   const currentCategory = categories.find((cat) => cat.categorieNumber === parseInt(id));
//   const categoryName = currentCategory ? currentCategory.title : "Books Category";

//   const books = allBooksData[id] || [];

//   const filteredBooks = useMemo(() => {
//     const q = (search || "").trim().toLowerCase();
//     return books.filter((book) => {
//       const matchSearch =
//         q === "" ||
//         book.title.toLowerCase().includes(q) ||
//         (book.desc && book.desc.toLowerCase().includes(q));
//       const matchLetter = selectedLetter
//         ? book.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
//         : true;
//       return matchSearch && matchLetter;
//     });
//   }, [books, search, selectedLetter]);

//   // Scroll to highlighted book
//   useEffect(() => {
//     if (highlightId && filteredBooks.length > 0) {
//       setTimeout(() => {
//         const element = document.getElementById(`book-${highlightId}`);
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//       }, 300);
//     }
//   }, [highlightId, filteredBooks]);

//   const handleAddBook = (book) => {
//     if (!issueBooks.find((b) => b.id === book.id)) {
//       dispatch(addBook(book));
//     }
//   };

//   const handleRemoveBook = (book) => {
//     dispatch(removeBook(book.id));
//   };

//   const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);
//   // Check if book is rented
//   const isRented = (book) => !!rentedBooks.find((r) => r.bookName === book.title);

//   // Open modal with prefill
//   const openRentModal = (book) => {
//     setModalPrefillBook(book);
//     setRentModalOpen(true);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 md:mt-2 py-2 mt-[10px] pb-23 md:pb-15 "
//     >
//       <Header
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//         search={search}
//         setSearch={setSearch}
//         selectedLetter={selectedLetter}
//         setSelectedLetter={setSelectedLetter}
//         scrollToFilterRef={filterSectionRef}
//         openPageFilter={() => setShowFilter(true)}
//         issueBooks={issueBooks}
//         rentedBooks={rentedBooks}
//         setHeaderHeight={setHeaderHeight}
//       />

//       <div style={{ marginTop: headerHeight + 20 }} />

//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl mb-10 font-bold text-gray-700 text-center md:text-left"
//       >
//         {categoryName}
//       </motion.h1>

//       {/* Modal (Issue Form) */}
//       <AnimatePresence>
//         {rentModalOpen && (
//           <IssueBookModal
//             key="issue-modal"
//             open={rentModalOpen}
//             onClose={() => setRentModalOpen(false)}
//             prefillBook={modalPrefillBook}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {filteredBooks.length > 0 ? (
//           viewMode === "grid" ? (
//             <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//               <AnimatePresence>
//                 {filteredBooks.map((item) => {
//                   const isHighlighted = item.id === highlightId;

//                   return (
//                     <motion.div
//                       key={item.id}
//                       id={`book-${item.id}`}
//                       layout
//                       variants={itemVariants}
//                       initial="hidden"
//                       animate={
//                         isHighlighted
//                           ? {
//                             opacity: 1,
//                             y: 0,
//                             scale: [1, 1.05, 1],
//                             borderColor: "#f59e0b",
//                             boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)",
//                           }
//                           : "visible"
//                       }
//                       exit="exit"
//                       whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
//                       className={`bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer mt-2 
//                          ${isHighlighted ? "border-amber-500 ring-4 ring-amber-200" : "border-amber-100"}`}
//                     >
//                       <img src={item.img} alt={item.title} className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl" />
//                       <div className={`p-4 flex flex-col justify-between ${isHighlighted ? "bg-amber-50" : ""}`}>
//                         <h2 className="text-base sm:text-lg h-20 font-bold text-gray-800">{item.title}</h2>
//                         <p className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2">{item.desc}</p>
//                         <p className="text- sm:text-sm font-bold mt-3 text-gray-800">Rent Charges - ₹ 3/day </p>

//                         <div className="mt-3 flex items-center justify-between">
//                           <p className="text-amber-700 font-semibold text-lg">₹ {item.price}</p>

//                           {isAdded(item) ? (
//                             <div className="flex gap-2">
//                               <button className="flex-1 py-[6px] rounded-xl flex items-center cursor-not-allowed justify-center gap-2 text-white font-semibold w-23 px-2 bg-green-500 shadow">
//                                 <Check size={16} /> Added
//                               </button>

//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleRemoveBook(item)}
//                                 className="flex-1 py-[6px] px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow cursor-pointer"
//                               >
//                                 <MinusCircle size={16} /> Remove
//                               </motion.button>
//                             </div>
//                           ) : (
//                             <div className="flex gap-2">
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleAddBook(item)}
//                                 className="w-20 py-[6px] rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"
//                               >
//                                 <Plus size={16} /> Buy
//                               </motion.button>

//                               {isRented(item) ? (
//                                 <button
//                                   disabled
//                                   className="w-30 py-[6px] rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-green-500 cursor-not-allowed shadow"
//                                 >
//                                   <Check size={16} /> Rented
//                                 </button>
//                               ) : (
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => openRentModal(item)}
//                                   className="w-30 py-[6px] rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 shadow"
//                                 >
//                                   <Plus size={16} /> On Rent
//                                 </motion.button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           ) : (
//             <motion.div layout className="space-y-4">
//               <AnimatePresence>
//                 {filteredBooks.map((item) => {
//                   const isHighlighted = item.id === highlightId;

//                   return (
//                     <motion.div
//                       key={item.id}
//                       id={`book-${item.id}`}
//                       layout
//                       variants={itemVariants}
//                       initial="hidden"
//                       animate={
//                         isHighlighted
//                           ? {
//                             opacity: 1,
//                             y: 0,
//                             scale: [1, 1.02, 1],
//                             borderColor: "#f59e0b",
//                             boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)",
//                           }
//                           : "visible"
//                       }
//                       exit="exit"
//                       whileHover={{ scale: 1.01, x: 5, transition: { type: "spring", stiffness: 300 } }}
//                       className={`flex flex-col sm:flex-row items-center p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border cursor-pointer overflow-hidden
//                          ${isHighlighted ? "bg-amber-50 border-amber-500 ring-2 ring-amber-200" : "bg-white border-amber-100"}`}
//                     >
//                       <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
//                       <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                         <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h2>
//                         <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.desc}</p>
//                         <p className="text-amber-700 font-semibold text-lg mt-2">₹ {item.price}</p>
//                         <p className="text- sm:text-sm font-bold text-gray-800">Rent Charges - ₹ 3/day </p>

//                       </div>
//                       <div className="ml-3 mt-3 sm:mt-0">
//                         {isAdded(item) ? (
//                           <div className="flex gap-2">
//                             <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow"><Check size={16} /> Added</button>
//                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRemoveBook(item)} className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow"><MinusCircle size={16} /> Remove</motion.button>
//                           </div>
//                         ) : (
//                           <div className="flex gap-2">
//                             <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }} onClick={() => handleAddBook(item)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 w-22 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:from-amber-500 hover:to-orange-500 shadow-md"><Plus size={18} /> Add</motion.button>

//                             {isRented(item) ? (
//                               <button
//                                 disabled
//                                 className="flex items-center justify-center gap-2 bg-green-500 text-white font-medium px-2 py-2 rounded-xl cursor-not-allowed shadow-md w-28"
//                               >
//                                 <Check size={18} /> Added
//                               </button>
//                             ) : (
//                               <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }} onClick={() => openRentModal(item)} className="flex items-center justify-center gap-2 bg-blue-500 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:bg-blue-600 shadow-md">
//                                 <Plus size={18} /> On Rent
//                               </motion.button>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </motion.div>
//           )
//         ) : (
//           <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center mt-10">No books found.</motion.p>
//         )}
//       </AnimatePresence>

//       <div className="mt-20 mb-[-45px] ml-[-60px] mr-[-60px]">
//         <Footer />
//       </div>
//     </motion.div>
//   );
// }

// export default BooksList;



import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Tags,
  CheckCircle,
  CalendarDays,
  ChevronDown,
  Plus,
  Check,
  MinusCircle,
} from "lucide-react";
import Header from "../Layout/header.jsx";
import { addBook, removeBook, addRentedBook } from "../Redux/issueBooksSlice.js";
import { allBooksData, categories } from "../data/booksData";
import Footer from "./footer.jsx";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

/* ------------------------------
   Motion variants
-------------------------------*/
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, y: -20 },
};

/* ----------------------------------------------------------
   CategoryDropdown (uses dynamic categories from booksData)
-----------------------------------------------------------*/
function CategoryDropdown({ label, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const catList = categories || [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-2" ref={dropdownRef}>
      <label className="font-semibold text-gray-700">{label}</label>

      <div
        onClick={() => setOpen(!open)}
        className="mt-2 flex items-center justify-between cursor-pointer
                   bg-white/60 border border-gray-300 rounded-2xl px-4 py-2
                   shadow-inner backdrop-blur-xl hover:border-indigo-500 transition-all"
      >
        <div className="flex items-center gap-3">
          <Tags size={20} className="text-indigo-600" />
          <span className={`font-medium ${value ? "text-gray-900" : "text-gray-500"}`}>
            {value || "Select category"}
          </span>
        </div>

        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={20} className="text-gray-600" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl
                        border border-gray-200  backdrop-blur-xl max-h-60 overflow-auto"
          >
            {catList.map((cat) => (
              <li
                key={cat.id || cat.title}
                onClick={() => {
                  onChange(cat.title);
                  setOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer hover:bg-indigo-50 transition-all
                            font-medium text-gray-700 ${value === cat.title ? "bg-indigo-100 text-indigo-700" : ""
                  }`}
              >
                {cat.title}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </div>
  );
}

/* ----------------------------------------------------------
   FancyDatePicker
-----------------------------------------------------------*/
function FancyDatePicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const ref = useRef(null);

  const toggleCalendar = () => {
    setOpen(!open);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUp(spaceBelow < 350 && spaceAbove > spaceBelow);
    }
  };

  return (
    <div ref={ref} className="relative w-full space-y-2">
      <label className="text-gray-700 font-semibold block">{label}</label>

      <div
        onClick={toggleCalendar}
        className="flex items-center gap-3 bg-white/60 border border-gray-300 
                   rounded-2xl px-4 py-2 shadow-inner backdrop-blur-lg 
                   hover:border-indigo-500 transition cursor-pointer"
      >
        <CalendarDays size={20} className="text-indigo-600" />
        <span className="text-gray-700">
          {value ? new Date(value).toLocaleDateString() : "Select Date"}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-50 bg-white shadow-2xl rounded-3xl p-4 
                         border border-gray-200 backdrop-blur-xl 
                         ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
          >
            <DayPicker
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(day) => {
                onChange(day || null);
                setOpen(false);
              }}
              className="rounded-xl"
              modifiersClassNames={{
                selected: "bg-indigo-600 text-white rounded-full",
                today: "text-indigo-600 font-bold underline",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------------------------------------
   Modal / Issue Form Component
-----------------------------------------------------------*/
function IssueBookModal({ open, onClose, prefillBook }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const calculateDays = (issueDate, returnDate) => {
    if (!issueDate || !returnDate) return 0;
    const start = new Date(issueDate);
    const end = new Date(returnDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateFees = (issueDate, returnDate) => {
    if (!issueDate || !returnDate) return 0;
    const start = new Date(issueDate);
    const end = new Date(returnDate);
    const diffTime = end - start;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? days * 3 : 0;
  };

  const [form, setForm] = useState({
    studentName: "",
    studentId: null,
    bookName: "",
    category: "",
    issueDate: null,
    returnDate: null,
    fees: 0,
  });

  const [errors, setErrors] = useState({});
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prefill & auto-load student
  useEffect(() => {
    if (!open) return;

    const today = new Date();

    setForm((f) => ({
      ...f,
      bookName: prefillBook?.title || "",
      category:
        prefillBook?.category ||
        categories.find((c) => c.categorieNumber === prefillBook?.categorieNumber)?.title ||
        "",
      issueDate: today,
      returnDate: null,
      fees: 0,
    }));

    setErrors({});
    setSuccess(false);

    const fetchStudent = async () => {
      setLoadingStudent(true);
      try {
        const res = await fetch("/api/current-student");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setForm((f) => ({
          ...f,
          studentName: data?.name || "Guest",
          studentId: data?.id || null,
        }));
      } catch (err) {
        console.warn("Student fetch failed → Using Guest");
        setForm((f) => ({ ...f, studentName: "Guest", studentId: null }));
      } finally {
        setLoadingStudent(false);
      }
    };

    fetchStudent();
  }, [open, prefillBook]);

  const handleChange = (name, value) => {
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      updated.fees = calculateFees(updated.issueDate, updated.returnDate);
      return updated;
    });

    setErrors((e) => ({ ...e, [name]: undefined }));
    setSuccess(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.studentName) newErrors.studentName = "Required";
    if (!form.bookName) newErrors.bookName = "Required";
    if (!form.category) newErrors.category = "Required";
    if (!form.issueDate) newErrors.issueDate = "Required";
    if (!form.returnDate) newErrors.returnDate = "Required";

    if (
      form.issueDate &&
      form.returnDate &&
      new Date(form.returnDate) < new Date(form.issueDate)
    ) {
      newErrors.returnDate = "Return date cannot be earlier than issue date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // ✅ FIXED: Grab image from prefillBook or use default
    const bookImage = prefillBook?.img || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200";

    const payload = {
      id: Date.now(),
      studentName: form.studentName,
      studentId: form.studentId,
      bookName: form.bookName,
      category: form.category,
      issueDate: form.issueDate?.toLocaleDateString("en-CA") || "",
      returnDate: form.returnDate?.toLocaleDateString("en-CA") || "",
      fees: form.fees,
      img: bookImage, // ✅ ADDED THIS LINE
    };

    dispatch(addRentedBook(payload));
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      onClose();
    }, 1300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-[999]"
          >
            Book Issued Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      {/* modal */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="relative z-60 w-full max-w-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border border-amber-200 shadow-2xl rounded-3xl p-6 md:p-8 mx-4"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h3 className="text-2xl text-amber-950 font-bold tracking-tight">
              Issue Book
            </h3>
            <span className="text-amber-700/60 text-sm font-medium">Rent Management</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-amber-800/60 hover:bg-amber-100 hover:text-amber-900 cursor-pointer transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loadingStudent && <p className="text-sm text-amber-600 mb-4 animate-pulse">Loading student info...</p>}

        {success && (
          <div className="mb-5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="font-medium">Book issued successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => handleChange("studentName", e.target.value)}
              className="w-full rounded-xl border border-stone-200 p-2.5 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="Enter student name..."
            />
            {errors.studentName && (
              <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.studentName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Book Name</label>
            <input
              type="text"
              value={form.bookName}
              onChange={(e) => handleChange("bookName", e.target.value)}
              className="w-full rounded-xl border border-stone-200 p-2.5 bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="Search book title..."
            />
            {errors.bookName && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.bookName}</p>}
          </div>

          <CategoryDropdown
            label="Category"
            value={form.category}
            onChange={(val) => handleChange("category", val)}
            error={errors.category}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FancyDatePicker
                label="Issue Date"
                value={form.issueDate}
                onChange={(date) => handleChange("issueDate", date)}
              />
              {errors.issueDate && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.issueDate}</p>}
            </div>
            <div>
              <FancyDatePicker
                label="Return Date"
                value={form.returnDate}
                onChange={(date) => handleChange("returnDate", date)}
              />
              {errors.returnDate && (
                <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.returnDate}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fees</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <input
                type="number"
                value={form.fees}
                readOnly
                className="w-full rounded-xl border border-stone-200 p-2.5 pl-7 bg-stone-100 text-gray-500 cursor-not-allowed font-medium"
              />
            </div>
            <p className="text-xs text-gray-900 mt-1 ml-1">Rent Charges - ₹ 3/day <a className="text-orange-900">(Charges are calculated based on selected days)</a></p>

            {form.issueDate && form.returnDate && (
              <p className="text-gray-700 font-medium mt-2">
                Total Days: <span className="text-amber-700">{calculateDays(form.issueDate, form.returnDate)}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-200/50 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl cursor-pointer text-stone-600 hover:bg-stone-100 font-medium  text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => navigate("/issue-book-form", { state: { prefillData: form } })}
              className="px-5 py-2.5 cursor-pointer rounded-xl bg-white border border-amber-300 text-amber-900 shadow-sm hover:bg-amber-50 font-medium  text-sm  hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              View Details
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gray-900 cursor-pointer text-white shadow-lg hover:bg-black hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm flex items-center gap-2"
            >
              <span>Confirm Issue</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}


/* ----------------------------------------------------------
   MAIN BooksList Component
-----------------------------------------------------------*/
function BooksList() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ 1. Get location state to find the highlighted ID
  const location = useLocation();
  const highlightId = location.state?.highlightId;

  const dispatch = useDispatch();
  const issueBooks = useSelector((state) => state.issueBooks.books);
  const rentedBooks = useSelector((state) => state.issueBooks.rentedBooks); // Get rented books

  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const filterSectionRef = useRef(null);

  // Modal state
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [modalPrefillBook, setModalPrefillBook] = useState(null);

  const currentCategory = categories.find((cat) => cat.categorieNumber === parseInt(id));
  const categoryName = currentCategory ? currentCategory.title : "Books Category";

  const books = allBooksData[id] || [];

  const filteredBooks = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return books.filter((book) => {
      const matchSearch =
        q === "" ||
        book.title.toLowerCase().includes(q) ||
        (book.desc && book.desc.toLowerCase().includes(q));
      const matchLetter = selectedLetter
        ? book.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true;
      return matchSearch && matchLetter;
    });
  }, [books, search, selectedLetter]);

  // Scroll to highlighted book
  useEffect(() => {
    if (highlightId && filteredBooks.length > 0) {
      setTimeout(() => {
        const element = document.getElementById(`book-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [highlightId, filteredBooks]);

  const handleAddBook = (book) => {
    if (!issueBooks.find((b) => b.id === book.id)) {
      dispatch(addBook(book));
    }
  };

  const handleRemoveBook = (book) => {
    dispatch(removeBook(book.id));
  };

  const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);
  // Check if book is rented
  const isRented = (book) => !!rentedBooks.find((r) => r.bookName === book.title);

  // Open modal with prefill
  const openRentModal = (book) => {
    setModalPrefillBook(book);
    setRentModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 md:mt-2 py-2 mt-[10px] pb-23 md:pb-15 "
    >
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        search={search}
        setSearch={setSearch}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        scrollToFilterRef={filterSectionRef}
        openPageFilter={() => setShowFilter(true)}
        issueBooks={issueBooks}
        rentedBooks={rentedBooks}
        setHeaderHeight={setHeaderHeight}
      />

      <div style={{ marginTop: headerHeight + 20 }} />

      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl mb-10 font-bold text-gray-700 text-center md:text-left"
      >
        {categoryName}
      </motion.h1>

      {/* Modal (Issue Form) */}
      <AnimatePresence>
        {rentModalOpen && (
          <IssueBookModal
            key="issue-modal"
            open={rentModalOpen}
            onClose={() => setRentModalOpen(false)}
            prefillBook={modalPrefillBook}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filteredBooks.length > 0 ? (
          viewMode === "grid" ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <AnimatePresence>
                {filteredBooks.map((item) => {
                  const isHighlighted = item.id === highlightId;

                  return (
                    <motion.div
                      key={item.id}
                      id={`book-${item.id}`}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate={
                        isHighlighted
                          ? {
                            opacity: 1,
                            y: 0,
                            scale: [1, 1.05, 1],
                            borderColor: "#f59e0b",
                            boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)",
                          }
                          : "visible"
                      }
                      exit="exit"
                      whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
                      className={`bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer mt-2 
                         ${isHighlighted ? "border-amber-500 ring-4 ring-amber-200" : "border-amber-100"}`}
                    >
                      <img src={item.img} alt={item.title} className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl" />
                      <div className={`p-4 flex flex-col justify-between ${isHighlighted ? "bg-amber-50" : ""}`}>
                        <h2 className="text-base sm:text-lg h-20 font-bold text-gray-800">{item.title}</h2>
                        <p className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2">{item.desc}</p>
                        <p className="text- sm:text-sm font-bold mt-3 text-gray-800">Rent Charges - ₹ 3/day </p>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-amber-700 font-semibold text-lg">₹ {item.price}</p>

                          {isAdded(item) ? (
                            <div className="flex gap-2">
                              <button className="flex-1 py-[6px] rounded-xl flex items-center cursor-not-allowed justify-center gap-2 text-white font-semibold w-23 px-2 bg-green-500 shadow">
                                <Check size={16} /> Added
                              </button>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRemoveBook(item)}
                                className="flex-1 py-[6px] px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow cursor-pointer"
                              >
                                <MinusCircle size={16} /> Remove
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddBook(item)}
                                className="w-20 py-[6px] rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"
                              >
                                <Plus size={16} /> Buy
                              </motion.button>

                              {isRented(item) ? (
                                <button
                                  disabled
                                  className="w-30 py-[6px] rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-green-500 cursor-not-allowed shadow"
                                >
                                  <Check size={16} /> Rented
                                </button>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => openRentModal(item)}
                                  className="w-30 py-[6px] rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 shadow"
                                >
                                  <Plus size={16} /> On Rent
                                </motion.button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {filteredBooks.map((item) => {
                  const isHighlighted = item.id === highlightId;

                  return (
                    <motion.div
                      key={item.id}
                      id={`book-${item.id}`}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate={
                        isHighlighted
                          ? {
                            opacity: 1,
                            y: 0,
                            scale: [1, 1.02, 1],
                            borderColor: "#f59e0b",
                            boxShadow: "0px 0px 20px rgba(245, 158, 11, 0.5)",
                          }
                          : "visible"
                      }
                      exit="exit"
                      whileHover={{ scale: 1.01, x: 5, transition: { type: "spring", stiffness: 300 } }}
                      className={`flex flex-col sm:flex-row items-center p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border cursor-pointer overflow-hidden
                         ${isHighlighted ? "bg-amber-50 border-amber-500 ring-2 ring-amber-200" : "bg-white border-amber-100"}`}
                    >
                      <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
                      <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h2>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.desc}</p>
                        <p className="text-amber-700 font-semibold text-lg mt-2">₹ {item.price}</p>
                        <p className="text- sm:text-sm font-bold text-gray-800">Rent Charges - ₹ 3/day </p>

                      </div>
                      <div className="ml-3 mt-3 sm:mt-0">
                        {isAdded(item) ? (
                          <div className="flex gap-2">
                            <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow"><Check size={16} /> Added</button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRemoveBook(item)} className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow"><MinusCircle size={16} /> Remove</motion.button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }} onClick={() => handleAddBook(item)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 w-22 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:from-amber-500 hover:to-orange-500 shadow-md"><Plus size={18} /> Add</motion.button>

                            {isRented(item) ? (
                              <button
                                disabled
                                className="flex items-center justify-center gap-2 bg-green-500 text-white font-medium px-2 py-2 rounded-xl cursor-not-allowed shadow-md w-28"
                              >
                                <Check size={18} /> Added
                              </button>
                            ) : (
                              <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }} onClick={() => openRentModal(item)} className="flex items-center justify-center gap-2 bg-blue-500 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:bg-blue-600 shadow-md">
                                <Plus size={18} /> On Rent
                              </motion.button>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )
        ) : (
          <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center mt-10">No books found.</motion.p>
        )}
      </AnimatePresence>

      <div className="mt-20 mb-[-45px] ml-[-60px] mr-[-60px]">
        <Footer />
      </div>
    </motion.div>
  );
}

export default BooksList;