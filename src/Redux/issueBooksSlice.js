// import { createSlice } from "@reduxjs/toolkit";

// const issueBooksSlice = createSlice({
//   name: "issueBooks",
//   initialState: {
//     books: [],
//   },
//   reducers: {
//     addBook: (state, action) => {
//       const exists = state.books.find((b) => b.id === action.payload.id);
//       if (!exists) {
//         state.books.push(action.payload);
//       }
//     },
//     removeBook: (state, action) => {
//       state.books = state.books.filter((b) => b.id !== action.payload);
//     },
//     clearAll: (state) => {
//       state.books = [];
//     },
//   },
// });

// export const { addBook, removeBook, clearAll } = issueBooksSlice.actions;

// export default issueBooksSlice.reducer;


// issueBooksSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const issueBooksSlice = createSlice({
//   name: "issueBooks",
//   initialState: {
//     books: [],        // For books added to "Buy" cart
//     rentedBooks: [],  // For books issued via the "Rent" form
//   },
//   reducers: {
//     // --- Existing logic for "Buy" ---
//     addBook: (state, action) => {
//       const exists = state.books.find((b) => b.id === action.payload.id);
//       if (!exists) {
//         state.books.push(action.payload);
//       }
//     },

//     removeBook: (state, action) => {
//       state.books = state.books.filter((b) => b.id !== action.payload);
//     },

//     clearAll: (state) => {
//       state.books = [];
//     },

//     // --- NEW Logic for "Rent" (Issue Form) ---
//     addRentedBook: (state, action) => {
//       state.rentedBooks.push(action.payload);
//     },

//     // ❗❗ ADD THIS (for delete button) ──────────────
//     removeRentedBook: (state, action) => {
//       state.rentedBooks = state.rentedBooks.filter(
//         (item) => item.id !== action.payload
//       );
//     },

//     clearRentedBooks: (state) => {
//       state.rentedBooks = [];
//     },
//   },
// });

// // Export ALL actions including the new one
// export const { 
//   addBook,
//   removeBook,
//   clearAll,
//   addRentedBook,
//   removeRentedBook,   // 👈 MUST EXPORT THIS
//   clearRentedBooks
// } = issueBooksSlice.actions;

// export default issueBooksSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const issueBooksSlice = createSlice({
  name: "issueBooks",
  initialState: {
    books: [],        
    rentedBooks: [],  
  },
  reducers: {
    addBook: (state, action) => {
      const exists = state.books.find((b) => b.id === action.payload.id);
      if (!exists) {
        state.books.push(action.payload);
      }
    },
    removeBook: (state, action) => {
      state.books = state.books.filter((b) => b.id !== action.payload);
    },
    clearAll: (state) => {
      state.books = [];
    },
    addRentedBook: (state, action) => {
      state.rentedBooks.push(action.payload);
    },
    removeRentedBook: (state, action) => {
      state.rentedBooks = state.rentedBooks.filter(
        (item) => item.id !== action.payload
      );
    },
    clearRentedBooks: (state) => {
      state.rentedBooks = [];
    },
  },
});

export const { 
  addBook,
  removeBook,
  clearAll,
  addRentedBook,
  removeRentedBook, 
  clearRentedBooks
} = issueBooksSlice.actions;

export default issueBooksSlice.reducer;