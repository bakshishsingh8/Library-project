// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Check, MinusCircle } from "lucide-react";
// import Header from "../Layout/header.jsx";
// import { addBook, removeBook } from "../Redux/issueBooksSlice.js";

// // Reuse animation variants for consistency with Books page
// export const allBooksData = {
//   1: [
//     { id: "1.1", mainid: "1", title: "To Kill a Mockingbird – Harper Lee", img: "https://d3525k1ryd2155.cloudfront.net/h/112/127/1081127112.0.x.4.jpg", desc: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.", price: 200, },
//     { id: "1.2", mainid: "1", title: "1984 – George Orwell", img: "https://www.eourmart.com/cdn/shop/products/51OiP9ZQ1tL.jpg?v=1639834548&width=1445", desc: "A chilling vision of a totalitarian future where Big Brother watches everyone.", price: 300, },
//     ],
//   2: [
//     { id: "2.1", mainid: "2", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
//     { id: "2.2", mainid: "2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
//     ],
//   3: [
//     { id: "3.1", mainid: "3", title: "A History of the Sikhs – Khushwant Singh", img: "https://kitabhut.in/cdn/shop/files/IMG20240521100627.jpg?v=1716280390", desc: "A two-volume masterpiece tracing Sikh history from Guru Nanak’s time to post-independence India, offering deep insights into Sikh identity and evolution.", price: 230, },
//     { id: "3.2", mainid: "3", title: "The Sikh Religion: Its Gurus, Sacred Writings and Authors – Max Arthur Macauliffe", img: "https://m.media-amazon.com/images/I/61iK+OF8jrL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A monumental six-volume work exploring the lives and teachings of the Sikh Gurus with historical detail and reverence.", price: 230, },
//     ],
//   4: [
//     { id: "4.1", mainid: "4", title: "Sapiens: A Brief History of Humankind – Yuval Noah Harari", img: "https://static-01.shop.com.mm/p/7b87021301ba936ccf5e34b7a1e43015.jpg", desc: "A sweeping exploration of human evolution and how biology and history have defined societies, cultures, and economies.", price: 230, },
//     { id: "4.2", mainid: "4", title: "Guns, Germs, and Steel – Jared Diamond", img: "https://www.bookxcess.com/cdn/shop/products/2202cdb1e2ab452c8ae9a1b07463d401.thumbnail.0000000000_1500x.jpg?v=1679986000", desc: "An award-winning study of how geography, agriculture, and environment shaped civilizations’ destinies across history.", price: 230, },
//    ],
//   5: [
//     { id: "5.1", mainid: "5", title: "The Jungle Book – Rudyard Kipling", img: "https://shrihindpublications.in/wp-content/uploads/2025/05/Copy-of-THE-JUNGLE-BOOK.png", desc: "A timeless collection of stories about Mowgli, a boy raised by wolves, and his adventures among the animals of the jungle.", price: 230, },
//     { id: "5.2", mainid: "5", title: "Tarka the Otter – Henry Williamson", img: "https://www.buyusedbooks.in/image/cache/books/new_model5/9780140366211-f-500x500.jpg", desc: "A beautifully written nature novel that follows the life, struggles, and triumphs of an otter in the wild English countryside.", price: 230, },
//      ],
//   6: [
//     { id: "6.1", mainid: "6", title: "Salt, Fat, Acid, Heat – Samin Nosrat", img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FLifestyle%2F2019-09-cookbook-club-salt-fat-acid-heat%2FSalt-Fat-Acid-Heat_125", desc: "A revolutionary cookbook that teaches cooking through the four essential elements — salt, fat, acid, and heat — so you can cook confidently without relying on recipes.", price: 230, },
//     { id: "6.2", mainid: "6", title: "The Food Lab: Better Home Cooking Through Science – J. Kenji López-Alt", img: "https://blog.thermoworks.com/wp-content/uploads/2015/10/food_lab_z_b-1.jpg", desc: "Explores the science of home cooking, helping you master techniques and understand the 'why' behind great dishes.", price: 230, },
//     ],
//   7: [
//     { id: "7.1", mainid: "7", title: "The Republic – Plato", img: "https://www.planksip.org/content/images/2021/05/585260_Plato_The-Republic_112110.jpg", desc: "A foundational text of Western philosophy exploring justice, morality, and the ideal society.", price: 230, },
//     { id: "7.2", mainid: "7", title: "Nicomachean Ethics – Aristotle", img: "https://cdn.thecollector.com/wp-content/uploads/2024/03/what-are-the-nicomachean-ethics.jpg", desc: "Aristotle’s classic work on virtue, character, and how to live a good life.", price: 230, },
//      ],
//   8: [
//     { id: "8.1", mainid: "8", title: "Rich Dad Poor Dad – Robert T. Kiyosaki", img: "https://icrrd.com/public/media/01-11-2020-083226richdad-poor-dad.jpg", desc: "A personal finance classic that contrasts two perspectives on money — one focused on earning and one on building wealth.", price: 230, },
//     { id: "8.2", mainid: "8", title: "The Intelligent Investor – Benjamin Graham", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/EB/QY/ND/147952517/the-intelligent-investor-by-benjamin-graham-warren-buffett-.jpeg", desc: "The definitive guide to value investing, teaching patience, discipline, and long-term financial thinking.", price: 230, },
//      ],
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 },
//   },
//   exit: { opacity: 0, y: -20 },
// };

// // ✅ FIX: Removed props destructuring here
// function BooksList() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const issueBooks = useSelector((state) => state.issueBooks.books);

//   // ✅ FIX: Define State locally here
//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilter, setShowFilter] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const filterSectionRef = useRef(null);

//   const categoryNames = {
//     1: "Fiction",
//     2: "Brave",
//     3: "Sikhism",
//     4: "History",
//     5: "Animal Things",
//     6: "Food Recipes",
//     7: "Philosophy",
//     8: "Business & Finance",
//   };

//   const categoryName = categoryNames[id] || "Books Category";
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

//   const handleAddBook = (book) => {
//     if (!issueBooks.find((b) => b.id === book.id)) {
//       dispatch(addBook(book));
//     }
//   };

//   const handleRemoveBook = (book) => {
//     dispatch(removeBook(book.id));
//   };

//   const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);

//   // ========================= RENDER =========================

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 md:mt-[-70px] py-2 mt-[-170px] pb-23 md:pb-15"
//     >
//       {/* ✅ Global Header: Now props passed are real state setters */}
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

//       {/* Spacing for fixed header */}
//       <div style={{ marginTop: headerHeight + 20 }} />

//       {/* ✨ Animated Page Title */}
//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl mb-10 font-bold text-gray-700 text-center md:text-left"
//       >
//         {categoryName}
//       </motion.h1>

//       {/* --- BOOK DISPLAY SECTION --- */}
//       <AnimatePresence>
//         {filteredBooks.length > 0 ? (
//           viewMode === "grid" ? (
//             <motion.div
//               layout
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
//             >
//               <AnimatePresence>
//                 {filteredBooks.map((item) => (
//                   <motion.div
//                     key={item.id}
//                     layout
//                     variants={itemVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     whileHover={{
//                       scale: 1.03,
//                       y: -5,
//                       transition: { type: "spring", stiffness: 300 },
//                     }}
//                     className="bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden cursor-pointer mt-2"
//                   >
//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl"
//                     />
//                     <div className="p-4 flex flex-col justify-between ">
//                       <h2 className="text-base sm:text-lg h-20 font-bold text-gray-800">
//                         {item.title}
//                       </h2>
//                       <p className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2 style={{ maxHeight: 80 }}">
//                         {item.desc}
//                       </p>
//                       <div className="mt-3 flex items-center justify-between">
//                         <p className="text-amber-700 font-semibold text-lg">
//                           ₹ {item.price}
//                         </p>
//                         {isAdded(item) ? (
//                           <div className="flex gap-2">
//                             <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-23 px-2 bg-green-500 shadow">
//                               <Check size={16} /> Added
//                             </button>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => handleRemoveBook(item)}
//                               className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform cursor-pointer"
//                             >
//                               <MinusCircle size={16} /> Remove
//                             </motion.button>
//                           </div>
//                         ) : (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => handleAddBook(item)}
//                             className="w-40 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow hover:scale-105 transition-transform"
//                           >
//                             <Plus size={16} /> Add
//                           </motion.button>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           ) : (
//             // --- LIST VIEW ---
//             <motion.div layout className="space-y-4">
//               <AnimatePresence>
//                 {filteredBooks.map((item) => (
//                   <motion.div
//                     key={item.id}
//                     layout
//                     variants={itemVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     whileHover={{
//                       scale: 1.02,
//                       x: 5,
//                       transition: { type: "spring", stiffness: 300 },
//                     }}
//                     className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 cursor-pointer overflow-hidden"
//                   >
//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       className="w-full sm:w-32 h-20 object-cover rounded-xl"
//                     />
//                     <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                       <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                         {item.title}
//                       </h2>
//                       <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                         {item.desc}
//                       </p>
//                       <p className="text-amber-700 font-semibold text-lg mt-2">
//                         ₹ {item.price}
//                       </p>
//                     </div>
//                     <div className="ml-3 mt-3 sm:mt-0">
//                       {isAdded(item) ? (
//                         <div className="flex gap-2">
//                           <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow">
//                             <Check size={16} /> Added
//                           </button>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => handleRemoveBook(item)}
//                             className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow"
//                           >
//                             <MinusCircle size={16} /> Remove
//                           </motion.button>
//                         </div>
//                       ) : (
//                         <motion.button
//                           whileHover={{
//                             scale: 1.07,
//                             boxShadow: "0px 6px 15px rgba(255, 165, 0, 0.4)",
//                           }}
//                           whileTap={{
//                             scale: 0.93,
//                           }}
//                           transition={{
//                             type: "spring",
//                             stiffness: 300,
//                             damping: 20,
//                           }}
//                           onClick={() => handleAddBook(item)}
//                           className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 w-22 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:from-amber-500 hover:to-orange-500 shadow-md"
//                         >
//                           <Plus size={18} />
//                           Add
//                         </motion.button>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           )
//         ) : (
//           <motion.p
//             layout
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-gray-500 text-center mt-10"
//           >
//             No books found.
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// export default BooksList;




// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   BookOpen,
//   Upload,
//   IndianRupee,
//   X,
//   CheckCircle2,
//   Sparkles,
// } from "lucide-react";
// import Background from "../Components/blurBackground";

// export default function SellBooks() {
//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     price: "",
//     condition: "",
//     description: "",
//     upi: "",
//   });

//   const [images, setImages] = useState([]);
//   const [showToast, setShowToast] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files
//       .map((file) => URL.createObjectURL(file))
//       .slice(0, 4);
//     setImages([...images, ...newImages].slice(0, 4));
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 4000);
//     setForm({
//       title: "",
//       author: "",
//       price: "",
//       condition: "",
//       description: "",
//       upi: "",
//     });
//     setImages([]);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center p-6 relative overflow-hidden
//                     bg-gradient-to-br from-amber-950 via-amber-800 to-orange-700">
//       {/* Decorative Background Blobs */}
//       <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

//       {/* Toast */}
//       <AnimatePresence>
//         {showToast && (
//           <motion.div
//             initial={{ opacity: 0, x: 50, scale: 0.9 }}
//             animate={{ opacity: 1, x: 0, scale: 1 }}
//             exit={{ opacity: 0, x: 50, scale: 0.9 }}
//             className="fixed top-8 right-8 bg-white/10 backdrop-blur-xl
//                        border-l-4 border-amber-400 shadow-2xl p-4 rounded-2xl
//                        z-50 flex items-center gap-4 text-white"
//           >
//             <div className="bg-amber-400/20 p-2 rounded-full">
//               <CheckCircle2 className="text-amber-400 w-6 h-6" />
//             </div>
//             <div>
//               <p className="font-bold">Success!</p>
//               <p className="text-sm text-white/70">
//                 Your book is being reviewed.
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <Background />

//       {/* Main Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-4xl bg-white/10 backdrop-blur-3xl
//                    border border-white/20 rounded-[2.5rem]
//                    shadow-[0_20px_50px_rgba(0,0,0,0.4)]
//                    overflow-hidden flex flex-col md:flex-row"
//       >
//         {/* Left Side */}
//         <div className="md:w-1/3 bg-gradient-to-br from-amber-500 to-orange-600 p-10 text-white flex flex-col justify-between">
//           <div>
//             <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
//               <BookOpen className="w-6 h-6" />
//             </div>
//             <h2 className="text-4xl font-bold leading-tight">
//               Share the <br /> Joy of Reading.
//             </h2>
//             <p className="mt-4 text-amber-100">
//               Give your books a second life and earn money easily.
//             </p>
//           </div>

//           <div className="hidden md:block">
//             <div className="flex -space-x-3 mb-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="w-10 h-10 rounded-full border-2 border-amber-500 bg-amber-200 overflow-hidden"
//                 >
//                   <img
//                     src={`https://i.pravatar.cc/150?u=${i}`}
//                     alt="user"
//                   />
//                 </div>
//               ))}
//             </div>
//             <p className="text-sm text-amber-100">
//               Joined by 2k+ readers this week
//             </p>
//           </div>
//         </div>

//         {/* Right Side Form */}
//         <div className="md:w-2/3 p-10 bg-white/10 backdrop-blur-xl text-white">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-xs font-bold text-amber-200 mb-2 block">
//                   Book Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={form.title}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-5 py-4 bg-white/10 border border-white/20
//                              rounded-2xl text-white placeholder-white/60
//                              focus:ring-2 focus:ring-amber-400 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-amber-200 mb-2 block">
//                   Author
//                 </label>
//                 <input
//                   type="text"
//                   name="author"
//                   value={form.author}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-5 py-4 bg-white/10 border border-white/20
//                              rounded-2xl text-white placeholder-white/60
//                              focus:ring-2 focus:ring-amber-400 outline-none"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-xs font-bold text-amber-200 mb-2 block">
//                   Price
//                 </label>
//                 <div className="relative">
//                   <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
//                   <input
//                     type="number"
//                     name="price"
//                     value={form.price}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20
//                                rounded-2xl text-white placeholder-white/60
//                                focus:ring-2 focus:ring-amber-400 outline-none"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-amber-200 mb-2 block">
//                   Condition
//                 </label>
//                 <select
//                   name="condition"
//                   value={form.condition}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-5 py-4 bg-white/10 border border-white/20
//                              rounded-2xl text-white outline-none"
//                 >
//                   <option value="">Select Condition</option>
//                   <option value="New">New</option>
//                   <option value="Good">Good</option>
//                   <option value="Used">Used</option>
//                 </select>
//               </div>
//             </div>

//             {/* Upload */}
//             <div className="border-2 border-dashed border-white/30 rounded-3xl p-8 text-center">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />
//               <Upload className="mx-auto mb-2 text-amber-400" />
//               <p className="text-sm text-white/70">
//                 Upload up to 4 images
//               </p>
//             </div>

//             {/* Image Preview */}
//             <div className="flex gap-4">
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/20"
//                 >
//                   <img
//                     src={img}
//                     alt="preview"
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <label className="text-xs font-bold text-amber-200 mb-2 block">
//                 UPI ID
//               </label>
//               <input
//                 type="text"
//                 name="upi"
//                 value={form.upi}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-5 py-4 bg-white/10 border border-white/20
//                            rounded-2xl text-white placeholder-white/60
//                            focus:ring-2 focus:ring-amber-400 outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 rounded-2xl font-bold text-lg text-white
//                          bg-gradient-to-r from-amber-400 to-orange-500
//                          hover:from-amber-500 hover:to-orange-600
//                          transition flex items-center justify-center gap-3"
//             >
//               <Sparkles className="w-5 h-5" />
//               List Book for Sale
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// }





//  {/* 3. ORDER SUMMARY: Burnt Orange / Dark Chocolate Palette */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//             className="w-full lg:w-[420px] h-fit lg:h-[75vh]"
//           >
//             <div className="bg-[#2d1a0a] rounded-[3rem] p-8 shadow-[0_30px_60px_rgba(45,26,10,0.3)] border border-orange-900/20 text-white h-full flex flex-col">
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-6">
//                    <Sparkles className="text-orange-400" size={18} />
//                    <h3 className="text-2xl font-black tracking-tight">Order Details</h3>
//                 </div>
                
//                 <div className="space-y-6">
//                   <div className="flex justify-between items-center text-orange-100/60">
//                     <span className="font-medium">Direct Purchase</span>
//                     <span className="text-white font-bold text-lg">₹{buyTotal}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-orange-100/60">
//                     <span className="font-medium">Rental Service Fee</span>
//                     <span className="text-white font-bold text-lg">₹{rentTotal}</span>
//                   </div>
                  
//                   <div className="mt-10 pt-8 border-t border-white/5">
//                     <span className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">Total Payable</span>
//                     <div className="text-6xl font-black mt-2 text-white">
//                       ₹{grandTotal}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 space-y-4">
//                 <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-3">
//                   <div className="p-2 bg-orange-500/20 rounded-lg">
//                     <CreditCard className="text-orange-400" size={16} />
//                   </div>
//                   <p className="text-[10px] text-orange-100/60 leading-relaxed uppercase tracking-widest font-bold">
//                     Encrypted Transaction
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleProceedToPay}
//                   disabled={grandTotal === 0}
//                   className={`w-full py-6 rounded-3xl font-black text-xl transition-all active:scale-95 shadow-2xl
//                     ${grandTotal > 0 
//                       ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white cursor-pointer hover:shadow-orange-500/40" 
//                       : "bg-orange-900/20 text-orange-900 cursor-not-allowed"
//                     }`}
//                 >
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//           4



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
            const totalItems = buyItems.length + rentItems.length;
          
            const handleRemoveBuy = (id) => dispatch(removeBook(id));
            const handleRemoveRent = (id) => dispatch(removeRentedBook(id));
          
            const handleProceedToPay = () => {
              navigate("/combined-payment", {
                state: { buyItems, rentItems, grandTotal }
              });
            };
          
            return (
              // 1. Changed background to transparent to let the 'Background' component show through
              <div className="relative min-h-screen bg-transparent pb-32">
                <Background />
          
                {/* Header: Added glassmorphism */}
                <div className="bg-white/70 backdrop-blur-xl sticky top-0 z-20 border-b border-amber-200/50 px-6 py-4 flex justify-between items-center shadow-sm">
                  <h1 className="text-xl md:text-2xl font-extrabold text-amber-900 flex items-center gap-2">
                    <Layers className="text-orange-500" strokeWidth={2.5} />
                    Checkout Detail
                  </h1>
                  <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white text-amber-800 border border-amber-200 font-semibold rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                </div>
          
                <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* --- LEFT COLUMN: BUY (CART) --- */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col h-fit"
                  >
                    <div className="bg-orange-500/10 p-5 border-b border-orange-200/50 flex justify-between items-center">
                      <h2 className="font-bold text-lg text-amber-900 flex items-center gap-2">
                        <ShoppingBag size={20} className="text-orange-600"/> Buy Items ({buyItems.length})
                      </h2>
                      <span className="font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-sm">₹{buyTotal}</span>
                    </div>
                    
                    <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                      {buyItems.length === 0 && (
                        <div className="text-center py-10 text-gray-500 italic">No items to purchase</div>
                      )}
                      <AnimatePresence mode="popLayout">
                        {buyItems.map((book) => (
                          <motion.div 
                            key={book.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex gap-4 p-3 rounded-2xl bg-white/80 border border-white shadow-sm hover:shadow-md transition-all group"
                          >
                            <img src={book.img} alt={book.title} className="w-20 h-24 object-cover rounded-xl shadow-sm" />
                            <div className="flex-1 py-1">
                              <h4 className="font-bold text-gray-800 leading-tight mb-1">{book.title}</h4>
                              <span className="text-[10px] uppercase tracking-wider font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">Ownership</span>
                              <p className="font-black text-xl text-amber-600 mt-2">₹{book.price}</p>
                            </div>
                            <button onClick={() => handleRemoveBuy(book.id)} className="self-center text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer">
                              <Trash2 size={20} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
          
                  {/* --- RIGHT COLUMN: RENT (ISSUED) --- */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col h-fit"
                  >
                    <div className="bg-blue-500/10 p-5 border-b border-blue-200/50 flex justify-between items-center">
                      <h2 className="font-bold text-lg text-blue-900 flex items-center gap-2">
                        <BookOpen size={20} className="text-blue-600"/> Rental Items ({rentItems.length})
                      </h2>
                      <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm">₹{rentTotal}</span>
                    </div>
          
                    <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
                       {rentItems.length === 0 && (
                         <div className="text-center py-10 text-gray-500 italic">No active rentals</div>
                       )}
                       <AnimatePresence mode="popLayout">
                        {rentItems.map((item) => (
                          <motion.div 
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex gap-4 p-3 rounded-2xl bg-white/80 border border-white shadow-sm hover:shadow-md transition-all"
                          >
                            {item.img ? (
                              <img src={item.img} alt={item.bookName} className="w-20 h-24 object-cover rounded-xl shadow-sm" />
                            ) : (
                              <div className="w-20 h-24 bg-blue-50 rounded-xl flex items-center justify-center text-blue-200 border border-blue-100">
                                <BookOpen size={32} />
                              </div>
                            )}
                            
                            <div className="flex-1 py-1">
                              <h4 className="font-bold text-gray-800 leading-tight mb-1">{item.bookName}</h4>
                              <p className="text-xs text-gray-500 mb-2 font-medium">Student: {item.studentName}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase">
                                  Due: {item.returnDate}
                                </span>
                                <p className="font-black text-xl text-blue-600">₹{item.fees}</p>
                              </div>
                            </div>
                            <button onClick={() => handleRemoveRent(item.id)} className="self-center text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer">
                              <Trash2 size={20} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
          
                {/* --- FLOATING BOTTOM BAR --- */}
                <div className="fixed bottom-6 left-0 right-0 px-4 md:px-8 z-40">
                  <motion.div 
                    initial={{ y: 100, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                         <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Grand Total</span>
                         <span className="text-3xl font-black text-white">₹{grandTotal}</span>
                      </div>
                      <div className="h-10 w-[1px] bg-white/20 hidden md:block" />
                      <div className="text-gray-400 text-sm font-medium">
                        {totalItems} items selected
                      </div>
                    </div>
                    
                    <button
                      onClick={handleProceedToPay}
                      disabled={grandTotal === 0}
                      className={`w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-black text-lg transition-all active:scale-95
                        ${grandTotal > 0 
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/20 shadow-xl cursor-pointer hover:brightness-110" 
                          : "bg-gray-700 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      <CreditCard size={22} />
                      Pay Now
                    </button>
                  </motion.div>
                </div>
              </div>
            );
          }
          
          export default CombinedOrderView;