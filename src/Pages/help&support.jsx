// import React from "react";
// import { Mail, Phone, HelpCircle } from "lucide-react";
// // import header from "../Layout/header";

// export default function HelpSupport() {
//   return (
//     <div className="p-6 max-w-5xl mx-auto m-15">
//         {/* <Header /> */}
//       <h1 className="text-4xl font-bold mb-6">Help & Support</h1>

//       {/* FAQ Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//           <HelpCircle /> Frequently Asked Questions
//         </h2>
//         <div className="space-y-4">
//           <div className="p-4 border rounded-xl shadow-sm">
//             <h3 className="font-semibold">How can I borrow a book?</h3>
//             <p className="text-sm text-gray-600">
//               Search for the book in the catalog and click on the "Borrow" button.
//             </p>
//           </div>
//           <div className="p-4 border rounded-xl shadow-sm">
//             <h3 className="font-semibold">How do I sell my books?</h3>
//             <p className="text-sm text-gray-600">
//               Go to the Sell Books page, fill the form, and submit your request.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="p-4 border rounded-xl flex items-center gap-3">
//             <Mail />
//             <div>
//               <p className="font-medium">Email</p>
//               <p className="text-sm text-gray-600">support@libraryproject.com</p>
//             </div>
//           </div>
//           <div className="p-4 border rounded-xl flex items-center gap-3">
//             <Phone />
//             <div>
//               <p className="font-medium">Phone</p>
//               <p className="text-sm text-gray-600">+91 98765 43210</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Support Message */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
//         <p className="text-gray-600">
//           If your issue is not listed above, please contact our support team. We
//           usually respond within 24 hours.
//         </p>
//       </section>
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  HelpCircle, 
  Moon, 
  Sun, 
  BookOpen, 
  MessageCircle, 
  ChevronRight,
  Sparkles
} from "lucide-react";
// import Header from "../Layout/header";

export default function HelpSupport() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen flex flex-col pb-20 md:pb-0 transition-colors duration-500">
        
        {/* <Header /> */}

        <div className="max-w-5xl mx-auto w-full px-4 md:px-6 pt-10">
          
          {/* --- Header & Hero Section --- */}
          <section className="relative flex flex-col items-center justify-center text-center py-10 md:py-16 overflow-hidden">
            
            {/* Dark Mode Toggle (Absolute Positioned Top Right) */}
            {/* <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleTheme}
              className="absolute top-0 right-0 p-3 rounded-full bg-white/80 dark:bg-slate-700/80 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-amber-200 dark:border-slate-600 backdrop-blur-sm z-50 mt-10"
            >
               {isDarkMode ? (
                <Sun className="w-6 h-6 text-amber-400 fill-current" />
              ) : (
                <Moon className="w-6 h-6 text-amber-700 fill-current" />
              )}
            </motion.button> */}

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-700 dark:text-amber-500 drop-shadow-lg">
                Help & Support
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl text-amber-800 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                We are here to help you navigate <span className="text-amber-600 dark:text-orange-400 font-semibold">BookHaven</span>. 
                Find answers or get in touch.
              </p>
            </motion.div>

            {/* Floating Icons (Matching About Page) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-4 md:top-10 md:left-10 opacity-30 md:opacity-40"
            >
              <HelpCircle className="w-12 h-12 md:w-16 md:h-16 text-amber-400 dark:text-amber-600" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-4 right-4 md:bottom-10 md:right-10 opacity-30 md:opacity-40"
            >
              <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-orange-300 dark:text-orange-500" />
            </motion.div>
          </section>

          {/* --- FAQ Section --- */}
          <section className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-amber-700 dark:text-amber-500"
            >
              <BookOpen className="w-8 h-8" /> Frequently Asked Questions
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* FAQ Item 1 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 shadow-lg rounded-2xl p-6 border border-amber-100/50 dark:border-slate-600"
              >
                <h3 className="text-lg md:text-xl font-semibold text-amber-700 dark:text-amber-400 mb-2">
                  How can I borrow a book?
                </h3>
                <p className="text-sm md:text-base text-amber-800 dark:text-slate-300 leading-relaxed">
                  Search for the book in the catalog and click on the "Borrow" button.
                </p>
              </motion.div>

              {/* FAQ Item 2 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 shadow-lg rounded-2xl p-6 border border-amber-100/50 dark:border-slate-600"
              >
                <h3 className="text-lg md:text-xl font-semibold text-amber-700 dark:text-amber-400 mb-2">
                  How do I sell my books?
                </h3>
                <p className="text-sm md:text-base text-amber-800 dark:text-slate-300 leading-relaxed">
                  Go to the Sell Books page, fill the form, and submit your request.
                </p>
              </motion.div>
            </div>
          </section>

          {/* --- Contact Section --- */}
          <section className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-bold mb-8 text-center text-amber-700 dark:text-amber-500"
            >
              Contact Us
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Email Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 dark:bg-slate-800/50 p-6 rounded-2xl border border-amber-200 dark:border-slate-600 shadow-sm hover:shadow-xl flex items-center gap-4 transition-all"
              >
                <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-full">
                  <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-amber-700 dark:text-amber-500">Email</p>
                  <p className="text-amber-900 dark:text-slate-300 text-sm">support@libraryproject.com</p>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 dark:bg-slate-800/50 p-6 rounded-2xl border border-amber-200 dark:border-slate-600 shadow-sm hover:shadow-xl flex items-center gap-4 transition-all"
              >
                <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-full">
                  <Phone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-amber-700 dark:text-amber-500">Phone</p>
                  <p className="text-amber-900 dark:text-slate-300 text-sm">+91 98765 43210</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* --- Bottom Message Section --- */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10 bg-gradient-to-r from-amber-600 to-orange-500 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <MessageCircle /> Need More Help?
            </h2>
            <p className="text-amber-100 dark:text-slate-400 mb-6 max-w-lg mx-auto">
              If your issue is not listed above, please contact our support team. We
              usually respond within 24 hours.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-700 dark:text-slate-900 px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto hover:bg-amber-50 transition-colors"
            >
              Contact Support <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.section>

        </div>
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Mail,
//   Phone,
//   HelpCircle,
//   Moon,
//   Sun,
//   BookOpen,
//   MessageCircle,
//   ChevronRight,
//   Sparkles,
//   Search,
//   X,
//   Send
// } from "lucide-react";

// // --- FAQ DATA ---
// // Moved data here so we can filter it with the search bar
// const faqData = [
//   {
//     question: "How can I borrow a book?",
//     answer: "Search for the book in the catalog and click on the 'Borrow' button. You will receive a confirmation email shortly.",
//   },
//   {
//     question: "How do I sell my books?",
//     answer: "Go to the Sell Books page, fill out the form with the book details and ISBN, and submit your request for approval.",
//   },
//   {
//     question: "What happens if I return a book late?",
//     answer: "A fine of $1 per day is applied for late returns. You can pay this via your dashboard wallet.",
//   },
//   {
//     question: "Can I reserve a book that is currently checked out?",
//     answer: "Yes! Click the 'Reserve' button on the book details page. We will notify you when it becomes available.",
//   },
// ];

// export default function HelpSupport() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleTheme = () => setIsDarkMode(!isDarkMode);

//   // Filter FAQs based on search
//   const filteredFAQs = faqData.filter(
//     (faq) =>
//       faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className={isDarkMode ? "dark" : ""}>
//       <div className="bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen flex flex-col pb-20 md:pb-0 transition-colors duration-500 relative">
        
//         {/* --- Header & Hero Section --- */}
//         <div className="max-w-5xl mx-auto w-full px-4 md:px-6 pt-10 relative z-10">
//           <section className="relative flex flex-col items-center justify-center text-center py-10 md:py-16">
            
//             {/* Theme Toggle */}
//             <motion.button
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               onClick={toggleTheme}
//               className="absolute top-0 right-0 p-3 rounded-full bg-white/80 dark:bg-slate-700/80 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-amber-200 dark:border-slate-600 backdrop-blur-sm z-50"
//             >
//               {isDarkMode ? (
//                 <Sun className="w-6 h-6 text-amber-400 fill-current" />
//               ) : (
//                 <Moon className="w-6 h-6 text-amber-700 fill-current" />
//               )}
//             </motion.button>

//             <motion.div
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//             >
//               <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-700 dark:text-amber-500 drop-shadow-lg">
//                 Help & Support
//               </h1>
//               <p className="mt-4 text-base sm:text-lg md:text-xl text-amber-800 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
//                 We are here to help you navigate <span className="text-amber-600 dark:text-orange-400 font-semibold">BookHaven</span>.
//               </p>
//             </motion.div>

//             {/* --- NEW: Search Bar --- */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3 }}
//               className="mt-8 w-full max-w-lg relative"
//             >
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-amber-500 dark:text-slate-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search for help (e.g., 'borrow', 'return')..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="block w-full pl-10 pr-3 py-4 border border-amber-200 dark:border-slate-600 rounded-2xl leading-5 bg-white/80 dark:bg-slate-800/80 text-amber-900 dark:text-slate-100 placeholder-amber-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-150 ease-in-out shadow-md backdrop-blur-sm"
//               />
//             </motion.div>

//             {/* Floating Background Icons */}
//             <motion.div
//               animate={{ y: [0, -15, 0] }}
//               transition={{ duration: 4, repeat: Infinity }}
//               className="absolute top-4 left-4 opacity-30 md:opacity-40"
//             >
//               <HelpCircle className="w-12 h-12 md:w-16 md:h-16 text-amber-400 dark:text-amber-600" />
//             </motion.div>
//             <motion.div
//               animate={{ y: [0, 20, 0] }}
//               transition={{ duration: 5, repeat: Infinity }}
//               className="absolute bottom-4 right-4 opacity-30 md:opacity-40"
//             >
//               <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-orange-300 dark:text-orange-500" />
//             </motion.div>
//           </section>

//           {/* --- FAQ Section --- */}
//           <section className="mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               className="text-2xl md:text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-amber-700 dark:text-amber-500"
//             >
//               <BookOpen className="w-8 h-8" /> Frequently Asked Questions
//             </motion.h2>

//             {filteredFAQs.length > 0 ? (
//               <div className="grid md:grid-cols-2 gap-6 md:gap-8">
//                 {filteredFAQs.map((faq, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.03 }}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 shadow-lg rounded-2xl p-6 border border-amber-100/50 dark:border-slate-600 flex flex-col"
//                   >
//                     <h3 className="text-lg md:text-xl font-semibold text-amber-700 dark:text-amber-400 mb-2">
//                       {faq.question}
//                     </h3>
//                     <p className="text-sm md:text-base text-amber-800 dark:text-slate-300 leading-relaxed">
//                       {faq.answer}
//                     </p>
//                   </motion.div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-amber-600 dark:text-slate-400 mt-4">
//                 No results found for "{searchTerm}"
//               </div>
//             )}
//           </section>

//           {/* --- Contact Info Section --- */}
//           <section className="mb-16">
//             <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-amber-700 dark:text-amber-500">
//               Get in Touch
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6 md:gap-8">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/70 dark:bg-slate-800/50 p-6 rounded-2xl border border-amber-200 dark:border-slate-600 shadow-sm flex items-center gap-4"
//               >
//                 <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-full">
//                   <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
//                 </div>
//                 <div>
//                   <p className="font-bold text-amber-700 dark:text-amber-500">Email</p>
//                   <p className="text-amber-900 dark:text-slate-300 text-sm">support@libraryproject.com</p>
//                 </div>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/70 dark:bg-slate-800/50 p-6 rounded-2xl border border-amber-200 dark:border-slate-600 shadow-sm flex items-center gap-4"
//               >
//                 <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-full">
//                   <Phone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
//                 </div>
//                 <div>
//                   <p className="font-bold text-amber-700 dark:text-amber-500">Phone</p>
//                   <p className="text-amber-900 dark:text-slate-300 text-sm">+91 98765 43210</p>
//                 </div>
//               </motion.div>
//             </div>
//           </section>

//           {/* --- CTA Banner --- */}
//           <motion.section
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             className="mb-10 bg-gradient-to-r from-amber-600 to-orange-500 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
//           >
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
//             <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
//               <MessageCircle /> Still need help?
//             </h2>
//             <p className="text-amber-100 dark:text-slate-400 mb-6 max-w-lg mx-auto">
//               If you couldn't find your answer above, drop us a message directly.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsModalOpen(true)}
//               className="bg-white text-amber-700 dark:text-slate-900 px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto hover:bg-amber-50 transition-colors"
//             >
//               Send a Message <ChevronRight className="w-4 h-4" />
//             </motion.button>
//           </motion.section>
//         </div>

//         {/* --- CONTACT FORM MODAL --- */}
//         <AnimatePresence>
//           {isModalOpen && (
//             <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
//               {/* Backdrop */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//               />
              
//               {/* Modal Content */}
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
//                 className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md p-6 relative z-10 border border-amber-200 dark:border-slate-600"
//               >
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="absolute top-4 right-4 text-gray-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
                
//                 <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-500 mb-2">Contact Support</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">We'll get back to you within 24 hours.</p>

//                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//                   <div>
//                     <label className="block text-sm font-medium text-amber-800 dark:text-slate-300 mb-1">Your Name</label>
//                     <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-amber-400 outline-none transition dark:text-white" placeholder="John Doe" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-amber-800 dark:text-slate-300 mb-1">Email Address</label>
//                     <input type="email" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-amber-400 outline-none transition dark:text-white" placeholder="john@example.com" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-amber-800 dark:text-slate-300 mb-1">Message</label>
//                     <textarea rows="4" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-amber-400 outline-none transition dark:text-white" placeholder="How can we help you?"></textarea>
//                   </div>
//                   <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-2">
//                     <Send className="w-4 h-4" /> Send Message
//                   </button>
//                 </form>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//       </div>
//     </div>
//   );
// }