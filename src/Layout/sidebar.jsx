
// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Home, BookOpen, Clipboard, Table, Settings, BookAIcon, DoorOpen, InfoIcon  } from "lucide-react";

// const menuItems = [
//   // { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
//     {name: "Home", path:"/welcome", icon: <Home size={20}/>},

//   { name: "Book Categories", path: "/books", icon: <BookOpen size={20} /> },
//   { name: "Buy Books", path: "/issue-books", icon: <Clipboard size={20} /> },
//   // { name: "Table", path: "/table", icon: <Table size={20} /> },
//   // {name: "Welcome", path:"/welcome", icon: <DoorOpen size={20}/>},
//   {name: "ALL Books", path: "/AllBooks", icon: <BookAIcon size={20}/> },
//     {name: "About", path: "/about", icon: <InfoIcon size={20}/> },

// ];

// export default function Layout({ children }) {
//   const [hovered, setHovered] = React.useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <div className="h-screen flex overflow-hidden">
//       {/* Sidebar - Fixed Position */}
//       <motion.aside
//         className="fixed left-0 top-0 h-full bg-white shadow-2xl flex flex-col z-20"
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         initial={false}
//         animate={{ width: hovered ? "220px" : "64px" }}
//         transition={{ type: "spring", stiffness: 260, damping: 30 }}
//       >
//         {/* Logo */}
//         <div className="flex items-center gap-2 px-4 h-[64px] ">
//           <div className="w-9 h-9 rounded ml-[-5px] bg-gradient-to-br from-blue-400 to-cyan-400 fixed flex items-center justify-center text-white font-bold">
//             ☰
//           </div>
//           <AnimatePresence>
//             {hovered && (
//               <motion.span
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="font-semibold whitespace-nowrap text-white"
//               >
                
//               </motion.span>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 flex flex-col mt-4 gap-2 px-2">
//           {menuItems.map((item, index) => {
//             const active = location.pathname === item.path;
//             return (
//               <motion.button
//                 key={item.name}
//                 onClick={() => navigate(item.path)}
//                 className={`flex items-center gap-3 px-3 py-2  rounded-lg transition-all duration-300 ${
//                   active
//                     ? "bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-md"
//                     : "text-gray-700 hover:bg-amber-100 cursor-pointer"
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <motion.div
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: active ? 360 : 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {item.icon}
//                 </motion.div>
//                 <AnimatePresence>
//                   {hovered && (
//                     <motion.span
//                       key={item.name}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -10 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="font-medium select-none"
//                     >
//                       {item.name}
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </motion.button>
//             );
//           })}
//         </nav>

//         {/* Settings Button */}
//         <div className="mt-auto p-4 border-t border-amber-100 ">
//           <button
//             onClick={() => navigate("/settings")}
//             className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-amber-100 w-full transition-all duration-200 cursor-pointer"
//           >
//             <Settings size={20} />
//             <AnimatePresence>
//               {hovered && (
//                 <motion.span
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -10 }}
//                   className="select-none"
//                 >
//                   Settings
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </button>
//         </div>
//       </motion.aside>

//       {/* Main Content Area */}
//       <div
//         className={`flex-1 flex flex-col ml-[64px] transition-all duration-300 ${
//           hovered ? "ml-[220px]" : "ml-[64px]"
//         } overflow-y-auto h-screen`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home,BookOpen, Clipboard, Settings, BookAIcon, InfoIcon, Menu, } from "lucide-react";// Added a fallback icon for logo if needed

const menuItems = [
  { name: "Home", path: "/welcome", icon: <Home size={20} /> },
  { name: "Book Categories", path: "/books", icon: <BookOpen size={20} /> },
  { name: "Buy Books", path: "/issue-books", icon: <Clipboard size={20} /> },
  { name: "ALL Books", path: "/AllBooks", icon: <BookAIcon size={20} /> },
  { name: "About", path: "/about", icon: <InfoIcon size={20} /> },
];

export default function Layout({ children }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check screen size to disable sidebar animation on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Initial check
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
          {/* <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-gray-500 "> */}

      {/* SIDEBAR / BOTTOM NAV 
        - Mobile: Fixed at bottom, full width, horizontal flex
        - Desktop: Fixed at left, full height, vertical flex
      */}
      <motion.aside
        className={`
          fixed z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-2xl flex 
          
          /* Mobile Styles */
          bottom-0 left-0 w-full h-[70px] flex-row items-center justify-between px-4 border-t border-gray-200

          /* Desktop Styles */
          md:top-0 md:left-0 md:h-full md:flex-col md:justify-start md:border-t-0 md:px-0 mt-14
        `}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        initial={false}
        // Only animate width on Desktop. On mobile, we force width to 'auto' or '100%' via CSS
        animate={
          !isMobile
            ? { width: hovered ? "220px" : "64px" }
            : { width: "100%" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        {/* ---------------- LOGO (Desktop Only) ---------------- */}
        {/* <div className="hidden md:flex items-center gap-2 px-4 h-[64px] shrink-0">
          <div className="w-9 h-9 rounded ml-[-5px] bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold shrink-0">
            <Menu size={20} />
          </div>
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold whitespace-nowrap text-gray-800 ml-2"
              >
                Library
              </motion.span>
            )}
          </AnimatePresence>
        </div> */}

        {/* ---------------- MENU ITEMS ---------------- */}
        <nav className="flex-1 flex flex-row md:flex-col md:mt-4 gap-1 md:gap-2 w-full justify-between md:justify-start md:px-2">
          {menuItems.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <motion.button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`
                  group relative flex items-center justify-center md:justify-start 
                  p-2 md:px-3 md:py-2 rounded-xl md:rounded-lg transition-all duration-300 
                  flex-1 md:flex-none 
                  ${
                    active
                      ? "text-amber-600 md:bg-gradient-to-r md:from-orange-400 md:to-amber-400 md:text-white md:shadow-md"
                      : "text-gray-500 hover:bg-amber-50 md:hover:bg-amber-100 cursor-pointer"
                  }
                `}
                whileTap={{ scale: 0.9 }}
              >
                {/* Icon Wrapper */}
                <div className={`relative z-10 flex flex-col items-center ${active ? "mb-1 md:mb-0" : ""}`}>
                   {/* Active Dot for Mobile */}
                  {active && (
                     <motion.div 
                       layoutId="activeTab"
                       className="absolute -top-3 w-1 h-1 bg-amber-500 rounded-full md:hidden"
                     />
                  )}
                  
                  <motion.div
                    animate={{ 
                        rotate: active && !isMobile ? 360 : 0,
                        scale: active && isMobile ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Mobile Label (Optional: Remove if you want only icons) */}
                  <span className={`text-[10px] md:hidden ${active ? "font-bold" : "font-medium"}`}>
                    {item.name.split(" ")[0]} 
                  </span>
                </div>

                {/* Desktop Label (Expands on Hover) */}
                <AnimatePresence>
                  {hovered && !isMobile && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className="ml-3 font-medium select-none whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}

          {/* Settings Button - Included in Nav flow for Mobile, Bottom for Desktop */}
          <button
            onClick={() => navigate("/settings")}
            className={`
              flex md:hidden flex-col items-center justify-center flex-1 p-2 text-gray-500
            `}
          >
             <Settings size={20} />
             <span className="text-[10px] font-medium">Set</span>
          </button>
        </nav>

        {/* ---------------- SETTINGS (Desktop Only Position) ---------------- */}
        <div className="hidden md:block mt-auto p-4 border-t border-amber-100">
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-amber-100 w-full transition-all duration-200 cursor-pointer"
          >
            <Settings size={20} />
            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="select-none"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div
        className={`
          flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300
          /* Mobile: Remove left margin, add bottom padding for nav bar */
          ml-0 pb-24
          
          /* Desktop: Add left margin based on hover state */
          md:pb-0
        `}
        // We use inline style for the desktop margin transition to sync with Framer Motion
        style={{ 
            marginLeft: isMobile ? "0px" : (hovered ? "220px" : "64px") 
        }}
      >
        {children}
      </div>
      {/* </div> */}
      </>
  );
}