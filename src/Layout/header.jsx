import React, { useState, useRef, useEffect } from "react";

import {User,Settings,Search as SearchIcon, LayoutGrid, List, Filter as FilterIcon,X,BookOpen,LibraryBig,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Header({
  viewMode,
  setViewMode,
  search,
  setSearch,
  selectedLetter,
  setSelectedLetter,
  scrollToFilterRef,
  openPageFilter,
  issueBooks = [],
  setHeaderHeight,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const profileRef = useRef(null);
  const filterRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  useEffect(() => {
    if (headerRef.current && setHeaderHeight) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [setHeaderHeight]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (filterRef.current && !filterRef.current.contains(e.target))
        setFilterOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterClick = () => {
    setFilterOpen((prev) => !prev);
    if (scrollToFilterRef?.current) {
      scrollToFilterRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (openPageFilter) openPageFilter();
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // UPDATED: Added flex-wrap, gap-y-3 for spacing between stacked rows, and adjusted padding
      className="fixed top-0 left-0 w-full z-50 flex flex-wrap md:flex-nowrap justify-between items-center bg-gradient-to-r from-orange-400 to-amber-400 px-3 sm:px-6 md:px-8 py-3 pt-5 md:py-2 shadow-xl backdrop-blur-lg animate-bounce-gentle gap-y-3"
    >
      {/* ---------------- LOGO ---------------- */}
      <motion.div
        className="cursor-pointer select-none text-white flex items-center shrink-0"
        onClick={() => (window.location.href = "/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          // UPDATED: Removed fixed positioning dependency, made it relative to container
          className="w-9 h-9 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg animate-[spin_20s_linear_infinite]"
        >
          <LibraryBig size={20} />
        </motion.div>
        
        {/* UPDATED: Adjusted margins to flow better next to the icon */}
        <div className="flex flex-col ml-3">
           <div className="text-lg sm:text-2xl font-extrabold tracking-tight leading-none">
             Library
           </div>
           <div className="text-[10px] sm:text-xs text-white/80 leading-none mt-0.5">Catalog & Dashboard</div>
        </div>
      </motion.div>

      {/* ---------------- SEARCH BAR ---------------- */}
      {/* UPDATED: order-last forces it to the bottom on mobile. w-full makes it full width on mobile. */}
      <motion.div
        className="order-last md:order-none w-full md:flex-1 md:max-w-2xl md:mx-4 relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <SearchIcon className="absolute left-3 ml-1 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={18} />
        <motion.input
          whileFocus={{
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
            scale: 1.005, // Reduced scale slightly to prevent mobile overflow
          }}
          transition={{ duration: 0.2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books, categories, authors..."
          className="w-full rounded-2xl py-2.5 pl-10 pr-4 text-sm sm:text-base outline-none bg-white/90 text-black border border-white/50"
        />
      </motion.div>

      {/* ---------------- RIGHT ACTIONS ---------------- */}
      {/* UPDATED: ml-auto ensures this group stays right-aligned next to logo on mobile top row */}
      <div className="flex items-center gap-2 relative ml-auto md:ml-0 shrink-0">
        {/* ✅ Issue Books Button */}
        {/* Kept hidden on mobile (sm:flex) to save space, as per original logic */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/issue-books")}
          className="cursor-pointer relative hidden sm:flex items-center gap-2 px-3 py-2 bg-white rounded-xl hover:bg-amber-100 border border-amber-200 shadow-md"
        >
          <BookOpen size={18} className="text-amber-600 animate-bounce" />
          <span className="text-sm font-medium text-amber-700 cursor-pointer animate-bounce">
            Buy Books
          </span>
          {issueBooks.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 animate-bounce bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
            >
              {issueBooks.length}
            </motion.span>
          )}
        </motion.button>

        {/* ✅ Filter + Grid/List Controls */}
        <div className="flex items-center gap-2 mr-0 sm:mr-2">
          {/* Filter */}
          <div className="relative" ref={filterRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFilterClick}
              className="p-2 rounded-xl cursor-pointer bg-white text-amber-600 border border-amber-300 hover:bg-amber-100 shadow-sm"
            >
              {filterOpen ? <X size={18} /> : <FilterIcon size={18} />}
            </motion.button>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  // UPDATED: Adjusted width and positioning for mobile safety
                  className="absolute right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 top-full mt-2 w-[90vw] sm:w-[280px] bg-white p-3 sm:pl-3 rounded-xl shadow-lg flex flex-wrap gap-2 z-50"

                >
                  {letters.map((L) => (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      key={L}
                      onClick={() =>
                        setSelectedLetter(selectedLetter === L ? "" : L)
                      }
                      className={`px-2 py-1 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        selectedLetter === L
                          ? "bg-amber-500 text-white shadow"
                          : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-100  "
                      }`}
                    >
                      {L}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ✅ Grid / List View Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl ${
              viewMode === "grid"
                ? "bg-amber-600 text-white shadow"
                : "bg-white cursor-pointer text-amber-600 border border-amber-300 hover:bg-amber-100"
            }`}
          >
            <LayoutGrid size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl ${
              viewMode === "list"
                ? "bg-amber-600 text-white shadow"
                : "bg-white cursor-pointer text-amber-600 border border-amber-300 hover:bg-amber-100"
            }`}
          >
            <List size={18} />
          </motion.button>
        </div>

        {/* Settings */}
        {/* Hidden on very small mobile screens if needed, but kept here for now */}
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-2 rounded-xl hover:bg-amber-100 cursor-pointer bg-white"
        >
          <Settings
            size={18}
            className="text-amber-600 animate-[spin_10s_linear_infinite]"
          />
        </motion.button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setProfileOpen((s) => !s)}
            className="bg-white rounded-full p-2 sm:p-3 mr-0 cursor-pointer shadow-sm"
          >
            <User size={18} className="text-black" />
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg overflow-hidden z-50"
              >
                <motion.button
                  whileHover={{ backgroundColor: "#dc2626" }}
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-white cursor-pointer bg-red-500 transition-colors"
                >
                  Logout
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
export default React.memo(Header);
// .............................................................................................................................///////////////////////////////////
// import React, { useState, useRef, useEffect } from "react";

// import {
//   User,
//   Settings,
//   Search as SearchIcon,
//   LayoutGrid,
//   List,
//   Filter as FilterIcon,
//   X,
//   BookOpen,
//   LibraryBig,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

//  function Header({
//   viewMode,
//   setViewMode,
//   search,
//   setSearch,
//   selectedLetter,
//   setSelectedLetter,
//   scrollToFilterRef,
//   openPageFilter,
//   issueBooks = [],
//   setHeaderHeight,
// }) {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const profileRef = useRef(null);
//   const filterRef = useRef(null);
//   const headerRef = useRef(null);
//   const navigate = useNavigate();

//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     window.location.href = "/";
//   };

//   useEffect(() => {
//     if (headerRef.current && setHeaderHeight) {
//       setHeaderHeight(headerRef.current.offsetHeight);
//     }
//   }, [setHeaderHeight]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target))
//         setProfileOpen(false);
//       if (filterRef.current && !filterRef.current.contains(e.target))
//         setFilterOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleFilterClick = () => {
//     setFilterOpen((prev) => !prev);
//     if (scrollToFilterRef?.current) {
//       scrollToFilterRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//     if (openPageFilter) openPageFilter();
//   };
  

//   return (
//     <motion.header
//       ref={headerRef}
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-gradient-to-r from-orange-400 to-amber-400 px-4 sm:px-6 md:px-8 py-2 shadow-xl backdrop-blur-lg animate-bounce-gentle "
//     >
//       {/* ---------------- LOGO ---------------- */}
//       <motion.div
//         className="cursor-pointer select-none text-white"
//         onClick={() => (window.location.href = "/")}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2, duration: 0.4 }}
//       >
//         <motion.div
//           whileHover={{ rotate: 10, scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-9 h-9 rounded ml-[-20px] mt-2 bg-gradient-to-br from-blue-400 to-cyan-400 fixed flex items-center justify-center text-white font-bold shadow-lg animate-[spin_20s_linear_infinite]"
//         >
//           <LibraryBig size={20} />
//         </motion.div>
//         <div className="text-lg ml-8 sm:text-2xl font-extrabold tracking-tight">
//           Library
//         </div>
//         <div className="ml-8 text-xs text-white/80">Catalog & Dashboard</div>
//       </motion.div>

//       {/* ---------------- SEARCH BAR ---------------- */}
//       <motion.div
//         className="flex-1 max-w-2xl mx-4 relative "
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.4 }}
//       >
//         <SearchIcon className="absolute left-3 ml-1  top-1/2 -translate-y-1/2 text-black pointer-events-none" />
//         <motion.input
//           whileFocus={{
//             boxShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
//             scale: 1.02,
//           }}
//           transition={{ duration: 0.2 }}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search books, categories, authors..."
//           className="w-full rounded-2xl py-2.5 pl-10 pr-4 ml-2 text-sm sm:text-base outline-none bg-white/90 text-black border border-white/50"
//         />
//       </motion.div>

//       {/* ---------------- RIGHT ACTIONS ---------------- */}
//       <div className="flex items-center gap-2 relative ">
//         {/* ✅ Issue Books Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/issue-books")}
//           className="cursor-pointer relative hidden sm:flex items-center gap-2 px-3 py-2 bg-white rounded-xl hover:bg-amber-100 border border-amber-200 shadow-md"
//         >
//           <BookOpen size={18} className="text-amber-600 animate-bounce" />
//           <span className="text-sm font-medium text-amber-700 cursor-pointer animate-bounce">
//             Buy Books
//           </span>
//           {issueBooks.length > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="absolute -top-2 -right-2 animate-bounce bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
//             >
//               {issueBooks.length}
//             </motion.span>
//           )}
//         </motion.button>

//         {/* ✅ Filter + Grid/List Controls */}
//         <div className="flex items-center gap-2 mr-2">
//           {/* Filter */}
//           <div className="relative" ref={filterRef}>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={handleFilterClick}
//               className="p-2 rounded-xl cursor-pointer bg-white text-amber-600 border border-amber-300 hover:bg-amber-100 shadow-sm"
//             >
//               {filterOpen ? <X size={18} /> : <FilterIcon size={18} />}
//             </motion.button>

//             <AnimatePresence>
//               {filterOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -6, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -6, scale: 0.95 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-xl shadow-lg p-3 flex flex-wrap gap-2 z-50"
//                 >
//                   {letters.map((L) => (
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       key={L}
//                       onClick={() =>
//                         setSelectedLetter(selectedLetter === L ? "" : L)
//                       }
//                       className={`px-2 py-1 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedLetter === L
//                         ? "bg-amber-500 text-white shadow"
//                         : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-100 "
//                         }`}
//                     >
//                       {L}
//                     </motion.button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* ✅ Grid / List View Buttons */}
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setViewMode("grid")}
//             className={`p-2 rounded-xl ${viewMode === "grid"
//               ? "bg-amber-600 text-white shadow"
//               : "bg-white cursor-pointer text-amber-600 border border-amber-300 hover:bg-amber-100"
//               }`}
//           >
//             <LayoutGrid size={18} />
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setViewMode("list")}
//             className={`p-2 rounded-xl ${viewMode === "list"
//               ? "bg-amber-600 text-white shadow"
//               : "bg-white cursor-pointer text-amber-600 border border-amber-300 hover:bg-amber-100"
//               }`}
//           >
//             <List size={18} />
//           </motion.button>
//         </div>

//         {/* Settings */}
//         <motion.button
//           whileHover={{ rotate: 90, scale: 1.1 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="p-2 rounded-xl hover:bg-amber-100 cursor-pointer bg-white"
//         >
//           <Settings size={18} className="text-amber-600 animate-[spin_10s_linear_infinite]" />
//         </motion.button>

//         {/* Profile Dropdown */}
//         <div className="relative" ref={profileRef}>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setProfileOpen((s) => !s)}
//             className="bg-white rounded-full p-2 sm:p-3 mr-2 cursor-pointer shadow-sm"
//           >
//             <User size={18} className="text-black" />
//           </motion.button>

//           <AnimatePresence>
//             {profileOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg overflow-hidden z-50"
//               >
//                 <motion.button
//                   whileHover={{ backgroundColor: "#dc2626" }}
//                   onClick={handleLogout}
//                   className="w-full px-4 py-2 text-left text-white cursor-pointer bg-red-500 transition-colors"
//                 >
//                   Logout
//                 </motion.button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.header>
//   );
// }
// export default React.memo(Header);
