import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

function Books() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const categories = [
    {
      id: uuidv4(),
      img: "https://fivebooks.com/images/brjfwPAq69-IDEX2/plain/fb/2022/11/fiction-books-category-share-image.jpg",
      title: "Fiction",
      desc: "Explore imaginative narratives and stories .",
      categorieNumber: 1
    },
    {
      id: uuidv4(),
      img: "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs3/383529886/original/f50501b38d0f444b321dd5487a02a66184f09305.png",
      title: "Brave",
      desc: "Exciting adventures and bold stories.",
      categorieNumber: 2
    },
    {
      id: uuidv4(),
      img: "https://thumbs.dreamstime.com/b/hand-drawn-mathematics-formulas-chalkboard-background-banner-book-cover-etc-education-industry-67217924.jpg",
      title: "Math",
      desc: "Books full of numbers and formulas.",
        categorieNumber: 3
    },
    {
      id: uuidv4(),
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkHVGvQHNJe_3pCVW1_AMkwV9IIiC-3d2ACRxhCfR8iBXzkKk5LWbZP0BR_gskjbcrZs&usqp=CAU",
      title: "Animal Farm",
      desc: "The rise and fall of a rebellion that mirrors human society.",
      categorieNumber: 4
    },
    {
      id: uuidv4(),
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylzvW1jxbfqNvrWC39FKsdue7ttaMhwjCkA&s",
      title: "History books",
      desc: "Connections between past events and contemporary society.",
      categorieNumber: 5
      
    },
{
      id: uuidv4(),
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fea9c0119666285.60a2b5b9ebea0.jpg",
      title: "Food Recipes",
      desc: "A variety of recipes for breakfast, lunch, dinner, and snacks.",
      categorieNumber: 6
    },
    {
      id: uuidv4(),
      img: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg",
      title: "Philosophy",
      desc: "Books full of numbers and formulas.",
        categorieNumber: 7
    },
    {
      id: uuidv4(),
      img: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg",
      title: "Business & Finance",
      desc: "Books full of numbers and formulas.",
        categorieNumber: 8
    }
  ];

  // filter logic (title + description)
  const filteredBooks = categories.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.desc.toLowerCase().includes(search.toLowerCase());

    const matchLetter = selectedLetter
      ? book.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
      : true;

    return matchSearch && matchLetter;
  });

  // alphabet letters A–Z
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="p-7 pt-6 bg-amber-100 min-h-screen">
      {/* Header with toggle icons */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-800">Book Categories</div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid" ? "bg-amber-400 text-white" : "bg-white cursor-pointer" 
            }`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-amber-400 text-white" : "bg-white cursor-pointer"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Alphabet filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() =>
              setSelectedLetter(selectedLetter === letter ? "" : letter)
            }
            className={`px-3 py-1 rounded ${
              selectedLetter === letter
                ? "bg-amber-500 text-white"
                : "bg-gray-300 cursor-pointer hover:bg-amber-300 transition duration-300 ease-in-out transform hover:scale-125 p-4 rounded-lg shadow-md" 
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Grid or List rendering */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-4 gap-9 justify-items-center text-center items-center">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md w-[300px] cursor-pointer 
            border border-transparent  
            transition duration-300 ease-in-out 
            transform hover:scale-105 "
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-92 h-44 object-cover rounded-md"
                />
                <h2 className="text-2xl   mt-4 font-bold">{item.title}</h2>
                <p className="text-gray-600 h-12  mt-2">{item.desc}</p>
                <div className="w-full flex justify-center mt-4">
                  <button
                    onClick={() => navigate(`/categories/${item.categorieNumber}`)}
                    className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-amber-500 transition-all border cursor-pointer"
                  >
                    View Books
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books found</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:border-gray-400 transition duration-300 ease-in-out transform hover:scale-102 "
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                <button
                  onClick={() => navigate(`/categories/${item.categorieNumber}`)}
                  className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-amber-500 transition-all border cursor-pointer"
                >
                  View Books
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Books;
