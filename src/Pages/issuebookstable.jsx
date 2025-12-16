// import React, { useState } from "react";
// import { CalendarDays, User, BookOpen, Tags } from "lucide-react";

// export default function IssueBookForm() {
//   const [form, setForm] = useState({
//     studentName: "",
//     bookName: "",
//     category: "",
//     issueDate: "",
//     returnDate: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!form.studentName) newErrors.studentName = "Student name required";
//     if (!form.bookName) newErrors.bookName = "Book name required";
//     if (!form.category) newErrors.category = "Category required";
//     if (!form.issueDate) newErrors.issueDate = "Issue date required";
//     if (!form.returnDate) newErrors.returnDate = "Return date required";

//     // Check date logic
//     if (form.issueDate && form.returnDate) {
//       if (new Date(form.returnDate) < new Date(form.issueDate)) {
//         newErrors.returnDate = "Return date must be after issue date";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     console.log("Book Issued:", form);

//     alert("Book Issued Successfully!");

//     setForm({
//       studentName: "",
//       bookName: "",
//       category: "",
//       issueDate: "",
//       returnDate: "",
//     });
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
//         Issue Book Form
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Student Name */}
//         <div>
//           <label className="font-semibold">Student Name</label>
//           <div className="flex items-center border rounded-lg p-2 mt-1">
//             <User size={20} className="text-gray-500" />
//             <input
//               type="text"
//               name="studentName"
//               className="w-full ml-2 outline-none"
//               placeholder="Enter student name"
//               value={form.studentName}
//               onChange={handleChange}
//             />
//           </div>
//           {errors.studentName && (
//             <p className="text-red-500 text-sm">{errors.studentName}</p>
//           )}
//         </div>

//         {/* Book Name */}
//         <div>
//           <label className="font-semibold">Book Name</label>
//           <div className="flex items-center border rounded-lg p-2 mt-1">
//             <BookOpen size={20} className="text-gray-500" />
//             <input
//               type="text"
//               name="bookName"
//               className="w-full ml-2 outline-none"
//               placeholder="Enter book name"
//               value={form.bookName}
//               onChange={handleChange}
//             />
//           </div>
//           {errors.bookName && (
//             <p className="text-red-500 text-sm">{errors.bookName}</p>
//           )}
//         </div>

//         {/* Category */}
//         <div>
//           <label className="font-semibold">Category</label>
//           <div className="flex items-center border rounded-lg p-2 mt-1">
//             <Tags size={20} className="text-gray-500" />
//             <select
//               name="category"
//               className="w-full ml-2 outline-none bg-transparent"
//               value={form.category}
//               onChange={handleChange}
//             >
//               <option value="">Select category</option>
//               <option value="Programming">Programming</option>
//               <option value="Science">Science</option>
//               <option value="Comics">Comics</option>
//               <option value="Novels">Novels</option>
//             </select>
//           </div>
//           {errors.category && (
//             <p className="text-red-500 text-sm">{errors.category}</p>
//           )}
//         </div>

//         {/* Issue Date */}
//         <div>
//           <label className="font-semibold">Issue Date</label>
//           <div className="flex items-center border rounded-lg p-2 mt-1">
//             <CalendarDays size={20} className="text-gray-500" />
//             <input
//               type="date"
//               name="issueDate"
//               className="w-full ml-2 outline-none"
//               value={form.issueDate}
//               onChange={handleChange}
//             />
//           </div>
//           {errors.issueDate && (
//             <p className="text-red-500 text-sm">{errors.issueDate}</p>
//           )}
//         </div>

//         {/* Return Date */}
//         <div>
//           <label className="font-semibold">Return Date</label>
//           <div className="flex items-center border rounded-lg p-2 mt-1">
//             <CalendarDays size={20} className="text-gray-500" />
//             <input
//               type="date"
//               name="returnDate"
//               className="w-full ml-2 outline-none"
//               value={form.returnDate}
//               onChange={handleChange}
//             />
//           </div>
//           {errors.returnDate && (
//             <p className="text-red-500 text-sm">{errors.returnDate}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//         >
//           Issue Book
//         </button>
//       </form>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   CalendarDays,
//   User,
//   BookOpen,
//   Tags,
//   CheckCircle,
// } from "lucide-react";

// export default function IssueBookForm() {
//   const [form, setForm] = useState({
//     studentName: "",
//     bookName: "",
//     category: "",
//     issueDate: "",
//     returnDate: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setSuccess(false);
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!form.studentName) newErrors.studentName = "Required";
//     if (!form.bookName) newErrors.bookName = "Required";
//     if (!form.category) newErrors.category = "Required";
//     if (!form.issueDate) newErrors.issueDate = "Required";
//     if (!form.returnDate) newErrors.returnDate = "Required";

//     if (form.issueDate && form.returnDate) {
//       if (new Date(form.returnDate) < new Date(form.issueDate)) {
//         newErrors.returnDate = "Return date must be after issue date";
//       }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSuccess(true);

//     setForm({
//       studentName: "",
//       bookName: "",
//       category: "",
//       issueDate: "",
//       returnDate: "",
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4 }}
//       className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-5"
//     >
//       <motion.div
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="w-full max-w-xl backdrop-blur-xl bg-white/60 shadow-2xl rounded-3xl p-8 border border-white/30 relative"
//       >
//         {/* GLASS SHINE */}
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent pointer-events-none opacity-40"></div>

//         <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 drop-shadow-sm">
//           📚 Issue Book
//         </h2>

//         {/* SUCCESS MESSAGE */}
//         {success && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-2 mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-xl shadow-md"
//           >
//             <CheckCircle size={22} />
//             Book issued successfully!
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* INPUT FIELD COMPONENT */}
//           {[
//             {
//               name: "studentName",
//               label: "Student Name",
//               icon: <User size={20} />,
//             },
//             {
//               name: "bookName",
//               label: "Book Name",
//               icon: <BookOpen size={20} />,
//             },
//           ].map((item) => (
//             <div key={item.name} className="relative group">
//               <div className="flex items-center gap-3 bg-white/50 border border-gray-300 rounded-2xl px-4 py-3 shadow-inner transition-all backdrop-blur-md group-focus-within:border-indigo-500 group-focus-within:shadow-indigo-200">
//                 {item.icon}
//                 <input
//                   type="text"
//                   name={item.name}
//                   value={form[item.name]}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none text-gray-700"
//                   placeholder={item.label}
//                 />
//               </div>
//               {errors[item.name] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[item.name]}</p>
//               )}
//             </div>
//           ))}

//           {/* CATEGORY SELECT */}
//           <div className="relative group">
//             <div className="flex items-center gap-3 bg-white/50 border border-gray-300 rounded-2xl px-4 py-3 shadow-inner backdrop-blur-md group-focus-within:border-indigo-500 group-focus-within:shadow-indigo-200">
//               <Tags size={20} />
//               <select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="w-full bg-transparent outline-none text-gray-700"
//               >
//                 <option value="">Select Category</option>
//                 <option value="Programming">Programming</option>
//                 <option value="Science">Science</option>
//                 <option value="Novels">Novels</option>
//                 <option value="Comics">Comics</option>
//               </select>
//             </div>
//             {errors.category && (
//               <p className="text-red-500 text-sm mt-1">{errors.category}</p>
//             )}
//           </div>

//           {/* DATES */}
//           {[
//             { name: "issueDate", label: "Issue Date" },
//             { name: "returnDate", label: "Return Date" },
//           ].map((date) => (
//             <div key={date.name} className="relative group">
//               <div className="flex items-center gap-3 bg-white/50 border border-gray-300 rounded-2xl px-4 py-3 shadow-inner backdrop-blur-md group-focus-within:border-indigo-500 group-focus-within:shadow-indigo-200">
//                 <CalendarDays size={20} />
//                 <input
//                   type="date"
//                   name={date.name}
//                   value={form[date.name]}
//                   onChange={handleChange}
//                   className="w-full bg-transparent outline-none text-gray-700"
//                 />
//               </div>
//               {errors[date.name] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[date.name]}</p>
//               )}
//             </div>
//           ))}

//           {/* SUBMIT BUTTON */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-300 hover:bg-indigo-700 transition-all"
//             type="submit"
//           >
//             Issue Book
//           </motion.button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     User,
//     BookOpen,
//     Tags,
//     CheckCircle,
//     CalendarDays,
//     ChevronDown,
// } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// /* ----------------------------------------------------------
//    ADVANCED CATEGORY DROPDOWN (CUSTOM)
// -----------------------------------------------------------*/
// function CategoryDropdown({ label, value, onChange, error }) {
//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const categories = ["Programming", "Science", "Novels", "Comics"];

//     // Close dropdown on outside click
//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className="relative space-y-2" ref={dropdownRef}>
//             <label className="font-semibold text-gray-700">{label}</label>

//             {/* Trigger Button */}
//             <div
//                 onClick={() => setOpen(!open)}
//                 className="mt-2 flex items-center justify-between cursor-pointer
//                    bg-white/60 border border-gray-300 rounded-2xl px-4 py-3
//                    shadow-inner backdrop-blur-xl hover:border-indigo-500 transition-all"
//             >
//                 <div className="flex items-center gap-3">
//                     <Tags size={20} className="text-indigo-600" />
//                     <span className={`font-medium ${value ? "text-gray-900" : "text-gray-500"}`}>
//                         {value || "Select category"}
//                     </span>
//                 </div>

//                 <motion.div animate={{ rotate: open ? 180 : 0 }}>
//                     <ChevronDown size={20} className="text-gray-600" />
//                 </motion.div>
//             </div>

//             {/* Dropdown Options */}
//             <AnimatePresence>
//                 {open && (
//                     <motion.ul
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl
//                        border border-gray-200 overflow-hidden backdrop-blur-xl"
//                     >
//                         {categories.map((cat) => (
//                             <li
//                                 key={cat}
//                                 onClick={() => {
//                                     onChange(cat);
//                                     setOpen(false);
//                                 }}
//                                 className={`px-4 py-3 cursor-pointer hover:bg-indigo-50 transition-all
//                             font-medium text-gray-700 ${value === cat ? "bg-indigo-100 text-indigo-700" : ""
//                                     }`}
//                             >
//                                 {cat}
//                             </li>
//                         ))}
//                     </motion.ul>
//                 )}
//             </AnimatePresence>

//             {/* Error */}
//             {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
//         </div>
//     );
// }

// /* ----------------------------------------------------------
//    SMART POSITIONING CUSTOM CALENDAR
// -----------------------------------------------------------*/
// function FancyDatePicker({ label, value, onChange }) {
//     const [open, setOpen] = useState(false);
//     const [openUp, setOpenUp] = useState(false);
//     const ref = useRef(null);

//     const toggleCalendar = () => {
//         setOpen(!open);

//         if (ref.current) {
//             const rect = ref.current.getBoundingClientRect();
//             const spaceBelow = window.innerHeight - rect.bottom;
//             const spaceAbove = rect.top;

//             setOpenUp(spaceBelow < 350 && spaceAbove > spaceBelow);
//         }
//     };

//     return (
//         <div ref={ref} className="relative w-full space-y-2">
//             <label className="text-gray-700 font-semibold block">{label}</label>

//             <div
//                 onClick={toggleCalendar}
//                 className="flex items-center gap-3 bg-white/60 border border-gray-300 
//                    rounded-2xl px-4 py-3 shadow-inner backdrop-blur-lg 
//                    hover:border-indigo-500 transition cursor-pointer"
//             >
//                 <CalendarDays size={20} className="text-indigo-600" />

//                 <span className="text-gray-700">
//                     {value ? value.toLocaleDateString() : "Select Date"}
//                 </span>
//             </div>

//             <AnimatePresence>
//                 {open && (
//                     <motion.div
//                         initial={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className={`absolute z-50 bg-white shadow-2xl rounded-3xl p-4 
//                        border border-gray-200 backdrop-blur-xl 
//                        ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
//                     >
//                         <DayPicker
//                             mode="single"
//                             selected={value}
//                             onSelect={(day) => {
//                                 onChange(day);
//                                 setOpen(false);
//                             }}
//                             className="rounded-xl"
//                             modifiersClassNames={{
//                                 selected: "bg-indigo-600 text-white rounded-full",
//                                 today: "text-indigo-600 font-bold underline",
//                             }}
//                         />
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }

// /* ----------------------------------------------------------
//    MAIN ISSUE BOOK FORM
// -----------------------------------------------------------*/
// export default function IssueBookForm() {
//     const [form, setForm] = useState({
//         studentName: "",
//         bookName: "",
//         category: "",
//         issueDate: null,
//         returnDate: null,
//     });

//     const [errors, setErrors] = useState({});
//     const [success, setSuccess] = useState(false);

//     const handleChange = (name, value) => {
//         setForm({ ...form, [name]: value });
//         setSuccess(false);
//     };

//     const validate = () => {
//         let newErrors = {};

//         if (!form.studentName) newErrors.studentName = "Required";
//         if (!form.bookName) newErrors.bookName = "Required";
//         if (!form.category) newErrors.category = "Required";
//         if (!form.issueDate) newErrors.issueDate = "Required";
//         if (!form.returnDate) newErrors.returnDate = "Required";

//         if (form.issueDate && form.returnDate) {
//             if (form.returnDate < form.issueDate) {
//                 newErrors.returnDate = "Return date cannot be earlier than issue date";
//             }
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         setSuccess(true);

//         console.log("Issued:", form);

//         setForm({
//             studentName: "",
//             bookName: "",
//             category: "",
//             issueDate: null,
//             returnDate: null,
//         });
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.4 }}
//             className="min-h-screen flex justify-center items-center 
//                  bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-5"
//         >
//             <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.7, ease: "easeOut" }}
//                 className="w-full max-w-xl backdrop-blur-xl bg-white/60 shadow-2xl 
//                    rounded-3xl p-8 border border-white/30 relative"
//             >
//                 <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 drop-shadow-sm">
//                     📚 Issue Book
//                 </h2>

//                 {success && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="flex items-center gap-2 mb-4 bg-green-100 border border-green-300 
//                        text-green-700 px-4 py-2 rounded-xl shadow-md"
//                     >
//                         <CheckCircle size={22} />
//                         Book issued successfully!
//                     </motion.div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">

//                     {/* STUDENT NAME */}
//                     <div>
//                         <label className="font-semibold">Student Name</label>
//                         <div className="flex items-center gap-3 bg-white/50 border border-gray-300 
//                             rounded-2xl px-4 py-3 shadow-inner backdrop-blur-md">
//                             <User size={20} />
//                             <input
//                                 type="text"
//                                 value={form.studentName}
//                                 onChange={(e) => handleChange("studentName", e.target.value)}
//                                 className="w-full bg-transparent outline-none"
//                                 placeholder="Enter student name"
//                             />
//                         </div>
//                         {errors.studentName && (
//                             <p className="text-red-500 text-sm">{errors.studentName}</p>
//                         )}
//                     </div>

//                     {/* BOOK NAME */}
//                     <div>
//                         <label className="font-semibold">Book Name</label>
//                         <div className="flex items-center gap-3 bg-white/50 border border-gray-300 
//                             rounded-2xl px-4 py-3 shadow-inner backdrop-blur-md">
//                             <BookOpen size={20} />
//                             <input
//                                 type="text"
//                                 value={form.bookName}
//                                 onChange={(e) => handleChange("bookName", e.target.value)}
//                                 className="w-full bg-transparent outline-none"
//                                 placeholder="Enter book name"
//                             />
//                         </div>
//                         {errors.bookName && (
//                             <p className="text-red-500 text-sm">{errors.bookName}</p>
//                         )}
//                     </div>

//                     {/* ADVANCED CATEGORY DROPDOWN */}
//                     <CategoryDropdown
//                         label="Category"
//                         value={form.category}
//                         onChange={(val) => handleChange("category", val)}
//                         error={errors.category}
//                     />

//                     {/* ISSUE DATE */}
//                     <FancyDatePicker
//                         label="Issue Date"
//                         value={form.issueDate}
//                         onChange={(date) => handleChange("issueDate", date)}
//                     />
//                     {errors.issueDate && (
//                         <p className="text-red-500 text-sm">{errors.issueDate}</p>
//                     )}

//                     {/* RETURN DATE */}
//                     <FancyDatePicker
//                         label="Return Date"
//                         value={form.returnDate}
//                         onChange={(date) => handleChange("returnDate", date)}
//                     />
//                     {errors.returnDate && (
//                         <p className="text-red-500 text-sm">{errors.returnDate}</p>
//                     )}

//                     {/* SUBMIT BUTTON */}
//                     <motion.button
//                         whileTap={{ scale: 0.95 }}
//                         className="w-full py-3 rounded-2xl bg-indigo-600 text-white 
//                        font-semibold shadow-lg shadow-indigo-300 
//                        hover:bg-indigo-700 transition"
//                     >
//                         Issue Book
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </motion.div>
//     );
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     User,
//     BookOpen,
//     Tags,
//     CheckCircle,
//     CalendarDays,
//     ChevronDown,
// } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// /* ----------------------------------------------------------
//    ADVANCED CATEGORY DROPDOWN COMPONENT
//    - Custom dropdown with animation
//    - Closes automatically on outside click
// -----------------------------------------------------------*/
// function CategoryDropdown({ label, value, onChange, error }) {
//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     // Static category list (can be replaced with dynamic data)
//     const categories = ["Programming", "Science", "Novels", "Comics"];

//     // Detect click outside → close dropdown
//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className="relative space-y-2" ref={dropdownRef}>
//             <label className="font-semibold text-gray-700">{label}</label>

//             {/* Button to open dropdown */}
//             <div
//                 onClick={() => setOpen(!open)}
//                 className="mt-2 flex items-center justify-between cursor-pointer
//                    bg-white/60 border border-gray-300 rounded-2xl px-4 py-3
//                    shadow-inner backdrop-blur-xl hover:border-indigo-500 transition-all"
//             >
//                 {/* Selected category text */}
//                 <div className="flex items-center gap-3">
//                     <Tags size={20} className="text-indigo-600" />
//                     <span className={`font-medium ${value ? "text-gray-900" : "text-gray-500"}`}>
//                         {value || "Select category"}
//                     </span>
//                 </div>

//                 {/* Dropdown arrow animation */}
//                 <motion.div animate={{ rotate: open ? 180 : 0 }}>
//                     <ChevronDown size={20} className="text-gray-600" />
//                 </motion.div>
//             </div>

//             {/* Dropdown menu options */}
//             <AnimatePresence>
//                 {open && (
//                     <motion.ul
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl
//                        border border-gray-200 overflow-hidden backdrop-blur-xl"
//                     >
//                         {categories.map((cat) => (
//                             <li
//                                 key={cat}
//                                 onClick={() => {
//                                     onChange(cat); // send selected value to parent
//                                     setOpen(false);
//                                 }}
//                                 className={`px-4 py-3 cursor-pointer hover:bg-indigo-50 transition-all
//                             font-medium text-gray-700 ${value === cat ? "bg-indigo-100 text-indigo-700" : ""
//                                     }`}
//                             >
//                                 {cat}
//                             </li>
//                         ))}
//                     </motion.ul>
//                 )}
//             </AnimatePresence>

//             {/* Validation error message */}
//             {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
//         </div>
//     );
// }

// /* ----------------------------------------------------------
//    CUSTOM DATE PICKER WITH SMART POSITIONING
//    - Opens above if not enough space below
//    - Uses react-day-picker
// -----------------------------------------------------------*/
// function FancyDatePicker({ label, value, onChange }) {
//     const [open, setOpen] = useState(false);
//     const [openUp, setOpenUp] = useState(false); // decides if calendar opens upward
//     const ref = useRef(null);

//     const toggleCalendar = () => {
//         setOpen(!open);

//         // Smart positioning (open above if space is less)
//         if (ref.current) {
//             const rect = ref.current.getBoundingClientRect();
//             const spaceBelow = window.innerHeight - rect.bottom;
//             const spaceAbove = rect.top;

//             // If below space < required, and above space is more → open upward
//             setOpenUp(spaceBelow < 350 && spaceAbove > spaceBelow);
//         }
//     };

//     return (
//         <div ref={ref} className="relative w-full space-y-2">
//             <label className="text-gray-700 font-semibold block">{label}</label>

//             {/* Input-like date button */}
//             <div
//                 onClick={toggleCalendar}
//                 className="flex items-center gap-3 bg-white/60 border border-gray-300 
//                    rounded-2xl px-4 py-3 shadow-inner backdrop-blur-lg 
//                    hover:border-indigo-500 transition cursor-pointer"
//             >
//                 <CalendarDays size={20} className="text-indigo-600" />

//                 <span className="text-gray-700">
//                     {value ? value.toLocaleDateString() : "Select Date"}
//                 </span>
//             </div>

//             {/* Calendar popup */}
//             <AnimatePresence>
//                 {open && (
//                     <motion.div
//                         initial={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: openUp ? 10 : -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className={`absolute z-50 bg-white shadow-2xl rounded-3xl p-4 
//                        border border-gray-200 backdrop-blur-xl 
//                        ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
//                     >
//                         {/* Date picker */}
//                         <DayPicker
//                             mode="single"
//                             selected={value}
//                             onSelect={(day) => {
//                                 onChange(day);
//                                 setOpen(false);
//                             }}
//                             className="rounded-xl"
//                             modifiersClassNames={{
//                                 selected: "bg-indigo-600 text-white rounded-full",
//                                 today: "text-indigo-600 font-bold underline",
//                             }}
//                         />
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }

// /* ----------------------------------------------------------
//    MAIN ISSUE BOOK FORM COMPONENT
//    - Handles validation
//    - Displays success animation
//    - Contains all inputs (text, dropdown, datepickers)
// -----------------------------------------------------------*/
// export default function IssueBookForm() {
//     // Form data
//     const [form, setForm] = useState({
//         studentName: "",
//         bookName: "",
//         category: "",
//         issueDate: null,
//         returnDate: null,
//     });

//     // Validation errors
//     const [errors, setErrors] = useState({});

//     // Success popup after submit
//     const [success, setSuccess] = useState(false);

//     // Update form state
//     const handleChange = (name, value) => {
//         setForm({ ...form, [name]: value });
//         setSuccess(false); // hide success on new edits
//     };

//     // Form validation logic
//     const validate = () => {
//         let newErrors = {};

//         if (!form.studentName) newErrors.studentName = "Required";
//         if (!form.bookName) newErrors.bookName = "Required";
//         if (!form.category) newErrors.category = "Required";
//         if (!form.issueDate) newErrors.issueDate = "Required";
//         if (!form.returnDate) newErrors.returnDate = "Required";

//         // Check if return date is earlier
//         if (form.issueDate && form.returnDate) {
//             if (form.returnDate < form.issueDate) {
//                 newErrors.returnDate = "Return date cannot be earlier than issue date";
//             }
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // Submit form
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         setSuccess(true);
//         console.log("Issued:", form);

//         // Clear form after success
//         setForm({
//             studentName: "",
//             bookName: "",
//             category: "",
//             issueDate: null,
//             returnDate: null,
//         });
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.4 }}
//             className="min-h-screen flex justify-center items-center 
//                  bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-5"
//         >
//             <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.7, ease: "easeOut" }}
//                 className="w-full max-w-xl backdrop-blur-xl bg-white/60 shadow-2xl 
//                    rounded-3xl p-8 border border-white/30 relative"
//             >
//                 <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 drop-shadow-sm">
//                     📚 Issue Book
//                 </h2>

//                 {/* Success notification */}
//                 {success && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="flex items-center gap-2 mb-4 bg-green-100 border border-green-300 
//                        text-green-700 px-4 py-2 rounded-xl shadow-md"
//                     >
//                         <CheckCircle size={22} />
//                         Book issued successfully!
//                     </motion.div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-6">

//                     {/* STUDENT NAME FIELD */}
//                     <div>
//                         <label className="font-semibold">Student Name</label>
//                         <div className="flex items-center gap-3 bg-white/50 border border-gray-300 
//                             rounded-2xl px-4 py-3 shadow-inner backdrop-blur-md">
//                             <User size={20} />
//                             <input
//                                 type="text"
//                                 value={form.studentName}
//                                 onChange={(e) => handleChange("studentName", e.target.value)}
//                                 className="w-full bg-transparent outline-none"
//                                 placeholder="Enter student name"
//                             />
//                         </div>
//                         {errors.studentName && (
//                             <p className="text-red-500 text-sm">{errors.studentName}</p>
//                         )}
//                     </div>

//                     {/* BOOK NAME FIELD */}
//                     <div>
//                         <label className="font-semibold">Book Name</label>
//                         <div className="flex items-center gap-3 bg-white/50 border border-gray-300 
//                             rounded-2xl px-4 py-3 shadow-inner backdrop-blur-md">
//                             <BookOpen size={20} />
//                             <input
//                                 type="text"
//                                 value={form.bookName}
//                                 onChange={(e) => handleChange("bookName", e.target.value)}
//                                 className="w-full bg-transparent outline-none"
//                                 placeholder="Enter book name"
//                             />
//                         </div>
//                         {errors.bookName && (
//                             <p className="text-red-500 text-sm">{errors.bookName}</p>
//                         )}
//                     </div>

//                     {/* CATEGORY DROPDOWN */}
//                     <CategoryDropdown
//                         label="Category"
//                         value={form.category}
//                         onChange={(val) => handleChange("category", val)}
//                         error={errors.category}
//                     />

//                     {/* ISSUE DATE */}
//                     <FancyDatePicker
//                         label="Issue Date"
//                         value={form.issueDate}
//                         onChange={(date) => handleChange("issueDate", date)}
//                     />
//                     {errors.issueDate && (
//                         <p className="text-red-500 text-sm">{errors.issueDate}</p>
//                     )}

//                     {/* RETURN DATE */}
//                     <FancyDatePicker
//                         label="Return Date"
//                         value={form.returnDate}
//                         onChange={(date) => handleChange("returnDate", date)}
//                     />
//                     {errors.returnDate && (
//                         <p className="text-red-500 text-sm">{errors.returnDate}</p>
//                     )}

//                     {/* SUBMIT BUTTON */}
//                     <motion.button
//                         whileTap={{ scale: 0.95 }}
//                         className="w-full py-3 rounded-2xl bg-indigo-600 text-white 
//                        font-semibold shadow-lg shadow-indigo-300 
//                        hover:bg-indigo-700 transition"
//                     >
//                         Issue Book
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </motion.div>
//     );
// }




// // IssueBooksTable.jsx
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CreditCard } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function IssueBooksTable() {
//   const navigate = useNavigate();

//   // Dummy data – replace with redux later
//   const tableData = [
//     {
//       id: 1,
//       studentName: "Aman Singh",
//       bookName: "Rich Dad Poor Dad",
//       category: "Finance",
//       issueDate: "2025-01-10",
//       returnDate: "2025-01-17",
//       fees: 50,
//     },
//     {
//       id: 2,
//       studentName: "Kiran",
//       bookName: "Atomic Habits",
//       category: "Self Help",
//       issueDate: "2025-01-11",
//       returnDate: "2025-01-18",
//       fees: 40,
//     },
//   ];

//   const totalAmount = tableData.reduce((sum, item) => sum + Number(item.fees), 0);

//   const handlePayment = () => {
//     navigate("/payment", { state: { tableData, totalAmount } });
//   };

//   return (
//     <motion.div
//       className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-4 md:p-10 pb-28 md:pb-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <motion.div
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="max-w-6xl mx-auto"
//       >
//         {/* Top Header + Desktop Payment Button */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Issue Books Records
//           </h2>

//           {/* Desktop Payment Button */}
//           {tableData.length > 0 && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handlePayment}
//               className="hidden md:flex bg-green-600 text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg hover:bg-green-700 gap-2 items-center"
//             >
//               <CreditCard size={18} />
//               Proceed to Payment
//             </motion.button>
//           )}
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
//           <table className="min-w-full">
//             <thead className="bg-amber-50 text-gray-700 uppercase text-sm tracking-wider border-b border-gray-200">
//               <tr>
//                 <th className="py-4 px-6 text-left">S.No</th>
//                 <th className="py-4 px-6 text-left">Student Name</th>
//                 <th className="py-4 px-6 text-left">Book Name</th>
//                 <th className="py-4 px-6 text-left">Category</th>
//                 <th className="py-4 px-6 text-center">Issue Date</th>
//                 <th className="py-4 px-6 text-center">Return Date</th>
//                 <th className="py-4 px-6 text-center">Fees</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               <AnimatePresence>
//                 {tableData.map((item, index) => (
//                   <motion.tr
//                     key={item.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     className="hover:bg-orange-50/50 transition-colors"
//                   >
//                     <td className="py-4 px-6 text-gray-600 font-medium">
//                       {index + 1}
//                     </td>

//                     <td className="py-4 px-6 font-semibold text-gray-800">
//                       {item.studentName}
//                     </td>

//                     <td className="py-4 px-6 text-gray-700">
//                       {item.bookName}
//                     </td>

//                     <td className="py-4 px-6 text-gray-600">
//                       {item.category}
//                     </td>

//                     <td className="py-4 px-6 text-center text-gray-700">
//                       {item.issueDate}
//                     </td>

//                     <td className="py-4 px-6 text-center text-gray-700">
//                       {item.returnDate}
//                     </td>

//                     <td className="py-4 px-6 text-center font-bold text-amber-700">
//                       ₹{item.fees}
//                     </td>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>

//             <tfoot className="bg-gray-50 border-t border-gray-200">
//               <tr>
//                 <td colSpan="7" className="py-4 px-6">
//                   <div className="flex justify-between items-center text-lg">
//                     <span className="text-gray-600 font-medium">
//                       Total Records: {tableData.length}
//                     </span>
//                     <span className="text-amber-700 font-bold text-xl">
//                       Total Amount: ₹{totalAmount}
//                     </span>
//                   </div>
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </motion.div>

//       {/* 📌 MOBILE Payment Button (Bottom Sticky) */}
//       {tableData.length > 0 && (
//         <motion.div
//           className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6"
//           initial={{ y: 100 }}
//           animate={{ y: 0 }}
//         >
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-gray-500 font-medium text-sm">Total Amount</span>
//             <span className="text-2xl font-bold text-gray-900">
//               ₹{totalAmount}
//             </span>
//           </div>

//           <button
//             onClick={handlePayment}
//             className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
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



// // IssueBooksTable.jsx
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CreditCard } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // 👈 Import useSelector

// function IssueBooksTable() {
//   const navigate = useNavigate();

//   // 👇 Get the real data from Redux instead of dummy data
//   const tableData = useSelector((state) => state.issueBooks.rentedBooks);

//   // Calculate total (Ensure fees are treated as numbers)
//   const totalAmount = tableData.reduce((sum, item) => sum + Number(item.fees), 0);

//   const handlePayment = () => {
//     navigate("/payment", { state: { tableData, totalAmount } });
//   };

//   return (
//     <motion.div
//       className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 mt-10 p-4 md:p-10 pb-28 md:pb-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <motion.div
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="max-w-6xl mx-auto"
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Issue Books Records
//           </h2>

//           {/* Only show button if there is data */}
//           {tableData.length > 0 && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handlePayment}
//               className="hidden md:flex bg-green-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg hover:bg-green-700 gap-2 items-center"
//             >
//               <CreditCard size={18} />
//               Proceed to Payment
//             </motion.button>
//           )}
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
//           {tableData.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">
//               No books currently issued on rent.
//             </div>
//           ) : (
//             <table className="min-w-full">
//               <thead className="bg-amber-50 text-gray-700 uppercase text-sm tracking-wider border-b border-gray-200">
//                 <tr>
//                   <th className="py-4 px-6 text-left">S.No</th>
//                   <th className="py-4 px-6 text-left">Student Name</th>
//                   <th className="py-4 px-6 text-left">Book Name</th>
//                   <th className="py-4 px-6 text-left">Category</th>
//                   <th className="py-4 px-6 text-center">Issue Date</th>
//                   <th className="py-4 px-6 text-center">Return Date</th>
//                   <th className="py-4 px-6 text-center">Fees</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 <AnimatePresence>
//                   {tableData.map((item, index) => (
//                     <motion.tr
//                       key={item.id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="hover:bg-orange-50/50 transition-colors"
//                     >
//                       <td className="py-4 px-6 text-gray-600 font-medium">
//                         {index + 1}
//                       </td>
//                       <td className="py-4 px-6 font-semibold text-gray-800">
//                         {item.studentName}
//                       </td>
//                       <td className="py-4 px-6 text-gray-700">
//                         {item.bookName}
//                       </td>
//                       <td className="py-4 px-6 text-gray-600">
//                         {item.category}
//                       </td>
//                       <td className="py-4 px-6 text-center text-gray-700">
//                         {item.issueDate}
//                       </td>
//                       <td className="py-4 px-6 text-center text-gray-700">
//                         {item.returnDate}
//                       </td>
//                       <td className="py-4 px-6 text-center font-bold text-amber-700">
//                         ₹{item.fees}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>

//               <tfoot className="bg-gray-50 border-t border-gray-200">
//                 <tr>
//                   <td colSpan="7" className="py-4 px-6">
//                     <div className="flex justify-between items-center text-lg">
//                       <span className="text-gray-600 font-medium">
//                         Total Records: {tableData.length}
//                       </span>
//                       <span className="text-amber-700 font-bold text-xl">
//                         Total Amount: ₹{totalAmount}
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>
//           )}
//         </div>
//       </motion.div>

//       {/* MOBILE Payment Button */}
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
//             className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
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




// IssueBooksTable.jsx
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CreditCard, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
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

//   const handlePayment = () => {
//     navigate("/payment", { state: { tableData, totalAmount } });
//   };

//   const handleDelete = (id) => {
//     dispatch(removeRentedBook(id)); // Remove book from Redux
//   };

//   return (
//     <motion.div
//       className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 mt-10 p-4 md:p-10 pb-28 md:pb-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* ---- Header Same Like BuyBooksTable ---- */}
//       <motion.div
//         className="sticky top-0 z-30 bg-gradient-to-r from-orange-400 to-amber-400 shadow-md 
//              px-4 py-3 md:px-6 md:h-16 flex justify-between items-center"
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-sm flex items-center gap-2">
//           <ShoppingBag size={20} />
//           <span className="hidden sm:inline">Issued Books</span>
//           <span className="sm:hidden">Issued</span>

//           <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
//             {tableData.length}
//           </span>
//         </h2>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/books")}
//           className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 
//                bg-amber-50 text-amber-700 text-sm md:text-base font-medium 
//                rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </motion.button>
//       </motion.div>


//       <motion.div
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="max-w-6xl mx-auto"
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//             Issue Books Records
//           </h2>

//           {tableData.length > 0 && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handlePayment}
//               className="hidden md:flex bg-green-600 cursor-pointer text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg hover:bg-green-700 gap-2 items-center"
//             >
//               <CreditCard size={18} />
//               Proceed to Payment
//             </motion.button>
//           )}
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
//           {tableData.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">
//               No books currently issued on rent.
//             </div>
//           ) : (
//             <table className="min-w-full">
//               <thead className="bg-amber-50 text-gray-700 uppercase text-sm tracking-wider border-b border-gray-200">
//                 <tr>
//                   <th className="py-4 px-6 text-left">S.No</th>
//                   <th className="py-4 px-6 text-left">Student Name</th>
//                   <th className="py-4 px-6 text-left">Book Name</th>
//                   <th className="py-4 px-6 text-left">Category</th>
//                   <th className="py-4 px-8 text-center">Issue Date</th>
//                   <th className="py-4 px-6 text-center">Return Date</th>
//                   <th className="py-4 px-6 text-center">Days</th>
//                   <th className="py-4 px-6 text-center">Fees</th>
//                   <th className="py-4 px-6 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 <AnimatePresence>
//                   {tableData.map((item, index) => (
//                     <motion.tr
//                       key={item.id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="hover:bg-orange-50/50 transition-colors"
//                     >
//                       <td className="py-4 px-6 text-gray-600 font-medium">{index + 1}</td>
//                       <td className="py-4 px-6 font-semibold text-gray-800">{item.studentName}</td>
//                       <td className="py-4 px-6 text-gray-700">{item.bookName}</td>
//                       <td className="py-4 px-6 text-gray-600">{item.category}</td>
//                       <td className="py-4 px-6 text-center text-gray-700">{item.issueDate}</td>
//                       <td className="py-4 px-6 text-center text-gray-700">{item.returnDate}</td>
//                       <td className="py-4 px-6 text-center text-gray-700 font-medium">
//                         {calculateDays(item.issueDate, item.returnDate)}
//                       </td>
//                       <td className="py-4 px-6 text-center font-bold text-amber-700">₹{item.fees}</td>
//                       <td className="py-4 px-6 text-center">
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="text-red-600 hover:text-red-800 p-2 cursor-pointer rounded-full"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>

//               <tfoot className="bg-gray-50 border-t border-gray-200">
//                 <tr>
//                   <td colSpan="9" className="py-4 px-6">
//                     <div className="flex justify-between items-center text-lg">
//                       <span className="text-gray-600 font-medium">
//                         Total Records: {tableData.length}
//                       </span>
//                       <span className="text-amber-700 font-bold text-xl">
//                         Total Amount: ₹{totalAmount}
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>
//           )}
//         </div>
//       </motion.div>

//       {/* MOBILE Payment Button */}
//       {tableData.length > 0 && (
//         <motion.div
//           className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6"
//           initial={{ y: 100 }}
//           animate={{ y: 0 }}
//         >
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-gray-500 font-medium text-sm">Total Amount</span>
//             <span className="text-2xl font-bold text-gray-900">₹{totalAmount}</span>
//           </div>

//           <button
//             onClick={handlePayment}
//             className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
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
      className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 flex flex-col md:pb-0 pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* --- HEADER SECTION (Copied & Adapted) --- */}
      <motion.div
        className="sticky top-0 z-30 bg-gradient-to-r from-orange-400 to-amber-400 shadow-md px-4 py-3 md:px-6 md:h-16 flex justify-between items-center"
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
          className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-amber-50 text-amber-700 text-sm md:text-base font-medium rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
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
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
            {tableData.length === 0 ? (
              <div className="p-10 text-center text-gray-500 flex flex-col items-center">
                <BookOpen size={48} className="text-gray-300 mb-4" />
                <p>No books currently issued on rent.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-amber-50 text-gray-700 uppercase text-sm tracking-wider border-b border-gray-200">
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

                  <tbody className="divide-y divide-gray-100">
                    <AnimatePresence>
                      {tableData.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="hover:bg-orange-50/50 transition-colors"
                        >
                          <td className="py-4 px-6 text-gray-600 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-semibold text-gray-800">
                            {item.studentName}
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {item.bookName}
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {item.category}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-700">
                            {item.issueDate}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-700">
                            {item.returnDate}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-700 font-medium">
                            {calculateDays(item.issueDate, item.returnDate)}
                          </td>
                          <td className="py-4 px-6 text-center font-bold text-amber-700">
                            ₹{item.fees}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 cursor-pointer rounded-full transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>

                  <tfoot className="bg-gray-50 border-t border-gray-200">
                    <tr>
                      <td colSpan="9" className="py-4 px-6">
                        <div className="flex justify-between items-center text-lg">
                          <span className="text-gray-600 font-medium">
                            Total Records: {tableData.length}
                          </span>
                          <span className="text-amber-700 font-bold text-xl">
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
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 pb-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 font-medium text-sm">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-gray-900">
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