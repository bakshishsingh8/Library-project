import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden text-center bg-gradient-to-b from-amber-100 via-orange-200 to-amber-300 font-sans">
      
      {/* Background Image with gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="src/assets/jpg/licensed-image.jpeg" 
          alt="Library Background"
          className="w-full h-full object-cover opacity-70 blur-[2px] scale-105 animate-slow-zoom"
        />
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      </div>

      {/* Header Navigation */}
      {/* UPDATED: Centered on mobile, Right-aligned on Desktop. Reduced gap for mobile. */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full flex justify-center md:justify-end gap-6 md:gap-12 text-base md:text-xl p-4 md:p-6 md:pr-16 z-20 font-semibold text-amber-50 flex-wrap"
      >
        {["Categories", "All Books", "About"].map((item, index) => {
            const path = item === "Categories" ? "/books" : item === "All Books" ? "/allbooks" : "/about";
            return (
                <motion.h1
                    key={index}
                    whileHover={{ scale: 1.1, color: "#FFD54F" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(path)}
                    className="cursor-pointer transition-all relative inline-block text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                    {item}
                </motion.h1>
            )
        })}
      </motion.div>

      {/* Main Welcome Section */}
      {/* UPDATED: Added padding (px-4) and adjusted top margin */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 w-full h-full flex flex-col mt-24 md:mt-20 items-center justify-center px-4"
      >
        {/* Animated heading */}
        {/* UPDATED: Text size scales from 3xl (mobile) to 7xl (desktop) */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl mb-4 flex flex-col md:block"
        >
          <span className="text-amber-400">📚 Welcome to</span>{" "}
          <motion.span
            animate={{ color: ["#FBBF24", "#F59E0B", "#FBBF24"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="ml-0 md:ml-2 mt-2 md:mt-0"
          >
            BookHaven
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-base sm:text-lg md:text-xl text-amber-50 max-w-xs sm:max-w-2xl mx-auto mb-8 md:mb-16 drop-shadow-lg leading-relaxed"
        >
          Discover, explore, and enjoy a world full of stories and knowledge. <br className="hidden md:block" />
          Begin your reading adventure today!
        </motion.p>

        {/* Floating Books Animation (decorative) */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            alt="Floating books"
            // UPDATED: Smaller image on mobile
            className="w-32 sm:w-40 md:w-56 opacity-90 drop-shadow-xl"
          />
        </motion.div>

        {/* Explore Button */}
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255, 193, 7, 0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/books")}
          // UPDATED: Reduced margin top, wider button on mobile
          className="mt-10 md:mt-16 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-orange-500 hover:to-amber-400 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full shadow-2xl transition-all text-base md:text-lg cursor-pointer animate-bounce w-[80%] md:w-auto"
        >
          Explore Books
        </motion.button>
      </motion.div>

      {/* Soft floating particles animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 bg-amber-300 rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Welcome;