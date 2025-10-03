import { Home, BookOpen, Clipboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current path

  // Define menu items in an array for clean code
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Books", path: "/books", icon: <BookOpen size={20} /> },
    { name: "Issue Books", path: "/issue-Books", icon: <Clipboard size={20} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 p-6 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-40 shadow-[0px_19px_38px_rgba(0,0,0,0.3),0px_15px_12px_rgba(0,0,0,0.22)]`}
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-600">
        <BookOpen size={24} /> Library Menu
      </h2>

      <ul className="space-y-1 mt-1 ml-[-10px]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path; // 👈 check active path
          return (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 cursor-pointer text-lg px-3 py-2 rounded-md transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-md" // active state
                    : "relative text-gray-700 hover:text-white hover:bg-gradient-to-r from-orange-400 to-amber-400 px-3 py-2 rounded-md transition duration-300 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[3px] after:w-0 after:bg-gray-600 after:transition-all after:duration-400 after:ease-out hover:after:left-0 hover:after:w-full"

                }`}
            >
              {item.icon} {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;


