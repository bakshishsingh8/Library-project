// import { useState, useEffect } from "react";
// import { BarChart3, Bell, AlertTriangle, Users, MapPin, CheckCircle2, Wrench } from "lucide-react";

// function Dashboard() {
//   const [activeUsers, setActiveUsers] = useState(78);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveUsers((prev) => (prev > 95 ? 75 : prev + 1));
//     }, 1500);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

//       {/* Top Stats Section */}
//       <div className="flex gap-18 mb-5">
//         {[

//           { title: "Efficiency", value: "0⬇️0.00% ", icon: <BarChart3 />, color: "from-green-400 to-emerald-500" },
//           { title: "Total Stations", value: "35", icon: <MapPin />, color: "from-sky-400 to-blue-500" },
//            { title: "Total Devices", value: "35", icon: <MapPin />, color: "from-sky-400 to-blue-500" },
//           { title: "total Alerts", value: "8", icon: <Bell />, color: "from-orange-400 to-amber-500" },
//           { title: "Warnings", value: "3", icon: <AlertTriangle />, color: "from-red-400 to-pink-500" },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className={`p-5 rounded-2xl shadow-md bg-gradient-to-r ${item.color} text-white flex items-center justify-between transition-transform hover:scale-105`}
//           >
//             <div >
//               <p className="text-sm font-medium opacity-90">{item.title}</p>
//               <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
//               complete to last week
//             </div>
//             <div className="bg-white/20 p-3 rounded-full">{item.icon}</div>
//           </div>
//         ))}
//       </div>

//       {/* Middle Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Map Section */}
//         <div className="col-span-2 bg-white shadow-lg rounded-2xl p-6 border border-amber-100">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Station Map</h2>
//           <div className="h-64 w-full rounded-xl bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center text-gray-600 font-medium">
//             Map Preview (Static)
//           </div>
//         </div>

//         {/* Alerts Summary */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {[
//             { title: "Total Alerts", value: "12", color: "bg-orange-100", icon: <Bell className="text-orange-500" /> },
//             { title: "Acknowledged", value: "9", color: "bg-green-100", icon: <CheckCircle2 className="text-green-500" /> },
//             { title: "Warnings", value: "3", color: "bg-yellow-100", icon: <AlertTriangle className="text-yellow-500" /> },
//             { title: "Device Maintenance", value: "5", color: "bg-blue-100", icon: <Wrench className="text-blue-500" /> },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className={`${item.color} rounded-2xl p-4 flex items-center justify-between shadow hover:shadow-md transition-all`}
//             >
//               <div>
//                 <p className="text-sm text-gray-600">{item.title}</p>
//                 <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
//               </div>
//               <div className="p-2 bg-white rounded-full">{item.icon}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//         {/* RAG Report Table */}
//         <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md border border-amber-100">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">RAG Report</h2>
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-amber-100 text-gray-800">
//                 <th className="p-3">Station</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 { name: "Station 1", status: "Green", remarks: "All systems good" },
//                 { name: "Station 2", status: "Amber", remarks: "Minor warnings" },
//                 { name: "Station 3", status: "Red", remarks: "Maintenance needed" },
//               ].map((row, i) => (
//                 <tr key={i} className="border-b hover:bg-amber-50">
//                   <td className="p-3">{row.name}</td>
//                   <td
//                     className={`p-3 font-semibold ${row.status === "Red"
//                         ? "text-red-500"
//                         : row.status === "Amber"
//                           ? "text-yellow-500"
//                           : "text-green-500"
//                       }`}
//                   >
//                     {row.status}
//                   </td>
//                   <td className="p-3 text-gray-600">{row.remarks}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Active Users */}
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-100 flex flex-col items-center justify-center">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Active Users</h2>
//           <div className="relative w-40 h-40 flex items-center justify-center">
//             <svg className="w-full h-full -rotate-90">
//               <circle
//                 cx="80"
//                 cy="80"
//                 r="70"
//                 stroke="#f3f4f6"
//                 strokeWidth="12"
//                 fill="none"
//               />
//               <circle
//                 cx="80"
//                 cy="80"
//                 r="70"
//                 stroke="url(#gradient)"
//                 strokeWidth="12"
//                 strokeLinecap="round"
//                 strokeDasharray={`${activeUsers * 4.4}, 440`}
//                 fill="none"
//               />
//               <defs>
//                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#f59e0b" />
//                   <stop offset="100%" stopColor="#f97316" />
//                 </linearGradient>
//               </defs>
//             </svg>
//             <span className="absolute text-3xl font-bold text-gray-800">
//               {activeUsers}%
//             </span>
//           </div>
//           <p className="mt-3 text-gray-600">System Activity Level</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";

// const Dashboard = () => {
//   const cards = [
//     { label: "Efficiency", value: "0", change: "-0%", color: "from-rose-200 to-rose-300" },
//     { label: "Total Stations", value: "1", change: "0", color: "from-sky-200 to-sky-300" },
//     { label: "Total Devices", value: "1", change: "100%", color: "from-green-200 to-green-300" },
//     { label: "Total Alerts", value: "0", change: "0", color: "from-amber-200 to-amber-300" },
//     { label: "Total Warnings", value: "0", change: "0", color: "from-pink-200 to-pink-300" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-6 text-gray-700">
//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//         {cards.map((item, i) => (
//           <div
//             key={i}
//             className={`p-4 rounded-xl shadow-sm bg-gradient-to-br ${item.color} border border-white/50`}
//           >
//             <div className="text-sm text-gray-600">{item.label}</div>
//             <div className="text-3xl font-bold text-gray-800">{item.value}</div>
//             <div className="text-xs text-gray-500">
//               Compare to last week ({item.change})
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Map and Alerts/Warnings Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-xl shadow-sm h-64 flex items-center justify-center text-gray-400 border border-gray-100">
//           🗺️ Map placeholder — integrate your preferred map here.
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow-sm h-64 border border-gray-100">
//           <div className="flex justify-between mb-2">
//             <h2 className="font-semibold text-gray-700">Alerts / Warnings</h2>
//             <div className="space-x-2">
//               <button className="px-3 py-1 bg-gradient-to-r from-rose-300 to-pink-300 text-gray-700 rounded text-sm shadow-sm">
//                 Alerts
//               </button>
//               <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition">
//                 Warnings
//               </button>
//             </div>
//           </div>
//           <div className="text-center text-gray-400 pt-10">
//             ⚠️ No data<br />No alerts to show.
//           </div>
//         </div>
//       </div>

//       {/* Counts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl shadow-sm text-gray-700 text-center h-40 flex items-center justify-center font-medium">
//           Total Counts Of Alerts
//         </div>
//         <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-4 rounded-xl shadow-sm text-gray-700 text-center h-40 flex items-center justify-center font-medium">
//           Total Counts Of Warnings
//         </div>
//         <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-xl shadow-sm text-gray-700 text-center h-40 flex items-center justify-center font-medium">
//           Device Maintenance Overdue (Can drag & zoom)
//         </div>
//       </div>

//       {/* Rag Report and Active Users */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         {/* Rag Report */}
//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="font-semibold text-gray-700">Rag Report</h2>
//             <div className="space-x-1">
//               {["Past Due", "Due Today", "7 Days", "15 Days"].map((btn, i) => (
//                 <button
//                   key={i}
//                   className={`text-sm px-2 py-1 rounded-full transition ${
//                     btn === "Due Today"
//                       ? "bg-gradient-to-r from-sky-200 to-blue-200 text-gray-700"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {btn}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="text-center text-gray-400 py-10">
//             📊 No data<br />Select a different range or connect your data source.
//           </div>
//         </div>

//         {/* Active Users */}
//         <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center border border-gray-100">
//           <div className="text-lg font-semibold mb-2 text-gray-700">Active Users</div>
//           <div className="relative w-32 h-32">
//             <svg className="w-full h-full">
//               <circle cx="64" cy="64" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
//               <circle
//                 cx="64"
//                 cy="64"
//                 r="50"
//                 fill="none"
//                 stroke="#86efac"
//                 strokeWidth="12"
//                 strokeDasharray="314"
//                 strokeDashoffset="157"
//                 strokeLinecap="round"
//               />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-green-500">
//               9
//             </div>
//           </div>
//           <div className="text-sm mt-2 text-gray-500">9 Active / 0 Inactive</div>
//         </div>

//         {/* Alerts / Acknowledged */}
//         <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100">
//           <h2 className="font-semibold mb-2 text-gray-700">Alerts / Acknowledged</h2>
//           <div className="text-gray-400">✨ No acknowledged alerts yet.</div>
//         </div>
//       </div>

//       {/* Screenshot or Image Placeholder */}
//       {/* <div className="bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-6 rounded-xl shadow-sm flex items-center justify-center min-h-[200px] border border-gray-100">
//         <img
//           src="https://via.placeholder.com/150x300?text=Screenshot"
//           alt="screenshot"
//           className="rounded-xl shadow border border-gray-200"
//         />
//       </div> */}
//     </div>
//   );
// };

// export default Dashboard;

////////////////////////////////////////////////////////////

// "use client"
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   LineChart,
//   Line,
//   Legend,
//   CartesianGrid,
// } from "recharts"
// import { AlertCircle, MapPin } from "lucide-react"

// // Sample data for stat cards
// const chartData = [
//   { name: "jan", value: 0 },
//   { name: "Feb", value: 20 },
//   { name: "Mar", value: 40 },
//   { name: "Apr", value: 60 },
//   { name: "May", value: 80 },
//   { name: "Jun", value: 100 },
// ]

// const alertsData = [
//   { name: "Amarpur Jorasi", value: 10 },
//   { name: "Ateli", value: 5 },
//   { name: "Dabla", value: 5 },
//   { name: "Narnaul", value: 8 },
//   { name: "Nizampur", value: 6 },
// ]

// const warningsData = [
//   { name: "Amarpur Jorasi", value: 48 },
//   { name: "Ateli", value: 50 },
//   { name: "Dabla", value: 83 },
//   { name: "Narnaul", value: 100 },
//   { name: "Nizampur", value: 66 },
// ]

// const maintenanceData = [{ name: "Dabla", value: 1 }]

// const COLORS_ALERTS = ["#F87171", "#FBBF24", "#60A5FA", "#34D399", "#A78BFA"]
// const COLORS_WARNINGS = ["#F59E0B", "#FCD34D", "#60A5FA", "#34D399", "#C084FC"]

// const StatCard = ({ title, value, comparison, color, chartColor, data }) => (
//   <div
//     className={`${color} rounded-xl p-1 pl-3  flex-1 min-w-[180px] shadow-lg border border-white/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}
//   >
//     <p className="text-sm font-medium text-gray-700 mb-">{title}</p>
//     <h3 className="text-4xl font-bold text-gray-900 mb-">{value}</h3>
//     <div className="flex items-center justify-between">
//       <p className="text-xs text-gray-600  ">{comparison}</p>
//       <div className="w-24 h-10">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={data}>
//             <Area type="monotone" dataKey="value" stroke={chartColor} fill={chartColor} strokeWidth={2} />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   </div>
// )

// // RAG Report Data
// const ragReportData = [
//   { equipment: "Pump A", station: "Amarpur Jorasi", dueDate: "2025-10-20" },
//   { equipment: "Valve B", station: "Ateli", dueDate: "2025-10-18" },
//   { equipment: "Motor C", station: "Dabla", dueDate: "2025-10-22" },
//   { equipment: "Filter D", station: "Narnaul", dueDate: "2025-10-19" },
// ]

// // Alerts/Warnings Table Data
// const alertsWarningsData = [
//   {
//     station: "Amarpur Jorasi",
//     device: "Sensor-01",
//     parameter: "Temperature",
//     value: "45°C",
//     dateTime: "2025-10-16 10:30",
//   },
//   {
//     station: "Ateli",
//     device: "Sensor-02",
//     parameter: "Pressure",
//     value: "2.5 bar",
//     dateTime: "2025-10-16 11:15",
//   },
//   {
//     station: "Dabla",
//     device: "Sensor-03",
//     parameter: "Flow Rate",
//     value: "120 L/min",
//     dateTime: "2025-10-16 09:45",
//   },
// ]

// // Alerts / Acknowledged Line Chart Data
// const acknowledgedData = [
//   { name: "Amarpur", alert: 12, acknowledgements: 0 },
//   { name: "Ateli", alert: 5, acknowledgements: 0 },
//   { name: "Dabla", alert: 5, acknowledgements: 1 },
//   { name: "Narnaul", alert: 8, acknowledgements: 1 },
//   { name: "Nizampur", alert: 6, acknowledgements: 0 },
// ]

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br  from-[#F0FDF4] via-[#e2c99e] to-[#f0fdf4] p-8">
//       <div className="max-w-9xl mx-auto">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

//         {/* Stat Cards */}
//         <div className="flex gap-2 mb-8  rounded-xl overflow-x-auto pb-2">
//           <StatCard
//             title="Efficiency"
//             value="0"
//             comparison="Compared to last week (-0%)"
//             color="bg-gradient-to-r from-rose-100 to-orange-100"
//             chartColor="#EF4444"
//             data={chartData}
//           />
//           <StatCard
//             title="Total Stations"
//             value="1"
//             comparison="Compared to last week (0)"
//             color="bg-gradient-to-r from-blue-100 to-cyan-100"
//             chartColor="#3B82F6"
//             data={chartData}
//           />
//           <StatCard
//             title="Total Devices"
//             value="1"
//             comparison="Compared to last week (100%)"
//             color="bg-gradient-to-r from-green-100 to-emerald-100"
//             chartColor="#10B981"
//             data={chartData}
//           />
//           <StatCard
//             title="Total Alerts"
//             value="0"
//             comparison="Compared to last week (0)"
//             color="bg-gradient-to-r from-amber-100 to-yellow-100"
//             chartColor="#F59E0B"
//             data={chartData}
//           />
//           <StatCard
//             title="Total Warnings"
//             value="0"
//             comparison="Compared to last week (0)"
//             color="bg-gradient-to-r from-pink-100 to-fuchsia-100"
//             chartColor="#EC4899"
//             data={chartData}
//           />
//         </div>

//         {/* Map & Alerts */}
//         <div className="grid grid-cols-2 gap-6 mb-8">
//           {/* Map */}
//           <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-xl p-6 border border-gray-200 shadow-md">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Station Map</h2>
//               <button className="text-sm text-blue-600 hover:underline">View Map</button>
//             </div>
//             <div className="h-64 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
//               <img
//                 src="https://thumbs.dreamstime.com/z/flat-street-map-direction-gps-navigation-road-town-pins-simple-information-scheme-city-river-travel-plan-route-174351973.jpg"
//                 alt="Station Map"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </div>

//           {/* Alerts Table */}
//           <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 border border-gray-200 shadow-md">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Alerts / Warnings</h2>
//               <div className="flex gap-2">
//                 <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-600 transition">
//                   Alerts
//                 </button>
//                 <button className="bg-amber-400 text-white px-4 py-2 rounded text-sm font-medium hover:bg-amber-500 transition">
//                   Warnings
//                 </button>
//               </div>
//             </div>
//             <div className="overflow-x-auto rounded-lg">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="bg-white border-b border-gray-300">
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Station</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Device</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Parameter</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Value</th>
//                     <th className="text-left py-3 px-4 font-semibold text-gray-900">Date/Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {alertsWarningsData.map((item, index) => (
//                     <tr
//                       key={index}
//                       className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                         } hover:bg-gray-100 transition`}
//                     >
//                       <td className="py-3 px-4 text-gray-800">{item.station}</td>
//                       <td className="py-3 px-4 text-gray-800">{item.device}</td>
//                       <td className="py-3 px-4 text-gray-800">{item.parameter}</td>
//                       <td className="py-3 px-4 text-gray-800">{item.value}</td>
//                       <td className="py-3 px-4 text-gray-800">{item.dateTime}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-3 gap-6 mb-8">
//           {/* Alerts Pie */}
//           <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Total Counts Of Alerts</h3>
//             <div className="flex gap-6 justify-center">
//               <ResponsiveContainer width="50%" height={200}>
//                 <PieChart>
//                   <Pie data={alertsData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
//                     {alertsData.map((entry, index) => (
//                       <Cell key={index} fill={COLORS_ALERTS[index % COLORS_ALERTS.length]} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="flex flex-col justify-center gap-2 text-sm">
//                 {alertsData.map((item, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{ backgroundColor: COLORS_ALERTS[index % COLORS_ALERTS.length] }}
//                     />
//                     <span className="text-gray-700">
//                       {item.name}: {item.value}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Warnings Pie */}
//           <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Total Counts Of Warnings</h3>
//             <div className="flex gap-6 justify-center">
//               <ResponsiveContainer width="50%" height={200}>
//                 <PieChart>
//                   <Pie data={warningsData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
//                     {warningsData.map((entry, index) => (
//                       <Cell key={index} fill={COLORS_WARNINGS[index % COLORS_WARNINGS.length]} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="flex flex-col justify-center gap-2 text-sm">
//                 {warningsData.map((item, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{ backgroundColor: COLORS_WARNINGS[index % COLORS_WARNINGS.length] }}
//                     />
//                     <span className="text-gray-700">
//                       {item.name}: {item.value}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Maintenance Bar */}
//           <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-xl p-6 shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Device Maintenance Overdue</h3>
//             <ResponsiveContainer width="100%" height={200}>
//               <BarChart data={maintenanceData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#EF4444" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bottom Section: RAG Report + Active Users + Alerts Acknowledged */}
//         <div className="grid grid-cols-4 gap-6">
//           {/* RAG Report (2 columns wide) */}
//           <div className="bg-blue-50 rounded-xl p-6 border border-gray-200 shadow-md col-span-2">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">RAG Report</h3>
//             <div className="flex gap-2 mb-6 flex-wrap">
//               <button className="text-sm bg-red-500 text-white px-3 py-1 rounded">Past Due</button>
//               <button className="text-sm bg-gray-900 text-white px-3 py-1 rounded">Due Today</button>
//               <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded">7 Days</button>
//               <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded">15 Days</button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-gray-200 bg-white">
//                     <th className="text-left py-2 px-2 font-semibold text-gray-700">Equipment Name</th>
//                     <th className="text-left py-2 px-2 font-semibold text-gray-700">Station</th>
//                     <th className="text-left py-2 px-2 font-semibold text-gray-700">Due Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ragReportData.map((item, index) => (
//                     <tr key={index} className="border-b border-gray-100 hover:bg-gray-100">
//                       <td className="py-3 px-2 text-gray-700">{item.equipment}</td>
//                       <td className="py-3 px-2 text-gray-700">{item.station}</td>
//                       <td className="py-3 px-2 text-gray-700">{item.dueDate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Active Users */}
//           <div className="bg-green-50 rounded-xl p-6 border border-gray-200 shadow-md">
//             <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Users</h3>
//             <div className="flex flex-col items-center justify-center h-40">
//               <div className="relative w-32 h-32 flex items-center justify-center">
//                 <svg className="w-full h-full" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#d1fae5" strokeWidth="8" />
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="45"
//                     fill="none"
//                     stroke="#10B981"
//                     strokeWidth="8"
//                     strokeDasharray="141 188"
//                     strokeLinecap="round"
//                     transform="rotate(-90 50 50)"
//                   />
//                 </svg>
//                 <span className="absolute text-3xl font-bold text-green-500">9</span>
//               </div>
//               <p className="text-sm text-gray-600 mt-4">9 Active / 0 Inactive</p>
//             </div>
//           </div>

//           {/* Alerts Acknowledged */}
//           <div className="bg-amber-50 rounded-xl p-6 border border-gray-200 shadow-md">
//             <h3 className="text-lg font-semibold text-gray-900 mb-6">Alerts / Acknowledged</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={acknowledgedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="alert"
//                   stroke="#EF4444"
//                   strokeWidth={2}
//                   dot={{ fill: "#EF4444", r: 4 }}
//                   activeDot={{ r: 6 }}
//                   name="Alert"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="acknowledgements"
//                   stroke="#3B82F6"
//                   strokeWidth={2}
//                   dot={{ fill: "#3B82F6", r: 4 }}
//                   activeDot={{ r: 6 }}
//                   name="Acknowledgements"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const stats = {
  totalBooks: 1240,
  issued: 312,
  available: 928,
  students: 410
}

const monthly = [
  {name:'Jan', issued: 20},
  {name:'Feb', issued: 35},
  {name:'Mar', issued: 45},
  {name:'Apr', issued: 60},
  {name:'May', issued: 55},
  {name:'Jun', issued: 70},
  {name:'Jul', issued: 80},
  {name:'Aug', issued: 95},
  {name:'Sep', issued: 65},
  {name:'Oct', issued: 40},
  {name:'Nov', issued: 30},
  {name:'Dec', issued: 17}
]

export default function Dashboard(){
  return (
    <div className="space-y-6 p-10">
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
        <Card title="Total Books" value={stats.totalBooks}/>
        <Card title="Books Issued" value={stats.issued}/>
        <Card title="Available" value={stats.available}/>
        <Card title="Students" value={stats.students}/>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow-sm border">
          <h3 className="font-semibold mb-2">Books Issued — Monthly</h3>
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="issued" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm border">
          <h3 className="font-semibold mb-2">Availability</h3>
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{name:'Issued', value: stats.issued},{name:'Available', value: stats.available}]} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  <Cell key="c1" />
                  <Cell key="c2" />
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({title, value}){
  return (
    <div className="bg-white p-4 rounded shadow-sm border flex flex-col">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-2 text-sm text-gray-500">Static data — replace with API call when backend ready</div>
    </div>
  )
}
