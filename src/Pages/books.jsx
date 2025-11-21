import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Search as SearchIcon } from "lucide-react";
import Header from "../Layout/header.jsx";
// ✨ ADDED: Imports from framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";

// ✅ FIX: Import the exported variable name
import { allBooksData } from "./booksList";

// --- CATEGORY DEFINITION ---
const categories = [
  // ... your categories array remains unchanged ...
  {
    id: uuidv4(),
    title: "Fiction",
    categoryID: "1",
    desc: "Explore imaginative narratives and stories.",
    img: "https://fivebooks.com/images/brjfwPAq69-IDEX2/plain/fb/2022/11/fiction-books-category-share-image.jpg",
    categorieNumber: 1,
  },
  {
    id: uuidv4(),
    title: "Brave",
    categoryID: "2",
    desc: "Exciting adventures and bold stories.",
    img: "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs3/383529886/original/f50501b38d0f444b321dd5487a02a66184f09305.png",
    categorieNumber: 2,
  },
  {
    id: uuidv4(),
    title: "Sikhism",
    categoryID: "3",
    desc: "A Journey of Faith, Courage, and Equality.",
    img: "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/7/67a516d4c9ff802bfe8f83ce25167b6133878538464802294f4341989827780c/sikh-history-slide1.png",
    categorieNumber: 3,
  },
  {
    id: uuidv4(),
    title: "History",
    categoryID: "4",
    desc: "Connections between past events and contemporary society.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylzvW1jxbfqNvrWC39FKsdue7ttaMhwjCkA&s",
    categorieNumber: 4,
  },
  {
    id: uuidv4(),
    title: "Animal Things",
    categoryID: "5",
    desc: "The rise and fall of a rebellion that mirrors human society.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkHVGvQHNJe_3pCVW1_AMkwV9IIiC-3d2ACRxhCfR8iBXzkKk5LWbZP0BR_gskjbcrZs&usqp=CAU",
    categorieNumber: 5,
  },
  {
    id: uuidv4(),
    title: "Food Recipes",
    categoryID: "6",
    desc: "A variety of recipes for breakfast, lunch, dinner, and snacks.",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fea9c0119666285.60a2b5b9ebea0.jpg",
    categorieNumber: 6,
  },
  {
    id: uuidv4(),
    title: "Philosophy",
    categoryID: "7",
    desc: "Deep thoughts and insights.",
    img: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg",
    categorieNumber: 7,
  },
  {
    id: uuidv4(),
    title: "Business & Finance",
    categoryID: "8",
    desc: "Books on money and management.",
    img: "https://cdn.educba.com/academy/wp-content/uploads/2016/01/Business-and-Finance.jpg",
    categorieNumber: 8,
  },
];
// --- END CATEGORY DEFINITION ---

// Helper function to flatten all books for global searching (memoized)
const allBooksArray = Object.values(allBooksData).flat();

// ✨ ADDED: Animation variants for items
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: -10 },
};

function Books() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("grid"); // ✅ Controlled by Header
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const filterSectionRef = useRef(null);

  // --- GLOBAL SEARCH RESULTS ---
  const globalBookMatches = useMemo(() => {
    // ... logic unchanged ...
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return allBooksArray.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        (book.desc && book.desc.toLowerCase().includes(q))
    );
  }, [search]);

  // --- CATEGORY FILTERING ---
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    // ... logic unchanged ...
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

  // Alphabet array
  // const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // ✨ IMPROVED: Responsive padding
  return (
    <motion.div // ✨ ADDED: Page load fade-in animation
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200  min-h-screen px-6 md:px-12 lg:px-20  pb-24 md:pb-15
       mt-[-190px]  md:mt-[-70px]  pt-3 "
    >
      {/* <div className="text-4xl mb-[-40px] font-bold text-gray-700"> Books Categories</div> */}

      {/* ✅ Global Header */}
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

      {/* Spacing for fixed header */}
      <div style={{ marginTop: headerHeight + 20 }} />

      {/* Alphabet Filter Section */}
      {/* ... commented out section remains ... */}

      {/* --- GLOBAL BOOK MATCHES --- */}
      {/* ✨ ADDED: AnimatePresence to animate this section's appearance/disappearance */}
      <AnimatePresence>
        {search.length > 0 && globalBookMatches.length > 0 && (
          <motion.div // ✨ ADDED: Animation for the search box
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-8 p-4 bg-white rounded-xl shadow-lg border-l-4 border-amber-500 overflow-hidden"
          >
            <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center">
              <SearchIcon size={20} className="mr-2" />
              {globalBookMatches.length} Matching Books Found Globally - (Click on
              a category card below to view the book.)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {console.log(globalBookMatches)}
              {globalBookMatches.map((item) => (
                <motion.div // ✨ ADDED: Hover animation for search results
                  whileHover={{ backgroundColor: "var(--tw-gradient-to-r, #fde68a)" }} // approx amber-100
                  onClick={() => navigate(`/categories/${item.mainid}`)}
                  key={item.mainid}
                  className="p-3 border rounded-lg bg-amber-50 cursor-pointer transition"
                >
                  <p className="font-semibold text-gray-800 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {item.desc}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    Category ID: {item.id.split(".")[0]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1 // ✨ ADDED: Animate the main title
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl mb-10 pt-5 font-bold text-gray-700 animate-bounce-gentle"
      >
        Categories of Books
      </motion.h1>

      {/* --- CATEGORY DISPLAY --- */}
      {viewMode === "grid" ? (
        <motion.div // ✨ ADDED: `layout` prop animates grid changes
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 sm:gap-6 lg:gap-8 "
        >
          <AnimatePresence> {/* ✨ ADDED: To animate items in/out */}
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <motion.div // ✨ CONVERTED: to motion.div
                  key={item.id}
                  layout // ✨ ADDED: Animates position changes
                  variants={itemVariants} // ✨ ADDED: Use defined variants
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  // ✨ ADDED: Smoother spring-based hover animation
                  whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 300 } }}
                  onClick={() => navigate(`/categories/${item.categorieNumber}`)}
                  className="bg-white rounded-2xl shadow-md border mt-2 border-amber-100 cursor-pointer overflow-hidden" // ✨ ADDED: overflow-hidden
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl"
                  />
                  <div className="p-4 sm:p-5">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                      {item.title}
                    </h2>
                    <h2 className="text-sm text-gray-800 truncate">
                      category ID: {item.categoryID}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2 min-h-[48px] line-clamp-2">
                      {item.desc}
                    </p>
                    <motion.button // ✨ CONVERTED: to motion.button
                      // ✨ ADDED: Hover and tap animations
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/categories/${item.categorieNumber}`);
                      }}
                      className="mt-4 w-full py-2 text-sm sm:text-base rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer"
                    >
                      View Books
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p // ✨ ADDED: Animate the "no results" message
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-center col-span-full"
              >
                No matching categories found.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        // ✅ LIST VIEW
        <motion.div // ✨ ADDED: `layout` prop animates list changes
          layout
          className="space-y-4 "
        >
          <AnimatePresence> {/* ✨ ADDED: To animate items in/out */}
            {filteredCategories.map((item) => (
              <motion.div // ✨ CONVERTED: to motion.div
                key={item.id}
                layout // ✨ ADDED: Animates position changes
                variants={itemVariants} // ✨ ADDED: Use defined variants
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                // ✨ ADDED: Smoother spring-based hover animation
                whileHover={{ scale: 1.02, x: 5, transition: { type: "spring", stiffness: 300 } }}
                onClick={() => navigate(`/categories/${item.categorieNumber}`)}
                className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 cursor-pointer overflow-hidden" // ✨ ADDED: overflow-hidden
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full sm:w-32 h-20 object-cover rounded-xl"
                />
                <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    {item.title}
                  </h2>
                  <h2 className="text-sm text-gray-800 truncate">
                    category ID: {item.categoryID}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
                <motion.button // ✨ CONVERTED: to motion.button
                  // ✨ ADDED: Hover and tap animations
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/categories/${item.categorieNumber}`);
                  }}
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



// import { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { Search as SearchIcon } from "lucide-react";
// import Header from "../Layout/header.jsx";
// import { motion, AnimatePresence } from "framer-motion";

// // ✅ FIX: Import the exported variable name
// import { allBooksData } from "./booksList";

// // --- CATEGORY DEFINITION ---
// const categories = [
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

// // Helper function to flatten all books for global searching (memoized)
// const allBooksArray = Object.values(allBooksData).flat();

// const itemVariants = {
//   hidden: { opacity: 0, scale: 0.95, y: 10 },
//   visible: { opacity: 1, scale: 1, y: 0 },
//   exit: { opacity: 0, scale: 0.9, y: -10 },
// };

// function Books() {
//   const navigate = useNavigate();

//   const [viewMode, setViewMode] = useState("grid");
//   const [search, setSearch] = useState("");
//   const [selectedLetter, setSelectedLetter] = useState("");
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [showFilter, setShowFilter] = useState(false);

//   const filterSectionRef = useRef(null);

//   // --- GLOBAL SEARCH RESULTS ---
//   const globalBookMatches = useMemo(() => {
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

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       // UPDATED: Reduced padding for mobile (px-3) -> Desktop (px-20)
//       className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen  px-3  sm:px-8 md:px-12 lg:px-20 py- mt-[-70px] "
//     >
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
//       <div style={{ marginTop: headerHeight }} className="h-4 sm:h-8" />

//       {/* --- GLOBAL BOOK MATCHES --- */}
//       <AnimatePresence>
//         {search.length > 0 && globalBookMatches.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -20, height: 0 }}
//             animate={{ opacity: 1, y: 0, height: "auto" }}
//             exit={{ opacity: 0, y: -20, height: 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="mb-8 p-3 sm:p-4 bg-white rounded-xl shadow-lg border-l-4 border-amber-500 overflow-hidden"
//           >
//             <h2 className="text-base sm:text-xl font-bold text-amber-700 mb-3 flex flex-col sm:flex-row sm:items-center">
//               <span className="flex items-center">
//                 <SearchIcon size={20} className="mr-2" />
//                 {globalBookMatches.length} Books Found
//               </span>
//               <span className="hidden sm:inline mx-2">-</span>
//               <span className="text-xs sm:text-sm font-normal text-gray-500">
//                 (Click a category below to view)
//               </span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto custom-scrollbar">
//               {globalBookMatches.map((item) => (
//                 <motion.div
//                   whileHover={{
//                     backgroundColor: "var(--tw-gradient-to-r, #fde68a)",
//                   }}
//                   onClick={() => navigate(`/categories/${item.mainid}`)}
//                   key={item.mainid}
//                   className="p-3 border rounded-lg bg-amber-50 cursor-pointer transition flex flex-col justify-center"
//                 >
//                   <p className="font-semibold text-gray-800 line-clamp-1 text-sm sm:text-base">
//                     {item.title}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
//                     {item.desc}
//                   </p>
//                   <p className="text-[10px] text-amber-600 mt-1 font-mono">
//                     Category ID: {item.id.split(".")[0]}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.h1
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         // UPDATED: Responsive font size
//         className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-10 font-bold text-gray-700 animate-bounce-gentle pl-1"
//       >
//         Categories of Books
//       </motion.h1>

//       {/* --- CATEGORY DISPLAY --- */}
//       {viewMode === "grid" ? (
//         <motion.div
//           layout
//           // UPDATED: Responsive grid columns and gap
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-24"
//         >
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
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                   whileHover={{
//                     scale: 1.03,
//                     y: -5,
//                     transition: { type: "spring", stiffness: 300 },
//                   }}
//                   onClick={() =>
//                     navigate(`/categories/${item.categorieNumber}`)
//                   }
//                   className="bg-white rounded-2xl shadow-md border border-amber-100 cursor-pointer overflow-hidden flex flex-col h-full"
//                 >
//                   <img
//                     src={item.img}
//                     alt={item.title}
//                     // UPDATED: Adjusted height for mobile cards
//                     className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-t-2xl"
//                   />
//                   <div className="p-4 flex-1 flex flex-col">
//                     <div className="flex justify-between items-start">
//                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate flex-1">
//                         {item.title}
//                        </h2>
//                        <span className="text-[10px] font-mono bg-gray-100 px-2 py-1 rounded text-gray-500 ml-2">
//                          #{item.categoryID}
//                        </span>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-grow">
//                       {item.desc}
//                     </p>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         navigate(`/categories/${item.categorieNumber}`);
//                       }}
//                       className="mt-4 w-full py-2.5 text-sm sm:text-base rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer"
//                     >
//                       View Books
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <motion.p
//                 layout
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-gray-500 text-center col-span-full py-10"
//               >
//                 No matching categories found.
//               </motion.p>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       ) : (
//         // ✅ LIST VIEW
//         <motion.div layout className="space-y-4 pb-24">
//           <AnimatePresence>
//             {filteredCategories.map((item) => (
//               <motion.div
//                 key={item.id}
//                 layout
//                 variants={itemVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 whileHover={{
//                   scale: 1.02,
//                   x: 5,
//                   transition: { type: "spring", stiffness: 300 },
//                 }}
//                 onClick={() => navigate(`/categories/${item.categorieNumber}`)}
//                 // UPDATED: Flex-col for mobile (stacking), Flex-row for desktop
//                 className="flex flex-col sm:flex-row items-center bg-white p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 cursor-pointer overflow-hidden gap-4"
//               >
//                 {/* UPDATED: Image is full width banner on mobile, small square on desktop */}
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="w-full h-40 sm:w-32 sm:h-24 object-cover rounded-xl"
//                 />
                
//                 <div className="flex-1 text-center sm:text-left w-full">
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                         {item.title}
//                      </h2>
//                      <span className="text-xs text-gray-400 mt-1 sm:mt-0">ID: {item.categoryID}</span>
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//                     {item.desc}
//                   </p>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/categories/${item.categorieNumber}`);
//                   }}
//                   // UPDATED: Button is full width on mobile
//                   className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-2.5 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer text-sm sm:text-base font-medium whitespace-nowrap"
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