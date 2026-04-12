// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   BookOpen,
//   Users,
//   ShoppingCart
// } from "lucide-react";

// const links = [
//   { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
//   { name: "Books", path: "/admin/books", icon: BookOpen },
//   { name: "Sell Requests", path: "/admin/sell-requests", icon: ShoppingCart },
//   { name: "Users", path: "users", icon: Users }
// ];

// export default function Sidebar() {
//   return (
//     <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-8 text-center">
//         Admin Panel
//       </h1>

//       {/* Navigation */}
//       <nav className="space-y-2">
//         {links.map(({ name, path, icon: Icon }) => (
//           <NavLink
//             key={name}
//             to={path}
//             end
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//                 isActive
//                   ? "bg-blue-600"
//                   : "hover:bg-gray-700"
//               }`
//             }
//           >
//             <Icon size={18} />
//             {name}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }


import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShoppingCart,
  Hourglass,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  // { name: "Books", path: "/admin/books", icon: BookOpen },
  { name: "Sell Requests", path: "/admin/sell-requests", icon: ShoppingCart },
  { name: "Users", path: "users", icon: Users }
];

export default function Sidebar({ isDark, isOpen, setIsOpen }) {
  return (
    <motion.aside
      animate={{ width: isOpen ? 256 : 80 }}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 shadow-2xl z-20 border-r border-amber-100 dark:border-slate-800 flex flex-col transition-colors duration-300"
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100 dark:border-slate-800 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
            <Hourglass size={20} className="animate-[spin_10s_linear_infinite]" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent whitespace-nowrap"
              >
                Admin Panel
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer absolute -right-3 top-8 bg-white dark:bg-slate-800 border  border-amber-200 dark:border-slate-600 rounded-full p-1 text-amber-500 shadow-md hover:scale-110 transition"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-none"
                : "text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-slate-800"
              }`
            }
          >
            <Icon size={22} className="min-w-[22px]" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {name}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}
