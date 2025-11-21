import { createSlice } from "@reduxjs/toolkit";

const issueBooksSlice = createSlice({
  name: "issueBooks",
  initialState: {
    books: [],
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
  },
});

export const { addBook, removeBook, clearAll } = issueBooksSlice.actions;

export default issueBooksSlice.reducer;
