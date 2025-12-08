import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchBooksWithAI } from "../services/ai.js";

export const fetchAIBooks = createAsyncThunk(
  "ai/search",
  async (query) => {
    return await searchBooksWithAI(query);
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    loading: false,
    books: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAIBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchAIBooks.rejected, (state) => {
        state.loading = false;
        state.error = "AI search failed";
      });
  },
});

export default aiSlice.reducer;
