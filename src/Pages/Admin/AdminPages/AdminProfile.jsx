
// import { useEffect, useState, useRef } from "react";
// import { User, Mail, Camera, Save, X, LogOut, Image as ImageIcon, CheckCircle2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function AdminProfile() {
//   const navigate = useNavigate();
  
//   // --- STATE MANAGEMENT ---
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     role: "",
//     bio: "",
//     avatar: null, // Stores URL from DB
//     banner: null  // Stores URL from DB
//   });

//   // Separate state for RAW FILES (for sending to backend)
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
//     const fetchAdminData = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         // Reuse the same 'me' endpoint. The backend knows this is an admin based on the token.
//         const response = await fetch("http://localhost:5000/api/auth/me", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUser({
//             name: data.user.name || "Admin User",
//             email: data.user.email || "",
//             role: data.user.role || "admin",
//             bio: data.user.bio || "",
//             avatar: data.user.avatar || null,
//             banner: data.user.banner || null
//           });
//         } else {
//           console.error("Failed to fetch admin data");
//           // navigate("/login"); // Optional: Redirect if token invalid
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchAdminData();
//   }, [navigate]);

//   // --- HANDLERS ---
  
//   // Handle File Selection (Preview + Storage)
//   const handleImageUpload = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       // 1. Create Preview URL
//       const previewUrl = URL.createObjectURL(file);
      
//       // 2. Update UI
//       setUser(prev => ({ ...prev, [field]: previewUrl }));
      
//       // 3. Store File for Upload
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
//       // 1. Prepare FormData
//       const formData = new FormData();
//       formData.append("name", user.name);
//       formData.append("bio", user.bio);
      
//       // Note: We don't send role/email usually as those are sensitive/read-only
      
//       // 2. Append Files ONLY if they exist
//       if (files.avatar) {
//         formData.append("avatar", files.avatar);
//       }
//       if (files.banner) {
//         formData.append("banner", files.banner);
//       }

//       // 3. Send Request
//       const response = await fetch("http://localhost:5000/api/auth/profile", {
//         method: "PUT",
//         headers: {
//           "Authorization": `Bearer ${token}`
//         },
//         body: formData
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Success
//         setModal({
//           isOpen: true,
//           type: "success",
//           title: "Profile Saved",
//           message: "Your changes have been updated successfully."
//         });

//         // Update State with clean data from server
//         setUser(prev => ({ ...prev, ...data.user }));
        
//         // Clear pending files
//         setFiles({ avatar: null, banner: null });

//         setTimeout(() => setModal(prev => ({ ...prev, isOpen: false })), 2000);
//       } else {
//         throw new Error(data.message || "Update failed");
//       }

//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalConfirm = () => {
//     if (modal.type === "remove-image") {
//       setUser(prev => ({ ...prev, avatar: null }));
//       setFiles(prev => ({ ...prev, avatar: null }));
//     } else if (modal.type === "remove-banner") {
//       setUser(prev => ({ ...prev, banner: null }));
//       setFiles(prev => ({ ...prev, banner: null }));
//     } else if (modal.type === "logout") {
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       localStorage.removeItem("adminProfile"); // Clean up old keys
//       navigate("/login");
//     }
//     setModal({ ...modal, isOpen: false });
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-4xl mx-auto"
//     >
//       {/* --- HEADER & ACTIONS --- */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
//            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account information and preferences.</p>
//         </div>
        
//         <div className="flex gap-3">
//             <button 
//               onClick={confirmLogout}
//               className="px-5 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/30 cursor-pointer transition hover:-translate-y-0.5 flex items-center gap-2 font-semibold"
//             >
//               <LogOut size={18} /> Logout
//             </button>
//             <button 
//               onClick={confirmSave}
//               disabled={loading}
//               className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition flex items-center gap-2 cursor-pointer disabled:opacity-70"
//             >
//               {loading ? "Saving..." : <><Save size={18} /> Save Changes</>}
//             </button>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
        
//         {/* --- BANNER SECTION --- */}
//         <div className="h-48 relative overflow-hidden group bg-gray-100 dark:bg-slate-900">
           
//            {user.banner ? (
//              <img 
//                src={user.banner} 
//                alt="Cover" 
//                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
//              />
//            ) : (
//              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//                 <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
//                 <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-orange-600/10 dark:bg-black/20 blur-3xl"></div>
//                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 dark:opacity-5 mix-blend-overlay"></div>
//                 <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/10 dark:from-slate-900 to-transparent"></div>
//              </div>
//            )}

//            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//               {user.banner && (
//                 <button 
//                   onClick={() => confirmRemoveImage('banner')}
//                   className="p-2 cursor-pointer bg-black/30 hover:bg-red-500/80 backdrop-blur-md text-white rounded-lg transition shadow-lg"
//                   title="Remove Banner"
//                 >
//                   <X size={16} />
//                 </button>
//               )}
//               <button 
//                 onClick={() => bannerInputRef.current.click()}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-lg transition text-xs font-bold shadow-lg cursor-pointer"
//               >
//                 <ImageIcon size={14} /> {user.banner ? "Change Cover" : "Upload Cover"}
//               </button>
//            </div>
           
//            <input 
//              type="file" 
//              ref={bannerInputRef} 
//              onChange={(e) => handleImageUpload(e, 'banner')} 
//              className="hidden" 
//              accept="image/*"
//            />
//         </div>

//         <div className="px-8 pb-10 relative bg-gradient-to-t from-amber-100/90 dark:from-slate-800/90 to-transparent">
//           <div className="flex flex-col md:flex-row items-end md:items-center -mt-20 mb-8 gap-6 ">
            
//             {/* --- AVATAR SECTION --- */}
//             <div className="relative group">
//               <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-2xl relative overflow-hidden">
//                  {user.avatar ? (
//                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
//                  ) : (
//                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center text-5xl font-bold text-amber-500 dark:text-slate-400">
//                         {user.name ? user.name.charAt(0).toUpperCase() : "A"}
//                      </div>
//                  )}
                 
//                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 ">
//                     <button 
//                        onClick={() => fileInputRef.current.click()}
//                        className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition transform hover:scale-110 cursor-pointer"
//                        title="Change Photo"
//                     >
//                        <Camera size={20} />
//                     </button>
//                  </div>
//               </div>
              
//               {user.avatar && (
//                   <button 
//                     onClick={() => confirmRemoveImage('avatar')}
//                     className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 hover:bg-red-600 z-20 cursor-pointer"
//                     title="Remove Photo"
//                   >
//                     <X size={14} />
//                   </button>
//               )}

//               <input 
//                  type="file" 
//                  ref={fileInputRef} 
//                  onChange={(e) => handleImageUpload(e, 'avatar')} 
//                  className="hidden" 
//                  accept="image/*"
//               />
//             </div>

//             {/* User Details */}
//             <div className="flex-1 mb-2 pt-14 md:pt-0 text-center mt-20  md:text-left">
//               <h2 className="text-3xl font-bold  text-gray-600 dark:text-gray-400">{user.name}</h2>
//               <div className="flex flex-col md:flex-row items-center gap-3 text-gray-600 dark:text-gray-400 mt-2 justify-center md:justify-start">
//                 <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
//                    {user.role}
//                 </span>
//                 <span className="text-sm flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
//               </div>
//             </div>
//           </div>

//           {/* --- EDIT FORM --- */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
//             <div className="md:col-span-1 space-y-6" >
//                <div className="bg-orange-100 dark:bg-slate-900/50 p-6 rounded-2xl shadow-md border-gray-100 dark:border-slate-700">
//                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
//                       <div className="relative">
//                         <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                         <input 
//                           type="text" 
//                           value={user.name} 
//                           onChange={(e) => setUser({...user, name: e.target.value})}
//                           className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email (Read Only)</label>
//                       <div className="relative">
//                         <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                         <input 
//                           type="email" 
//                           value={user.email} 
//                           readOnly
//                           className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-500 cursor-not-allowed"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                </div>
//             </div>

//             <div className="md:col-span-2">
//                <div className="bg-orange-100 dark:bg-slate-900/50 p-6 rounded-2xl border shadow-md border-gray-100 dark:border-slate-700 h-full">
//                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">About Me</h3>
//                   <textarea 
//                       rows="4"
//                       value={user.bio}
//                       onChange={(e) => setUser({...user, bio: e.target.value})}
//                       placeholder="Write a short bio about yourself..."
//                       className="w-full p-4 bg-white dark:bg-slate-800 border border-amber-500 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white resize-none h-[calc(100%-2rem)]"
//                   />
//                </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* --- CUSTOM POPUP (MODAL) --- */}
//       <AnimatePresence>
//         {modal.isOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, y: 20 }} 
//               animate={{ scale: 1, y: 0 }} 
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
//             >
//               <div className={`p-6 flex flex-col items-center text-center ${modal.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-slate-800'}`}>
//                  {modal.type === 'success' && <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={32} /></div>}
//                  {modal.type === 'logout' && <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><LogOut size={32} /></div>}
                 
//                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{modal.title}</h3>
//                  <p className="text-gray-500 dark:text-gray-400 text-sm">{modal.message}</p>
//               </div>

//               {modal.type !== 'success' && (
//                 <div className="p-4 bg-gray-50 dark:bg-slate-900/50 flex gap-3">
//                   <button 
//                     onClick={() => setModal({ ...modal, isOpen: false })}
//                     className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={handleModalConfirm}
//                     className={`flex-1 py-2.5 rounded-xl cursor-pointer text-white font-bold shadow-lg transition ${
//                       modal.type === 'logout' ? 'bg-red-600 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'
//                     }`}
//                   >
//                     Confirm
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import { User, Mail, Save, LogOut, Image as ImageIcon, CheckCircle2, AlertCircle, MoreHorizontal, Trash2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
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
    const fetchAdminData = async () => {
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
            name: data.user.name || "Admin User",
            email: data.user.email || "",
            role: data.user.role || "admin",
            bio: data.user.bio || "",
            avatar: data.user.avatar || null,
            banner: data.user.banner || null
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAdminData();
  }, [navigate]);

  // --- HANDLERS ---
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUser(prev => ({ ...prev, [field]: previewUrl }));
      setFiles(prev => ({ ...prev, [field]: file }));
      if (field === 'avatar') setAvatarMenuOpen(false); // Close menu after selection
    }
  };

  const confirmRemoveImage = (type) => {
    setAvatarMenuOpen(false); // Close menu
    setModal({
      isOpen: true,
      type: type === 'banner' ? "remove-banner" : "remove-image",
      title: type === 'banner' ? "Remove Cover Image?" : "Remove Profile Picture?",
      message: "Are you sure you want to revert to the default image? This cannot be undone."
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

  const confirmSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("bio", user.bio);
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
      localStorage.clear();
      navigate("/login");
    }
    setModal({ ...modal, isOpen: false });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account information.</p>
        </div>
        <div className="flex gap-3">
            <button onClick={confirmLogout} className="px-5 py-2 rounded-xl border border-red-200 cursor-pointer text-red-600 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/30 transition flex items-center gap-2 font-semibold">
              <LogOut size={18} /> Logout
            </button>
            <button onClick={confirmSave} disabled={loading} className="px-6 py-2 cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-orange-500/30 transition flex items-center gap-2 disabled:opacity-70">
              {loading ? "Saving..." : <><Save size={18} /> Save Changes</>}
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
        
        {/* BANNER */}
        <div className="h-48 relative overflow-hidden group bg-gray-100 dark:bg-slate-900">
           {user.banner ? (
             <img src={user.banner} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 dark:opacity-5 mix-blend-overlay"></div>
             </div>
           )}
           <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {user.banner && (
                <button onClick={() => confirmRemoveImage('banner')} className="p-2 cursor-pointer bg-black/30 hover:bg-red-500/80 backdrop-blur-md text-white rounded-lg transition shadow-lg">
                  <Trash2 size={16} />
                </button>
              )}
              <button onClick={() => bannerInputRef.current.click()} className="flex items-center gap-2 px-3 py-1.5 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-lg transition text-xs font-bold shadow-lg cursor-pointer">
                <ImageIcon size={14} /> {user.banner ? "Change Cover" : "Upload Cover"}
              </button>
           </div>
           <input type="file" ref={bannerInputRef} onChange={(e) => handleImageUpload(e, 'banner')} className="hidden" accept="image/*" />
        </div>

        <div className="px-8 pb-10 relative bg-gradient-to-t from-amber-100/90 dark:from-slate-800/90 to-transparent">
          <div className="flex flex-col md:flex-row items-end md:items-center -mt-20 mb-8 gap-6 ">
            
            {/* --- UPDATED PROFILE PHOTO SECTION --- */}
            <div 
              className="relative group z-20"
              onMouseLeave={() => setAvatarMenuOpen(false)} // Optional: Close menu if mouse leaves area
            >
              <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-2xl relative overflow-hidden">
                 {/* Avatar Image or Placeholder */}
                 {user.avatar ? (
                     <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                 ) : (
                     <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center text-5xl font-bold text-amber-500 dark:text-slate-400">
                        {user.name ? user.name.charAt(0).toUpperCase() : "A"}
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
                           className="flex items-center cursor-pointer justify-center gap-2 w-full py-1.5 text-xs font-bold bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition shadow-lg"
                         >
                           <Upload size={14} /> Update
                         </button>
                         
                         {user.avatar && (
                           <button 
                             onClick={() => confirmRemoveImage('avatar')}
                             className="flex items-center cursor-pointer justify-center gap-2 w-full py-1.5 text-xs font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg"
                           >
                             <Trash2 size={14} /> Remove
                           </button>
                         )}
                         
                         {/* Back button (optional, to close menu) */}
                         <button onClick={() => setAvatarMenuOpen(false)} className="text-[10px] text-gray-300 cursor-pointer hover:text-white underline mt-1">
                            Cancel
                         </button>
                      </div>
                    )}
                 </div>
              </div>

              {/* Hidden File Input */}
              <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e, 'avatar')} className="hidden" accept="image/*" />
            </div>

            {/* User Details */}
            <div className="flex-1 mb-2 pt-14 md:pt-0 text-center mt-20  md:text-left">
              <h2 className="text-3xl font-bold  text-gray-600 dark:text-gray-400">{user.name}</h2>
              <div className="flex flex-col md:flex-row items-center gap-3 text-gray-600 dark:text-gray-400 mt-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
                   {user.role}
                </span>
                <span className="text-sm flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
              </div>
            </div>
          </div>

          {/* FORM FIELDS (Unchanged) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6" >
               <div className="bg-orange-100 dark:bg-slate-900/50 p-6 rounded-2xl shadow-md border-gray-100 dark:border-slate-700">
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
               <div className="bg-orange-100 dark:bg-slate-900/50 p-6 rounded-2xl border shadow-md border-gray-100 dark:border-slate-700 h-full">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">About Me</h3>
                  <textarea rows="4" value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} placeholder="Write a short bio about yourself..." className="w-full p-4 bg-white dark:bg-slate-800 border border-amber-500 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition dark:text-white resize-none h-[calc(100%-2rem)]" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL (Same as before) */}
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
                <div className="p-3 bg-gray-50 dark:bg-slate-900/50"><button onClick={() => setModal({ ...modal, isOpen: false })} className="w-full py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition">Close</button></div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}