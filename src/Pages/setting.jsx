// import React, { useState } from "react";
// import {
//   User,
//   Lock,
//   Bell,
//   Moon,
//   Globe,
//   Shield,
//   HelpCircle,
//   FileText,
//   LogOut,
// } from "lucide-react";

// function Setting() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>

//       <div className="max-w-xl space-y-6">

//         {/* ACCOUNT */}
//         <div className="bg-white rounded-2xl shadow p-5">
//           <h2 className="text-sm font-semibold text-gray-500 mb-4">
//             ACCOUNT
//           </h2>

//           <SettingItem icon={<User />} label="Edit Profile" />
//           <SettingItem icon={<Lock />} label="Change Password" />
//         </div>

//         {/* PREFERENCES */}
//         <div className="bg-white rounded-2xl shadow p-5">
//           <h2 className="text-sm font-semibold text-gray-500 mb-4">
//             PREFERENCES
//           </h2>

//           <SettingItem
//             icon={<Bell />}
//             label="Notifications"
//             right={
//               <Toggle
//                 value={notifications}
//                 onChange={() => setNotifications(!notifications)}
//               />
//             }
//           />

//           <SettingItem
//             icon={<Moon />}
//             label="Dark Mode"
//             right={
//               <Toggle
//                 value={darkMode}
//                 onChange={() => setDarkMode(!darkMode)}
//               />
//             }
//           />

//           <SettingItem icon={<Globe />} label="Language" right="English" />
//         </div>

//         {/* SECURITY */}
//         <div className="bg-white rounded-2xl shadow p-5">
//           <h2 className="text-sm font-semibold text-gray-500 mb-4">
//             SECURITY
//           </h2>

//           <SettingItem icon={<Shield />} label="Privacy & Security" />
//         </div>

//         {/* SUPPORT */}
//         <div className="bg-white rounded-2xl shadow p-5">
//           <h2 className="text-sm font-semibold text-gray-500 mb-4">
//             SUPPORT
//           </h2>

//           <SettingItem icon={<HelpCircle />} label="Help Center" />
//           <SettingItem icon={<FileText />} label="Terms & Conditions" />
//         </div>

//         {/* LOGOUT */}
//         <div className="bg-white rounded-2xl shadow p-5">
//           <SettingItem
//             icon={<LogOut />}
//             label="Logout"
//             danger
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Reusable Components ---------- */

// function SettingItem({ icon, label, right, danger }) {
//   return (
//     <div
//       className={`flex items-center justify-between p-3 rounded-xl cursor-pointer
//       ${danger ? "text-red-600 hover:bg-red-100" : "hover:bg-gray-100"}`}
//     >
//       <div className="flex items-center gap-3">
//         <span className="text-amber-500">{icon}</span>
//         <span className="font-medium">{label}</span>
//       </div>
//       {right && <div>{right}</div>}
//     </div>
//   );
// }

// function Toggle({ value, onChange }) {
//   return (
//     <button
//       onClick={onChange}
//       className={`w-12 h-6 rounded-full p-1 transition
//       ${value ? "bg-amber-500" : "bg-gray-300"}`}
//     >
//       <div
//         className={`w-4 h-4 bg-white rounded-full transition
//         ${value ? "translate-x-6" : ""}`}
//       />
//     </button>
//   );
// }

// export default Setting;
