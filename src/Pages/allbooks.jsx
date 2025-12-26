// import React, { useState, useRef, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";

// // ✅ Ensure all these icons are imported
// import { 
//   LayoutGrid, List, Check, Plus, MinusCircle, 
//   Tags, CalendarDays, ChevronDown 
// } from "lucide-react";

// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// import { addBook, removeBook, addRentedBook } from "../Redux/issueBooksSlice.js";
// import {  categories } from "../data/booksData";

// import Header from "../Layout/header.jsx";
// import Footer from "./footer.jsx";

// // --- Category Dropdown ---
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
//                         border border-gray-200  backdrop-blur-xl max-h-60 overflow-auto"
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

// // --- Fancy Date Picker ---
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
//                          border border-gray-200 backdrop-blur-xl 
//                          ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
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

// // --- Issue Book Modal ---
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

//   // ✅ THIS IS THE FIXED SUBMIT FUNCTION
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     // We explicitly take the image from prefillBook here
//     const bookImage = prefillBook?.img || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200";

//     const payload = {
//       id: Date.now(),
//       studentName: form.studentName,
//       studentId: form.studentId,
//       bookName: form.bookName,
//       category: form.category,
//       issueDate: form.issueDate?.toLocaleDateString("en-CA") || "",
//       returnDate: form.returnDate?.toLocaleDateString("en-CA") || "",
//       fees: form.fees,
//       img: bookImage, // ✅ Guaranteed to have the image now
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

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.6 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black"
//         onClick={onClose}
//       />

//       <motion.div
//         initial={{ y: 20, opacity: 0, scale: 0.98 }}
//         animate={{ y: 0, opacity: 1, scale: 1 }}
//         exit={{ y: 10, opacity: 0, scale: 0.98 }}
//         transition={{ duration: 0.18 }}
//         className="relative z-60 w-full max-w-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border border-amber-200 shadow-2xl rounded-3xl p-6 md:p-8 mx-4"
//       >
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex flex-col">
//             <h3 className="text-2xl text-amber-950 font-bold tracking-tight">Issue Book</h3>
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
//             {errors.studentName && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.studentName}</p>}
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
//               {errors.returnDate && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.returnDate}</p>}
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
//               className="px-4 py-2.5 rounded-xl cursor-pointer bg-white border border-amber-300 text-stone-600 hover:bg-stone-100 font-medium  text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
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

// // Import your data object
// export const allBooksData = {
//     1: [
//         { id: "1.1", mainid: "1", title: "To Kill a Mockingbird – Harper Lee", img: "https://d3525k1ryd2155.cloudfront.net/h/112/127/1081127112.0.x.4.jpg", desc: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.", price: 200, },
//         { id: "1.2", mainid: "1", title: "1984 – George Orwell", img: "https://www.eourmart.com/cdn/shop/products/51OiP9ZQ1tL.jpg?v=1639834548&width=1445", desc: "A chilling vision of a totalitarian future where Big Brother watches everyone.", price: 300, },
//         { id: "1.3", mainid: "1", title: "Harry Potter and the Sorcerer’s Stone — J.K. Rowling", img: "https://substackcdn.com/image/fetch/$s_!fxEI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3317a341-8447-4104-a37a-88db2301f07b_2912x2096.png", desc: "An orphan discovers he’s a wizard and enters a world of magic, friendship, and destiny.", price: 250, },
//         { id: "1.4", mainid: "1", title: "The Girl on the Train — Paula Hawkins", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczZ1P8PeJxdj-SO01NWxh1HWux94QA-dAbw&s", desc: "A woman’s daily commute turns into a psychological thriller when she witnesses something shocking.", price: 100, },
//         { id: "1.5", mainid: "1", title: "Train to Pakistan – Khushwant Singh", img: "https://www.esplanade.com/-/media/Esplanade/Images/Whats-On/festival-and-series/2024/kalaa-utsavam/train-to-pakistan-01.ashx", desc: "A moving portrayal of love and humanity amid the horrors of the Partition.", price: 450, },
//         { id: "1.6", mainid: "1", title: "The White Tiger – Aravind Adiga", img: "https://images.squarespace-cdn.com/content/v1/6023b47e6c992a7aded9b1bd/2df6dd9f-6643-4a67-89d1-9af832b68c64/Book+cover+mock+up+the+white+tiger+novel+by+Aravind+Adiga+by+kiyary+do.jpg", desc: "A darkly comic story about an ambitious driver’s rise from poverty to wealth in modern India.", price: 220, },
//         { id: "1.7", mainid: "1", title: "Five Point Someone – Chetan Bhagat", img: "https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2021/05/five-points-of-someone.jpg", desc: "A humorous and emotional tale about three friends struggling through IIT life.", price: 130, },
//         { id: "1.8", mainid: "1", title: "The Lord of the Rings – J.R.R. Tolkien", img: "https://compote.slate.com/images/c011d20f-dfa5-48d8-baa3-ecc93a57023f.jpg", desc: "An epic quest to destroy a powerful ring that could doom the world.", price: 230, }
//     ],
//     2: [
//         { id: "2.1", mainid: "2", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
//         { id: "2.2", mainid: "2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
//         { id: "2.3", mainid: "2", title: "She Persisted – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9781524741723", desc: "A collection of inspiring stories of 13 American women who showed courage and perseverance.", price: 230, },
//         { id: "2.4", mainid: "2", title: "She Persisted Around the World – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9780525516996", desc: "Thirteen stories of women from around the world who changed history through bravery and determination.", price: 230, },
//         { id: "2.5", mainid: "2", title: "Courage: Eight Portraits – Gordon Brown", img: "https://cheltenhamrarebooks.co.uk/cdn/shop/products/brown-gordon-courage-signed-612331.jpg?v=1619938564&width=600", desc: "Profiles of eight remarkable figures like Mandela and MLK, exploring the meaning of moral courage.", price: 230, },
//         { id: "2.6", mainid: "2", title: "Why Courage Matters – John McCain & Mark Salter", img: "https://images.pangobooks.com/book_images/5heNRC71SKdOm0rbk7LjJp8EbdA2/1669494746982_5heNRC71SKdOm0rbk7LjJp8EbdA2?width=800&quality=85&crop=1%3A1", desc: "An inspiring look at what true courage means, featuring stories from history and McCain’s own life.", price: 230, },
//         { id: "2.7", mainid: "2", title: "The Auschwitz Volunteer – Witold Pilecki", img: "https://m.media-amazon.com/images/I/61FtyUQwQHL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "The true story of a man who volunteered to enter Auschwitz to organize resistance and report on atrocities.", price: 230, },
//         { id: "2.8", mainid: "2", title: "Igraine the Brave – Cornelia Funke", img: "https://asylumbookstore.com/cdn/shop/products/igraine-the-brave-paperback-by-cornelia-funke-811985.jpg?v=1697954448&width=1946", desc: "A fun fantasy tale of a young girl who dreams of becoming a knight and proves her bravery against invaders.", price: 230, }
//     ],
//     3: [
//         { id: "3.1", mainid: "3", title: "A History of the Sikhs – Khushwant Singh", img: "https://kitabhut.in/cdn/shop/files/IMG20240521100627.jpg?v=1716280390", desc: "A two-volume masterpiece tracing Sikh history from Guru Nanak’s time to post-independence India, offering deep insights into Sikh identity and evolution.", price: 230, },
//         { id: "3.2", mainid: "3", title: "The Sikh Religion: Its Gurus, Sacred Writings and Authors – Max Arthur Macauliffe", img: "https://m.media-amazon.com/images/I/61iK+OF8jrL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A monumental six-volume work exploring the lives and teachings of the Sikh Gurus with historical detail and reverence.", price: 230, },
//         { id: "3.3", mainid: "3", title: "Ranjit Singh: Maharaja of the Punjab - Khushwant Singh", img: "https://www.tallengestore.com/cdn/shop/products/AnEquestrianPortraitOfMaharajaRanjitSingh-VintageIndianMiniatureArtSikhPainting_74c0d1d8-1473-4d65-9118-8ae85ecde10b.jpg?v=1603354245", desc: "The book charts the life of Maharaja Ranjit Singh — “from being a petty chieftain to becoming the most powerful Indian ruler of his time. His empire extended from Tibet to the deserts of Sindh and from the Khyber Pass to the Sutlej.", price: 230, },
//         { id: "3.4", mainid: "3", title: "The Sikh Gurus and the Sikh Religion – Harbans Singh", img: "https://sikhizm.com/wp-content/uploads/2023/02/The-Encyclopaedia-of-Sikhism-Vol.4.webp", desc: "An insightful overview of the lives, philosophies, and spiritual legacies of the ten Sikh Gurus.", price: 230, },
//         { id: "3.5", mainid: "3", title: "The Evolution of the Sikh Community – W. H. McLeod", img: "https://m.media-amazon.com/images/I/41HK8HW21RL._AC_CR0%2C0%2C0%2C0_SY315_.jpg", desc: "A historical study of how the Sikh community developed its identity, institutions, and religious practices.", price: 230, },
//         { id: "3.6", mainid: "3", title: "The Sikhs in History – Dr. Sangat Singh", img: "https://m.media-amazon.com/images/I/316K5-263QL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Covers the political, social, and cultural evolution of Sikh society, with special focus on key historical turning points.", price: 230, },
//         { id: "3.7", mainid: "3", title: "Guru Nanak: His Life and Teachings – Dr. Surinder Singh Kohli", img: "https://fatehnama.com/wp-content/uploads/2019/11/Guru-Nanak-dev-ji-by-Harshinder-Kaur.jpg", desc: "A detailed account of Guru Nanak Dev Ji’s life, travels, and spiritual message that shaped Sikh philosophy.", price: 230, },
//         { id: "3.8", mainid: "3", title: "The Punjab Story – Edited by Khushwant Singh", img: "https://m.media-amazon.com/images/I/71JbWYhc34L._AC_UF1000,1000_QL80_.jpg", desc: "A collection of essays and personal accounts narrating Punjab’s turbulent modern history, including the 1947 Partition and 1984 events.", price: 230, }
//     ],
//     4: [
//         { id: "4.1", mainid: "4", title: "Sapiens: A Brief History of Humankind – Yuval Noah Harari", img: "https://static-01.shop.com.mm/p/7b87021301ba936ccf5e34b7a1e43015.jpg", desc: "A sweeping exploration of human evolution and how biology and history have defined societies, cultures, and economies.", price: 230, },
//         { id: "4.2", mainid: "4", title: "Guns, Germs, and Steel – Jared Diamond", img: "https://www.bookxcess.com/cdn/shop/products/2202cdb1e2ab452c8ae9a1b07463d401.thumbnail.0000000000_1500x.jpg?v=1679986000", desc: "An award-winning study of how geography, agriculture, and environment shaped civilizations’ destinies across history.", price: 230, },
//         { id: "4.3", mainid: "4", title: "A People’s History of the United States – Howard Zinn", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication19/v4/6a/c4/c5/6ac4c574-2865-1e26-1242-4b9682ae603f/mzm.happsmes.jpg/1200x675wz.jpg", desc: "A groundbreaking retelling of American history through the eyes of workers, women, and marginalized communities.", price: 230, },
//         { id: "4.4", mainid: "4", title: "The Pursuit of Glory: Europe 1648–1815 – Tim Blanning", img: "https://images4.penguinrandomhouse.com/smedia/9780143113898", desc: "A fascinating chronicle of Europe’s transformation during a time of empires, revolutions, and enlightenment.", price: 230, },
//         { id: "4.5", mainid: "4", title: "Postwar: A History of Europe Since 1945 – Tony Judt", img: "https://fivebooks.com/book/postwar-history-europe-1945-by-tony-judt/shareimage.jpg", desc: "A comprehensive narrative of Europe’s recovery, division, and reinvention after the devastation of World War II.", price: 230, },
//         { id: "4.6", mainid: "4", title: "The Story of Civilization – Will Durant & Ariel Durant", img: "https://i.ebayimg.com/images/g/kkAAAOSwFcJmptfu/s-l400.jpg", desc: "A monumental 11-volume masterpiece tracing humanity’s philosophical, cultural, and political evolution.", price: 230, },
//         { id: "4.7", mainid: "4", title: "The Language of History – Audrey Truschke", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/india-5-000-years-of-history-on-the-subcontinent-by-audrey-truschke--princeton-university-press-164827233-16x9_0.jpg?VersionId=IrFvnH_jIAM.Ywf9D0Yhy6d8CuKBwqdC&size=690:388", desc: "Explores Indo-Persian chronicles and Sanskrit traditions to reinterpret medieval Indian history.", price: 230, },
//         { id: "4.8", mainid: "4", title: "The Spartans: An Epic History by Paul Cartledge", img: "https://img-cdn.heureka.group/v1/f21d2928-4bb9-4eca-8541-09632017e05a.jpg?width=400&height=400", desc: "A comprehensive and elegant history of Sparta, from about 480 to 360 BC, giving broad coverage of society, politics and culture.", price: 230, }
//     ],
//     5: [
//         { id: "5.1", mainid: "5", title: "The Jungle Book – Rudyard Kipling", img: "https://shrihindpublications.in/wp-content/uploads/2025/05/Copy-of-THE-JUNGLE-BOOK.png", desc: "A timeless collection of stories about Mowgli, a boy raised by wolves, and his adventures among the animals of the jungle.", price: 230, },
//         { id: "5.2", mainid: "5", title: "Tarka the Otter – Henry Williamson", img: "https://www.buyusedbooks.in/image/cache/books/new_model5/9780140366211-f-500x500.jpg", desc: "A beautifully written nature novel that follows the life, struggles, and triumphs of an otter in the wild English countryside.", price: 230, },
//         { id: "5.3", mainid: "5", title: "The Incredible Journey – Sheila Burnford", img: "https://images.ctfassets.net/qpn1gztbusu2/PxVUIGDFDEDonDZW3xlun/eca86b5e5c002f873f85fb3aa39a0a46/sheila-burnford-the-incredible-journey.webp", desc: "Two dogs and a cat embark on a perilous 300-mile journey through the Canadian wilderness to find their beloved owners.", price: 230, },
//         { id: "5.4", mainid: "5", title: "The Exultant Ark – Jonathan Peter Balcombe", img: "https://static.vecteezy.com/system/resources/previews/030/178/569/large_2x/wallpaper-animals-the-forest-the-sun-the-animals-the-animals-the-animals-ai-generated-free-photo.jpg", desc: "A thought-provoking non-fiction book showcasing animals experiencing joy, play, and emotion — challenging human-centered views.", price: 230, },
//         { id: "5.5", mainid: "5", title: "The White Giraffe – Lauren St John", img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9d2cc67a-f6ba-4c98-89f8-b79f08230066.__CR0,0,300,300_PT0_SX300_V1___.png", desc: "After losing her parents, Martine moves to Africa, where she discovers a magical connection with a legendary white giraffe.", price: 230, },
//         { id: "5.6", mainid: "5", title: "A Sick Day for Amos McGee – Philip C. Stead", img: "https://www.heirloomartco.com/cdn/shop/products/IMG_2678.jpg?v=1607549389", desc: "When kind zookeeper Amos McGee falls ill, his animal friends visit him to return the love and care he’s always given them.", price: 230, },
//         { id: "5.7", mainid: "5", title: "Animal Homes – Ashwitha Jayakumar", img: "https://m.media-amazon.com/images/I/51xIP7d-OmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A delightful educational book for young readers exploring the unique and surprising homes animals build and live in.", price: 230, },
//         { id: "5.8", mainid: "5", title: "Migration: Incredible Animal Journeys – Mike Unwin", img: "https://ecsmedia.pl/c/16641801121416288-jpg-gallery.big-iext119655861.jpg", desc: "A visually stunning exploration of the epic journeys animals make across the planet — from whales to butterflies.", price: 230, }
//     ],
//     6: [
//         { id: "6.1", mainid: "6", title: "Salt, Fat, Acid, Heat – Samin Nosrat", img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FLifestyle%2F2019-09-cookbook-club-salt-fat-acid-heat%2FSalt-Fat-Acid-Heat_125", desc: "A revolutionary cookbook that teaches cooking through the four essential elements — salt, fat, acid, and heat — so you can cook confidently without relying on recipes.", price: 230, },
//         { id: "6.2", mainid: "6", title: "The Food Lab: Better Home Cooking Through Science – J. Kenji López-Alt", img: "https://blog.thermoworks.com/wp-content/uploads/2015/10/food_lab_z_b-1.jpg", desc: "Explores the science of home cooking, helping you master techniques and understand the 'why' behind great dishes.", price: 230, },
//         { id: "6.3", mainid: "6", title: "Made in India: Recipes from an Indian Family Kitchen – Meera Sodha", img: "https://rootsandcook.com/wp-content/uploads/2022/11/Honest-Cookbook-reviews-Made-in-India-1-Edit-min.jpg", desc: "Over 130 easy and vibrant recipes celebrating authentic Indian home-cooked meals passed down through generations.", price: 230, },
//         { id: "6.4", mainid: "6", title: "Indian-ish: Recipes and Antics from a Modern American Family – Priya Krishna", img: "https://strataportland.com/cdn/shop/products/P1010040_a1529dd7-122d-4f96-82b5-d99cc7551deb_1080x.jpg?v=1662657768", desc: "A fun and modern cookbook blending Indian traditions with contemporary American flavors, full of personality and creativity.", price: 230, },
//         { id: "6.5", mainid: "6", title: "The Rangoon Sisters: Recipes from Our Burmese Family Kitchen – Amy & Emily Chung", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/47/2f/2b/472f2b60-5e6b-76e9-8ab8-919a11b1bc80/9781473573659.jpg/1200x630wz.png", desc: "A beautiful collection of Burmese family recipes bringing together authentic flavors and heartwarming stories.", price: 230, },
//         { id: "6.6", mainid: "6", title: "Tiffin: 500 Authentic Recipes Celebrating India’s Regional Cuisine – Sonal Ved", img: "https://images.indianexpress.com/2018/11/tiffin-759.jpg", price: 230, },
//         { id: "6.7", mainid: "6", title: "Gordon Ramsay’s Ultimate Fit Food – Gordon Ramsay", img: "https://www.madrasshoppe.com/187239-large_default/gordon-ramsay-ultimate-fit-food-mouth-watering-recipes-to-fuel-you-for-life-ramsay-gordon.jpg", desc: "Healthy yet delicious recipes categorized into 'Healthy', 'Energized', and 'Lean' meals by world-famous chef Gordon Ramsay.", price: 230, },
//         { id: "6.8", mainid: "6", title: "The Bacon Cookbook – James Villas", img: "https://m.media-amazon.com/images/I/71WWfY6eagL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A flavorful collection of over 150 bacon-inspired recipes from around the world for true bacon lovers.", price: 230, }
//     ],
//     7: [
//         { id: "7.1", mainid: "7", title: "The Republic – Plato", img: "https://www.planksip.org/content/images/2021/05/585260_Plato_The-Republic_112110.jpg", desc: "A foundational text of Western philosophy exploring justice, morality, and the ideal society.", price: 230, },
//         { id: "7.2", mainid: "7", title: "Nicomachean Ethics – Aristotle", img: "https://cdn.thecollector.com/wp-content/uploads/2024/03/what-are-the-nicomachean-ethics.jpg", desc: "Aristotle’s classic work on virtue, character, and how to live a good life.", price: 230, },
//         { id: "7.3", mainid: "7", title: "Meditations – Marcus Aurelius", img: "https://m.media-amazon.com/images/I/41qDBtsEloL._SL500_.jpg", desc: "Personal reflections by a Roman emperor on Stoic philosophy, duty, and resilience.", price: 230, },
//         { id: "7.4", mainid: "7", title: "The Problems of Philosophy – Bertrand Russell", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d8/85/3d/d8853d61-0360-735c-cf8c-4225757b6846/9781998382460.png/1200x675wz.jpg", desc: "A clear and accessible introduction to core philosophical questions about knowledge and reality.", price: 230, },
//         { id: "7.5", mainid: "7", title: "A Theory of Justice – John Rawls", img: "https://webdiag547.blob.core.windows.net/live/images%2Fbooks%2F100490.jpg?sv=2020-04-08&st=2025-10-19T23%3A13%3A37Z&se=2030-10-19T23%3A18%3A37Z&sr=c&sp=r&sig=DRdx9ml5FKEY6SoJtyqsyXI9ZSU2OuHKQ%2BGSk43O5yE%3D", desc: "A modern classic proposing fairness and equality as the foundation of a just society.", price: 230, },
//         { id: "7.6", mainid: "7", title: "Beyond Good and Evil – Friedrich Nietzsche", img: "https://bluediarybooks.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-22-at-2.45.40-PM-450x415.jpeg", desc: "Nietzsche challenges traditional morality and urges the reader to create their own values.", price: 230, },
//         { id: "7.7", mainid: "7", title: "Philosophical Investigations – Ludwig Wittgenstein", img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/fb/93/de/fb93de41-b505-7b93-25b0-c7dda3fe2d0b/9781004134380.jpg/1200x675wf.jpg", desc: "A groundbreaking work exploring language, meaning, and how we understand the world.", price: 230, },
//         { id: "7.8", mainid: "7", title: "The Story of Philosophy – Will Durant", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/8c/90/2a/8c902a11-0686-e6f0-ef64-5e3d679bcdde/b6fb5965-964c-4c3c-8b95-5571923b1df0_cover_image.jpg/1200x900wz.jpg", desc: "An engaging overview of major Western philosophers and their ideas, written for general readers.", price: 230, },
//     ],
//     8: [
//         { id: "8.1", mainid: "8", title: "Rich Dad Poor Dad – Robert T. Kiyosaki", img: "https://icrrd.com/public/media/01-11-2020-083226richdad-poor-dad.jpg", desc: "A personal finance classic that contrasts two perspectives on money — one focused on earning and one on building wealth.", price: 230, },
//         { id: "8.2", mainid: "8", title: "The Intelligent Investor – Benjamin Graham", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/EB/QY/ND/147952517/the-intelligent-investor-by-benjamin-graham-warren-buffett-.jpeg", desc: "The definitive guide to value investing, teaching patience, discipline, and long-term financial thinking.", price: 230, },
//         { id: "8.3", mainid: "8", title: "Principles of Corporate Finance – Richard A. Brealey & Stewart C. Myers", img: "https://m.media-amazon.com/images/I/51TYY78A8DL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A comprehensive textbook on corporate finance, covering valuation, risk, capital structure, and strategic decision-making.", price: 230, },
//         { id: "8.4", mainid: "8", title: "Profit First – Mike Michalowicz", img: "https://hookagency.com/wp-content/uploads/2024/08/profit-first-summary-book-review.jpg", desc: "A business finance method that ensures profitability by prioritizing profit before expenses.", price: 230, },
//         { id: "8.5", mainid: "8", title: "The Wisdom of Finance – Mihir A. Desai", img: "https://static.getbookie.com/product/image/2022/12/full/1670341468-1890.44921875-00e289a5-350d-4cc7-b590-0005f9b14dc4.png", desc: "An engaging look at financial principles through the lens of literature, history, and philosophy.", price: 230, },
//         { id: "8.6", mainid: "8", title: "The Total Money Makeover – Dave Ramsey", img: "https://media.licdn.com/dms/image/v2/D4D12AQEVJ3WqvyMUTg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1675277324928?e=2147483647&v=beta&t=WWw2ezlWWld31HxroxpxdMwcGqcBYEKsqG5co6VfjSc", desc: "A step-by-step plan to get out of debt, build savings, and take control of your financial life.", price: 230, },
//         { id: "8.7", mainid: "8", title: "Too Big to Fail – Andrew Ross Sorkin", img: "https://fivebooks.com/book/too-big-fail-inside-story-how-wall-street-and-washington-fought-save-financial-system/shareimage.jpg", desc: "An inside account of the 2008 financial crisis, revealing how major institutions and governments responded to disaster.", price: 230, },
//         { id: "8.8", mainid: "8", title: "The Customer-Funded Business – John Mullins", img: "https://www.scalabl.com/bibliografia/img/portadas/042536-the-customer-funded-business-start-finance-or-grow-your-company-with-your-customers-cash.png", desc: "Shows how entrepreneurs can grow their ventures using customer revenue instead of relying on investors.", price: 230, }
//     ],
// };

// function AllBooks({
//   issueBooks: issueBooksFromProps = undefined,
//   setIssueBooks: setIssueBooksFromProps = undefined,
// }) {
//   // ---------------- UI States ----------------
//   const [viewMode, setViewMode] = useState("grid");
//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortAz, setSortAz] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);

//   // ---------------- Rent Modal State ----------------
//   const [rentModalOpen, setRentModalOpen] = useState(false);
//   const [modalPrefillBook, setModalPrefillBook] = useState(null);

//   // ---------------- Redux Setup ----------------
//   const dispatch = useDispatch(); 
//   const reduxIssueBooks = useSelector((state) => state.issueBooks.books);
//   const rentedBooks = useSelector((state) => state.issueBooks.rentedBooks); // Get rented books from Redux

//   // ---------------- Local fallback ----------------
//   const [localIssueBooks, setLocalIssueBooks] = useState([]);
//   const issueBooks =
//     typeof issueBooksFromProps !== "undefined"
//       ? issueBooksFromProps
//       : reduxIssueBooks && Array.isArray(reduxIssueBooks)
//       ? reduxIssueBooks
//       : localIssueBooks;

//   const setIssueBooks =
//     typeof setIssueBooksFromProps === "function"
//       ? setIssueBooksFromProps
//       : setLocalIssueBooks;

//   // ---------------- Refs ----------------
//   const filterSectionRef = useRef(null);

//   // ---------------- Flatten all books ----------------
//   const books = useMemo(() => {
//     if (!allBooksData || typeof allBooksData !== "object") return [];
//     return Object.entries(allBooksData).flatMap(([catId, list]) =>
//       list.map((book) => ({ ...book, mainid: catId }))
//     );
//   }, []);

//   // ---------------- Categories ----------------
//   const categories = useMemo(() => {
//     const keys = Object.keys(allBooksData || {});
//     return ["all", ...keys];
//   }, []);

//   // ---------------- Filtering & Sorting ----------------
//   const filteredBooks = useMemo(() => {
//     if (!Array.isArray(books)) return [];
//     const q = (search || "").trim().toLowerCase();

//     let list = books.filter((book) => {
//       const catMatch =
//         selectedCategory === "all"
//           ? true
//           : String(book.mainid) === String(selectedCategory);

//       const letterMatch = selectedLetter
//         ? (book.title || "")
//             .toLowerCase()
//             .startsWith(selectedLetter.toLowerCase())
//         : true;

//       const searchMatch =
//         q === "" ||
//         (book.title || "").toLowerCase().includes(q) ||
//         (book.desc || "").toLowerCase().includes(q);

//       return catMatch && letterMatch && searchMatch;
//     });

//     if (sortAz) {
//       list = list.slice().sort((a, b) => {
//         const at = (a.title || "").toLowerCase();
//         const bt = (b.title || "").toLowerCase();
//         return at.localeCompare(bt);
//       });
//     }

//     return list;
//   }, [books, search, selectedLetter, selectedCategory, sortAz]);

//   // ---------------- Handlers ----------------
//   const handleAddBook = (book) => {
//     if (!issueBooks.find((b) => b.id === book.id)) {
//       dispatch(addBook(book));
//       setIssueBooks([...issueBooks, book]);
//     }
//   };

//   const handleRemoveBook = (book) => {
//     dispatch(removeBook(book.id));
//     setIssueBooks(issueBooks.filter((b) => b.id !== book.id));
//   };

//   // Open modal with prefill
//   const openRentModal = (book) => {
//     setModalPrefillBook(book);
//     setRentModalOpen(true);
//   };

//   const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);
//   const isRented = (book) => !!rentedBooks.find((r) => r.bookName === book.title);

//   const handleCategoryClick = (catId) => {
//     setSelectedCategory(catId);
//   };

//   // ---------------- Render ----------------
//   return (
//     <div className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen pb-24 md:pb-15 mt-[1px] md:mt-[10px] px-6 ">
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
//         rentedBooks={rentedBooks} // Pass rented books to header if needed
//         setHeaderHeight={setHeaderHeight}
//       />

//       <div style={{ height: headerHeight ? headerHeight + 12 : 96 }} />

//       <div className="max-w-7xl mx-auto px-">
//         {/* Title and Toolbar */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800">All Books</h1>
//             <p className="text-sm text-gray-600 mt-1">
//               Browse the collection — use the search, A→Z or category filters.
//             </p>
//           </div>

//           {/* Toolbar */}
//           <div className="flex items-center gap-3">
//             {/* Categories */}
//             <div
//               ref={filterSectionRef}
//               className="hidden sm:flex items-center gap-2 bg-white/60 p-1 rounded-xl shadow-sm"
//             >
//               <button
//                 onClick={() => handleCategoryClick("all")}
//                 className={`px-3 py-1 rounded-lg text-sm font-medium ${
//                   selectedCategory === "all"
//                     ? "bg-amber-500 text-white shadow"
//                     : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 cursor-pointer"
//                 }`}
//               >
//                 All
//               </button>
//               {Object.keys(allBooksData).map((k) => (
//                 <button
//                   key={k}
//                   onClick={() => handleCategoryClick(k)}
//                   className={`px-3 py-1 rounded-lg text-sm font-medium ${
//                     selectedCategory === k
//                       ? "bg-amber-500 text-white shadow"
//                       : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 cursor-pointer"
//                   }`}
//                 >
//                   Category {k}
//                 </button>
//               ))}
//             </div>

//             {/* Sort */}
//             <button
//               onClick={() => setSortAz((s) => !s)}
//               className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium ${
//                 sortAz
//                   ? "bg-amber-600 text-white shadow"
//                   : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
//               }`}
//             >
//               {sortAz ? "A → Z" : "Default"}
//             </button>

//             {/* View Mode */}
//             <div className="flex items-center gap-2 bg-white p-1 rounded-xl">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-2 rounded-lg ${
//                   viewMode === "grid"
//                     ? "bg-amber-600 text-white shadow"
//                     : "text-amber-600 cursor-pointer"
//                 }`}
//                 aria-label="Grid view"
//               >
//                 <LayoutGrid size={18} />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-2 rounded-lg ${
//                   viewMode === "list"
//                     ? "bg-amber-600 text-white shadow"
//                     : "text-amber-600 cursor-pointer"
//                 }`}
//                 aria-label="List view"
//               >
//                 <List size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Modal (Issue Form) - Added Here */}
//         <AnimatePresence>
//           {rentModalOpen && (
//             <IssueBookModal
//               key="issue-modal"
//               open={rentModalOpen}
//               onClose={() => setRentModalOpen(false)}
//               prefillBook={modalPrefillBook}
//             />
//           )}
//         </AnimatePresence>

//         {/* BOOK DISPLAY */}
//         {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
//           <div
//             className={`mt-2 ${
//               viewMode === "grid"
//                 ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 "
//                 : "space-y-4 "
//             }`}
//           >
//             {filteredBooks.map((item) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.18 }}
//                 whileHover={{
//                   scale: 1.03,
//                   y: -5,
//                   transition: { type: "spring", stiffness: 260, damping: 20 },
//                 }}
//                 className={`bg-white rounded-2xl shadow-md border border-amber-100 hover:shadow-lg transition-shadow will-change-transform will-change-opacity ${
//                   viewMode === "grid"
//                     ? "flex flex-col"
//                     : "flex flex-col sm:flex-row items-center p-4 sm:p-5"
//                 }`}
//               >
//                 {/* Grid view */}
//                 {viewMode === "grid" ? (
//                   <>
//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
//                     />
//                     <div className="p-4 flex flex-col flex-1 justify-between">
//                       <h2 className="text-base sm:text-lg h-25 font-bold text-gray-800">
//                         {item.title}
//                       </h2>
//                       <p
//                         className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2"
//                         style={{ maxHeight: 80 }}
//                       >
//                         {item.desc}
//                       </p>
//                       <div className="mt-3 flex items-center justify-between gap-3">
//                         <p className="text-amber-700 font-semibold text-lg">
//                           ₹ {item.price}
//                         </p>
//                         <div className="flex-1 ml-3">
//                           {isAdded(item) ? (
//                             <div className="flex gap-2">
//                               <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-20 px-2 bg-green-500 shadow cursor-default">
//                                 <Check size={16} /> Added
//                               </button>
//                               <button
//                                 onClick={() => handleRemoveBook(item)}
//                                 className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform cursor-pointer"
//                               >
//                                 <MinusCircle size={16} /> Remove
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="flex gap-2">
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleAddBook(item)}
//                                 className="flex-1 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"
//                               >
//                                 <Plus size={16} /> Buy
//                               </motion.button>

//                               {isRented(item) ? (
//                                 <button
//                                   disabled
//                                   className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-green-500 cursor-not-allowed shadow"
//                                 >
//                                   <Check size={16} /> Rented
//                                 </button>
//                               ) : (
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => openRentModal(item)}
//                                   className="flex-1 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 shadow"
//                                 >
//                                   <Plus size={16} /> Rent
//                                 </motion.button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   // List view
//                   <>
//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       className="w-full sm:w-32 h-20 object-cover rounded-xl"
//                     />
//                     <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                       <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                         {item.title}
//                       </h2>
//                       <p className="text-gray-600 text-sm mt-1 max-h-10 overflow-y-auto pr-2">
//                         {item.desc}
//                       </p>
//                       <p className="text-amber-700 font-semibold text-lg mt-2">
//                         ₹ {item.price}
//                       </p>
//                     </div>
//                     <div className="ml-3 mt-3 sm:mt-0">
//                       {isAdded(item) ? (
//                         <div className="flex gap-2">
//                           <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow cursor-default">
//                             <Check size={16} /> Added
//                           </button>
//                           <button
//                             onClick={() => handleRemoveBook(item)}
//                             className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform"
//                           >
//                             <MinusCircle size={16} /> Remove
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="flex gap-2">
//                           <motion.button
//                             whileHover={{ scale: 1.07 }}
//                             whileTap={{ scale: 0.93 }}
//                             onClick={() => handleAddBook(item)}
//                             className="flex items-center justify-center gap-2 bg-amber-400 text-white font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-500 shadow-md"
//                           >
//                             <Plus size={18} /> Buy
//                           </motion.button>

//                           {isRented(item) ? (
//                             <button
//                               disabled
//                               className="flex items-center justify-center gap-2 bg-indigo-400 text-white font-medium px-4 py-2 rounded-xl cursor-not-allowed shadow-md"
//                             >
//                               <Check size={18} /> Rented
//                             </button>
//                           ) : (
//                             <motion.button
//                               whileHover={{ scale: 1.07 }}
//                               whileTap={{ scale: 0.93 }}
//                               onClick={() => openRentModal(item)}
//                               className="flex items-center justify-center gap-2 bg-blue-500 text-white font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600 shadow-md"
//                             >
//                               <Plus size={18} /> Rent
//                             </motion.button>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p
//             className={`text-gray-500 text-center ${
//               viewMode === "grid" ? "col-span-full" : ""
//             }`}
//           >
//             No books found.
//           </p>
//         )}
//       </div>
//       <div className=" mt-20 mb-[-45px] ml-[-5px] mr-[-5px]">
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default AllBooks;



import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Ensure all these icons are imported
import { 
  LayoutGrid, List, Check, Plus, MinusCircle, 
  Tags, CalendarDays, ChevronDown 
} from "lucide-react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { addBook, removeBook, addRentedBook } from "../Redux/issueBooksSlice.js";
import {  categories } from "../data/booksData";

import Header from "../Layout/header.jsx";
import Footer from "./footer.jsx";

// --- Category Dropdown ---
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
      <label className="font-semibold text-gray-700 dark:text-slate-300">{label}</label>

      <div
        onClick={() => setOpen(!open)}
        className="mt-2 flex items-center justify-between cursor-pointer
                   bg-white/60 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-2xl px-4 py-2
                   shadow-inner backdrop-blur-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all"
      >
        <div className="flex items-center gap-3">
          <Tags size={20} className="text-indigo-600 dark:text-indigo-400" />
          <span className={`font-medium ${value ? "text-gray-900 dark:text-slate-100" : "text-gray-500 dark:text-slate-400"}`}>
            {value || "Select category"}
          </span>
        </div>

        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={20} className="text-gray-600 dark:text-slate-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl
                        border border-gray-200 dark:border-slate-700 backdrop-blur-xl max-h-60 overflow-auto"
          >
            {catList.map((cat) => (
              <li
                key={cat.id || cat.title}
                onClick={() => {
                  onChange(cat.title);
                  setOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all
                            font-medium text-gray-700 dark:text-slate-300 ${value === cat.title ? "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-200" : ""
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

// --- Fancy Date Picker ---
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
      <label className="text-gray-700 dark:text-slate-300 font-semibold block">{label}</label>

      <div
        onClick={toggleCalendar}
        className="flex items-center gap-3 bg-white/60 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 
                   rounded-2xl px-4 py-2 shadow-inner backdrop-blur-lg 
                   hover:border-indigo-500 dark:hover:border-indigo-400 transition cursor-pointer"
      >
        <CalendarDays size={20} className="text-indigo-600 dark:text-indigo-400" />
        <span className="text-gray-700 dark:text-slate-200">
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
            className={`absolute z-50 bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-4 
                         border border-gray-200 dark:border-slate-700 backdrop-blur-xl 
                         ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
          >
            {/* Added style for DayPicker Dark Mode visibility */}
            <style>{`
                .rdp { --rdp-cell-size: 40px; --rdp-accent-color: #6366f1; --rdp-background-color: #4338ca; }
                .dark .rdp-day { color: #f1f5f9; }
                .dark .rdp-day_selected { background-color: var(--rdp-accent-color) !important; color: white; }
                .dark .rdp-nav_button { color: #f1f5f9; }
            `}</style>
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

// --- Issue Book Modal ---
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

  // ✅ THIS IS THE FIXED SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // We explicitly take the image from prefillBook here
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
      img: bookImage, // ✅ Guaranteed to have the image now
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="relative z-60 w-full max-w-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-amber-200 dark:border-slate-700 shadow-2xl rounded-3xl p-6 md:p-8 mx-4"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h3 className="text-2xl text-amber-950 dark:text-slate-100 font-bold tracking-tight">Issue Book</h3>
            <span className="text-amber-700/60 dark:text-slate-400 text-sm font-medium">Rent Management</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-amber-800/60 dark:text-slate-400 hover:bg-amber-100 dark:hover:bg-slate-700 hover:text-amber-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loadingStudent && <p className="text-sm text-amber-600 dark:text-amber-400 mb-4 animate-pulse">Loading student info...</p>}

        {success && (
          <div className="mb-5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-2">
            <span className="font-medium">Book issued successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Student Name</label>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => handleChange("studentName", e.target.value)}
              className="w-full rounded-xl border border-stone-200 dark:border-slate-600 p-2.5 bg-white/80 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:dark:text-slate-400"
              placeholder="Enter student name..."
            />
            {errors.studentName && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.studentName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Book Name</label>
            <input
              type="text"
              value={form.bookName}
              onChange={(e) => handleChange("bookName", e.target.value)}
              className="w-full rounded-xl border border-stone-200 dark:border-slate-600 p-2.5 bg-white/80 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:dark:text-slate-400"
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
              {errors.returnDate && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.returnDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Fees</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 dark:text-slate-400">₹</span>
              <input
                type="number"
                value={form.fees}
                readOnly
                className="w-full rounded-xl border border-stone-200 dark:border-slate-600 p-2.5 pl-7 bg-stone-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 cursor-not-allowed font-medium"
              />
            </div>
            <p className="text-xs text-gray-900 dark:text-slate-400 mt-1 ml-1">Rent Charges - ₹ 3/day <a className="text-orange-900 dark:text-orange-400">(Charges are calculated based on selected days)</a></p>

            {form.issueDate && form.returnDate && (
              <p className="text-gray-700 dark:text-slate-300 font-medium mt-2">
                Total Days: <span className="text-amber-700 dark:text-amber-400">{calculateDays(form.issueDate, form.returnDate)}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-200/50 dark:border-slate-700 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl cursor-pointer bg-white dark:bg-slate-700 border border-amber-300 dark:border-slate-600 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-600 font-medium  text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => navigate("/issue-book-form", { state: { prefillData: form } })}
              className="px-5 py-2.5 cursor-pointer rounded-xl bg-white dark:bg-slate-700 border border-amber-300 dark:border-slate-600 text-amber-900 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-slate-600 font-medium  text-sm  hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              View Details
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-slate-100 cursor-pointer text-white dark:text-slate-900 shadow-lg hover:bg-black dark:hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm flex items-center gap-2"
            >
              <span>Confirm Issue</span>
              <svg className="w-4 h-4 text-gray-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Import your data object
export const allBooksData = {
    1: [
        { id: "1.1", mainid: "1", title: "To Kill a Mockingbird – Harper Lee", img: "https://d3525k1ryd2155.cloudfront.net/h/112/127/1081127112.0.x.4.jpg", desc: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.", price: 200, },
        { id: "1.2", mainid: "1", title: "1984 – George Orwell", img: "https://www.eourmart.com/cdn/shop/products/51OiP9ZQ1tL.jpg?v=1639834548&width=1445", desc: "A chilling vision of a totalitarian future where Big Brother watches everyone.", price: 300, },
        { id: "1.3", mainid: "1", title: "Harry Potter and the Sorcerer’s Stone — J.K. Rowling", img: "https://substackcdn.com/image/fetch/$s_!fxEI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3317a341-8447-4104-a37a-88db2301f07b_2912x2096.png", desc: "An orphan discovers he’s a wizard and enters a world of magic, friendship, and destiny.", price: 250, },
        { id: "1.4", mainid: "1", title: "The Girl on the Train — Paula Hawkins", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczZ1P8PeJxdj-SO01NWxh1HWux94QA-dAbw&s", desc: "A woman’s daily commute turns into a psychological thriller when she witnesses something shocking.", price: 100, },
        { id: "1.5", mainid: "1", title: "Train to Pakistan – Khushwant Singh", img: "https://www.esplanade.com/-/media/Esplanade/Images/Whats-On/festival-and-series/2024/kalaa-utsavam/train-to-pakistan-01.ashx", desc: "A moving portrayal of love and humanity amid the horrors of the Partition.", price: 450, },
        { id: "1.6", mainid: "1", title: "The White Tiger – Aravind Adiga", img: "https://images.squarespace-cdn.com/content/v1/6023b47e6c992a7aded9b1bd/2df6dd9f-6643-4a67-89d1-9af832b68c64/Book+cover+mock+up+the+white+tiger+novel+by+Aravind+Adiga+by+kiyary+do.jpg", desc: "A darkly comic story about an ambitious driver’s rise from poverty to wealth in modern India.", price: 220, },
        { id: "1.7", mainid: "1", title: "Five Point Someone – Chetan Bhagat", img: "https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2021/05/five-points-of-someone.jpg", desc: "A humorous and emotional tale about three friends struggling through IIT life.", price: 130, },
        { id: "1.8", mainid: "1", title: "The Lord of the Rings – J.R.R. Tolkien", img: "https://compote.slate.com/images/c011d20f-dfa5-48d8-baa3-ecc93a57023f.jpg", desc: "An epic quest to destroy a powerful ring that could doom the world.", price: 230, }
    ],
    2: [
        { id: "2.1", mainid: "2", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
        { id: "2.2", mainid: "2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
        { id: "2.3", mainid: "2", title: "She Persisted – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9781524741723", desc: "A collection of inspiring stories of 13 American women who showed courage and perseverance.", price: 230, },
        { id: "2.4", mainid: "2", title: "She Persisted Around the World – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9780525516996", desc: "Thirteen stories of women from around the world who changed history through bravery and determination.", price: 230, },
        { id: "2.5", mainid: "2", title: "Courage: Eight Portraits – Gordon Brown", img: "https://cheltenhamrarebooks.co.uk/cdn/shop/products/brown-gordon-courage-signed-612331.jpg?v=1619938564&width=600", desc: "Profiles of eight remarkable figures like Mandela and MLK, exploring the meaning of moral courage.", price: 230, },
        { id: "2.6", mainid: "2", title: "Why Courage Matters – John McCain & Mark Salter", img: "https://images.pangobooks.com/book_images/5heNRC71SKdOm0rbk7LjJp8EbdA2/1669494746982_5heNRC71SKdOm0rbk7LjJp8EbdA2?width=800&quality=85&crop=1%3A1", desc: "An inspiring look at what true courage means, featuring stories from history and McCain’s own life.", price: 230, },
        { id: "2.7", mainid: "2", title: "The Auschwitz Volunteer – Witold Pilecki", img: "https://m.media-amazon.com/images/I/61FtyUQwQHL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "The true story of a man who volunteered to enter Auschwitz to organize resistance and report on atrocities.", price: 230, },
        { id: "2.8", mainid: "2", title: "Igraine the Brave – Cornelia Funke", img: "https://asylumbookstore.com/cdn/shop/products/igraine-the-brave-paperback-by-cornelia-funke-811985.jpg?v=1697954448&width=1946", desc: "A fun fantasy tale of a young girl who dreams of becoming a knight and proves her bravery against invaders.", price: 230, }
    ],
    3: [
        { id: "3.1", mainid: "3", title: "A History of the Sikhs – Khushwant Singh", img: "https://kitabhut.in/cdn/shop/files/IMG20240521100627.jpg?v=1716280390", desc: "A two-volume masterpiece tracing Sikh history from Guru Nanak’s time to post-independence India, offering deep insights into Sikh identity and evolution.", price: 230, },
        { id: "3.2", mainid: "3", title: "The Sikh Religion: Its Gurus, Sacred Writings and Authors – Max Arthur Macauliffe", img: "https://m.media-amazon.com/images/I/61iK+OF8jrL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A monumental six-volume work exploring the lives and teachings of the Sikh Gurus with historical detail and reverence.", price: 230, },
        { id: "3.3", mainid: "3", title: "Ranjit Singh: Maharaja of the Punjab - Khushwant Singh", img: "https://www.tallengestore.com/cdn/shop/products/AnEquestrianPortraitOfMaharajaRanjitSingh-VintageIndianMiniatureArtSikhPainting_74c0d1d8-1473-4d65-9118-8ae85ecde10b.jpg?v=1603354245", desc: "The book charts the life of Maharaja Ranjit Singh — “from being a petty chieftain to becoming the most powerful Indian ruler of his time. His empire extended from Tibet to the deserts of Sindh and from the Khyber Pass to the Sutlej.", price: 230, },
        { id: "3.4", mainid: "3", title: "The Sikh Gurus and the Sikh Religion – Harbans Singh", img: "https://sikhizm.com/wp-content/uploads/2023/02/The-Encyclopaedia-of-Sikhism-Vol.4.webp", desc: "An insightful overview of the lives, philosophies, and spiritual legacies of the ten Sikh Gurus.", price: 230, },
        { id: "3.5", mainid: "3", title: "The Evolution of the Sikh Community – W. H. McLeod", img: "https://m.media-amazon.com/images/I/41HK8HW21RL._AC_CR0%2C0%2C0%2C0_SY315_.jpg", desc: "A historical study of how the Sikh community developed its identity, institutions, and religious practices.", price: 230, },
        { id: "3.6", mainid: "3", title: "The Sikhs in History – Dr. Sangat Singh", img: "https://m.media-amazon.com/images/I/316K5-263QL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Covers the political, social, and cultural evolution of Sikh society, with special focus on key historical turning points.", price: 230, },
        { id: "3.7", mainid: "3", title: "Guru Nanak: His Life and Teachings – Dr. Surinder Singh Kohli", img: "https://fatehnama.com/wp-content/uploads/2019/11/Guru-Nanak-dev-ji-by-Harshinder-Kaur.jpg", desc: "A detailed account of Guru Nanak Dev Ji’s life, travels, and spiritual message that shaped Sikh philosophy.", price: 230, },
        { id: "3.8", mainid: "3", title: "The Punjab Story – Edited by Khushwant Singh", img: "https://m.media-amazon.com/images/I/71JbWYhc34L._AC_UF1000,1000_QL80_.jpg", desc: "A collection of essays and personal accounts narrating Punjab’s turbulent modern history, including the 1947 Partition and 1984 events.", price: 230, }
    ],
    4: [
        { id: "4.1", mainid: "4", title: "Sapiens: A Brief History of Humankind – Yuval Noah Harari", img: "https://static-01.shop.com.mm/p/7b87021301ba936ccf5e34b7a1e43015.jpg", desc: "A sweeping exploration of human evolution and how biology and history have defined societies, cultures, and economies.", price: 230, },
        { id: "4.2", mainid: "4", title: "Guns, Germs, and Steel – Jared Diamond", img: "https://www.bookxcess.com/cdn/shop/products/2202cdb1e2ab452c8ae9a1b07463d401.thumbnail.0000000000_1500x.jpg?v=1679986000", desc: "An award-winning study of how geography, agriculture, and environment shaped civilizations’ destinies across history.", price: 230, },
        { id: "4.3", mainid: "4", title: "A People’s History of the United States – Howard Zinn", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication19/v4/6a/c4/c5/6ac4c574-2865-1e26-1242-4b9682ae603f/mzm.happsmes.jpg/1200x675wz.jpg", desc: "A groundbreaking retelling of American history through the eyes of workers, women, and marginalized communities.", price: 230, },
        { id: "4.4", mainid: "4", title: "The Pursuit of Glory: Europe 1648–1815 – Tim Blanning", img: "https://images4.penguinrandomhouse.com/smedia/9780143113898", desc: "A fascinating chronicle of Europe’s transformation during a time of empires, revolutions, and enlightenment.", price: 230, },
        { id: "4.5", mainid: "4", title: "Postwar: A History of Europe Since 1945 – Tony Judt", img: "https://fivebooks.com/book/postwar-history-europe-1945-by-tony-judt/shareimage.jpg", desc: "A comprehensive narrative of Europe’s recovery, division, and reinvention after the devastation of World War II.", price: 230, },
        { id: "4.6", mainid: "4", title: "The Story of Civilization – Will Durant & Ariel Durant", img: "https://i.ebayimg.com/images/g/kkAAAOSwFcJmptfu/s-l400.jpg", desc: "A monumental 11-volume masterpiece tracing humanity’s philosophical, cultural, and political evolution.", price: 230, },
        { id: "4.7", mainid: "4", title: "The Language of History – Audrey Truschke", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/india-5-000-years-of-history-on-the-subcontinent-by-audrey-truschke--princeton-university-press-164827233-16x9_0.jpg?VersionId=IrFvnH_jIAM.Ywf9D0Yhy6d8CuKBwqdC&size=690:388", desc: "Explores Indo-Persian chronicles and Sanskrit traditions to reinterpret medieval Indian history.", price: 230, },
        { id: "4.8", mainid: "4", title: "The Spartans: An Epic History by Paul Cartledge", img: "https://img-cdn.heureka.group/v1/f21d2928-4bb9-4eca-8541-09632017e05a.jpg?width=400&height=400", desc: "A comprehensive and elegant history of Sparta, from about 480 to 360 BC, giving broad coverage of society, politics and culture.", price: 230, }
    ],
    5: [
        { id: "5.1", mainid: "5", title: "The Jungle Book – Rudyard Kipling", img: "https://shrihindpublications.in/wp-content/uploads/2025/05/Copy-of-THE-JUNGLE-BOOK.png", desc: "A timeless collection of stories about Mowgli, a boy raised by wolves, and his adventures among the animals of the jungle.", price: 230, },
        { id: "5.2", mainid: "5", title: "Tarka the Otter – Henry Williamson", img: "https://www.buyusedbooks.in/image/cache/books/new_model5/9780140366211-f-500x500.jpg", desc: "A beautifully written nature novel that follows the life, struggles, and triumphs of an otter in the wild English countryside.", price: 230, },
        { id: "5.3", mainid: "5", title: "The Incredible Journey – Sheila Burnford", img: "https://images.ctfassets.net/qpn1gztbusu2/PxVUIGDFDEDonDZW3xlun/eca86b5e5c002f873f85fb3aa39a0a46/sheila-burnford-the-incredible-journey.webp", desc: "Two dogs and a cat embark on a perilous 300-mile journey through the Canadian wilderness to find their beloved owners.", price: 230, },
        { id: "5.4", mainid: "5", title: "The Exultant Ark – Jonathan Peter Balcombe", img: "https://static.vecteezy.com/system/resources/previews/030/178/569/large_2x/wallpaper-animals-the-forest-the-sun-the-animals-the-animals-the-animals-ai-generated-free-photo.jpg", desc: "A thought-provoking non-fiction book showcasing animals experiencing joy, play, and emotion — challenging human-centered views.", price: 230, },
        { id: "5.5", mainid: "5", title: "The White Giraffe – Lauren St John", img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9d2cc67a-f6ba-4c98-89f8-b79f08230066.__CR0,0,300,300_PT0_SX300_V1___.png", desc: "After losing her parents, Martine moves to Africa, where she discovers a magical connection with a legendary white giraffe.", price: 230, },
        { id: "5.6", mainid: "5", title: "A Sick Day for Amos McGee – Philip C. Stead", img: "https://www.heirloomartco.com/cdn/shop/products/IMG_2678.jpg?v=1607549389", desc: "When kind zookeeper Amos McGee falls ill, his animal friends visit him to return the love and care he’s always given them.", price: 230, },
        { id: "5.7", mainid: "5", title: "Animal Homes – Ashwitha Jayakumar", img: "https://m.media-amazon.com/images/I/51xIP7d-OmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A delightful educational book for young readers exploring the unique and surprising homes animals build and live in.", price: 230, },
        { id: "5.8", mainid: "5", title: "Migration: Incredible Animal Journeys – Mike Unwin", img: "https://ecsmedia.pl/c/16641801121416288-jpg-gallery.big-iext119655861.jpg", desc: "A visually stunning exploration of the epic journeys animals make across the planet — from whales to butterflies.", price: 230, }
    ],
    6: [
        { id: "6.1", mainid: "6", title: "Salt, Fat, Acid, Heat – Samin Nosrat", img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FLifestyle%2F2019-09-cookbook-club-salt-fat-acid-heat%2FSalt-Fat-Acid-Heat_125", desc: "A revolutionary cookbook that teaches cooking through the four essential elements — salt, fat, acid, and heat — so you can cook confidently without relying on recipes.", price: 230, },
        { id: "6.2", mainid: "6", title: "The Food Lab: Better Home Cooking Through Science – J. Kenji López-Alt", img: "https://blog.thermoworks.com/wp-content/uploads/2015/10/food_lab_z_b-1.jpg", desc: "Explores the science of home cooking, helping you master techniques and understand the 'why' behind great dishes.", price: 230, },
        { id: "6.3", mainid: "6", title: "Made in India: Recipes from an Indian Family Kitchen – Meera Sodha", img: "https://rootsandcook.com/wp-content/uploads/2022/11/Honest-Cookbook-reviews-Made-in-India-1-Edit-min.jpg", desc: "Over 130 easy and vibrant recipes celebrating authentic Indian home-cooked meals passed down through generations.", price: 230, },
        { id: "6.4", mainid: "6", title: "Indian-ish: Recipes and Antics from a Modern American Family – Priya Krishna", img: "https://strataportland.com/cdn/shop/products/P1010040_a1529dd7-122d-4f96-82b5-d99cc7551deb_1080x.jpg?v=1662657768", desc: "A fun and modern cookbook blending Indian traditions with contemporary American flavors, full of personality and creativity.", price: 230, },
        { id: "6.5", mainid: "6", title: "The Rangoon Sisters: Recipes from Our Burmese Family Kitchen – Amy & Emily Chung", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/47/2f/2b/472f2b60-5e6b-76e9-8ab8-919a11b1bc80/9781473573659.jpg/1200x630wz.png", desc: "A beautiful collection of Burmese family recipes bringing together authentic flavors and heartwarming stories.", price: 230, },
        { id: "6.6", mainid: "6", title: "Tiffin: 500 Authentic Recipes Celebrating India’s Regional Cuisine – Sonal Ved", img: "https://images.indianexpress.com/2018/11/tiffin-759.jpg", price: 230, },
        { id: "6.7", mainid: "6", title: "Gordon Ramsay’s Ultimate Fit Food – Gordon Ramsay", img: "https://www.madrasshoppe.com/187239-large_default/gordon-ramsay-ultimate-fit-food-mouth-watering-recipes-to-fuel-you-for-life-ramsay-gordon.jpg", desc: "Healthy yet delicious recipes categorized into 'Healthy', 'Energized', and 'Lean' meals by world-famous chef Gordon Ramsay.", price: 230, },
        { id: "6.8", mainid: "6", title: "The Bacon Cookbook – James Villas", img: "https://m.media-amazon.com/images/I/71WWfY6eagL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A flavorful collection of over 150 bacon-inspired recipes from around the world for true bacon lovers.", price: 230, }
    ],
    7: [
        { id: "7.1", mainid: "7", title: "The Republic – Plato", img: "https://www.planksip.org/content/images/2021/05/585260_Plato_The-Republic_112110.jpg", desc: "A foundational text of Western philosophy exploring justice, morality, and the ideal society.", price: 230, },
        { id: "7.2", mainid: "7", title: "Nicomachean Ethics – Aristotle", img: "https://cdn.thecollector.com/wp-content/uploads/2024/03/what-are-the-nicomachean-ethics.jpg", desc: "Aristotle’s classic work on virtue, character, and how to live a good life.", price: 230, },
        { id: "7.3", mainid: "7", title: "Meditations – Marcus Aurelius", img: "https://m.media-amazon.com/images/I/41qDBtsEloL._SL500_.jpg", desc: "Personal reflections by a Roman emperor on Stoic philosophy, duty, and resilience.", price: 230, },
        { id: "7.4", mainid: "7", title: "The Problems of Philosophy – Bertrand Russell", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d8/85/3d/d8853d61-0360-735c-cf8c-4225757b6846/9781998382460.png/1200x675wz.jpg", desc: "A clear and accessible introduction to core philosophical questions about knowledge and reality.", price: 230, },
        { id: "7.5", mainid: "7", title: "A Theory of Justice – John Rawls", img: "https://webdiag547.blob.core.windows.net/live/images%2Fbooks%2F100490.jpg?sv=2020-04-08&st=2025-10-19T23%3A13%3A37Z&se=2030-10-19T23%3A18%3A37Z&sr=c&sp=r&sig=DRdx9ml5FKEY6SoJtyqsyXI9ZSU2OuHKQ%2BGSk43O5yE%3D", desc: "A modern classic proposing fairness and equality as the foundation of a just society.", price: 230, },
        { id: "7.6", mainid: "7", title: "Beyond Good and Evil – Friedrich Nietzsche", img: "https://bluediarybooks.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-22-at-2.45.40-PM-450x415.jpeg", desc: "Nietzsche challenges traditional morality and urges the reader to create their own values.", price: 230, },
        { id: "7.7", mainid: "7", title: "Philosophical Investigations – Ludwig Wittgenstein", img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/fb/93/de/fb93de41-b505-7b93-25b0-c7dda3fe2d0b/9781004134380.jpg/1200x675wf.jpg", desc: "A groundbreaking work exploring language, meaning, and how we understand the world.", price: 230, },
        { id: "7.8", mainid: "7", title: "The Story of Philosophy – Will Durant", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/8c/90/2a/8c902a11-0686-e6f0-ef64-5e3d679bcdde/b6fb5965-964c-4c3c-8b95-5571923b1df0_cover_image.jpg/1200x900wz.jpg", desc: "An engaging overview of major Western philosophers and their ideas, written for general readers.", price: 230, },
    ],
    8: [
        { id: "8.1", mainid: "8", title: "Rich Dad Poor Dad – Robert T. Kiyosaki", img: "https://icrrd.com/public/media/01-11-2020-083226richdad-poor-dad.jpg", desc: "A personal finance classic that contrasts two perspectives on money — one focused on earning and one on building wealth.", price: 230, },
        { id: "8.2", mainid: "8", title: "The Intelligent Investor – Benjamin Graham", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/EB/QY/ND/147952517/the-intelligent-investor-by-benjamin-graham-warren-buffett-.jpeg", desc: "The definitive guide to value investing, teaching patience, discipline, and long-term financial thinking.", price: 230, },
        { id: "8.3", mainid: "8", title: "Principles of Corporate Finance – Richard A. Brealey & Stewart C. Myers", img: "https://m.media-amazon.com/images/I/51TYY78A8DL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A comprehensive textbook on corporate finance, covering valuation, risk, capital structure, and strategic decision-making.", price: 230, },
        { id: "8.4", mainid: "8", title: "Profit First – Mike Michalowicz", img: "https://hookagency.com/wp-content/uploads/2024/08/profit-first-summary-book-review.jpg", desc: "A business finance method that ensures profitability by prioritizing profit before expenses.", price: 230, },
        { id: "8.5", mainid: "8", title: "The Wisdom of Finance – Mihir A. Desai", img: "https://static.getbookie.com/product/image/2022/12/full/1670341468-1890.44921875-00e289a5-350d-4cc7-b590-0005f9b14dc4.png", desc: "An engaging look at financial principles through the lens of literature, history, and philosophy.", price: 230, },
        { id: "8.6", mainid: "8", title: "The Total Money Makeover – Dave Ramsey", img: "https://media.licdn.com/dms/image/v2/D4D12AQEVJ3WqvyMUTg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1675277324928?e=2147483647&v=beta&t=WWw2ezlWWld31HxroxpxdMwcGqcBYEKsqG5co6VfjSc", desc: "A step-by-step plan to get out of debt, build savings, and take control of your financial life.", price: 230, },
        { id: "8.7", mainid: "8", title: "Too Big to Fail – Andrew Ross Sorkin", img: "https://fivebooks.com/book/too-big-fail-inside-story-how-wall-street-and-washington-fought-save-financial-system/shareimage.jpg", desc: "An inside account of the 2008 financial crisis, revealing how major institutions and governments responded to disaster.", price: 230, },
        { id: "8.8", mainid: "8", title: "The Customer-Funded Business – John Mullins", img: "https://www.scalabl.com/bibliografia/img/portadas/042536-the-customer-funded-business-start-finance-or-grow-your-company-with-your-customers-cash.png", desc: "Shows how entrepreneurs can grow their ventures using customer revenue instead of relying on investors.", price: 230, }
    ],
};

function AllBooks({
  issueBooks: issueBooksFromProps = undefined,
  setIssueBooks: setIssueBooksFromProps = undefined,
}) {
  // ---------------- UI States ----------------
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortAz, setSortAz] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // ---------------- Rent Modal State ----------------
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [modalPrefillBook, setModalPrefillBook] = useState(null);

  // ---------------- Redux Setup ----------------
  const dispatch = useDispatch(); 
  const reduxIssueBooks = useSelector((state) => state.issueBooks.books);
  const rentedBooks = useSelector((state) => state.issueBooks.rentedBooks); // Get rented books from Redux

  // ---------------- Local fallback ----------------
  const [localIssueBooks, setLocalIssueBooks] = useState([]);
  const issueBooks =
    typeof issueBooksFromProps !== "undefined"
      ? issueBooksFromProps
      : reduxIssueBooks && Array.isArray(reduxIssueBooks)
      ? reduxIssueBooks
      : localIssueBooks;

  const setIssueBooks =
    typeof setIssueBooksFromProps === "function"
      ? setIssueBooksFromProps
      : setLocalIssueBooks;

  // ---------------- Refs ----------------
  const filterSectionRef = useRef(null);

  // ---------------- Flatten all books ----------------
  const books = useMemo(() => {
    if (!allBooksData || typeof allBooksData !== "object") return [];
    return Object.entries(allBooksData).flatMap(([catId, list]) =>
      list.map((book) => ({ ...book, mainid: catId }))
    );
  }, []);

  // ---------------- Categories ----------------
  const categoriesList = useMemo(() => {
    const keys = Object.keys(allBooksData || {});
    return ["all", ...keys];
  }, []);

  // ---------------- Filtering & Sorting ----------------
  const filteredBooks = useMemo(() => {
    if (!Array.isArray(books)) return [];
    const q = (search || "").trim().toLowerCase();

    let list = books.filter((book) => {
      const catMatch =
        selectedCategory === "all"
          ? true
          : String(book.mainid) === String(selectedCategory);

      const letterMatch = selectedLetter
        ? (book.title || "")
            .toLowerCase()
            .startsWith(selectedLetter.toLowerCase())
        : true;

      const searchMatch =
        q === "" ||
        (book.title || "").toLowerCase().includes(q) ||
        (book.desc || "").toLowerCase().includes(q);

      return catMatch && letterMatch && searchMatch;
    });

    if (sortAz) {
      list = list.slice().sort((a, b) => {
        const at = (a.title || "").toLowerCase();
        const bt = (b.title || "").toLowerCase();
        return at.localeCompare(bt);
      });
    }

    return list;
  }, [books, search, selectedLetter, selectedCategory, sortAz]);

  // ---------------- Handlers ----------------
  const handleAddBook = (book) => {
    if (!issueBooks.find((b) => b.id === book.id)) {
      dispatch(addBook(book));
      setIssueBooks([...issueBooks, book]);
    }
  };

  const handleRemoveBook = (book) => {
    dispatch(removeBook(book.id));
    setIssueBooks(issueBooks.filter((b) => b.id !== book.id));
  };

  // Open modal with prefill
  const openRentModal = (book) => {
    setModalPrefillBook(book);
    setRentModalOpen(true);
  };

  const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);
  const isRented = (book) => !!rentedBooks.find((r) => r.bookName === book.title);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
  };

  // ---------------- Render ----------------
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen pb-24 md:pb-15 mt-[1px] md:mt-[10px] px-6 transition-colors duration-500">
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
        rentedBooks={rentedBooks} // Pass rented books to header if needed
        setHeaderHeight={setHeaderHeight}
      />

      <div style={{ height: headerHeight ? headerHeight + 12 : 96 }} />

      <div className="max-w-7xl mx-auto px-">
        {/* Title and Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100">All Books</h1>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
              Browse the collection — use the search, A→Z or category filters.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3">
            {/* Categories */}
            <div
              ref={filterSectionRef}
              className="hidden sm:flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 p-1 rounded-xl shadow-sm border-2 border-orange-300   dark:border-slate-700"
            >
              <button
                onClick={() => handleCategoryClick("all")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-amber-500 text-white shadow"
                    : "bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-500 border border-amber-200 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-slate-600 cursor-pointer"
                }`}
              >
                All
              </button>
              {Object.keys(allBooksData).map((k) => (
                <button
                  key={k}
                  onClick={() => handleCategoryClick(k)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === k
                      ? "bg-amber-500 text-white shadow"
                      : "bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-500 border border-amber-200 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-slate-600 cursor-pointer"
                  }`}
                >
                  Category {k}
                </button>
              ))}
            </div>

            {/* Sort */}
            <button
              onClick={() => setSortAz((s) => !s)}
              className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                sortAz
                  ? "bg-amber-600 text-white shadow"
                  : "bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-500 border border-amber-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-slate-700"
              }`}
            >
              {sortAz ? "A → Z" : "Default"}
            </button>

            {/* View Mode */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border-2 border-orange-300   dark:border-slate-700 ">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-amber-600 text-white shadow"
                    : "text-amber-600 dark:text-amber-500 cursor-pointer hover:bg-slate-100  dark:hover:bg-slate-700"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-amber-600 text-white shadow"
                    : "text-amber-600 dark:text-amber-500 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal (Issue Form) - Added Here */}
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

        {/* BOOK DISPLAY */}
        {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
          <div
            className={`mt-2 ${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 "
                : "space-y-4 "
            }`}
          >
            {filteredBooks.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                className={`bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-amber-100 dark:border-slate-800 hover:shadow-lg transition-all will-change-transform will-change-opacity ${
                  viewMode === "grid"
                    ? "flex flex-col"
                    : "flex flex-col sm:flex-row items-center p-4 sm:p-5"
                }`}
              >
                {/* Grid view */}
                {viewMode === "grid" ? (
                  <>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
                    />
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <h2 className="text-base sm:text-lg h-25 font-bold text-gray-800 dark:text-slate-100">
                        {item.title}
                      </h2>
                      <p
                        className="text-gray-600 dark:text-slate-400 text-sm mt-2 h-15 overflow-y-auto pr-2"
                        style={{ maxHeight: 80 }}
                      >
                        {item.desc}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-amber-700 dark:text-amber-500 font-semibold text-lg">
                          ₹ {item.price}
                        </p>
                        <div className="flex-1 ml-3">
                          {isAdded(item) ? (
                            <div className="flex gap-2">
                              <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-20 px-2 bg-green-500 shadow cursor-default">
                                <Check size={16} /> Added
                              </button>
                              <button
                                onClick={() => handleRemoveBook(item)}
                                className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform cursor-pointer"
                              >
                                <MinusCircle size={16} /> Remove
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddBook(item)}
                                className="flex-1 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow"
                              >
                                <Plus size={16} /> Buy
                              </motion.button>

                              {isRented(item) ? (
                                <button
                                  disabled
                                  className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-green-500 cursor-not-allowed shadow"
                                >
                                  <Check size={16} /> Rented
                                </button>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => openRentModal(item)}
                                  className="flex-1 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 shadow"
                                >
                                  <Plus size={16} /> Rent
                                </motion.button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // List view
                  <>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full sm:w-32 h-20 object-cover rounded-xl"
                    />
                    <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 dark:text-slate-400 text-sm mt-1 max-h-10 overflow-y-auto pr-2">
                        {item.desc}
                      </p>
                      <p className="text-amber-700 dark:text-amber-500 font-semibold text-lg mt-2">
                        ₹ {item.price}
                      </p>
                    </div>
                    <div className="ml-3 mt-3 sm:mt-0">
                      {isAdded(item) ? (
                        <div className="flex gap-2">
                          <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow cursor-default">
                            <Check size={16} /> Added
                          </button>
                          <button
                            onClick={() => handleRemoveBook(item)}
                            className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform"
                          >
                            <MinusCircle size={16} /> Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.93 }}
                            onClick={() => handleAddBook(item)}
                            className="flex items-center justify-center gap-2 bg-amber-400 text-white font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-500 shadow-md"
                          >
                            <Plus size={18} /> Buy
                          </motion.button>

                          {isRented(item) ? (
                            <button
                              disabled
                              className="flex items-center justify-center gap-2 bg-green-500 text-white font-medium px-4 py-2 rounded-xl cursor-not-allowed shadow-md"
                            >
                              <Check size={18} /> Rented
                            </button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.07 }}
                              whileTap={{ scale: 0.93 }}
                              onClick={() => openRentModal(item)}
                              className="flex items-center justify-center gap-2 bg-blue-500 text-white font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600 shadow-md"
                            >
                              <Plus size={18} /> Rent
                            </motion.button>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p
            className={`text-gray-500 dark:text-slate-400 text-center ${
              viewMode === "grid" ? "col-span-full" : ""
            }`}
          >
            No books found.
          </p>
        )}
      </div>
      <div className=" mt-20 mb-[-45px] ml-[-5px] mr-[-5px]">
        <Footer />
      </div>
    </div>
  );
}

export default AllBooks;

