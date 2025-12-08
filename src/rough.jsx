import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, MinusCircle } from "lucide-react";
import Header from "../Layout/header.jsx";
import { addBook, removeBook } from "../Redux/issueBooksSlice.js";

// Reuse animation variants for consistency with Books page
export const allBooksData = {
  1: [
    { id: "1.1", mainid: "1", title: "To Kill a Mockingbird – Harper Lee", img: "https://d3525k1ryd2155.cloudfront.net/h/112/127/1081127112.0.x.4.jpg", desc: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.", price: 200, },
    { id: "1.2", mainid: "1", title: "1984 – George Orwell", img: "https://www.eourmart.com/cdn/shop/products/51OiP9ZQ1tL.jpg?v=1639834548&width=1445", desc: "A chilling vision of a totalitarian future where Big Brother watches everyone.", price: 300, },
    ],
  2: [
    { id: "2.1", mainid: "2", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
    { id: "2.2", mainid: "2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
    ],
  3: [
    { id: "3.1", mainid: "3", title: "A History of the Sikhs – Khushwant Singh", img: "https://kitabhut.in/cdn/shop/files/IMG20240521100627.jpg?v=1716280390", desc: "A two-volume masterpiece tracing Sikh history from Guru Nanak’s time to post-independence India, offering deep insights into Sikh identity and evolution.", price: 230, },
    { id: "3.2", mainid: "3", title: "The Sikh Religion: Its Gurus, Sacred Writings and Authors – Max Arthur Macauliffe", img: "https://m.media-amazon.com/images/I/61iK+OF8jrL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A monumental six-volume work exploring the lives and teachings of the Sikh Gurus with historical detail and reverence.", price: 230, },
    ],
  4: [
    { id: "4.1", mainid: "4", title: "Sapiens: A Brief History of Humankind – Yuval Noah Harari", img: "https://static-01.shop.com.mm/p/7b87021301ba936ccf5e34b7a1e43015.jpg", desc: "A sweeping exploration of human evolution and how biology and history have defined societies, cultures, and economies.", price: 230, },
    { id: "4.2", mainid: "4", title: "Guns, Germs, and Steel – Jared Diamond", img: "https://www.bookxcess.com/cdn/shop/products/2202cdb1e2ab452c8ae9a1b07463d401.thumbnail.0000000000_1500x.jpg?v=1679986000", desc: "An award-winning study of how geography, agriculture, and environment shaped civilizations’ destinies across history.", price: 230, },
   ],
  5: [
    { id: "5.1", mainid: "5", title: "The Jungle Book – Rudyard Kipling", img: "https://shrihindpublications.in/wp-content/uploads/2025/05/Copy-of-THE-JUNGLE-BOOK.png", desc: "A timeless collection of stories about Mowgli, a boy raised by wolves, and his adventures among the animals of the jungle.", price: 230, },
    { id: "5.2", mainid: "5", title: "Tarka the Otter – Henry Williamson", img: "https://www.buyusedbooks.in/image/cache/books/new_model5/9780140366211-f-500x500.jpg", desc: "A beautifully written nature novel that follows the life, struggles, and triumphs of an otter in the wild English countryside.", price: 230, },
     ],
  6: [
    { id: "6.1", mainid: "6", title: "Salt, Fat, Acid, Heat – Samin Nosrat", img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FLifestyle%2F2019-09-cookbook-club-salt-fat-acid-heat%2FSalt-Fat-Acid-Heat_125", desc: "A revolutionary cookbook that teaches cooking through the four essential elements — salt, fat, acid, and heat — so you can cook confidently without relying on recipes.", price: 230, },
    { id: "6.2", mainid: "6", title: "The Food Lab: Better Home Cooking Through Science – J. Kenji López-Alt", img: "https://blog.thermoworks.com/wp-content/uploads/2015/10/food_lab_z_b-1.jpg", desc: "Explores the science of home cooking, helping you master techniques and understand the 'why' behind great dishes.", price: 230, },
    ],
  7: [
    { id: "7.1", mainid: "7", title: "The Republic – Plato", img: "https://www.planksip.org/content/images/2021/05/585260_Plato_The-Republic_112110.jpg", desc: "A foundational text of Western philosophy exploring justice, morality, and the ideal society.", price: 230, },
    { id: "7.2", mainid: "7", title: "Nicomachean Ethics – Aristotle", img: "https://cdn.thecollector.com/wp-content/uploads/2024/03/what-are-the-nicomachean-ethics.jpg", desc: "Aristotle’s classic work on virtue, character, and how to live a good life.", price: 230, },
     ],
  8: [
    { id: "8.1", mainid: "8", title: "Rich Dad Poor Dad – Robert T. Kiyosaki", img: "https://icrrd.com/public/media/01-11-2020-083226richdad-poor-dad.jpg", desc: "A personal finance classic that contrasts two perspectives on money — one focused on earning and one on building wealth.", price: 230, },
    { id: "8.2", mainid: "8", title: "The Intelligent Investor – Benjamin Graham", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/EB/QY/ND/147952517/the-intelligent-investor-by-benjamin-graham-warren-buffett-.jpeg", desc: "The definitive guide to value investing, teaching patience, discipline, and long-term financial thinking.", price: 230, },
     ],
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, y: -20 },
};

// ✅ FIX: Removed props destructuring here
function BooksList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const issueBooks = useSelector((state) => state.issueBooks.books);

  // ✅ FIX: Define State locally here
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const filterSectionRef = useRef(null);

  const categoryNames = {
    1: "Fiction",
    2: "Brave",
    3: "Sikhism",
    4: "History",
    5: "Animal Things",
    6: "Food Recipes",
    7: "Philosophy",
    8: "Business & Finance",
  };

  const categoryName = categoryNames[id] || "Books Category";
  const books = allBooksData[id] || [];

  const filteredBooks = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return books.filter((book) => {
      const matchSearch =
        q === "" ||
        book.title.toLowerCase().includes(q) ||
        (book.desc && book.desc.toLowerCase().includes(q));
      const matchLetter = selectedLetter
        ? book.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true;
      return matchSearch && matchLetter;
    });
  }, [books, search, selectedLetter]);

  const handleAddBook = (book) => {
    if (!issueBooks.find((b) => b.id === book.id)) {
      dispatch(addBook(book));
    }
  };

  const handleRemoveBook = (book) => {
    dispatch(removeBook(book.id));
  };

  const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);

  // ========================= RENDER =========================

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-6 md:px-12 lg:px-20 md:mt-[-70px] py-2 mt-[-170px] pb-23 md:pb-15"
    >
      {/* ✅ Global Header: Now props passed are real state setters */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        search={search}
        setSearch={setSearch}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        scrollToFilterRef={filterSectionRef}
        openPageFilter={() => setShowFilter(true)}
        issueBooks={issueBooks}
        setHeaderHeight={setHeaderHeight}
      />

      {/* Spacing for fixed header */}
      <div style={{ marginTop: headerHeight + 20 }} />

      {/* ✨ Animated Page Title */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl mb-10 font-bold text-gray-700 text-center md:text-left"
      >
        {categoryName}
      </motion.h1>

      {/* --- BOOK DISPLAY SECTION --- */}
      <AnimatePresence>
        {filteredBooks.length > 0 ? (
          viewMode === "grid" ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filteredBooks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{
                      scale: 1.03,
                      y: -5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="bg-white rounded-2xl shadow-md border border-amber-100 overflow-hidden cursor-pointer mt-2"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl"
                    />
                    <div className="p-4 flex flex-col justify-between ">
                      <h2 className="text-base sm:text-lg h-20 font-bold text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2 style={{ maxHeight: 80 }}">
                        {item.desc}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-amber-700 font-semibold text-lg">
                          ₹ {item.price}
                        </p>
                        {isAdded(item) ? (
                          <div className="flex gap-2">
                            <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-23 px-2 bg-green-500 shadow">
                              <Check size={16} /> Added
                            </button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveBook(item)}
                              className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform cursor-pointer"
                            >
                              <MinusCircle size={16} /> Remove
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddBook(item)}
                            className="w-40 py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow hover:scale-105 transition-transform"
                          >
                            <Plus size={16} /> Add
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            // --- LIST VIEW ---
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {filteredBooks.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full sm:w-32 h-20 object-cover rounded-xl"
                    />
                    <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                      <p className="text-amber-700 font-semibold text-lg mt-2">
                        ₹ {item.price}
                      </p>
                    </div>
                    <div className="ml-3 mt-3 sm:mt-0">
                      {isAdded(item) ? (
                        <div className="flex gap-2">
                          <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow">
                            <Check size={16} /> Added
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemoveBook(item)}
                            className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow"
                          >
                            <MinusCircle size={16} /> Remove
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{
                            scale: 1.07,
                            boxShadow: "0px 6px 15px rgba(255, 165, 0, 0.4)",
                          }}
                          whileTap={{
                            scale: 0.93,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          onClick={() => handleAddBook(item)}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 w-22 text-white font-medium px-2 py-2 rounded-xl cursor-pointer hover:from-amber-500 hover:to-orange-500 shadow-md"
                        >
                          <Plus size={18} />
                          Add
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )
        ) : (
          <motion.p
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center mt-10"
          >
            No books found.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default BooksList;