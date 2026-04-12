import React, { useState, useRef, useEffect } from "react";
import { 
  User, 
  Settings, 
  Search as SearchIcon, 
  LayoutGrid, 
  List, 
  Filter as FilterIcon, 
  X, 
  BookOpen, 
  Hourglass 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SettingsPanel from "./SettingsPanel"; // Ensure this path matches your folder structure

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
  rentedBooks = [],
  setHeaderHeight,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const profileRef = useRef(null);
  const filterRef = useRef(null);
  const headerRef = useRef(null);
  const settingsRef = useRef(null);
  const navigate = useNavigate();

  // --- DARK MODE LOGIC (Lifts state to Header so child components can control it) ---
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  // ----------------------------------------------------------------------------------

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
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
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
      className="fixed top-0 left-0 w-full z-50 flex flex-wrap md:flex-nowrap justify-between items-center bg-gradient-to-r from-orange-400 to-amber-400 dark:from-slate-800 dark:to-slate-900 px-3 sm:px-6 md:px-8 py-3 pt-5 md:py-2 shadow-xl backdrop-blur-lg gap-y-3 transition-colors duration-300"
    >
      {/* ---------------- LOGO ---------------- */}
      <motion.div
        className="cursor-pointer select-none text-white flex items-center shrink-0"
        onClick={() => navigate("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg animate-[spin_20s_linear_infinite]"
        >
          <Hourglass size={20} />
        </motion.div> */}

        <div className="flex flex-col ml-3">
          <div className="text-lg sm:text-2xl font-extrabold tracking-tight leading-none text-white">
            Library
          </div>
          <div className="text-[10px] sm:text-xs text-white/80 leading-none mt-0.5">Catalog & Dashboard</div>
        </div>
      </motion.div>

      {/* ---------------- SEARCH BAR ---------------- */}
      <motion.div
        className="order-last md:order-none w-full md:flex-1 md:max-w-2xl md:mx-4 relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <SearchIcon className="absolute left-3 ml-1 top-1/2 -translate-y-1/2 text-black dark:text-slate-400 pointer-events-none" size={18} />
        <motion.input
          whileFocus={{
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
            scale: 1.005,
          }}
          transition={{ duration: 0.2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books, categories, authors..."
          className="w-full rounded-2xl py-2.5 pl-10 pr-4 text-sm sm:text-base outline-none bg-white/90 dark:bg-slate-700/90 text-black dark:text-white border border-white/50 dark:border-slate-600 transition-colors"
        />
      </motion.div>

      {/* ---------------- RIGHT ACTIONS ---------------- */}
      <div className="flex items-center gap-2 relative ml-auto md:ml-0 shrink-0">
        
        {/* Buy Books Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/issue-books")}
          className="cursor-pointer relative hidden sm:flex items-center gap-2 px-3 py-2 bg-white dark:bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 dark:text-white rounded-xl hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200  dark:border-slate-600 shadow-md"
        >
          <BookOpen size={18} className="" />
          <span className="text-sm font-medium ">
            Buy Books
          </span>
          {issueBooks.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 animate-bounce bg-amber-600 dark:bg-amber-50 text-white dark:text-red-800 text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
            >
              {issueBooks.length}
            </motion.span>
          )}
        </motion.button>

        {/* Issue Books Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/issue-book-form")}
          className="cursor-pointer relative hidden sm:flex items-center gap-2 px-3 py-2 bg-white dark:bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 dark:text-white rounded-xl hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200  dark:border-slate-600 shadow-md"

          // ="cursor-pointer relative hidden sm:flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200 dark:border-slate-600 shadow-md"
        >
          <BookOpen size={18} className="" />
          <span className="text-sm font-medium">
            {/* text-amber-700 dark:text-amber-300 */}
            Issue Books
          </span>
          {rentedBooks.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-amber-600 text-white dark:bg-white dark:text-red-800 text-xs font-bold px-2 py-0.5 rounded-full shadow-md "
            >
              {rentedBooks.length}
            </motion.span>
          )}
        </motion.button>

        {/* Filter Trigger */}
        <div className="relative" ref={filterRef}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFilterClick}
            className="cursor-pointer relative hidden sm:flex items-center gap-2 px-2 py-2 bg-white dark:bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 dark:text-white rounded-xl hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200  dark:border-slate-600 shadow-md"
            // p-2 rounded-xl cursor-pointer bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-slate-600 shadow-sm
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
                className="absolute right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 top-full mt-2 w-[90vw] sm:w-[280px] bg-white border border-amber-500 dark:bg-slate-800 p-3 sm:pl-3 rounded-xl shadow-lg flex flex-wrap gap-2 z-50 dark:border-slate-700"
              >
                {letters.map((L) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    key={L}
                    onClick={() => setSelectedLetter(selectedLetter === L ? "" : L)}
                    className={`px-2 py-1 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      selectedLetter === L
                        ? "bg-amber-500 text-white shadow"
                        : "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-slate-600 hover:bg-amber-100 dark:hover:bg-slate-600"
                    }`}
                  >
                    {L}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Layout Mode Toggles */}
        <div className="flex gap-1">
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl border transition-all ${viewMode === "grid" ? "bg-amber-600 text-white shadow dark:bg-slate-800" : "bg-white dark:bg-amber-600 cursor-pointer text-amber-600 dark:text-white border-amber-300 dark:border-slate-600 hover:bg-amber-100"}`}
            >
            <LayoutGrid size={18} />
            </motion.button>

            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl border transition-all ${viewMode === "list" ? "bg-amber-600 text-white shadow dark:bg-slate-800" : "bg-white dark:bg-amber-600 cursor-pointer text-amber-600 dark:text-white border-amber-300 dark:border-slate-600 hover:bg-amber-100"}`}
            >
            <List size={18} />
            </motion.button>
        </div>

        {/* ---------------- SETTINGS DROPDOWN TRIGGER ---------------- */}
        <div className="relative" ref={settingsRef}>
          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            onClick={() => setSettingsOpen((s) => !s)}
            className="cursor-pointer relative hidden sm:flex items-center gap-2 px-2 py-2 bg-white dark:bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 dark:text-white rounded-xl hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200  dark:border-slate-600 shadow-md"
          >
            <Settings size={18} className="" />
          </motion.button>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 z-50"
              >
                {/* ✅ IMPORTANT: Passing the Dark Mode state and setter down
                  to the SettingsPanel component. 
                */}
                <SettingsPanel 
                  onLogout={handleLogout} 
                  isDark={isDark} 
                  setIsDark={setIsDark} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile/User Button */}
        <div className="relative" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/userprofile")}
            
            className="cursor-pointer relative hidden sm:flex items-center gap-2 px-3 py-3 bg-white dark:bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 dark:text-white rounded-full hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200  dark:border-slate-600 shadow-md"
          >
            <User size={18} className="text-black dark:text-white" />
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-md shadow-lg overflow-hidden z-50  dark:border-slate-700 border-red-500 border-2"
              >
                <motion.button
                  whileHover={{ backgroundColor: "#dc2626" }}
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-white cursor-pointer bg-red-500 transition-colors text-sm font-semibold"
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