// import Sidebar from "./Sidebar";
// import AdminHeader from "./AdminPages/AdminHeader";
// import { Outlet } from "react-router-dom";

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar - Fixed Left */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col min-h-screen">
        
//         {/* Header - Fixed Top of Content Area */}
//         <AdminHeader />

//         {/* Page Content (Dynamic) */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Outlet />
//         </main>
        
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminPages/AdminHeader";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLayout() {
  // --- 5. DARK MODE PERSISTENCE ---
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(true); // Toggle for mobile

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

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-poppins">
      {/* Sidebar */}
      <Sidebar isDark={isDark} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
        
        {/* Header */}
        <AdminHeader 
          isDark={isDark} 
          setIsDark={setIsDark} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Page Content with Gradient Background matching User Panel */}
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950">
          <Outlet context={{ isDark, setIsDark }} />
        </main>
        
      </div>
    </div>
  );
}