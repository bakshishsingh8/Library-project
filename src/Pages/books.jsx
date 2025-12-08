// import { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { Search as SearchIcon } from "lucide-react";
// import Header from "../Layout/header.jsx";
// // ✨ ADDED: Imports from framer-motion for animations
// import { motion, AnimatePresence } from "framer-motion";

// // ✅ FIX: Import the exported variable name
// import { allBooksData } from "./booksList";

// // --- CATEGORY DEFINITION ---
// const categories = [
//   // ... your categories array remains unchanged ...
//   {
//     id: uuidv4(),
//     title: "Fiction",
//     categoryID: "1",
//     desc: "Explore imaginative narratives and stories.",
//     img: "https://fivebooks.com/images/brjfwPAq69-IDEX2/plain/fb/2022/11/fiction-books-category-share-image.jpg",
//     categorieNumber: 1,
//   },
//   {
//     id: uuidv4(),
//     title: "Brave",
//     categoryID: "2",
//     desc: "Exciting adventures and bold stories.",
//     img: "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs3/383529886/original/f50501b38d0f444b321dd5487a02a66184f09305.png",
//     categorieNumber: 2,
//   },
//   {
//     id: uuidv4(),
//     title: "Sikhism",
//     categoryID: "3",
//     desc: "A Journey of Faith, Courage, and Equality.",
//     img: "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/7/67a516d4c9ff802bfe8f83ce25167b6133878538464802294f4341989827780c/sikh-history-slide1.png",
//     categorieNumber: 3,
//   },
//   {
//     id: uuidv4(),
//     title: "History",
//     categoryID: "4",
//     desc: "Connections between past events and contemporary society.",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylzvW1jxbfqNvrWC39FKsdue7ttaMhwjCkA&s",
//     categorieNumber: 4,
//   },
//   {
//     id: uuidv4(),
//     title: "Animal Things",
//     categoryID: "5",
//     desc: "The rise and fall of a rebellion that mirrors human society.",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkHVGvQHNJe_3pCVW1_AMkwV9IIiC-3d2ACRxhCfR8iBXzkKk5LWbZP0BR_gskjbcrZs&usqp=CAU",
//     categorieNumber: 5,
//   },
//   {
//     id: uuidv4(),
//     title: "Food Recipes",
//     categoryID: "6",
//     desc: "A variety of recipes for breakfast, lunch, dinner, and snacks.",
//     img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fea9c0119666285.60a2b5b9ebea0.jpg",
//     categorieNumber: 6,
//   },
//   {
//     id: uuidv4(),
//     title: "Philosophy",
//     categoryID: "7",
//     desc: "Deep thoughts and insights.",
//     img: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg",
//     categorieNumber: 7,
//   },
//   {
//     id: uuidv4(),
//     title: "Business & Finance",
//     categoryID: "8",
//     desc: "Books on money and management.",
//     img: "https://cdn.educba.com/academy/wp-content/uploads/2016/01/Business-and-Finance.jpg",
//     categorieNumber: 8,
//   },
// ];
// // --- END CATEGORY DEFINITION ---

// // Helper function to flatten all books for global searching (memoized)
// const allBooksArray = Object.values(allBooksData).flat();

// // ✨ ADDED: Animation variants for items
// const itemVariants = {
//   hidden: { opacity: 0, scale: 0.95, y: 10 },
//   visible: { opacity: 1, scale: 1, y: 0 },
//   exit: { opacity: 0, scale: 0.9, y: -10 },
// };

// function Books() {
//   const navigate = useNavigate();

//   const [viewMode, setViewMode] = useState("grid"); // ✅ Controlled by Header
//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [showFilter, setShowFilter] = useState(false);

//   const filterSectionRef = useRef(null);

//   // --- GLOBAL SEARCH RESULTS ---
//   const globalBookMatches = useMemo(() => {
//     // ... logic unchanged ...
//     const q = search.trim().toLowerCase();
//     if (!q) return [];
//     return allBooksArray.filter(
//       (book) =>
//         book.title.toLowerCase().includes(q) ||
//         (book.desc && book.desc.toLowerCase().includes(q))
//     );
//   }, [search]);

//   // --- CATEGORY FILTERING ---
//   const [filteredCategories, setFilteredCategories] = useState(categories);

//   useEffect(() => {
//     // ... logic unchanged ...
//     let filtered = categories;
//     const q = search.toLowerCase();

//     if (selectedLetter) {
//       filtered = filtered.filter((cat) =>
//         cat.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
//       );
//     }

//     if (q) {
//       filtered = categories.filter((cat) => {
//         const categoryMatch =
//           cat.title.toLowerCase().includes(q) ||
//           cat.desc.toLowerCase().includes(q);

//         const categoryBooks = allBooksData[cat.categorieNumber] || [];
//         const bookInsideMatch = categoryBooks.some(
//           (book) =>
//             book.title.toLowerCase().includes(q) ||
//             (book.desc && book.desc.toLowerCase().includes(q))
//         );

//         return categoryMatch || bookInsideMatch;
//       });
//     }

//     setFilteredCategories(filtered);
//   }, [selectedLetter, search]);

//   // Alphabet array
//   // const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   // ✨ IMPROVED: Responsive padding
//   return (
//     <motion.div // ✨ ADDED: Page load fade-in animation
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200  min-h-screen px-6 md:px-12 lg:px-20  pb-24 md:pb-15
//        mt-[-190px]  md:mt-[-70px]  pt-3 "
//     >
//       {/* <div className="text-4xl mb-[-40px] font-bold text-gray-700"> Books Categories</div> */}

//       {/* ✅ Global Header */}
//       <Header
//         viewMode={viewMode}
//         setViewMode={setViewMode}
//         search={search}
//         setSearch={setSearch}
//         selectedLetter={selectedLetter}
//         setSelectedLetter={setSelectedLetter}
//         scrollToFilterRef={filterSectionRef}
//         openPageFilter={() => setShowFilter(true)}
//         setHeaderHeight={setHeaderHeight}
//       />

//       {/* Spacing for fixed header */}
//       <div style={{ marginTop: headerHeight + 20 }} />

//       {/* Alphabet Filter Section */}
//       {/* ... commented out section remains ... */}

//       {/* --- GLOBAL BOOK MATCHES --- */}
//       {/* ✨ ADDED: AnimatePresence to animate this section's appearance/disappearance */}
//       <AnimatePresence>
//         {search.length > 0 && globalBookMatches.length > 0 && (
//           <motion.div // ✨ ADDED: Animation for the search box
//             initial={{ opacity: 0, y: -20, height: 0 }}
//             animate={{ opacity: 1, y: 0, height: "auto" }}
//             exit={{ opacity: 0, y: -20, height: 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="mb-8 p-4 bg-white rounded-xl shadow-lg border-l-4 border-amber-500 overflow-hidden"
//           >
//             <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center">
//               <SearchIcon size={20} className="mr-2" />
//               {globalBookMatches.length} Matching Books Found Globally - (Click on
//               a category card below to view the book.)
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//               {console.log(globalBookMatches)}
//               {globalBookMatches.map((item) => (
//                 <motion.div // ✨ ADDED: Hover animation for search results
//                   whileHover={{ backgroundColor: "var(--tw-gradient-to-r, #fde68a)" }} // approx amber-100
//                   onClick={() => navigate(`/categories/${item.mainid}`)}
//                   key={item.mainid}
//                   className="p-3 border rounded-lg bg-amber-50 cursor-pointer transition"
//                 >
//                   <p className="font-semibold text-gray-800 line-clamp-1">
//                     {item.title}
//                   </p>
//                   <p className="text-sm text-gray-500 line-clamp-1">
//                     {item.desc}
//                   </p>
//                   <p className="text-xs text-amber-600 mt-1">
//                     Category ID: {item.id.split(".")[0]}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.h1 // ✨ ADDED: Animate the main title
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl mb-10 pt-5 font-bold text-gray-700 animate-bounce-gentle"
//       >
//         Categories of Books
//       </motion.h1>

//       {/* --- CATEGORY DISPLAY --- */}
//       {viewMode === "grid" ? (
//         <motion.div // ✨ ADDED: `layout` prop animates grid changes
//           layout
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 sm:gap-6 lg:gap-8 "
//         >
//           <AnimatePresence> {/* ✨ ADDED: To animate items in/out */}
//             {filteredCategories.length > 0 ? (
//               filteredCategories.map((item) => (
//                 <motion.div // ✨ CONVERTED: to motion.div
//                   key={item.id}
//                   layout // ✨ ADDED: Animates position changes
//                   variants={itemVariants} // ✨ ADDED: Use defined variants
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                   // ✨ ADDED: Smoother spring-based hover animation
//                   whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
//                   onClick={() => navigate(`/categories/${item.categorieNumber}`)}
//                   className="bg-white rounded-2xl shadow-md border mt-2 border-amber-100 cursor-pointer overflow-hidden" // ✨ ADDED: overflow-hidden
//                 >
//                   <img
//                     src={item.img}
//                     alt={item.title}
//                     className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl"
//                   />
//                   <div className="p-4 sm:p-5">
//                     <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
//                       {item.title}
//                     </h2>
//                     <h2 className="text-sm text-gray-800 truncate">
//                       category ID: {item.categoryID}
//                     </h2>
//                     <p className="text-gray-600 text-sm mt-2 min-h-[48px] line-clamp-2">
//                       {item.desc}
//                     </p>
//                     <motion.button // ✨ CONVERTED: to motion.button
//                       // ✨ ADDED: Hover and tap animations
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         navigate(`/categories/${item.categorieNumber}`);
//                       }}
//                       className="mt-4 w-full py-2 text-sm sm:text-base rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer"
//                     >
//                       View Books
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <motion.p // ✨ ADDED: Animate the "no results" message
//                 layout
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-gray-500 text-center col-span-full"
//               >
//                 No matching categories found.
//               </motion.p>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       ) : (
//         // ✅ LIST VIEW
//         <motion.div // ✨ ADDED: `layout` prop animates list changes
//           layout
//           className="space-y-4 "
//         >
//           <AnimatePresence> {/* ✨ ADDED: To animate items in/out */}
//             {filteredCategories.map((item) => (
//               <motion.div // ✨ CONVERTED: to motion.div
//                 key={item.id}
//                 layout // ✨ ADDED: Animates position changes
//                 variants={itemVariants} // ✨ ADDED: Use defined variants
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 // ✨ ADDED: Smoother spring-based hover animation
//                 whileHover={{ scale: 1.02, x: 5, transition: { type: "spring", stiffness: 300 } }}
//                 onClick={() => navigate(`/categories/${item.categorieNumber}`)}
//                 className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 cursor-pointer overflow-hidden" // ✨ ADDED: overflow-hidden
//               >
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="w-full sm:w-32 h-20 object-cover rounded-xl"
//                 />
//                 <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                   <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                     {item.title}
//                   </h2>
//                   <h2 className="text-sm text-gray-800 truncate">
//                     category ID: {item.categoryID}
//                   </h2>
//                   <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
//                 </div>
//                 <motion.button // ✨ CONVERTED: to motion.button
//                   // ✨ ADDED: Hover and tap animations
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/categories/${item.categorieNumber}`);
//                   }}
//                   className="mt-3 sm:mt-0 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 sm:px-5 py-2 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer text-sm sm:text-base"
//                 >
//                   View Books
//                 </motion.button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

// export default Books;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search as SearchIcon, Sparkles, Loader2 } from "lucide-react";
// import Header from "../Layout/header.jsx";
// import { motion, AnimatePresence } from "framer-motion";

// // ✅ Import Data and Service
// import { allBooksData, categories } from "../data/booksData"; 
// import { searchBooksWithAI } from "../aiServer.js"; 

// // Helper to flatten local books
// const allBooksArray = Object.values(allBooksData).flat();

// const itemVariants = {
//   hidden: { opacity: 0, scale: 0.95, y: 10 },
//   visible: { opacity: 1, scale: 1, y: 0 },
//   exit: { opacity: 0, scale: 0.9, y: -10 },
// };

// function Books() {
//   const navigate = useNavigate();

//   // Header State
//   const [viewMode, setViewMode] = useState("grid");
//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [showFilter, setShowFilter] = useState(false);
//   const filterSectionRef = useRef(null);

//   // ✨ AI STATE
//   const [aiResults, setAiResults] = useState([]);
//   const [isAiLoading, setIsAiLoading] = useState(false);

//   // 1. FILTER LOCAL BOOKS
//   const localBookMatches = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return [];
//     return allBooksArray.filter(
//       (book) =>
//         book.title.toLowerCase().includes(q) ||
//         (book.desc && book.desc.toLowerCase().includes(q))
//     );
//   }, [search]);

//   // 2. FILTER CATEGORIES (Existing Logic)
//   const [filteredCategories, setFilteredCategories] = useState(categories);

//   useEffect(() => {
//     let filtered = categories;
//     const q = search.toLowerCase();

//     if (selectedLetter) {
//       filtered = filtered.filter((cat) =>
//         cat.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
//       );
//     }

//     if (q) {
//       filtered = categories.filter((cat) => {
//         const categoryMatch =
//           cat.title.toLowerCase().includes(q) ||
//           cat.desc.toLowerCase().includes(q);
//         const categoryBooks = allBooksData[cat.categorieNumber] || [];
//         const bookInsideMatch = categoryBooks.some(
//           (book) =>
//             book.title.toLowerCase().includes(q) ||
//             (book.desc && book.desc.toLowerCase().includes(q))
//         );
//         return categoryMatch || bookInsideMatch;
//       });
//     }
//     setFilteredCategories(filtered);
//   }, [selectedLetter, search]);

//   // 3. ✨ AI SEARCH LOGIC (Debounced)
//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       // Trigger AI only if search is > 3 chars and we don't have many local matches
//       if (search.length > 3) {
//         setIsAiLoading(true);
        
//         // Call the AI Service
//         const results = await searchBooksWithAI(search);
        
//         // Process AI results to add placeholder images (since AI doesn't give URLs)
//         const resultsWithImages = results.map(book => ({
//             ...book,
//             mainid: "ai-generated", // Flag to identify AI books
//             // Use a placeholder service for the image
//             img: `https://placehold.co/400x600/f59e0b/ffffff?text=${encodeURIComponent(book.title)}` 
//         }));
        
//         setAiResults(resultsWithImages);
//         setIsAiLoading(false);
//       } else {
//         setAiResults([]); // Clear AI results if search is cleared
//         setIsAiLoading(false);
//       }
//     }, 1000); // Wait 1 second after typing stops

//     return () => clearTimeout(timer);
//   }, [search]);

//   // Combine Local + AI Results for the "Search Results" box
//   const displaySearchResults = [...localBookMatches, ...aiResults];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 pb-24 md:pb-15 mt-[-190px] md:mt-[-70px] pt-3"
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
//         setHeaderHeight={setHeaderHeight}
//       />

//       <div style={{ marginTop: headerHeight + 20 }} />

//       {/* --- GLOBAL SEARCH RESULTS SECTION (Merged Local + AI) --- */}
//       <AnimatePresence>
//         {(search.length > 0) && (
//           <motion.div
//             initial={{ opacity: 0, y: -20, height: 0 }}
//             animate={{ opacity: 1, y: 0, height: "auto" }}
//             exit={{ opacity: 0, y: -20, height: 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="mb-8 p-4 bg-white rounded-xl shadow-lg border-l-4 border-amber-500 overflow-hidden"
//           >
//             <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2">
//               {isAiLoading ? (
//                   <>
//                     <Loader2 className="animate-spin text-amber-500" size={20} />
//                     <span>Searching Library & Asking AI...</span>
//                   </>
//               ) : (
//                   <>
//                     <SearchIcon size={20} />
//                     <span>Found {displaySearchResults.length} Books</span>
//                     {aiResults.length > 0 && (
//                         <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 ml-2">
//                             <Sparkles size={10} /> AI Suggestions
//                         </span>
//                     )}
//                   </>
//               )}
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//               {displaySearchResults.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ backgroundColor: "#fffbeb", scale: 1.01 }}
//                   onClick={() => {
//                       if(item.mainid !== 'ai-generated') {
//                           navigate(`/categories/${item.mainid}`);
//                       }
//                   }}
//                   className={`p-3 border rounded-lg cursor-pointer transition flex gap-3 ${item.mainid === 'ai-generated' ? 'bg-blue-50 border-blue-100' : 'bg-amber-50 border-amber-100'}`}
//                 >
//                    {/* Thumbnail Image */}
//                    <img src={item.img} alt={item.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                   
//                    <div className="flex-1">
//                     <p className="font-semibold text-gray-800 line-clamp-1">
//                       {item.title}
//                     </p>
//                     <p className="text-sm text-gray-500 line-clamp-1">
//                       {item.desc}
//                     </p>
//                     <p className="text-xs mt-1 font-medium">
//                       {item.mainid === 'ai-generated' ? (
//                           <span className="text-blue-600 flex items-center gap-1"><Sparkles size={10}/> AI Recommended</span>
//                       ) : (
//                           <span className="text-amber-600">In Stock • Category {item.mainid}</span>
//                       )}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
              
//               {!isAiLoading && displaySearchResults.length === 0 && (
//                   <div className="col-span-full text-center py-4 text-gray-500">
//                       No matching books found.
//                   </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl mb-10 pt-5 font-bold text-gray-700 animate-bounce-gentle"
//       >
//         Categories of Books
//       </motion.h1>

//       {/* --- CATEGORY DISPLAY (Using Existing Logic) --- */}
//       {viewMode === "grid" ? (
//         <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//           <AnimatePresence>
//             {filteredCategories.length > 0 ? (
//               filteredCategories.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   layout
//                   variants={itemVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
//                   onClick={() => navigate(`/categories/${item.categorieNumber}`)}
//                   className="bg-white rounded-2xl shadow-md border mt-2 border-amber-100 cursor-pointer overflow-hidden"
//                 >
//                   <img src={item.img} alt={item.title} className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl" />
//                   <div className="p-4 sm:p-5">
//                     <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{item.title}</h2>
//                     <h2 className="text-sm text-gray-800 truncate">category ID: {item.categoryID}</h2>
//                     <p className="text-gray-600 text-sm mt-2 min-h-[48px] line-clamp-2">{item.desc}</p>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={(e) => { e.stopPropagation(); navigate(`/categories/${item.categorieNumber}`); }}
//                       className="mt-4 w-full py-2 text-sm sm:text-base rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer"
//                     >
//                       View Books
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center col-span-full">
//                 No matching categories found.
//               </motion.p>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       ) : (
//         <motion.div layout className="space-y-4">
//           <AnimatePresence>
//             {filteredCategories.map((item) => (
//               <motion.div
//                 key={item.id}
//                 layout
//                 variants={itemVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 whileHover={{ scale: 1.02, x: 5, transition: { type: "spring", stiffness: 300 } }}
//                 onClick={() => navigate(`/categories/${item.categorieNumber}`)}
//                 className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 cursor-pointer overflow-hidden"
//               >
//                 <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
//                 <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                   <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h2>
//                   <h2 className="text-sm text-gray-800 truncate">category ID: {item.categoryID}</h2>
//                   <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => { e.stopPropagation(); navigate(`/categories/${item.categorieNumber}`); }}
//                   className="mt-3 sm:mt-0 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 sm:px-5 py-2 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer text-sm sm:text-base"
//                 >
//                   View Books
//                 </motion.button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

// export default Books;



import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Sparkles, Loader2 } from "lucide-react";
import Header from "../Layout/header.jsx";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Import Data and Service
import { allBooksData, categories } from "../data/booksData"; 
import { searchBooksWithAI } from "../aiServer.js"; 

// Helper to flatten local books
const allBooksArray = Object.values(allBooksData).flat();

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: -10 },
};

function Books() {
  const navigate = useNavigate();

  // Header State
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const filterSectionRef = useRef(null);

  // ✨ AI STATE
  const [aiResults, setAiResults] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // 1. FILTER LOCAL BOOKS
  const localBookMatches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return allBooksArray.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        (book.desc && book.desc.toLowerCase().includes(q))
    );
  }, [search]);

  // 2. FILTER CATEGORIES (Existing Logic)
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    let filtered = categories;
    const q = search.toLowerCase();

    if (selectedLetter) {
      filtered = filtered.filter((cat) =>
        cat.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }

    if (q) {
      filtered = categories.filter((cat) => {
        const categoryMatch =
          cat.title.toLowerCase().includes(q) ||
          cat.desc.toLowerCase().includes(q);
        const categoryBooks = allBooksData[cat.categorieNumber] || [];
        const bookInsideMatch = categoryBooks.some(
          (book) =>
            book.title.toLowerCase().includes(q) ||
            (book.desc && book.desc.toLowerCase().includes(q))
        );
        return categoryMatch || bookInsideMatch;
      });
    }
    setFilteredCategories(filtered);
  }, [selectedLetter, search]);

  // 3. ✨ AI SEARCH LOGIC (Debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      // Trigger AI only if search is > 3 chars and we don't have many local matches
      if (search.length > 3) {
        setIsAiLoading(true);
        
        // Call the AI Service
        const results = await searchBooksWithAI(search);
        
        // Process AI results to add placeholder images (since AI doesn't give URLs)
        const resultsWithImages = results.map(book => ({
            ...book,
            mainid: "ai-generated", // Flag to identify AI books
            // Use a placeholder service for the image
            img: `https://placehold.co/400x600/f59e0b/ffffff?text=${encodeURIComponent(book.title)}` 
        }));
        
        setAiResults(resultsWithImages);
        setIsAiLoading(false);
      } else {
        setAiResults([]); // Clear AI results if search is cleared
        setIsAiLoading(false);
      }
    }, 1000); // Wait 1 second after typing stops

    return () => clearTimeout(timer);
  }, [search]);

  // Combine Local + AI Results for the "Search Results" box
  const displaySearchResults = [...localBookMatches, ...aiResults];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 pb-24 md:pb-15 mt-[-190px] md:mt-[-70px] pt-3"
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
        setHeaderHeight={setHeaderHeight}
      />

      <div style={{ marginTop: headerHeight + 20 }} />

      {/* --- GLOBAL SEARCH RESULTS SECTION (Merged Local + AI) --- */}
      <AnimatePresence>
        {(search.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-8 p-4 bg-white rounded-xl shadow-lg border-l-4 border-amber-500 overflow-hidden"
          >
            <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2">
              {isAiLoading ? (
                  <>
                    <Loader2 className="animate-spin text-amber-500" size={20} />
                    <span>Searching Library & Asking AI...</span>
                  </>
              ) : (
                  <>
                    <SearchIcon size={20} />
                    <span>Found {displaySearchResults.length} Books</span>
                    {aiResults.length > 0 && (
                        <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 ml-2">
                            <Sparkles size={10} /> AI Suggestions
                        </span>
                    )}
                  </>
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {displaySearchResults.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: "#fffbeb", scale: 1.01 }}
                  onClick={() => {
                      if(item.mainid !== 'ai-generated') {
                          // ✅ CRITICAL CHANGE: Pass state with highlightId
                          navigate(`/categories/${item.mainid}`, { 
                            state: { highlightId: item.id } 
                          });
                      }
                  }}
                  className={`p-3 border rounded-lg cursor-pointer transition flex gap-3 ${item.mainid === 'ai-generated' ? 'bg-blue-50 border-blue-100' : 'bg-amber-50 border-amber-100'}`}
                >
                   {/* Thumbnail Image */}
                   <img src={item.img} alt={item.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                   
                   <div className="flex-1">
                    <p className="font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.desc}
                    </p>
                    <p className="text-xs mt-1 font-medium">
                      {item.mainid === 'ai-generated' ? (
                          <span className="text-blue-600 flex items-center gap-1"><Sparkles size={10}/> AI Recommended</span>
                      ) : (
                          <span className="text-amber-600">In Stock • Category {item.mainid}</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {!isAiLoading && displaySearchResults.length === 0 && (
                  <div className="col-span-full text-center py-4 text-gray-500">
                      No matching books found.
                  </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl mb-10 pt-5 font-bold text-gray-700 animate-bounce-gentle"
      >
        Categories of Books
      </motion.h1>

      {/* --- CATEGORY DISPLAY --- */}
      {viewMode === "grid" ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
                  onClick={() => navigate(`/categories/${item.categorieNumber}`)}
                  className="bg-white rounded-2xl shadow-md border mt-2 border-amber-100 cursor-pointer overflow-hidden"
                >
                  <img src={item.img} alt={item.title} className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl" />
                  <div className="p-4 sm:p-5">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{item.title}</h2>
                    <h2 className="text-sm text-gray-800 truncate">category ID: {item.categoryID}</h2>
                    <p className="text-gray-600 text-sm mt-2 min-h-[48px] line-clamp-2">{item.desc}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); navigate(`/categories/${item.categorieNumber}`); }}
                      className="mt-4 w-full py-2 text-sm sm:text-base rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer"
                    >
                      View Books
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center col-span-full">
                No matching categories found.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div layout className="space-y-4">
          <AnimatePresence>
            {filteredCategories.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.02, x: 5, transition: { type: "spring", stiffness: 300 } }}
                onClick={() => navigate(`/categories/${item.categorieNumber}`)}
                className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 cursor-pointer overflow-hidden"
              >
                <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
                <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h2>
                  <h2 className="text-sm text-gray-800 truncate">category ID: {item.categoryID}</h2>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/categories/${item.categorieNumber}`); }}
                  className="mt-3 sm:mt-0 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 sm:px-5 py-2 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer text-sm sm:text-base"
                >
                  View Books
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Books;