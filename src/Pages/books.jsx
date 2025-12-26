// import { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search as SearchIcon, Sparkles, Loader2 } from "lucide-react";
// import Header from "../Layout/header.jsx";
// import { motion, AnimatePresence } from "framer-motion";

// // ✅ Import Data and Service
// import { allBooksData, categories } from "../data/booksData";
// import Footer from '../Pages/footer.jsx'

// import { searchBooksWithAI } from "../aiServer.js"; /////////////////////////////////// ai page //////////////////////////

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
//   // const [aiSearch, setAiSearch] = useState("");

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
//           ...book,
//           mainid: "ai-generated", // Flag to identify AI books
//           // Use a placeholder service for the image
//           img: `https://placehold.co/400x600/f59e0b/ffffff?text=${encodeURIComponent(book.title)}`
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
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 pb-24 md:pb-15 mt-[5px] md:mt-[0.1px] pt-3"
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
//                 <>
//                   <Loader2 className="animate-spin text-amber-500" size={20} />
//                   <span>Searching Library & Asking AI...</span>
//                 </>
//               ) : (
//                 <>
//                   <SearchIcon size={20} />
//                   <span>Found {displaySearchResults.length} Books</span>
//                   {aiResults.length > 0 && (
//                     <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 ml-2">
//                       <Sparkles size={10} /> AI Suggestions
//                     </span>
//                   )}
//                   <div className="ml-140">
//                     (Ai Recommended books is not in stock)
//                   </div>
//                 </>
//               )}
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//               {displaySearchResults.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ backgroundColor: "#fffbeb", scale: 1.01 }}
//                   onClick={() => {
//                     if (item.mainid !== 'ai-generated') {
//                       // ✅ CRITICAL CHANGE: Pass state with highlightId
//                       navigate(`/categories/${item.mainid}`, {
//                         state: { highlightId: item.id }
//                       });
//                     }
//                   }}
//                   className={`p-3 border rounded-lg cursor-pointer transition flex gap-3 ${item.mainid === 'ai-generated' ? 'bg-blue-50 border-blue-100' : 'bg-amber-50 border-amber-100'}`}
//                 >
//                   {/* Thumbnail Image */}
//                   <img src={item.img} alt={item.title} className="w-12 h-16 object-cover rounded shadow-sm" />

//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800 line-clamp-1">
//                       {item.title}
//                     </p>
//                     <p className="text-sm text-gray-500 line-clamp-1">
//                       {item.desc}
//                     </p>
//                     <p className="text-xs mt-1 font-medium">
//                       {item.mainid === 'ai-generated' ? (
//                         <span className="text-blue-600 flex items-center gap-1"><Sparkles size={10} /> AI Recommended <div className="text-red-700">Out of Stock</div> </span>
                        
//                       ) : (
//                         <span className="text-amber-600">In Stock • Category {item.mainid}</span>
//                       )}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}

//               {!isAiLoading && displaySearchResults.length === 0 && (
//                 <div className="col-span-full text-center py-4 text-gray-500">
//                   No matching books found.
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl mb-10 pt-5 font-bold text-gray-700 "
//       >
//         Categories of Books
//       </motion.h1>

//       {/* --- CATEGORY DISPLAY --- */}
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
//       <div className=" mt-20 mb-[-45px] ml-[-60px] mr-[-60px]">
//         <Footer />
//       </div>

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
import Footer from '../Pages/footer.jsx'

import { searchBooksWithAI } from "../aiServer.js"; /////////////////////////////////// ai page //////////////////////////

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
  // const [aiSearch, setAiSearch] = useState("");

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
      className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen px-6 md:px-12 lg:px-20 pb-24 md:pb-15 mt-[5px] md:mt-[0.1px] pt-3 transition-colors duration-500"
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
            className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-l-4 border-amber-500 overflow-hidden transition-colors"
          >
            <h2 className="text-xl font-bold text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-2">
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
                  <div className="ml-140 hidden lg:block text-slate-500 dark:text-slate-400">
                    (Ai Recommended books is not in stock)
                  </div>
                </>
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {displaySearchResults.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: isAiLoading ? "" : "#fffbeb", scale: 1.01 }}
                  onClick={() => {
                    if (item.mainid !== 'ai-generated') {
                      navigate(`/categories/${item.mainid}`, {
                        state: { highlightId: item.id }
                      });
                    }
                  }}
                  className={`p-3 border rounded-lg cursor-pointer transition flex gap-3 ${item.mainid === 'ai-generated' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800' : 'bg-amber-50 dark:bg-slate-700 border-amber-100 dark:border-slate-600'}`}
                >
                  <img src={item.img} alt={item.title} className="w-12 h-16 object-cover rounded shadow-sm" />

                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-slate-100 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-1">
                      {item.desc}
                    </p>
                    <p className="text-xs mt-1 font-medium">
                      {item.mainid === 'ai-generated' ? (
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1"><Sparkles size={10} /> AI Recommended <div className="text-red-700 dark:text-red-400">Out of Stock</div> </span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400">In Stock • Category {item.mainid}</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}

              {!isAiLoading && displaySearchResults.length === 0 && (
                <div className="col-span-full text-center py-4 text-gray-500 dark:text-slate-400">
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
        className="text-4xl mb-10 pt-5 font-bold text-gray-700 dark:text-slate-200 transition-colors"
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
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border mt-2 border-amber-100 dark:border-slate-700 cursor-pointer overflow-hidden transition-colors"
                >
                  <img src={item.img} alt={item.title} className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl" />
                  <div className="p-4 sm:p-5">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100 truncate">{item.title}</h2>
                    <h2 className="text-sm text-gray-800 dark:text-slate-400 truncate">category ID: {item.categoryID}</h2>
                    <p className="text-gray-600 dark:text-slate-300 text-sm mt-2 min-h-[48px] line-clamp-2">{item.desc}</p>
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
              <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 dark:text-slate-400 text-center col-span-full">
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
                className="flex flex-col sm:flex-row items-center bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 dark:border-slate-700 cursor-pointer overflow-hidden transition-colors"
              >
                <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
                <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100">{item.title}</h2>
                  <h2 className="text-sm text-gray-800 dark:text-slate-400 truncate">category ID: {item.categoryID}</h2>
                  <p className="text-gray-600 dark:text-slate-300 text-sm mt-1">{item.desc}</p>
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
      <div className=" mt-20 mb-[-45px] ml-[-60px] mr-[-60px]">
        <Footer />
      </div>

    </motion.div>

  );
}

export default Books;