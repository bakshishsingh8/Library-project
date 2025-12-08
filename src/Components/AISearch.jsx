import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAIBooks } from "../Redux/aiSlace.js";

function AISearch() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.ai);

  const handleSearch = () => {
    if (query.trim().length > 0) {
      dispatch(fetchAIBooks(query));
    }
  };

  return (
    <div style={{ padding: 20 }} className=" items-center ml-60"> 
      <input
        type="text"
        placeholder="Search books using AI..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: 10,
          width: "60%",
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          marginLeft: 10,
          padding: "10px 20px",
        }}
      >
        Search
      </button>

      {loading && <p>🔄 Searching online...</p>}

      <div style={{ marginTop: 20 }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <h3>{book.title}</h3>
            <p>{book.desc}</p>
            <p>₹{book.price}</p>
            <img src={book.img} alt="" width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AISearch;
