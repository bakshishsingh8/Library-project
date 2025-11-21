// import React, {useState} from 'react'
// import Sidebar from './Layout/sidebar.jsx'
// import Header from '.Layout/header'

// export default function Layout({children}){
//   const [collapsed, setCollapsed] = useState(false)
//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Sidebar from "./sidebar.jsx";
// import Header from "./header.jsx";

// export default function Layout({ children, hideLayout }) {
//   const [sidebarHovered, setSidebarHovered] = useState(false);

//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar */}
//       {!hideLayout && (
//         <div
//           onMouseEnter={() => setSidebarHovered(true)}
//           onMouseLeave={() => setSidebarHovered(false)}
//         >
//           <Sidebar hovered={sidebarHovered} />
//         </div>
//       )}

//       {/* Main Content */}
//       <motion.div className="flex-1 flex flex-col transition-all duration-500">
//         {/* Header */}
        
//                <Header sidebarOpen={sidebarHovered} />
       

//         {/* Pages */}
//         <main className="flex-1 overflow-auto bg-gray-50">
//           {children}
//         </main>
//       </motion.div>
//     </div>
//   );
// }
