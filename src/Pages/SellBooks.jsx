import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../Components/blurBackground";
import { BookOpen, Upload, IndianRupee, X, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SellBooks() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", author: "", price: "", condition: "", description: "", upi: "",
  });

  const [images, setImages] = useState([]); // Stores Base64 strings
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- HELPER: Convert Image to Base64 String ---
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Convert all selected files to Base64
    const base64Images = await Promise.all(files.map(file => convertToBase64(file)));

    // Limit to 4 images total
    setImages(prev => [...prev, ...base64Images].slice(0, 4));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. ADD DATA TO FIREBASE
      await addDoc(collection(db, "sellRequests"), {
        title: form.title,
        author: form.author,
        price: form.price,
        condition: form.condition,
        upi: form.upi,       // <--- Sending UPI
        images: images,      // <--- Sending Images Array (Fixed)
        status: "pending",
        createdAt: new Date()
      });

      // 2. SHOW SUCCESS
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);

      // 3. RESET FORM
      setForm({ title: "", author: "", price: "", condition: "", description: "", upi: "" });
      setImages([]);

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving data. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 relative overflow-hidden
                    bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Modern Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="fixed top-8 right-8 bg-white/10 dark:bg-slate-800/80 backdrop-blur-xl
                       border-l-4 border-amber-400 shadow-2xl p-4 rounded-2xl
                       z-50 flex items-center gap-4 text-white"
          >
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
              <CheckCircle2 className="text-amber-600 dark:text-amber-400 w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-white">Success!</p>
              <p className="text-sm text-gray-500 dark:text-slate-300">Your book is being reviewed.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row transition-colors"
      >
        {/* Left Side: Aesthetic Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-br from-amber-500 to-orange-600 dark:from-slate-800 dark:to-slate-700 p-10 text-white flex flex-col justify-between">
          <div>
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <BookOpen className="w-6 h-6" />
            </div>

            <h2 className="text-4xl font-bold leading-tight">Share the <br />Joy of Reading.</h2>
            <p className="mt-4 text-amber-50 dark:text-slate-200 opacity-90 leading-relaxed">
              Give your Book a second life and earn money easily.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/books")} 
              className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-400 text-sm md:text-base font-medium rounded-xl mt-5 shadow hover:shadow-md transition-all cursor-pointer border dark:border-slate-600"
            >
              <ArrowLeft size={16} />
              Back
            </motion.button>
          </div>
          <div className="hidden md:block">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-amber-500 dark:border-slate-600 bg-amber-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-amber-100">Joined by 2k+ readers this week</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 block ml-1">Book Title</label>
                <input
                  type="text" name="title" placeholder="e.g. Harry Potter"
                  value={form.title} onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 transition-all outline-none text-gray-700 dark:text-slate-200"
                  required
                />
              </div>
              <div className="group">
                <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 block ml-1">Author</label>
                <input
                  type="text" name="author" placeholder="e.g. J.K. Rowling"
                  value={form.author} onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 transition-all outline-none text-gray-700 dark:text-slate-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 block ml-1">Price</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                  <input
                    type="number" name="price" placeholder="0.00"
                    value={form.price} onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 transition-all outline-none text-gray-700 dark:text-slate-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 block ml-1">Condition</label>
                <select
                  name="condition" value={form.condition} onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 transition-all outline-none text-gray-700 dark:text-slate-200 appearance-none"
                  required
                >
                  <option value="" className="dark:bg-slate-900">Select Condition</option>
                  <option value="New" className="dark:bg-slate-900">New (Unopened)</option>
                  <option value="Good" className="dark:bg-slate-900">Good (Lightly Used)</option>
                  <option value="Used" className="dark:bg-slate-900">Used (Readable)</option>
                </select>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="relative group">
              <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 group-hover:border-amber-400 dark:group-hover:border-amber-500 rounded-3xl p-8 transition-all bg-gray-50/50 dark:bg-slate-800/30">
                <input
                  type="file" accept="image/*" multiple onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="p-4 bg-white dark:bg-slate-700 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-amber-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                    Drop images here or <span className="text-amber-600 dark:text-amber-500">browse</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">Up to 4 high-quality photos</p>
                </div>
              </div>

              {/* Enhanced Image Previews */}
              <AnimatePresence>
                {images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex flex-wrap gap-4 justify-center"
                  >
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-slate-700"
                      >
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button" 
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full backdrop-blur-sm hover:bg-red-600 transition-colors cursor-pointer z-20"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 block ml-1">UPI ID for Payment</label>
              <input
                type="text" name="upi" placeholder="username@upi"
                value={form.upi} onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500 transition-all outline-none text-gray-700 dark:text-slate-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-slate-900 cursor-pointer font-bold text-lg shadow-xl hover:bg-amber-600 dark:hover:bg-amber-500 hover:shadow-amber-200 dark:hover:text-white transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : <><Sparkles className="w-5 h-5" /> List Book for Sale</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}