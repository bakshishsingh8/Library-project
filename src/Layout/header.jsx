
import { useState, useRef, useEffect } from "react";
import { Menu, User, Book } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

function Header({ toggleSidebar }) {
  ////////////////////////////////////////
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }
  //////////////////////////////////
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white backdrop-blur-3xl border-b border-amber-600/30 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="text-white cursor-pointer hover:text-orange-200 transition-colors"
        >
          <Menu size={28} />
        </button>
        <div className="text-2xl font-extrabold text-white select-none">
          Library
        </div>
      </div>

      {/* Right: Profile */}
      <div
        ref={profileRef}
        onClick={() => setProfileOpen(!profileOpen)}
        className="relative flex bg-white hover:bg-amber-100 w-13 h-13 items-center justify-center cursor-pointer mt-[-10px] mb-[-10px] rounded-full"
      >
        <User size={28} className="text-black" />

        <div
          className={`absolute right-0 mt-3 mr-14 flex items-center justify-center w-36 h-10 bg-red-800 rounded-md shadow-lg
      transform transition-all duration-300 ease-out
      ${profileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}
    `}
        >
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 cursor-pointer bg-red-600 text-left text-white hover:bg-red-700 transition-colors rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

    </header>
  );
}

export default Header;
