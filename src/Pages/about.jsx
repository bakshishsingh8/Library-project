// import React from "react";
// import { motion } from "framer-motion";
// import { BookOpen, Users, Code, Sparkles } from "lucide-react";
// import Header from "../Layout/header"; // optional – if you have a header
// // import Footer from "../Layout/footer"; // optional – if you have a footer

// const About = () => {
//   return (
//     <div className="bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200 min-h-screen flex flex-col pb-20 md:pb-0">
//       {/* Optional Header */}
//       {/* <Header /> */}

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center py-12 md:py-20 px-4 md:px-6 overflow-hidden relative">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           {/* UPDATED: Responsive font sizes */}
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-700 drop-shadow-lg">
//             Welcome to <br className="md:hidden" />
//             <span className="text-amber-600">BookHaven Library</span>
//           </h1>
//           <p className="mt-4 text-base sm:text-lg md:text-xl text-amber-800 max-w-2xl mx-auto leading-relaxed">
//             Where stories meet innovation — discover, read, and manage your books
//             with elegance and simplicity.
//           </p>
//         </motion.div>

//         {/* Floating Animation Icons */}
//         {/* UPDATED: Adjusted positioning for mobile to prevent overlap with text */}
//         <motion.div
//           animate={{
//             y: [0, -15, 0],
//           }}
//           transition={{ duration: 4, repeat: Infinity }}
//           className="absolute top-10 right-5 md:top-32 md:right-16 opacity-30 md:opacity-40"
//         >
//           <BookOpen className="w-12 h-12 md:w-20 md:h-20 text-amber-400" />
//         </motion.div>
//         <motion.div
//           animate={{
//             y: [0, 20, 0],
//           }}
//           transition={{ duration: 5, repeat: Infinity }}
//           className="absolute bottom-10 left-5 md:bottom-32 md:left-16 opacity-30 md:opacity-40"
//         >
//           <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-orange-300" />
//         </motion.div>
//       </section>

//       {/* About Info Section */}
//       {/* UPDATED: Reduced vertical padding, single column on mobile */}
//       <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-4 md:px-6 py-10 md:py-16 items-center">
//         <motion.img
//           src="https://cdn-icons-png.flaticon.com/512/10065/10065361.png"
//           alt="Library Illustration"
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//           // UPDATED: Smaller image on mobile
//           className="w-48 sm:w-64 md:w-96 mx-auto drop-shadow-xl order-first"
//         />

//         <motion.div
//           initial={{ opacity: 0, x: 0, y: 30 }} // UPDATED: Animate from bottom on mobile
//           whileInView={{ opacity: 1, x: 0, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-center md:text-left"
//         >
//           <h2 className="text-2xl md:text-3xl font-bold text-amber-700 mb-4">
//             Our Vision & Purpose
//           </h2>
//           <p className="text-base md:text-lg text-amber-800 leading-relaxed">
//             <span className="font-semibold text-amber-600">My Library</span> is
//             designed to make learning and exploration effortless. Whether you’re
//             a student, researcher, or book lover, our platform brings all your
//             reading needs under one intuitive interface — built with passion and
//             modern web technology.
//           </p>
//           <p className="mt-4 text-base md:text-lg text-amber-800 leading-relaxed">
//             Built using <span className="font-semibold">React</span>,{" "}
//             <span className="font-semibold">Redux</span>, and{" "}
//             <span className="font-semibold">Tailwind CSS</span>, it’s not just a
//             library — it’s your personalized reading space.
//           </p>
//         </motion.div>
//       </section>

//       {/* Feature Cards Section */}
//       <section className="bg-white/70 py-12 md:py-16">
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl md:text-4xl font-bold text-center text-amber-700 mb-8 md:mb-12 animate-bounce-gentle px-4"
//         >
//           ✨ What Makes Us Special
//         </motion.h2>

//         {/* UPDATED: Stacked grid on mobile (grid-cols-1) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-6">
//           {[
//             {
//               icon: <BookOpen className="w-10 h-10 text-amber-600 animate-bounce-gentle" />,
//               title: "Explore Thousands of Books",
//               text: "Browse through categories, authors, and genres — all at your fingertips.",
//             },
//             {
//               icon: <Users className="w-10 h-10 text-amber-600 animate-bounce-gentle" />,
//               title: "Seamless User Experience",
//               text: "Issue, return, and manage your books with a modern and elegant interface.",
//             },
//             {
//               icon: <Code className="w-10 h-10 text-amber-600 animate-bounce-gentle" />,
//               title: "Modern Tech Stack",
//               text: "Powered by React, Redux, and Tailwind CSS — fast, responsive, and future-ready.",
//             },
//           ].map((feature, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 shadow-lg rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border border-amber-100/50"
//             >
//               <div className="flex justify-center mb-4">{feature.icon}</div>
//               <h3 className="text-lg md:text-xl font-semibold text-amber-700 mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-sm md:text-base text-amber-800">{feature.text}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Quote Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="py-12 md:py-20 text-center px-4 md:px-6 bg-gradient-to-r from-amber-100 via-orange-200 to-amber-100"
//       >
//         <p className="text-xl md:text-2xl italic text-amber-800 max-w-3xl mx-auto leading-relaxed">
//           “A library is not just a building full of books — it’s a universe of
//           imagination, learning, and endless possibilities.”
//         </p>
//         <p className="mt-4 font-semibold text-amber-600 text-base md:text-lg">
//           — Team My Library
//         </p>
//       </motion.section>

//       {/* Optional Footer */}
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default About;



import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Code, Sparkles } from "lucide-react";
import Header from "../Layout/header"; // optional – if you have a header
// import Footer from "../Layout/footer"; // optional – if you have a footer

const About = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen flex flex-col pb-20 md:pb-0 transition-colors duration-500">
      {/* Optional Header */}
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-12 md:py-20 px-4 md:px-6 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-700 dark:text-amber-500 drop-shadow-lg">
            Welcome to <br className="md:hidden" />
            <span className="text-amber-600 dark:text-orange-400"> BookHaven Library</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-amber-800 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Where stories meet innovation — discover, read, and manage your books
            with elegance and simplicity.
          </p>
        </motion.div>

        {/* Floating Animation Icons */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-5 md:top-32 md:right-16 opacity-30 md:opacity-40"
        >
          <BookOpen className="w-12 h-12 md:w-20 md:h-20 text-amber-400 dark:text-amber-600" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 left-5 md:bottom-32 md:left-16 opacity-30 md:opacity-40"
        >
          <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-orange-300 dark:text-orange-500" />
        </motion.div>
      </section>

      {/* About Info Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-4 md:px-6 py-10 md:py-16 items-center">
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/10065/10065361.png"
          alt="Library Illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-48 sm:w-64 md:w-96 mx-auto drop-shadow-xl order-first dark:brightness-90"
        />

        <motion.div
          initial={{ opacity: 0, x: 0, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-500 mb-4">
            Our Vision & Purpose
          </h2>
          <p className="text-base md:text-lg text-amber-800 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-amber-600 dark:text-amber-400">My Library</span> is
            designed to make learning and exploration effortless. Whether you’re
            a student, researcher, or book lover, our platform brings all your
            reading needs under one intuitive interface — built with passion and
            modern web technology.
          </p>
          <p className="mt-4 text-base md:text-lg text-amber-800 dark:text-slate-400 leading-relaxed">
            Built using <span className="font-semibold text-amber-600 dark:text-amber-400">React</span>,{" "}
            <span className="font-semibold text-amber-600 dark:text-amber-400">Redux</span>, and{" "}
            <span className="font-semibold text-amber-600 dark:text-amber-400">Tailwind CSS</span>, it’s not just a
            library — it’s your personalized reading space.
          </p>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-white/70 dark:bg-slate-800/50 py-12 md:py-16 transition-colors">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center text-amber-700 dark:text-amber-500 mb-8 md:mb-12 animate-bounce-gentle px-4"
        >
          ✨ What Makes Us Special
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-6">
          {[
            {
              icon: <BookOpen className="w-10 h-10 text-amber-600 dark:text-amber-400 animate-bounce-gentle" />,
              title: "Explore Thousands of Books",
              text: "Browse through categories, authors, and genres — all at your fingertips.",
            },
            {
              icon: <Users className="w-10 h-10 text-amber-600 dark:text-amber-400 animate-bounce-gentle" />,
              title: "Seamless User Experience",
              text: "Issue, return, and manage your books with a modern and elegant interface.",
            },
            {
              icon: <Code className="w-10 h-10 text-amber-600 dark:text-amber-400 animate-bounce-gentle" />,
              title: "Modern Tech Stack",
              text: "Powered by React, Redux, and Tailwind CSS — fast, responsive, and future-ready.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 shadow-lg rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border border-amber-100/50 dark:border-slate-600"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-amber-700 dark:text-amber-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-amber-800 dark:text-slate-300">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-12 md:py-20 text-center px-4 md:px-6 bg-gradient-to-r from-amber-100 via-orange-200 to-amber-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
      >
        <p className="text-xl md:text-2xl italic text-amber-800 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          “A library is not just a building full of books — it’s a universe of
          imagination, learning, and endless possibilities.”
        </p>
        <p className="mt-4 font-semibold text-amber-600 dark:text-amber-500 text-base md:text-lg">
          — Team My Library
        </p>
      </motion.section>

      {/* Optional Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default About;



// import React from 'react';
// import { 
//   Home, Search, Library, Plus, Heart, ArrowLeft, ArrowRight, 
//   Bell, User, Download, Play, Pause, SkipBack, SkipForward, 
//   Repeat, Shuffle, Mic2, ListMusic, MonitorSpeaker, Maximize2, 
//   Volume2, MoreHorizontal 
// } from 'lucide-react';

// const App = () => {
//   return (
//     <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans">
      
//       {/* Middle Section: Sidebar + Main + Right Panel */}
//       <div className="flex flex-1 overflow-hidden">
        
//         {/* LEFT SIDEBAR (Narrow Rail) */}
//         <aside className="w-[72px] bg-[#121212] m-2 mr-0 rounded-lg flex flex-col items-center py-4 gap-6">
//           <div className="flex flex-col gap-6 text-gray-400">
//             <button className="hover:text-white transition"><Library size={28} /></button>
//             <button className="hover:text-white transition"><Plus size={28} /></button>
//           </div>

//           {/* Liked Songs (Purple Box) */}
//           <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-300 rounded-md flex items-center justify-center cursor-pointer hover:scale-105 transition">
//             <Heart size={20} fill="white" className="text-white" />
//           </div>

//           {/* Artist Avatars (Scrollable area) */}
//           <div className="flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide w-full items-center pt-2">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <img 
//                 key={i} 
//                 src={`https://i.pravatar.cc/100?img=${i + 10}`} 
//                 alt="Artist" 
//                 className="w-12 h-12 rounded-full border-2 border-transparent hover:border-white cursor-pointer transition"
//               />
//             ))}
//           </div>
//         </aside>

//         {/* MAIN CONTENT AREA */}
//         <main className="flex-1 bg-[#121212] m-2 rounded-lg overflow-y-auto relative no-scrollbar">
          
//           {/* Top Navbar (Sticky) */}
//           <header className="sticky top-0 bg-[#121212]/90 backdrop-blur-md z-10 flex items-center justify-between px-6 py-4">
//             <div className="flex gap-4">
//               <button className="bg-black/50 p-1.5 rounded-full text-gray-400 hover:text-white cursor-not-allowed"><ArrowLeft size={20} /></button>
//               <button className="bg-black/50 p-1.5 rounded-full text-gray-400 hover:text-white cursor-not-allowed"><ArrowRight size={20} /></button>
//             </div>

//             {/* Search Bar */}
//             <div className="flex-1 max-w-md mx-4 relative group">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white">
//                  <Search size={20} />
//               </div>
//               <input 
//                 type="text" 
//                 placeholder="What do you want to play?" 
//                 className="w-full bg-[#242424] text-sm text-white rounded-full py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-white/20 hover:bg-[#2a2a2a] transition"
//               />
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border-l border-gray-600 pl-3">
//                  <Library size={20} />
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <button className="flex items-center gap-1 text-sm font-bold text-gray-300 hover:text-white hover:scale-105 transition bg-black/40 px-3 py-1.5 rounded-full border border-gray-600">
//                 <Download size={16} /> Install App
//               </button>
//               <button className="text-gray-400 hover:text-white"><Bell size={20} /></button>
//               <button className="text-gray-400 hover:text-white"><User size={20} /></button>
//               <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center font-bold text-black cursor-pointer hover:scale-105">B</div>
//             </div>
//           </header>

//           {/* Content Body */}
//           <div className="px-6 pb-8">
            
//             {/* Section 1: Start Browsing */}
//             <h2 className="text-2xl font-bold mb-4 mt-2">Start browsing</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//               <CategoryCard title="Music" color="bg-[#E8115B]" img="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=300&q=80" />
//               <CategoryCard title="Podcasts" color="bg-[#006450]" img="https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&w=300&q=80" />
//               <CategoryCard title="Live Events" color="bg-[#8400E7]" img="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=300&q=80" />
//             </div>

//             {/* Section 2: Browse All */}
//             <h2 className="text-2xl font-bold mb-4">Browse all</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               <CategoryCard title="2025 in Music" color="bg-[#D8B00D]" img="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&q=80" rotate />
//               <CategoryCard title="2025 in Podcasts" color="bg-[#6C8D23]" img="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=300&q=80" rotate />
//               <CategoryCard title="Made For You" color="bg-[#1E3264]" img="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=300&q=80" rotate />
//               <CategoryCard title="New Releases" color="bg-[#608108]" img="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80" rotate />
//             </div>
//           </div>
//         </main>

//         {/* RIGHT PANEL (Now Playing / Artist Info) */}
//         <aside className="w-[350px] bg-[#121212] m-2 ml-0 rounded-lg overflow-y-auto hidden lg:flex flex-col p-4">
//            <div className="flex items-center justify-between mb-4">
//              <h3 className="font-bold hover:underline cursor-pointer">Haji Mastan</h3>
//              <MoreHorizontal className="text-gray-400 cursor-pointer hover:text-white" />
//            </div>
           
//            {/* Artist Image Large */}
//            <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 shadow-lg relative group">
//               <img 
//                 src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800&q=80" 
//                 alt="Haji Mastan" 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
//                 <Maximize2 size={16} />
//               </div>
//            </div>

//            {/* Track Info in Panel */}
//            <div className="mb-6">
//              <h2 className="text-2xl font-bold leading-tight mb-1">Haji Mastan</h2>
//              <p className="text-gray-400 text-sm">Cheema Y, Gur Sidhu, Jasmeen...</p>
//            </div>

//            {/* About the Artist Card */}
//            <div className="bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] transition relative overflow-hidden group">
//              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition"></div>
//              <div className="relative z-10">
//                 <h4 className="font-bold mb-2">About the artist</h4>
//                 {/* Circular artist image small */}
//                 <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
//                    <img src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=100&q=80" alt="Artist" className="w-full h-full object-cover"/>
//                 </div>
//                 <div className="font-bold">Cheema Y</div>
//              </div>
//            </div>
//         </aside>

//       </div>

//       {/* BOTTOM PLAYER BAR */}
//       <footer className="h-[90px] bg-black border-t border-[#282828] px-4 flex items-center justify-between z-50">
        
//         {/* Left: Current Song Info */}
//         <div className="flex items-center gap-4 w-[30%]">
//            <img 
//              src="https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=100&q=80" 
//              alt="Album Art" 
//              className="w-14 h-14 rounded bg-gray-800 object-cover"
//            />
//            <div className="flex flex-col justify-center">
//              <a href="#" className="text-sm font-semibold hover:underline decoration-1">Haji Mastan</a>
//              <a href="#" className="text-xs text-gray-400 hover:underline decoration-1 hover:text-white">Cheema Y, Gur Sidhu, Jas...</a>
//            </div>
//            <button className="text-gray-400 hover:text-white ml-2"><Plus size={18}/></button>
//         </div>

//         {/* Center: Controls */}
//         <div className="flex flex-col items-center w-[40%] max-w-[722px]">
//            <div className="flex items-center gap-6 mb-2">
//              <button className="text-gray-400 hover:text-white"><Shuffle size={18} /></button>
//              <button className="text-gray-400 hover:text-white"><SkipBack fill="currentColor" size={20} /></button>
//              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition text-black">
//                <Pause fill="black" size={18} />
//              </button>
//              <button className="text-gray-400 hover:text-white"><SkipForward fill="currentColor" size={20} /></button>
//              <button className="text-gray-400 hover:text-white"><Repeat size={18} /></button>
//            </div>
//            <div className="w-full flex items-center gap-2 text-xs text-gray-400 font-medium">
//              <span>0:24</span>
//              <div className="h-1 bg-gray-600 rounded-full flex-1 group cursor-pointer">
//                <div className="h-1 bg-white rounded-full w-[15%] group-hover:bg-green-500 relative">
//                  <div className="hidden group-hover:block w-3 h-3 bg-white rounded-full absolute -right-1.5 -top-1 shadow"></div>
//                </div>
//              </div>
//              <span>2:48</span>
//            </div>
//         </div>

//         {/* Right: Volume & Extras */}
//         <div className="flex items-center justify-end gap-3 w-[30%] text-gray-400">
//            <button className="hover:text-white"><Mic2 size={18} /></button>
//            <button className="hover:text-white"><ListMusic size={18} /></button>
//            <button className="hover:text-white"><MonitorSpeaker size={18} /></button>
//            <div className="flex items-center gap-2 w-24 group">
//              <Volume2 size={18} />
//              <div className="h-1 bg-gray-600 rounded-full flex-1">
//                <div className="h-1 bg-white rounded-full w-[80%] group-hover:bg-green-500"></div>
//              </div>
//            </div>
//            <button className="hover:text-white"><Maximize2 size={18} /></button>
//         </div>

//       </footer>
//     </div>
//   );
// };

// // Reusable Card Component for "Start Browsing" and "Browse All"
// const CategoryCard = ({ title, color, img, rotate }) => {
//   return (
//     <div className={`relative ${color} h-[200px] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition group`}>
//       <h3 className="text-2xl font-bold p-4 absolute z-10">{title}</h3>
//       <img 
//         src={img} 
//         alt={title}
//         className={`absolute w-32 h-32 shadow-xl bottom-0 right-0 translate-x-[18%] translate-y-[5%] rounded-lg ${rotate ? 'rotate-[25deg] translate-x-[15%]' : 'rotate-[25deg]'} shadow-black/20`}
//       />
//     </div>
//   );
// };

// export default App;