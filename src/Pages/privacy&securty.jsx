// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Shield,
//   Lock,
//   Eye,
//   FileText,
//   Server,
//   CheckCircle,
//   Moon,
//   Sun,
//   Cookie,
//   Users,
//   ChevronRight
// } from "lucide-react";

// export default function PrivacySecurity() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const policies = [
//     {
//       icon: <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
//       title: "Data Encryption",
//       description: "All sensitive data, including passwords and personal information, is encrypted using industry-standard AES-256 encryption protocols."
//     },
//     {
//       icon: <Eye className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
//       title: "Data Transparency",
//       description: "We believe in full transparency. We only collect data necessary to provide our library services and never sell your data to third parties."
//     },
//     {
//       icon: <Server className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
//       title: "Secure Storage",
//       description: "Your data is stored on secure, monitored servers with regular backups to prevent data loss and ensure 99.9% uptime."
//     },
//     {
//       icon: <Cookie className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
//       title: "Cookie Policy",
//       description: "We use minimal cookies strictly for session management and user preferences. You have full control to manage these in your settings."
//     }
//   ];

//   return (
//     <div className={isDarkMode ? "dark" : ""}>
//       <div className="bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen flex flex-col pb-20 md:pb-0 transition-colors duration-500 relative">
        
//         {/* --- Header & Hero Section --- */}
//         <div className="max-w-5xl mx-auto w-full px-4 md:px-6 pt-10 relative z-10 mt-10">
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
//                 Privacy & Security
//               </h1>
//               <p className="mt-4 text-base sm:text-lg md:text-xl text-amber-800 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
//                 Your trust is our top priority. Learn how <span className="text-amber-600 dark:text-orange-400 font-semibold">BookHaven</span> protects your data and privacy.
//               </p>
//               <p className="mt-2 text-sm text-amber-600/70 dark:text-slate-500 font-medium">
//                 Last updated: January 2024
//               </p>
//             </motion.div>

//             {/* Floating Background Icons */}
//             <motion.div
//               animate={{ y: [0, -15, 0] }}
//               transition={{ duration: 4, repeat: Infinity }}
//               className="absolute top-4 left-4 opacity-30 md:opacity-40"
//             >
//               <Shield className="w-12 h-12 md:w-16 md:h-16 text-amber-400 dark:text-amber-600" />
//             </motion.div>
//             <motion.div
//               animate={{ y: [0, 20, 0] }}
//               transition={{ duration: 5, repeat: Infinity }}
//               className="absolute bottom-4 right-4 opacity-30 md:opacity-40"
//             >
//               <Lock className="w-10 h-10 md:w-14 md:h-14 text-orange-300 dark:text-orange-500" />
//             </motion.div>
//           </section>

//           {/* --- Key Policies Grid --- */}
//           <section className="mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               className="text-2xl md:text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-amber-700 dark:text-amber-500"
//             >
//               <FileText className="w-8 h-8" /> Our Core Policies
//             </motion.h2>

//             <div className="grid md:grid-cols-2 gap-6 md:gap-8">
//               {policies.map((policy, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ scale: 1.03 }}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 shadow-lg rounded-2xl p-6 border border-amber-100/50 dark:border-slate-600 flex flex-col items-start"
//                 >
//                   <div className="p-3 bg-white/60 dark:bg-slate-900/50 rounded-xl mb-4 shadow-sm">
//                     {policy.icon}
//                   </div>
//                   <h3 className="text-lg md:text-xl font-semibold text-amber-700 dark:text-amber-400 mb-2">
//                     {policy.title}
//                   </h3>
//                   <p className="text-sm md:text-base text-amber-800 dark:text-slate-300 leading-relaxed">
//                     {policy.description}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </section>

//           {/* --- User Rights List Section --- */}
//           <section className="mb-16">
//             <div className="bg-white/70 dark:bg-slate-800/50 rounded-3xl p-8 border border-amber-200 dark:border-slate-600 shadow-sm">
//               <h2 className="text-2xl font-bold mb-6 text-amber-700 dark:text-amber-500 flex items-center gap-2">
//                 <Users className="w-6 h-6" /> Your Rights
//               </h2>
//               <ul className="space-y-4">
//                 {[
//                   "You have the right to access the personal data we hold about you.",
//                   "You can request corrections to any inaccurate or incomplete data.",
//                   "You have the 'Right to be Forgotten' and can request account deletion.",
//                   "You can opt-out of non-essential email communications at any time."
//                 ].map((item, i) => (
//                   <motion.li 
//                     key={i}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.1 }}
//                     className="flex items-start gap-3"
//                   >
//                     <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
//                     <span className="text-amber-900 dark:text-slate-300">{item}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           </section>

//           {/* --- CTA Banner --- */}
//           <motion.section
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             className="mb-10 bg-gradient-to-r from-amber-600 to-orange-500 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
//           >
//             {/* Decorative element */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
//             <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
//               <Shield /> Have Security Concerns?
//             </h2>
//             <p className="text-amber-100 dark:text-slate-400 mb-6 max-w-lg mx-auto">
//               If you have found a vulnerability or have questions about how we handle data, please contact our Data Protection Officer.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white text-amber-700 dark:text-slate-900 px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto hover:bg-amber-50 transition-colors"
//             >
//               Contact DPO Team <ChevronRight className="w-4 h-4" />
//             </motion.button>
//           </motion.section>

//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Server,
  CheckCircle,
  Moon,
  Sun,
  Cookie,
  UserCheck,
  Globe,
  ChevronRight
} from "lucide-react";

export default function PrivacySecurity() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* --- Main Background (Matches About/Help Page) --- */}
      <div className="bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen flex flex-col transition-colors duration-500 relative overflow-x-hidden">
        
        {/* Floating Background Icons (Matches About Page) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-10 opacity-20"
            >
              <Shield className="w-32 h-32 text-amber-500 dark:text-amber-700" />
            </motion.div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pt-12 pb-24 relative z-10 mt-10">
          
          {/* --- Header Row --- */}
          <div className="flex justify-between items-start mb-16">
             <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-amber-700 dark:text-amber-500" />
                <span className="font-bold text-xl text-amber-900 dark:text-slate-200">BookHaven Security</span>
             </div>

             {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/50 dark:bg-slate-800/50 shadow-md hover:shadow-lg border border-amber-200 dark:border-slate-700 transition-all text-amber-700 dark:text-amber-400 backdrop-blur-sm"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* --- Hero Section --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 border border-amber-300 dark:border-amber-800">
              <Lock className="w-3 h-3" /> Security Center
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-amber-800 dark:text-slate-100 leading-tight mb-6">
              We protect your data <br/>
              <span className="text-amber-600 dark:text-orange-400">
                like our own.
              </span>
            </h1>
            <p className="text-lg text-amber-900 dark:text-slate-300 leading-relaxed max-w-2xl opacity-90">
              Transparency, encryption, and control. We believe you should know exactly how your library data is handled and stored.
            </p>
          </motion.div>

          {/* --- Core Pillars (Grid with AMBER Cards) --- */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-24"
          >
            {[
              {
                icon: <Lock />,
                title: "Bank-Grade Encryption",
                desc: "All sensitive data is encrypted at rest and in transit using AES-256 protocols."
              },
              {
                icon: <Eye />,
                title: "Complete Transparency",
                desc: "No hidden trackers. We never sell your reading history or personal data to advertisers."
              },
              {
                icon: <Server />,
                title: "Isolated Infrastructure",
                desc: "Your data lives on secure, isolated servers with 24/7 monitoring and automated backups."
              },
              {
                icon: <Cookie />,
                title: "Minimal Cookies",
                desc: "We only use cookies essential for your login session. No third-party tracking cookies."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                // THEME FIX: Using the Amber Gradient Card style
                className="group p-8 rounded-3xl bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700 border border-amber-200/60 dark:border-slate-600 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/60 dark:bg-slate-900/50 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-xl font-bold text-amber-800 dark:text-slate-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-amber-900/80 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.section>

          {/* --- User Rights Section --- */}
          <section className="mb-24">
            <div className="flex flex-col md:flex-row items-end justify-between mb-10 border-b border-amber-300/30 dark:border-slate-700 pb-6">
              <div>
                <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-500 mb-2">Your Data Rights</h2>
                <p className="text-amber-900/70 dark:text-slate-400">You are in full control of your account.</p>
              </div>
              <div className="flex items-center gap-2 text-amber-700 dark:text-orange-400 font-semibold cursor-pointer hover:underline mt-4 md:mt-0">
                <Globe className="w-4 h-4" /> GDPR & CCPA Compliant
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Right to Access", icon: <UserCheck /> },
                { label: "Right to Rectify", icon: <FileText /> },
                { label: "Right to Forget", icon: <Shield /> },
                { label: "Data Portability", icon: <Server /> },
              ].map((right, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  // THEME FIX: Matching Card Style
                  className="p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-amber-200 dark:border-slate-600 shadow-sm flex flex-col items-center text-center gap-3"
                >
                  <div className="text-amber-500 dark:text-slate-500">
                    {React.cloneElement(right.icon, { className: "w-8 h-8" })}
                  </div>
                  <span className="font-semibold text-amber-900 dark:text-slate-200">{right.label}</span>
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- Bottom CTA --- */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 dark:from-slate-800 dark:to-slate-900 text-white p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Have a specific concern?</h2>
              <p className="text-amber-100 dark:text-slate-400 max-w-lg text-lg">
                Our Data Protection Officer is available to answer any questions regarding your privacy.
              </p>
            </div>
            
            <button className="relative z-10 whitespace-nowrap bg-white text-amber-700 dark:text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-colors flex items-center gap-2 shadow-lg">
              Contact Security Team <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}