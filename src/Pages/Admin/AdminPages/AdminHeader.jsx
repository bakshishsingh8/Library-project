// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   LogOut, 
//   User, 
//   Bell, 
//   Search, 
//   Menu,
//   ChevronDown 
// } from "lucide-react";

// export default function AdminHeader() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // ---------------- LOGOUT FUNCTION ----------------
//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       // 1. Clear local storage / tokens
//       localStorage.removeItem("token"); // or whatever key you use
//       localStorage.removeItem("user");
      
//       // 2. Redirect to login
//       navigate("/login"); 
//     }
//   };

//   return (
//     <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      
//       {/* Left Side: Search Bar & Title */}
//       <div className="flex items-center gap-4">
//         {/* Mobile Toggle (Optional: visible only on small screens) */}
//         <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
//           <Menu size={20} />
//         </button>
        
//         <div className="relative hidden md:block">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search..." 
//             className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
//           />
//         </div>
//       </div>

//       {/* Right Side: Notifications & Profile */}
//       <div className="flex items-center gap-6">
        
//         {/* Notification Icon */}
//         <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
//           <Bell size={20} />
//           <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//         </button>

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <button 
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center gap-2 focus:outline-none hover:bg-gray-50 p-1 pr-2 rounded-lg transition"
//           >
//             {/* Avatar Image or Placeholder */}
//             <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//               A
//             </div>
//             <div className="hidden md:block text-left">
//               <p className="text-sm font-semibold text-gray-800">Admin User</p>
//               <p className="text-xs text-gray-500">admin@example.com</p>
//             </div>
//             <ChevronDown size={16} className="text-gray-500" />
//           </button>

//           {/* Dropdown Menu */}
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-in fade-in zoom-in-95 duration-100">
//               <div className="px-4 py-2 border-b">
//                 <p className="text-sm font-medium">My Account</p>
//               </div>
              
//               <button 
//                 onClick={() => navigate("/admin/profile")} // Make sure this route exists or remove onClick
//                 className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
//               >
//                 <User size={16} />
//                 Profile
//               </button>
              
//               <button 
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  User, 
  Bell, 
  Menu,
  Sun,
  Moon,
  ChevronDown,
  AlertTriangle // 1. Added AlertIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminHeader({ isDark, setIsDark, toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 2. State for Logout Modal
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ---------------- LOGOUT LOGIC ----------------
  
  // This just opens the modal
  const handleLogoutClick = () => {
    setIsDropdownOpen(false); // Close the dropdown menu
    setShowLogoutModal(true); // Open the confirmation modal
  };

  // This actually logs the user out
  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ---------------- CLICK OUTSIDE ----------------
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm h-20 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors border-b border-amber-50 dark:border-slate-800">
        
        {/* Left: Mobile Toggle & Title */}
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl">
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 hidden sm:block">
            Overview
          </h2>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 cursor-pointer rounded-xl bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400 hover:scale-105 transition shadow-sm"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 cursor-not-allowed text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 focus:outline-none hover:bg-amber-50 cursor-pointer dark:hover:bg-slate-800 p-1.5 pr-3 rounded-xl transition border border-transparent hover:border-amber-100 dark:hover:border-slate-700"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">Admin</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Super Admin</p>
              </div>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden py-1 z-40"
                >
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Account</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      navigate("/admin/profile");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
                  >
                    <User size={16} /> Profile
                  </button>
                  
                  {/* UPDATE: Trigger Custom Modal */}
                  <button 
                    onClick={handleLogoutClick} 
                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ---------------- CUSTOM LOGOUT MODAL ---------------- */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-500">
                  <AlertTriangle size={24} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Confirm Logout</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Are you sure you want to end your session? You will need to login again to access your account.
                </p>

                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmLogout}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}