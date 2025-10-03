import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

function BooksList() {
  const navigate = useNavigate();
  const { id } = useParams(); // get category number from route

  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const booksList = {
    1: [
      { title: "Cheese Burger", img: "https://img.freepik.com/free-photo/classic-cheese-burger-with-beef-cutlet-vegetables-onions-isolated-white-background_123827-29709.jpg?semt=ais_hybrid&w=740&q=80", desc: "Juicy beef patty with melted cheese, fresh lettuce, and sauces." },
      { title: "French Fries", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt8lCFiXLokm_zxL9pDOzt3qWCslRXBR8Zg&s", desc: "Crispy golden fries with a pinch of salt." },
      { title: "Spring Roll", img: "https://redhousespice.com/wp-content/uploads/2021/12/whole-spring-rolls-and-halved-ones-scaled.jpg", desc: "Crunchy rolls stuffed with veggies and spices." },
      { title: "Hot Dog", img: "https://www.licious.in/blog/wp-content/uploads/2016/07/Hot-Dogs.jpg", desc: "Sausage in a soft bun with mustard and ketchup." },
      { title: "Donuts", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIh-cqS6LsrlWeFRiWulZq4L3BqaIJg6BPA&s", desc: "Sweet, fluffy donuts glazed with sugar." },
      { title: "Fried Chicken", img: "https://t3.ftcdn.net/jpg/06/10/82/10/360_F_610821014_f7Jm2AO7taNJwEIlNDTxCkb4s4thrZlu.jpg", desc: "Crispy, golden-brown fried chicken with juicy meat." },
      { title: "Cold Drinks", img: "https://images.herzindagi.info/image/2022/May/cold-drink-hacks-to-know.jpg", desc: "Refreshing fizzy drinks served chilled." },
      { title: "Shake", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNXzDrWXZgnTge-Ejhf2S9NRKj_wN-0TtTFQ&s", desc: "Thick milkshake with creamy flavor." }
    ],
    2: [
      { title: "Cheese Burger", img: "https://img.freepik.com/free-photo/classic-cheese-burger-with-beef-cutlet-vegetables-onions-isolated-white-background_123827-29709.jpg?semt=ais_hybrid&w=740&q=80", desc: "Juicy beef patty with melted cheese, fresh lettuce, and sauces." },
      { title: "French Fries", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt8lCFiXLokm_zxL9pDOzt3qWCslRXBR8Zg&s", desc: "Crispy golden fries with a pinch of salt." },
      { title: "Spring Roll", img: "https://redhousespice.com/wp-content/uploads/2021/12/whole-spring-rolls-and-halved-ones-scaled.jpg", desc: "Crunchy rolls stuffed with veggies and spices." },
      { title: "Hot Dog", img: "https://www.licious.in/blog/wp-content/uploads/2016/07/Hot-Dogs.jpg", desc: "Sausage in a soft bun with mustard and ketchup." },
      { title: "Donuts", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIh-cqS6LsrlWeFRiWulZq4L3BqaIJg6BPA&s", desc: "Sweet, fluffy donuts glazed with sugar." },
      { title: "Fried Chicken", img: "https://t3.ftcdn.net/jpg/06/10/82/10/360_F_610821014_f7Jm2AO7taNJwEIlNDTxCkb4s4thrZlu.jpg", desc: "Crispy, golden-brown fried chicken with juicy meat." },
      { title: "Cold Drinks", img: "https://images.herzindagi.info/image/2022/May/cold-drink-hacks-to-know.jpg", desc: "Refreshing fizzy drinks served chilled." },
      { title: "Shake", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNXzDrWXZgnTge-Ejhf2S9NRKj_wN-0TtTFQ&s", desc: "Thick milkshake with creamy flavor." }
    ]
  };

  const books = booksList[id] || [];

  // A-Z letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // filtered by search + letter
  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.desc.toLowerCase().includes(search.toLowerCase());

    const matchLetter = selectedLetter
      ? book.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
      : true;

    return matchSearch && matchLetter;
  });

  return (
    <div className="p-7 pt-6 bg-amber-100 min-h-screen">
      {/* Header + view toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-800">
          Books in Category {id}
        </div>
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

      {/* Search */}
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
                : "bg-gray-300 cursor-pointer hover:bg-amber-300 transition duration-300 ease-in-out transform hover:scale-110"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Grid view */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-4 gap-9 justify-items-center text-center items-center">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => (
              <div
                key={item.title}
                className="bg-white p-4 rounded-lg shadow-md w-[300px] cursor-pointer 
                border border-transparent transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-amber-200/50"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-44 object-cover rounded-md"
                />
                <h2 className="text-2xl mt-4 font-bold">{item.title}</h2>
                <p className="text-gray-600 mt-2 h-12">{item.desc}</p>
                <div className="w-full flex justify-center mt-4">
                  <button
                    onClick={() => navigate("/books")}
                    className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-amber-500 transition-all border cursor-pointer"
                  >
                    Back to Categories
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books found for this category.</p>
          )}
        </div>
      ) : (
        // List view
        <div className="space-y-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => (
              <div
                key={item.title}
                className="flex items-center bg-white p-4 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-102 hover:border-gray-400"
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
                  onClick={() => navigate("/books")}
                  className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-4 py-2 rounded-md hover:from-orange-500 hover:to-amber-500 transition-all border cursor-pointer"
                >
                  Back
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BooksList;
