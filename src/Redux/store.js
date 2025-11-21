import { configureStore } from "@reduxjs/toolkit";
import issueBooksReducer from "./issueBooksSlice";

export const store = configureStore({
  reducer: {
    issueBooks: issueBooksReducer,
  },
});

export default store;
