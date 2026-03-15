import { useEffect, useState, useRef } from "react";
import { User, Mail, Camera, Save, LogOut, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";
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
    banner: null // Added banner state
  });

  // Modal State
  const [modal, setModal] = useState({ 
    isOpen: false, 
    type: "", // 'logout', 'remove-image', 'remove-banner', 'success'
    title: "", 
    message: "" 
  });

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null); // Added ref for banner input

  // --- 1. DATA FETCHING ---
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("user") || "{}");

    if (!authData.email) {
      navigate("/login");
      return;
    }

    const savedProfile = JSON.parse(localStorage.getItem("adminProfile") || "{}");

    let finalState = {
      name: authData.name || "Admin User",
      email: authData.email || "",
      role: authData.role || "admin",
      bio: "",
      avatar: null,
      banner: null
    };

    // Merge saved data only if emails match
    if (savedProfile.email === finalState.email) {
      finalState = { ...finalState, ...savedProfile };
    } 

    setUser(finalState);
  }, [navigate]);

  // --- HANDLERS ---
  
  // Generic Image Uploader (handles both Avatar and Banner)
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger Modal Functions
  const confirmRemoveImage = (type) => {
    setModal({
      isOpen: true,
      type: type === 'avatar' ? "remove-image" : "remove-banner",
      title: type === 'avatar' ? "Remove Profile Picture?" : "Remove Cover Image?",
      message: "Are you sure you want to revert to the default?"
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

  const confirmSave = () => {
    localStorage.setItem("adminProfile", JSON.stringify(user));
    setModal({
      isOpen: true,
      type: "success",
      title: "Changes Saved",
      message: "Your profile has been updated successfully."
    });
    setTimeout(() => setModal(prev => ({ ...prev, isOpen: false })), 2000);
  };

  const handleModalConfirm = () => {
    if (modal.type === "remove-image") {
      setUser(prev => ({ ...prev, avatar: null }));
    } else if (modal.type === "remove-banner") {
      setUser(prev => ({ ...prev, banner: null }));
    } else if (modal.type === "logout") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
    setModal({ ...modal, isOpen: false });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      {/* --- PROFESSIONAL HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-gray-200 dark:border-slate-700 pb-6">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your public profile and preferences.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={confirmLogout}
              className="flex-1 md:flex-none justify-center px-4 py-2.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors flex items-center gap-2 font-medium text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
            <button 
              onClick={confirmSave}
              className="flex-1 md:flex-none justify-center px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/10 transition-all active:scale-95 flex items-center gap-2 text-sm"
            >
              <Save size={16} /> Save Changes
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">
        
        {/* --- BANNER SECTION --- */}
        <div className="h-60 relative group w-full bg-slate-100 dark:bg-slate-900">
           {/* If banner exists, show image. If not, show gradient */}
           {user.banner ? (
             <img src={user.banner} alt="Banner" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
             </div>
           )}

           {/* Banner Overlay Controls (Glassmorphism) */}
           <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {user.banner && (
                <button 
                  onClick={() => confirmRemoveImage('banner')}
                  className="p-2 bg-black/30 hover:bg-red-500/80 backdrop-blur-md text-white rounded-lg transition"
                  title="Remove Banner"
                >
                  <X size={18} />
                </button>
              )}
              <button 
                onClick={() => bannerInputRef.current.click()}
                className="flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-lg transition text-sm font-medium"
              >
                <ImageIcon size={16} /> {user.banner ? "Change Cover" : "Upload Cover"}
              </button>
           </div>
           
           {/* Hidden Input for Banner */}
           <input 
             type="file" 
             ref={bannerInputRef} 
             onChange={(e) => handleImageUpload(e, 'banner')} 
             className="hidden" 
             accept="image/*"
           />
        </div>

        {/* --- PROFILE CONTENT --- */}
        <div className="px-8 pb-10">
          <div className="relative flex flex-col md:flex-row items-start -mt-16 mb-8 gap-6">
            
            {/* AVATAR */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-xl relative overflow-hidden">
                 {user.avatar ? (
                     <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                 ) : (
                     <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-4xl font-bold text-slate-400">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                     </div>
                 )}
                 
                 {/* Avatar Hover Actions */}
                 <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                       onClick={() => avatarInputRef.current.click()}
                       className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition"
                    >
                       <Camera size={20} />
                    </button>
                    {user.avatar && (
                      <button 
                        onClick={() => confirmRemoveImage('avatar')}
                        className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition"
                      >
                        <X size={16} />
                      </button>
                    )}
                 </div>
              </div>
              <input type="file" ref={avatarInputRef} onChange={(e) => handleImageUpload(e, 'avatar')} className="hidden" accept="image/*" />
            </div>

            {/* HEADER TEXT */}
            <div className="flex-1 pt-16 md:pt-16">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 mt-1">
                      {user.role} <span className="w-1 h-1 rounded-full bg-slate-300"></span> {user.email}
                    </p>
                 </div>
               </div>
            </div>
          </div>

          {/* --- EDIT FORM --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Details */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Display Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    value={user.name} 
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    value={user.email} 
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg text-slate-500 cursor-not-allowed font-medium"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Email cannot be changed by admin.</p>
              </div>
            </div>

            {/* Right Column: Bio */}
            <div className="lg:col-span-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Biography</label>
              <textarea 
                  rows="6"
                  value={user.bio}
                  onChange={(e) => setUser({...user, bio: e.target.value})}
                  placeholder="Tell us a little about yourself..."
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition dark:text-white resize-none leading-relaxed"
               />
               <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                  <span>Markdown not supported</span>
                  <span>{user.bio ? user.bio.length : 0} chars</span>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- UNIFIED MODAL --- */}
      <AnimatePresence>
        {modal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-100 dark:border-slate-700"
            >
              <div className={`p-8 flex flex-col items-center text-center`}>
                 {modal.type === 'success' ? (
                   <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={32} /></div>
                 ) : (
                   <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                      {modal.type.includes('remove') ? <ImageIcon size={32} /> : <LogOut size={32} />}
                   </div>
                 )}
                 
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{modal.title}</h3>
                 <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{modal.message}</p>
              </div>

              {modal.type !== 'success' && (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex gap-3 border-t border-slate-100 dark:border-slate-700">
                  <button 
                    onClick={() => setModal({ ...modal, isOpen: false })}
                    className="flex-1 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleModalConfirm}
                    className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-500/20 transition"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}