// import { useEffect, useState, useRef } from "react";
// import { User, Mail, Camera, Save, X, LogOut, Image as ImageIcon, CheckCircle2, MapPin, ArrowLeft } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function UserProfile() {
//   const navigate = useNavigate();
  
//   // --- STATE MANAGEMENT ---
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     role: "",
//     bio: "",
//     location: "", 
//     avatar: null,
//     banner: null
//   });

//   // Modal State
//   const [modal, setModal] = useState({ 
//     isOpen: false, 
//     type: "", 
//     title: "", 
//     message: "" 
//   });

//   const fileInputRef = useRef(null);   
//   const bannerInputRef = useRef(null); 

//   // --- 1. SMART DATA FETCHING ---
//   useEffect(() => {
//     const authData = JSON.parse(localStorage.getItem("user") || "{}");

//     if (!authData.email) {
//       // In a real app, you might uncomment this
//       // navigate("/login");
//       // return;
//     }

//     const savedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

//     let finalState = {
//       name: authData.name || "User",
//       email: authData.email || "user@example.com",
//       role: authData.role || "User",
//       bio: "",
//       location: "",
//       avatar: null,
//       banner: null
//     };

//     if (savedProfile.email === finalState.email) {
//       finalState = { ...finalState, ...savedProfile };
//     } 

//     setUser(finalState);
//   }, [navigate]);

//   // --- HANDLERS ---
//   const handleImageUpload = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUser(prev => ({ ...prev, [field]: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const confirmRemoveImage = (type) => {
//     setModal({
//       isOpen: true,
//       type: type === 'banner' ? "remove-banner" : "remove-image",
//       title: type === 'banner' ? "Remove Cover Image?" : "Remove Profile Picture?",
//       message: "Are you sure you want to revert to the default?"
//     });
//   };

//   const confirmLogout = () => {
//     setModal({
//       isOpen: true,
//       type: "logout",
//       title: "Confirm Logout",
//       message: "You will be returned to the login screen."
//     });
//   };

//   const confirmSave = () => {
//     localStorage.setItem("userProfile", JSON.stringify(user));
//     setModal({
//       isOpen: true,
//       type: "success",
//       title: "Profile Saved",
//       message: "Your changes have been updated successfully."
//     });
//     setTimeout(() => setModal(prev => ({ ...prev, isOpen: false })), 2000);
//   };

//   const handleModalConfirm = () => {
//     if (modal.type === "remove-image") {
//       setUser(prev => ({ ...prev, avatar: null }));
//     } else if (modal.type === "remove-banner") {
//       setUser(prev => ({ ...prev, banner: null }));
//     } else if (modal.type === "logout") {
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       navigate("/login");
//     }
//     setModal({ ...modal, isOpen: false });
//   };

//   return (
//     // MAIN WRAPPER: Matches the screenshot background color (Warm Cream/Light Orange)
//     <div className="min-h-screen bg-[#FFF9EE] dark:bg-slate-900 pb-10">
      
//       {/* --- NEW HEADER: Matches Screenshot Format --- */}
//       <div className="bg-gradient-to-r from-orange-400 to-amber-400 dark:from-slate-800 dark:to-slate-900 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
//         <div className="flex items-center gap-3 ">
//             {/* Icon Box */}
//             <div className="p-2  rounded-lg text-amber-500 bg-white">
//                 <User size={20} /> 
//             </div>
//             <h1 className="text-xl font-bold text-white tracking-wide">My Profile</h1>
//         </div>

//         {/* Back Button matching screenshot */}
//         {/* <button 
//             onClick={() => navigate(-1)}
//             className="bg-white text-orange-500 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 transition active:scale-95"
//         >
//             <ArrowLeft size={16} /> Back
//         </button> */}

//         {/* Actions Bar (Moved inside content area) */}
//         <div className="flex justify-end gap-4">
//             <button 
//               onClick={confirmLogout}
//               className="px-5 py-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex items-center gap-2 font-semibold text-sm"
//             >
//               <LogOut size={16} /> Logout
//             </button>
//             <button 
//               onClick={confirmSave}
//               className="px-6 py-2 rounded-xl g-white dark:bg-gradient-to-r from-amber-500 to-orange-500 bg-white text-amber-700 dark:text-white font-bold shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer text-sm"
//             >
//               <Save size={16} /> Save Changes
//             </button>
//         </div>
//       </div>

//       {/* --- CONTENT AREA --- */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto mt-8 px-4"
//       >
//         {/* Actions Bar (Moved inside content area) */}
//         {/* <div className="flex justify-end gap-3 mb-6">
//             <button 
//               onClick={confirmLogout}
//               className="px-5 py-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex items-center gap-2 font-semibold text-sm"
//             >
//               <LogOut size={16} /> Logout
//             </button>
//             <button 
//               onClick={confirmSave}
//               className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer text-sm"
//             >
//               <Save size={16} /> Save Changes
//             </button>
//         </div> */}

//         <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-orange-100 dark:border-slate-700">
          
//           {/* --- BANNER SECTION --- */}
//           <div className="h-48 relative overflow-hidden group bg-gray-100 dark:bg-slate-900">
//              {user.banner ? (
//                <img 
//                  src={user.banner} 
//                  alt="Cover" 
//                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
//                />
//              ) : (
//                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//                   <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
//                   <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-orange-600/10 dark:bg-black/20 blur-3xl"></div>
//                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 dark:opacity-5 mix-blend-overlay"></div>
//                   <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/10 dark:from-slate-900 to-transparent"></div>
//                </div>
//              )}

//              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                 {user.banner && (
//                   <button 
//                     onClick={() => confirmRemoveImage('banner')}
//                     className="p-2 bg-black/30 hover:bg-red-500/80 backdrop-blur-md text-white rounded-lg transition shadow-lg cursor-pointer"
//                     title="Remove Banner"
//                   >
//                     <X size={16} />
//                   </button>
//                 )}
//                 <button 
//                   onClick={() => bannerInputRef.current.click()}
//                   className="flex items-center gap-2 px-3 py-1.5 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-lg transition text-xs font-bold shadow-lg cursor-pointer"
//                 >
//                   <ImageIcon size={14} /> {user.banner ? "Change Cover" : "Upload Cover"}
//                 </button>
//              </div>
             
//              <input 
//                type="file" 
//                ref={bannerInputRef} 
//                onChange={(e) => handleImageUpload(e, 'banner')} 
//                className="hidden" 
//                accept="image/*"
//              />
//           </div>

//           <div className="px-8 pb-10 relative bg-gradient-to-t from-amber-50/50 dark:from-slate-800/90 to-transparent">
//             <div className="flex flex-col md:flex-row items-end md:items-center -mt-20 mb-8 gap-6 ">
              
//               {/* --- AVATAR SECTION --- */}
//               <div className="relative group">
//                 <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-2xl relative overflow-hidden">
//                    {user.avatar ? (
//                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
//                    ) : (
//                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center text-5xl font-bold text-amber-500 dark:text-slate-400">
//                           {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//                        </div>
//                    )}
                   
//                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 ">
//                       <button 
//                          onClick={() => fileInputRef.current.click()}
//                          className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition transform hover:scale-110"
//                          title="Change Photo"
//                       >
//                          <Camera size={20} />
//                       </button>
//                    </div>
//                 </div>
                
//                 {user.avatar && (
//                     <button 
//                       onClick={() => confirmRemoveImage('avatar')}
//                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 hover:bg-red-600 z-20"
//                       title="Remove Photo"
//                     >
//                       <X size={14} />
//                     </button>
//                 )}

//                 <input 
//                    type="file" 
//                    ref={fileInputRef} 
//                    onChange={(e) => handleImageUpload(e, 'avatar')} 
//                    className="hidden" 
//                    accept="image/*"
//                 />
//               </div>

//               {/* User Details */}
//               <div className="flex-1 mb-2 pt-14 md:pt-0 text-center mt-20 md:text-left">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h2>
//                 <div className="flex flex-col md:flex-row items-center gap-3 text-gray-600 dark:text-gray-400 mt-2 justify-center md:justify-start">
//                   <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
//                      {user.role}
//                   </span>
//                   <span className="text-sm flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
//                   {user.location && <span className="text-sm flex items-center gap-1.5"><MapPin size={14} /> {user.location}</span>}
//                 </div>
//               </div>
//             </div>

//             {/* --- EDIT FORM --- */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
//               <div className="md:col-span-1 space-y-6" >
//                  <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-700">
//                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
                    
//                     <div className="space-y-4">
//                       <div>
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
//                         <div className="relative">
//                           <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                           <input 
//                             type="text" 
//                             value={user.name} 
//                             onChange={(e) => setUser({...user, name: e.target.value})}
//                             className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white"
//                           />
//                         </div>
//                       </div>

//                       {/* <div>
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Location</label>
//                         <div className="relative">
//                           <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                           <input 
//                             type="text" 
//                             value={user.location} 
//                             onChange={(e) => setUser({...user, location: e.target.value})}
//                             placeholder="City, Country"
//                             className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white"
//                           />
//                         </div>
//                       </div> */}

//                       <div>
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email (Read Only)</label>
//                         <div className="relative">
//                           <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                           <input 
//                             type="email" 
//                             value={user.email} 
//                             readOnly
//                             className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-500 cursor-not-allowed"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                  </div>
//               </div>

//               <div className="md:col-span-2">
//                  <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl border shadow-sm border-orange-100 dark:border-slate-700 h-full">
//                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">About Me</h3>
//                     <textarea 
//                         rows="4"
//                         value={user.bio}
//                         onChange={(e) => setUser({...user, bio: e.target.value})}
//                         placeholder="Write a short bio about yourself..."
//                         className="w-full p-4 bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white resize-none h-[calc(100%-2rem)]"
//                     />
//                  </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* --- CUSTOM POPUP (MODAL) --- */}
//         <AnimatePresence>
//           {modal.isOpen && (
//             <motion.div 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//             >
//               <motion.div 
//                 initial={{ scale: 0.9, y: 20 }} 
//                 animate={{ scale: 1, y: 0 }} 
//                 exit={{ scale: 0.9, y: 20 }}
//                 className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
//               >
//                 <div className={`p-6 flex flex-col items-center text-center ${modal.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-slate-800'}`}>
//                    {modal.type === 'remove-image' && <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4"><Camera size={32} /></div>}
//                    {modal.type === 'remove-banner' && <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4"><ImageIcon size={32} /></div>}
//                    {modal.type === 'logout' && <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><LogOut size={32} /></div>}
//                    {modal.type === 'success' && <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={32} /></div>}
                   
//                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{modal.title}</h3>
//                    <p className="text-gray-500 dark:text-gray-400 text-sm">{modal.message}</p>
//                 </div>

//                 {modal.type !== 'success' && (
//                   <div className="p-4 bg-gray-50 dark:bg-slate-900/50 flex gap-3">
//                     <button 
//                       onClick={() => setModal({ ...modal, isOpen: false })}
//                       className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
//                     >
//                       Cancel
//                     </button>
//                     <button 
//                       onClick={handleModalConfirm}
//                       className={`flex-1 py-2.5 rounded-xl cursor-pointer text-white font-bold shadow-lg transition ${
//                         modal.type === 'logout' ? 'bg-red-600 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'
//                       }`}
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }


// import { useEffect, useState, useRef } from "react";
// import { User, Mail, Camera, Save, X, LogOut, Image as ImageIcon, CheckCircle2, MapPin } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function UserProfile() {
//   const navigate = useNavigate();
  
//   // --- STATE MANAGEMENT ---
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     role: "",
//     bio: "",
//     location: "", 
//     avatar: null, // Stores the URL (string)
//     banner: null  // Stores the URL (string)
//   });

//   // Separate state for the RAW FILES (for uploading)
//   const [files, setFiles] = useState({
//     avatar: null,
//     banner: null
//   });

//   const [loading, setLoading] = useState(false);

//   // Modal State
//   const [modal, setModal] = useState({ 
//     isOpen: false, 
//     type: "", 
//     title: "", 
//     message: "" 
//   });

//   const fileInputRef = useRef(null);   
//   const bannerInputRef = useRef(null); 

//   // --- 1. DATA FETCHING (FROM BACKEND) ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       // Get token from where you stored it during login
//       const token = localStorage.getItem("authToken"); // OR localStorage.getItem("token")

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/auth/me", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUser({
//             name: data.user.name || "",
//             email: data.user.email || "",
//             role: data.user.role || "User",
//             bio: data.user.bio || "",
//             location: data.user.location || "",
//             avatar: data.user.avatar || null,
//             banner: data.user.banner || null
//           });
//         } else {
//           console.error("Failed to fetch user:", data.message);
//           // Optional: navigate('/login') if token is invalid
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   // --- HANDLERS ---
  
//   // Handle File Selection
//   const handleImageUpload = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       // 1. Create a fake local URL just for previewing immediately
//       const previewUrl = URL.createObjectURL(file);
      
//       // 2. Update the UI with the preview
//       setUser(prev => ({ ...prev, [field]: previewUrl }));
      
//       // 3. Store the ACTUAL FILE for uploading later
//       setFiles(prev => ({ ...prev, [field]: file }));
//     }
//   };

//   const confirmRemoveImage = (type) => {
//     setModal({
//       isOpen: true,
//       type: type === 'banner' ? "remove-banner" : "remove-image",
//       title: type === 'banner' ? "Remove Cover Image?" : "Remove Profile Picture?",
//       message: "Are you sure you want to revert to the default?"
//     });
//   };

//   const confirmLogout = () => {
//     setModal({
//       isOpen: true,
//       type: "logout",
//       title: "Confirm Logout",
//       message: "You will be returned to the login screen."
//     });
//   };

//   // --- SAVE TO BACKEND ---
//   const confirmSave = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("authToken");

//     try {
//       // 1. Prepare FormData (Required for files)
//       const formData = new FormData();
//       formData.append("name", user.name);
//       formData.append("bio", user.bio);
//       formData.append("location", user.location);

//       // Only append files if the user actually chose a new one
//       if (files.avatar) {
//         formData.append("avatar", files.avatar);
//       }
//       if (files.banner) {
//         formData.append("banner", files.banner);
//       }

//       // 2. Send Request
//       const response = await fetch("http://localhost:5000/api/auth/profile", {
//         method: "PUT",
//         headers: {
//           "Authorization": `Bearer ${token}`
//           // NOTE: Do NOT set "Content-Type": "application/json" here. 
//           // The browser sets the correct boundary for FormData automatically.
//         },
//         body: formData
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Success!
//         setModal({
//           isOpen: true,
//           type: "success",
//           title: "Profile Saved",
//           message: "Your changes have been updated successfully."
//         });
        
//         // Update user state with the CLEAN data from server (ensures URLs are correct)
//         setUser(prev => ({ ...prev, ...data.user }));
        
//         // Clear pending files
//         setFiles({ avatar: null, banner: null });

//         setTimeout(() => setModal(prev => ({ ...prev, isOpen: false })), 2000);
//       } else {
//         throw new Error(data.message || "Update failed");
//       }

//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalConfirm = () => {
//     if (modal.type === "remove-image") {
//         setUser(prev => ({ ...prev, avatar: null }));
//         setFiles(prev => ({ ...prev, avatar: null })); // Clear file if removed
//     } else if (modal.type === "remove-banner") {
//         setUser(prev => ({ ...prev, banner: null }));
//         setFiles(prev => ({ ...prev, banner: null })); // Clear file if removed
//     } else if (modal.type === "logout") {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("user");
//         navigate("/login");
//     }
//     setModal({ ...modal, isOpen: false });
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF9EE] dark:bg-slate-900 pb-10">
      
//       {/* Header */}
//       <div className="bg-gradient-to-r from-orange-400 to-amber-400 dark:from-slate-800 dark:to-slate-900 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
//         <div className="flex items-center gap-3 ">
//             <div className="p-2 rounded-lg text-amber-500 bg-white">
//                 <User size={20} /> 
//             </div>
//             <h1 className="text-xl font-bold text-white tracking-wide">My Profile</h1>
//         </div>

//         <div className="flex justify-end gap-4">
//             <button 
//               onClick={confirmLogout}
//               className="px-5 py-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex items-center gap-2 font-semibold text-sm"
//             >
//               <LogOut size={16} /> Logout
//             </button>
//             <button 
//               onClick={confirmSave}
//               disabled={loading}
//               className="px-6 py-2 rounded-xl bg-white dark:bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 dark:text-white font-bold shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer text-sm disabled:opacity-70"
//             >
//               {loading ? "Saving..." : <><Save size={16} /> Save Changes</>}
//             </button>
//         </div>
//       </div>

//       {/* Content */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto mt-8 px-4"
//       >
//         <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-orange-100 dark:border-slate-700">
          
//           {/* BANNER SECTION */}
//           <div className="h-48 relative overflow-hidden group bg-gray-100 dark:bg-slate-900">
//              {user.banner ? (
//                <img 
//                  src={user.banner} 
//                  alt="Cover" 
//                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
//                />
//              ) : (
//                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//                   <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
//                   <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-orange-600/10 dark:bg-black/20 blur-3xl"></div>
//                </div>
//              )}

//              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                 {user.banner && (
//                   <button 
//                     onClick={() => confirmRemoveImage('banner')}
//                     className="p-2 bg-black/30 hover:bg-red-500/80 backdrop-blur-md text-white rounded-lg transition shadow-lg cursor-pointer"
//                   >
//                     <X size={16} />
//                   </button>
//                 )}
//                 <button 
//                   onClick={() => bannerInputRef.current.click()}
//                   className="flex items-center gap-2 px-3 py-1.5 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-lg transition text-xs font-bold shadow-lg cursor-pointer"
//                 >
//                   <ImageIcon size={14} /> {user.banner ? "Change Cover" : "Upload Cover"}
//                 </button>
//              </div>
             
//              <input 
//                type="file" 
//                ref={bannerInputRef} 
//                onChange={(e) => handleImageUpload(e, 'banner')} 
//                className="hidden" 
//                accept="image/*"
//              />
//           </div>

//           <div className="px-8 pb-10 relative bg-gradient-to-t from-amber-50/50 dark:from-slate-800/90 to-transparent">
//             <div className="flex flex-col md:flex-row items-end md:items-center -mt-20 mb-8 gap-6 ">
              
//               {/* AVATAR SECTION */}
//               <div className="relative group">
//                 <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-2xl relative overflow-hidden">
//                    {user.avatar ? (
//                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
//                    ) : (
//                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center text-5xl font-bold text-amber-500 dark:text-slate-400">
//                           {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//                        </div>
//                    )}
                   
//                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 ">
//                       <button 
//                          onClick={() => fileInputRef.current.click()}
//                          className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition transform hover:scale-110"
//                       >
//                          <Camera size={20} />
//                       </button>
//                    </div>
//                 </div>
                
//                 <input 
//                    type="file" 
//                    ref={fileInputRef} 
//                    onChange={(e) => handleImageUpload(e, 'avatar')} 
//                    className="hidden" 
//                    accept="image/*"
//                 />
//               </div>

//               {/* User Details */}
//               <div className="flex-1 mb-2 pt-14 md:pt-0 text-center mt-20 md:text-left">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h2>
//                 <div className="flex flex-col md:flex-row items-center gap-3 text-gray-600 dark:text-gray-400 mt-2 justify-center md:justify-start">
//                   <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
//                      {user.role}
//                   </span>
//                   <span className="text-sm flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
//                   {user.location && <span className="text-sm flex items-center gap-1.5"><MapPin size={14} /> {user.location}</span>}
//                 </div>
//               </div>
//             </div>

//             {/* FORM FIELDS */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="md:col-span-1 space-y-6" >
//                  <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-700">
//                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
//                         <div className="relative">
//                           <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                           <input 
//                             type="text" 
//                             value={user.name} 
//                             onChange={(e) => setUser({...user, name: e.target.value})}
//                             className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Location</label>
//                         <div className="relative">
//                           <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                           <input 
//                             type="text" 
//                             value={user.location} 
//                             onChange={(e) => setUser({...user, location: e.target.value})}
//                             placeholder="City, Country"
//                             className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email (Read Only)</label>
//                         <div className="relative">
//                           <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                           <input 
//                             type="email" 
//                             value={user.email} 
//                             readOnly
//                             className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-500 cursor-not-allowed"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                  </div>
//               </div>

//               <div className="md:col-span-2">
//                  <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl border shadow-sm border-orange-100 dark:border-slate-700 h-full">
//                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">About Me</h3>
//                     <textarea 
//                         rows="4"
//                         value={user.bio}
//                         onChange={(e) => setUser({...user, bio: e.target.value})}
//                         placeholder="Write a short bio about yourself..."
//                         className="w-full p-4 bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white resize-none h-[calc(100%-2rem)]"
//                     />
//                  </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- MODAL (Unchanged logic, kept for completion) --- */}
//         <AnimatePresence>
//           {modal.isOpen && (
//             <motion.div 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//             >
//               <motion.div 
//                 initial={{ scale: 0.9, y: 20 }} 
//                 animate={{ scale: 1, y: 0 }} 
//                 exit={{ scale: 0.9, y: 20 }}
//                 className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
//               >
//                 <div className={`p-6 flex flex-col items-center text-center ${modal.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-slate-800'}`}>
//                    {modal.type === 'success' && <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={32} /></div>}
//                    {modal.type === 'logout' && <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><LogOut size={32} /></div>}
//                    {/* Add other icons if needed */}
                   
//                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{modal.title}</h3>
//                    <p className="text-gray-500 dark:text-gray-400 text-sm">{modal.message}</p>
//                 </div>

//                 {modal.type !== 'success' && (
//                   <div className="p-4 bg-gray-50 dark:bg-slate-900/50 flex gap-3">
//                     <button 
//                       onClick={() => setModal({ ...modal, isOpen: false })}
//                       className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
//                     >
//                       Cancel
//                     </button>
//                     <button 
//                       onClick={handleModalConfirm}
//                       className={`flex-1 py-2.5 rounded-xl cursor-pointer text-white font-bold shadow-lg transition ${
//                         modal.type === 'logout' ? 'bg-red-600 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'
//                       }`}
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }



import { useEffect, useState, useRef } from "react";
import { User, Mail, Save, X, LogOut, Image as ImageIcon, CheckCircle2, MapPin, MoreHorizontal, Trash2, Upload, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    location: "", 
    avatar: null,
    banner: null
  });

  const [files, setFiles] = useState({
    avatar: null,
    banner: null
  });

  const [loading, setLoading] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false); // New state for avatar menu

  // Modal State
  const [modal, setModal] = useState({ 
    isOpen: false, 
    type: "", 
    title: "", 
    message: "" 
  });

  const fileInputRef = useRef(null);   
  const bannerInputRef = useRef(null); 

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.json();

        if (response.ok) {
          setUser({
            name: data.user.name || "",
            email: data.user.email || "",
            role: data.user.role || "User",
            bio: data.user.bio || "",
            location: data.user.location || "",
            avatar: data.user.avatar || null,
            banner: data.user.banner || null
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // --- HANDLERS ---
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUser(prev => ({ ...prev, [field]: previewUrl }));
      setFiles(prev => ({ ...prev, [field]: file }));
      
      // Close menu if avatar was updated
      if (field === 'avatar') setAvatarMenuOpen(false);
    }
  };

  const confirmRemoveImage = (type) => {
    setAvatarMenuOpen(false); // Close menu
    setModal({
      isOpen: true,
      type: type === 'banner' ? "remove-banner" : "remove-image",
      title: type === 'banner' ? "Remove Cover Image?" : "Remove Profile Picture?",
      message: "Are you sure you want to revert to the default? This cannot be undone."
    });
  };

  const confirmLogout = () => {
    setModal({
      isOpen: true,
      type: "logout",
      title: "Confirm Logout",
      message: "You will be returned to the login screen."
    });
  };

  // --- SAVE TO BACKEND ---
  const confirmSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("bio", user.bio);
      formData.append("location", user.location);

      if (files.avatar) formData.append("avatar", files.avatar);
      if (files.banner) formData.append("banner", files.banner);

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setModal({
          isOpen: true,
          type: "success",
          title: "Profile Saved",
          message: "Your changes have been updated successfully."
        });
        
        setUser(prev => ({ ...prev, ...data.user }));
        setFiles({ avatar: null, banner: null });
        setTimeout(() => setModal(prev => ({ ...prev, isOpen: false })), 2000);
      } else {
        throw new Error(data.message || "Update failed");
      }

    } catch (error) {
      console.error("Save error:", error);
      // Using Modal for error instead of alert
      setModal({
        isOpen: true,
        type: "error",
        title: "Save Failed",
        message: "We couldn't save your profile. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = () => {
    if (modal.type === "remove-image") {
        setUser(prev => ({ ...prev, avatar: null }));
        setFiles(prev => ({ ...prev, avatar: null })); 
    } else if (modal.type === "remove-banner") {
        setUser(prev => ({ ...prev, banner: null }));
        setFiles(prev => ({ ...prev, banner: null })); 
    } else if (modal.type === "logout") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
    }
    setModal({ ...modal, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-[#FFF9EE] dark:bg-slate-900 pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-400 dark:from-slate-800 dark:to-slate-900 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3 ">
            <div className="p-2 rounded-lg text-amber-500 bg-white">
                <User size={20} /> 
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">My Profile</h1>
        </div>

        <div className="flex justify-end gap-4">
            <button 
              onClick={confirmLogout}
              className="px-5 py-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 shadow-sm cursor-pointer transition hover:-translate-y-0.5 flex items-center gap-2 font-semibold text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
            <button 
              onClick={confirmSave}
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-white dark:bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 dark:text-white font-bold shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer text-sm disabled:opacity-70"
            >
              {loading ? "Saving..." : <><Save size={16} /> Save Changes</>}
            </button>
        </div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-8 px-4"
      >
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-orange-100 dark:border-slate-700">
          
          {/* BANNER SECTION */}
          <div className="h-48 relative overflow-hidden group bg-gray-100 dark:bg-slate-900">
             {user.banner ? (
               <img src={user.banner} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
             ) : (
               <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-orange-600/10 dark:bg-black/20 blur-3xl"></div>
               </div>
             )}

             <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {user.banner && (
                  <button 
                    onClick={() => confirmRemoveImage('banner')}
                    className="p-2 bg-black/30 hover:bg-red-500/80 backdrop-blur-md text-white rounded-lg transition shadow-lg cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button 
                  onClick={() => bannerInputRef.current.click()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-lg transition text-xs font-bold shadow-lg cursor-pointer"
                >
                  <ImageIcon size={14} /> {user.banner ? "Change Cover" : "Upload Cover"}
                </button>
             </div>
             
             <input type="file" ref={bannerInputRef} onChange={(e) => handleImageUpload(e, 'banner')} className="hidden" accept="image/*" />
          </div>

          <div className="px-8 pb-10 relative bg-gradient-to-t from-amber-50/50 dark:from-slate-800/90 to-transparent">
            <div className="flex flex-col md:flex-row items-end md:items-center -mt-20 mb-8 gap-6 ">
              
              {/* --- UPDATED PROFILE PHOTO SECTION (Same as Admin) --- */}
              <div 
                className="relative group z-20"
                onMouseLeave={() => setAvatarMenuOpen(false)}
              >
                <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-2xl relative overflow-hidden">
                   {user.avatar ? (
                       <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                   ) : (
                       <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center text-5xl font-bold text-amber-500 dark:text-slate-400">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                       </div>
                   )}
                   
                   {/* --- HOVER OVERLAY & MENU --- */}
                   <div className={`absolute inset-0 bg-black/50 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-[2px] rounded-full
                      ${avatarMenuOpen ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}
                   >
                      {!avatarMenuOpen ? (
                        /* 1. INITIAL STATE: Three Dots Button */
                        <button 
                           onClick={() => setAvatarMenuOpen(true)}
                           className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition transform hover:scale-110 cursor-pointer"
                           title="Edit Profile Photo"
                        >
                           <MoreHorizontal size={32} />
                        </button>
                      ) : (
                        /* 2. MENU STATE: Two Options */
                        <div className="flex flex-col gap-2 w-full px-6 animate-in fade-in zoom-in duration-200">
                           <button 
                             onClick={() => fileInputRef.current.click()}
                             className="flex items-center justify-center gap-2 w-full py-1.5 text-xs font-bold bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition shadow-lg cursor-pointer"
                           >
                             <Upload size={14} /> Update
                           </button>
                           
                           {user.avatar && (
                             <button 
                               onClick={() => confirmRemoveImage('avatar')}
                               className="flex items-center justify-center gap-2 w-full py-1.5 text-xs font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg cursor-pointer"
                             >
                               <Trash2 size={14} /> Remove
                             </button>
                           )}
                           
                           <button onClick={() => setAvatarMenuOpen(false)} className="text-[10px] cursor-pointer text-gray-300 hover:text-white underline mt-1">
                              Cancel
                           </button>
                        </div>
                      )}
                   </div>
                </div>

                <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e, 'avatar')} className="hidden" accept="image/*" />
              </div>

              {/* User Details */}
              <div className="flex-1 mb-2 pt-14 md:pt-0 text-center mt-20 md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h2>
                <div className="flex flex-col md:flex-row items-center gap-3 text-gray-600 dark:text-gray-400 mt-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
                     {user.role}
                  </span>
                  <span className="text-sm flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
                  {user.location && <span className="text-sm flex items-center gap-1.5"><MapPin size={14} /> {user.location}</span>}
                </div>
              </div>
            </div>

            {/* FORM FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-6" >
                 <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-700">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input type="text" value={user.location} onChange={(e) => setUser({...user, location: e.target.value})} placeholder="City, Country" className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email (Read Only)</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input type="email" value={user.email} readOnly className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-500 cursor-not-allowed" />
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="md:col-span-2">
                 <div className="bg-orange-50 dark:bg-slate-900/50 p-6 rounded-2xl border shadow-sm border-orange-100 dark:border-slate-700 h-full">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">About Me</h3>
                    <textarea rows="4" value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} placeholder="Write a short bio about yourself..." className="w-full p-4 bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white resize-none h-[calc(100%-2rem)]" />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MODAL --- */}
        <AnimatePresence>
          {modal.isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
                <div className={`p-6 flex flex-col items-center text-center ${modal.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : modal.type === 'error' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-slate-800'}`}>
                   {modal.type === 'success' && <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce"><CheckCircle2 size={32} /></div>}
                   {modal.type === 'error' && <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><AlertCircle size={32} /></div>}
                   {(modal.type.includes('remove') || modal.type === 'logout') && <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><LogOut size={32} /></div>}
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{modal.title}</h3>
                   <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{modal.message}</p>
                </div>

                {modal.type !== 'success' && modal.type !== 'error' ? (
                  <div className="p-4 bg-gray-50 dark:bg-slate-900/50 flex gap-3">
                    <button onClick={() => setModal({ ...modal, isOpen: false })} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer">Cancel</button>
                    <button onClick={handleModalConfirm} className="flex-1 py-2.5 rounded-xl cursor-pointer text-white font-bold shadow-lg transition bg-red-500 hover:bg-red-600">Confirm</button>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-slate-900/50"><button onClick={() => setModal({ ...modal, isOpen: false })} className="w-full py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition cursor-pointer">Close</button></div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}