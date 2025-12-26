// import React, { useState } from "react";
// import {
//   User,
//   Bell,
//   Moon,
//   Shield,
//   HelpCircle,
//   LogOut,
// } from "lucide-react";

// function SettingsPanel({ onLogout }) {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);

//   return (
//     <div className="w-64 bg-white rounded-xl shadow-xl overflow-hidden">
//       <Section title="ACCOUNT">
//         <Item icon={<User />} label="Profile Settings" />
//       </Section>

//       <Section title="PREFERENCES">
//         <ToggleItem
//           icon={<Bell />}
//           label="Notifications"
//           value={notifications}
//           onChange={() => setNotifications(!notifications)}
//         />
//         <ToggleItem
//           icon={<Moon />}
//           label="Dark Mode"
//           value={darkMode}
//           onChange={() => setDarkMode(!darkMode)}
//         />
//       </Section>

//       <Section title="SECURITY">
//         <Item icon={<Shield />} label="Privacy & Security" />
//       </Section>

//       <Section title="SUPPORT">
//         <Item icon={<HelpCircle />} label="Help & Support" />
//       </Section>

//       <button
//         onClick={onLogout}
//         className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100"
//       >
//         <LogOut size={16} />
//         Logout
//       </button>
//     </div>
//   );
// }

// /* ---------- Helpers ---------- */

// const Section = ({ title, children }) => (
//   <div className="border-b last:border-none">
//     <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500">
//       {title}
//     </p>
//     {children}
//   </div>
// );

// const Item = ({ icon, label }) => (
//   <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-amber-100 text-sm">
//     <span className="text-amber-600">{icon}</span>
//     {label}
//   </button>
// );

// const ToggleItem = ({ icon, label, value, onChange }) => (
//   <div className="flex items-center justify-between px-4 py-2">
//     <div className="flex items-center gap-3 text-sm">
//       <span className="text-amber-600">{icon}</span>
//       {label}
//     </div>
//     <button
//       onClick={onChange}
//       className={`w-10 h-5 rounded-full p-1 ${
//         value ? "bg-amber-500" : "bg-gray-300"
//       }`}
//     >
//       <div
//         className={`w-3 h-3 bg-white rounded-full transition ${
//           value ? "translate-x-5" : ""
//         }`}
//       />
//     </button>
//   </div>
// );

// export default SettingsPanel;

import React, { useState } from "react";
import { User, Bell, Moon, Shield, HelpCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";

function SettingsPanel({ onLogout, isDark, setIsDark }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border dark:border-slate-700 transition-colors duration-300">
      <Section title="ACCOUNT">
        <Item icon={<User size={16} />} label="Profile Settings" />
      </Section>

      <Section title="PREFERENCES">
        <ToggleItem
          icon={<Bell size={16} />}
          label="Notifications"
          value={notifications}
          onChange={() => setNotifications(!notifications)}
        />
        {/* LINKED DARK MODE TOGGLE */}
        <ToggleItem
          icon={<Moon size={16} />}
          label="Dark Mode"
          value={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </Section>

      <Section title="SECURITY">
        <Item icon={<Shield size={16} />} label="Privacy & Security" />
      </Section>

      <Section title="SUPPORT">
        <Item icon={<HelpCircle size={16} />} label="Help & Support" />
      </Section>

      <button
        onClick={onLogout}
        className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-semibold border-t dark:border-slate-700 cursor-pointer"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}

/* ---------- Reusable Helpers ---------- */

const Section = ({ title, children }) => (
  <div className="border-b last:border-none dark:border-slate-700">
    <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 dark:text-slate-500 tracking-widest uppercase">
      {title}
    </p>
    {children}
  </div>
);

const Item = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 dark:hover:bg-slate-700 text-sm text-gray-700 dark:text-slate-200 transition-colors cursor-pointer border-none outline-none">
    <span className="text-amber-600 dark:text-amber-500">{icon}</span>
    {label}
  </button>
);

const ToggleItem = ({ icon, label, value, onChange }) => (
  <div className="flex items-center justify-between px-4 py-2.5">
    <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-200">
      <span className="text-amber-600 dark:text-amber-500">{icon}</span>
      {label}
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevents dropdown from closing accidentally
        onChange();
      }}
      className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 flex items-center cursor-pointer border-none outline-none ${
        value ? "bg-amber-500" : "bg-gray-300 dark:bg-slate-600"
      }`}
    >
      <motion.div
        animate={{ x: value ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-3 h-3 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
);

export default SettingsPanel;