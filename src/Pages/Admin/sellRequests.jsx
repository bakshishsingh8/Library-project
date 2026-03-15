// import { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import {
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
//   addDoc,
// } from "firebase/firestore";
// import { CheckCircle2, X } from "lucide-react";

// export default function SellRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ---------------- FETCH REQUESTS ----------------
//   const fetchRequests = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, "sellRequests"));
//       const data = snapshot.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));
//       setRequests(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // ---------------- APPROVE ----------------
//   const approveRequest = async (req) => {
//     try {
//       if (req.status !== "pending") return;

//       await addDoc(collection(db, "books"), {
//         title: req.title,
//         author: req.author,
//         price: req.price,
//         condition: req.condition,
//         images: req.images || [],
//         status: "available",
//         createdAt: new Date(),
//       });

//       await updateDoc(doc(db, "sellRequests", req.id), {
//         status: "approved",
//       });

//       fetchRequests();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ---------------- REJECT (❗ THIS WAS MISSING) ----------------
//   const rejectRequest = async (id) => {
//     try {
//       await updateDoc(doc(db, "sellRequests", id), {
//         status: "rejected",
//       });
//       fetchRequests();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 dark:text-gray-200">
//       <h1 className="text-3xl font-bold mb-6">Sell Requests</h1>

//       {requests.map((req) => (
//         <div
//           key={req.id}
//           className="border rounded-xl p-4 mb-4 flex justify-between items-center"
//         >
//           <div>
//             <h2 className="font-semibold">Book Title: {req.title}</h2>
//             <p>Author: {req.author}</p>
//             <p>₹{req.price}</p>
//             <p>Status: {req.status}</p>
//           </div>

//           {req.status === "pending" && (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => approveRequest(req)}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 <CheckCircle2 size={16} />
//               </button>

//               <button
//                 onClick={() => rejectRequest(req.id)}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
// import { CheckCircle2, X, BookOpen, Clock, ImageOff, CreditCard } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function SellRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ---------------- FETCH REQUESTS ----------------
//   const fetchRequests = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, "sellRequests"));
//       const data = snapshot.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));
//       setRequests(data);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // ---------------- APPROVE ----------------
//   const approveRequest = async (req) => {
//     try {
//       if (req.status !== "pending") return;

//       // 1. Add to main books collection
//       await addDoc(collection(db, "books"), {
//         title: req.title,
//         author: req.author,
//         price: req.price,
//         condition: req.condition,
//         images: req.images || [],
//         status: "available",
//         createdAt: new Date(),
//       });

//       // 2. Update status in sellRequests
//       await updateDoc(doc(db, "sellRequests", req.id), { status: "approved" });

//       // 3. Update local state
//       setRequests((prev) => 
//         prev.map((item) => item.id === req.id ? { ...item, status: "approved" } : item)
//       );
      
//     } catch (error) {
//       console.error("Error approving:", error);
//     }
//   };

//   // ---------------- REJECT ----------------
//   const rejectRequest = async (id) => {
//     try {
//       await updateDoc(doc(db, "sellRequests", id), { status: "rejected" });
//       setRequests((prev) => 
//         prev.map((item) => item.id === id ? { ...item, status: "rejected" } : item)
//       );
//     } catch (error) {
//       console.error("Error rejecting:", error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "approved": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
//       case "rejected": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
//       default: return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
//     }
//   };

//   if (loading) return (
//     <div className="flex h-[50vh] items-center justify-center">
//       <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-6 max-w-7xl mx-auto"
//     >
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Sell Requests</h1>
//         <p className="text-slate-500 dark:text-slate-400 mt-1">Review and manage incoming book selling requests.</p>
//       </div>

//       {requests.length === 0 ? (
//         <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
//            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
//              <BookOpen size={32} />
//            </div>
//            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No requests found</h3>
//            <p className="text-slate-500 dark:text-slate-500">Wait for users to submit books for sale.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           <AnimatePresence>
//             {requests.map((req) => (
//               <motion.div
//                 key={req.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 whileHover={{ y: -5 }}
//                 className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
//               >
//                 {/* --- IMAGE AREA --- */}
//                 <div className="h-48 bg-slate-100 dark:bg-slate-900 relative group overflow-hidden">
//                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm z-10 ${getStatusColor(req.status)}`}>
//                       {req.status}
//                    </div>

//                    {req.images && req.images.length > 0 ? (
//                      <img 
//                        src={req.images[0]} 
//                        alt={req.title} 
//                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                      />
//                    ) : (
//                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
//                         <ImageOff size={32} className="mb-2 opacity-50"/>
//                         <span className="text-xs font-medium">No Image Provided</span>
//                      </div>
//                    )}
                   
//                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
//                       <p className="text-white font-bold text-lg">₹{req.price}</p>
//                    </div>
//                 </div>

//                 {/* --- CONTENT --- */}
//                 <div className="p-5 flex-1 flex flex-col">
//                   <div className="flex-1">
//                     <h2 className="font-bold text-slate-800 dark:text-white text-lg leading-tight mb-1 line-clamp-2" title={req.title}> Book Title : { req.title}</h2>
//                     <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Author : {req.author}</p>
                    
//                     {/* --- UPI ID ADDED HERE --- */}
//                     <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-3 font-mono bg-slate-100 dark:bg-slate-900 w-fit px-2 py-1 rounded">
//                        <CreditCard size={12} /> 
//                        <span className="truncate max-w-[200px]">UPI : {req.upi || "No UPI ID"}</span>
//                     </div>

//                     <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 mb-4 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
//                        <span className="font-semibold text-slate-700 dark:text-slate-300">Condition:</span> 
//                        <span className="capitalize">{req.condition || "N/A"}</span>
//                     </div>
//                   </div>

//                   {/* --- ACTIONS --- */}
//                   {req.status === "pending" ? (
//                     <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
//                       <button
//                         onClick={() => rejectRequest(req.id)}
//                         className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 transition font-semibold text-sm"
//                       >
//                         <X size={16} /> Reject
//                       </button>
//                       <button
//                         onClick={() => approveRequest(req)}
//                         className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-900 transition font-bold text-sm shadow-lg shadow-slate-200 dark:shadow-none"
//                       >
//                         <CheckCircle2 size={16} /> Approve
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
//                        {req.status === "approved" ? (
//                          <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center justify-center gap-2">
//                            <CheckCircle2 size={16}/> Processed
//                          </span>
//                        ) : (
//                          <span className="text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
//                            <Clock size={16}/> Closed
//                          </span>
//                        )}
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </motion.div>
//   );
// }




import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
// 1. ADD AlertTriangle TO IMPORTS
import { CheckCircle2, X, BookOpen, Clock, ImageOff, CreditCard, Search, Filter, IndianRupee, ChevronDown, Check, Trash2, Maximize2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SellRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- STATE FOR IMAGE PREVIEW & DELETE POPUP ---
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // Stores ID of item to delete

  // --- SEARCH & FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Title: A to Z", value: "alpha-asc" },
    { label: "Title: Z to A", value: "alpha-desc" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------- FETCH REQUESTS ----------------
  const fetchRequests = async () => {
    try {
      const snapshot = await getDocs(collection(db, "sellRequests"));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ---------------- ACTIONS ----------------
  const approveRequest = async (req) => {
    try {
      if (req.status !== "pending") return;

      await addDoc(collection(db, "books"), {
        title: req.title,
        author: req.author,
        price: req.price,
        condition: req.condition,
        images: req.images || [],
        status: "available",
        createdAt: new Date(),
      });

      await updateDoc(doc(db, "sellRequests", req.id), { status: "approved" });

      setRequests((prev) => 
        prev.map((item) => item.id === req.id ? { ...item, status: "approved" } : item)
      );
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await updateDoc(doc(db, "sellRequests", id), { status: "rejected" });
      setRequests((prev) => 
        prev.map((item) => item.id === id ? { ...item, status: "rejected" } : item)
      );
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  // ---------------- DELETE LOGIC ----------------
  // This function is called when the user confirms the action in the popup
  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteDoc(doc(db, "sellRequests", deleteId));
      setRequests((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null); // Close popup
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // ---------------- FILTER LOGIC ----------------
  const filteredRequests = requests
    .filter((req) => {
      const query = searchQuery.toLowerCase();
      return (
        req.title?.toLowerCase().includes(query) || 
        req.author?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price) - Number(b.price);
      if (sortBy === "price-high") return Number(b.price) - Number(a.price);
      if (sortBy === "alpha-asc") return a.title.localeCompare(b.title);
      if (sortBy === "alpha-desc") return b.title.localeCompare(a.title);
      return 0; 
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "rejected": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      default: return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
    }
  };

  if (loading) return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-7xl mx-auto"
      >
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Sell Requests</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Review and manage incoming book selling requests.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto ">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search requests..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition text-slate-700 dark:text-slate-200 shadow-sm text-sm"
                />
              </div>

              <div className="relative md:w-52" ref={dropdownRef}>
                <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full cursor-pointer flex items-center justify-between px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 transition text-slate-700 dark:text-slate-200 shadow-sm text-sm "
                >
                    <div className="flex items-center gap-2">
                      <Filter size={16} className="text-slate-400" />
                      <span className="truncate">{sortOptions.find(o => o.value === sortBy)?.label}</span>
                    </div>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {isSortOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
                      >
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center cursor-pointer justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition
                              ${sortBy === option.value ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 font-medium" : "text-slate-600 dark:text-slate-300"}
                            `}
                          >
                            {option.label}
                            {sortBy === option.value && <Check size={14} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
          </div>
        </div>

        {/* --- GRID --- */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <BookOpen size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No requests found</h3>
            <p className="text-slate-500 dark:text-slate-500">
              {searchQuery ? "Try adjusting your search terms." : "Wait for users to submit books for sale."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredRequests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group"
                >
                  {/* --- IMAGE --- */}
                  <div className="h-40 bg-slate-100 dark:bg-slate-900 relative overflow-hidden border-b border-slate-100 dark:border-slate-700">
                    
                    {/* Status Badge */}
                    <div className={`absolute top-2 right-2 px-2 py-0.5 z-2 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm  ${getStatusColor(req.status)}`}>
                        {req.status}
                    </div>

                    {/* DELETE BUTTON (Triggers Custom Popup) */}
                    <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(req.id); // OPEN DELETE POPUP
                        }}
                        title="Delete Request"
                        className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 dark:bg-black/50 text-red-500 hover:bg-red-500 hover:text-white backdrop-blur-sm border border-transparent hover:border-red-600 transition-all  shadow-sm z-2 cursor-pointer"
                    >
                        <Trash2 size={14} />
                    </button>

                    {/* Preview Icon */}
                    {req.images && req.images.length > 0 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage(req.images[0]);
                        }}
                        title="View Full Image"
                        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 backdrop-blur-sm transition-all z-2 shadow-sm cursor-pointer"
                      >
                        <Maximize2 size={14} />
                      </button>
                    )}

                    {req.images && req.images.length > 0 ? (
                      <img 
                        src={req.images[0]} 
                        alt={req.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                        onClick={() => setPreviewImage(req.images[0])}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <ImageOff size={24} className="mb-1 opacity-50"/>
                          <span className="text-[10px] font-medium">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* --- DETAILS --- */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="mb-3">
                        <h2 className="font-bold text-slate-800 dark:text-white text-base leading-tight mb-0.5 line-clamp-1" title={req.title}>
                          {req.title}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">Author: {req.author}</p>
                      </div>
                      
                      <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <CreditCard size={14} className="text-slate-400" /> 
                            <span className="truncate max-w-[200px] font-mono bg-slate-50 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700">UPI: {req.upi || "No UPI"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <CheckCircle2 size={14} className="text-slate-400" />
                            <span className="capitalize">Condition: {req.condition || "N/A"}</span>
                          </div>
                      </div>

                      <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30 flex items-center justify-between ">
                          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wide">Price</span>
                          <div className="flex items-center text-amber-700 dark:text-amber-400 font-bold text-base">
                            <IndianRupee size={14} className="mt-0.5" />
                            {req.price}
                          </div>
                      </div>
                    </div>

                    {/* --- BUTTONS --- */}
                    {req.status === "pending" ? (
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <button
                          onClick={() => rejectRequest(req.id)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 transition font-semibold text-xs"
                        >
                          <X size={14} /> Reject
                        </button>
                        <button
                          onClick={() => approveRequest(req)}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-white  bg-amber-500 hover:bg-amber-600 dark:text-slate-900 transition font-bold text-xs shadow-md shadow-slate-200 dark:shadow-none cursor-pointer"
                        >
                          <Check size={14} /> Approve
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-center">
                          {req.status === "approved" ? (
                            <span className="text-green-600 dark:text-green-400 text-xs font-bold flex items-center justify-center gap-1.5">
                              <CheckCircle2 size={14}/> Processed
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs font-bold flex items-center justify-center gap-1.5">
                              <Clock size={14}/> Closed
                            </span>
                          )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* --- CUSTOM DELETE CONFIRMATION POPUP --- */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
             <motion.div
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-slate-200 dark:border-slate-700"
             >
                <div className="flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-500">
                     <AlertTriangle size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Delete Request?</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                     Are you sure you want to delete this request permanently? This action cannot be undone.
                   </p>
                   
                   <div className="flex gap-3 w-full">
                      <button 
                        onClick={() => setDeleteId(null)}
                        className=" cursor-pointer flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={confirmDelete}
                        className=" cursor-pointer flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none transition"
                      >
                        Delete
                      </button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- IMAGE PREVIEW MODAL --- */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 cursor-pointer hover:bg-white/20 text-white rounded-full transition"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={previewImage}
              alt="Full size"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}