// import { configureStore } from "@reduxjs/toolkit";
// import issueBooksReducer from "./issueBooksSlice";

// export const store = configureStore({
//   reducer: {
//     issueBooks: issueBooksReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import issueBooksReducer from "./issueBooksSlice";
import aiReducer from "./aiSlace.js";   // ✅ ADD THIS

export const store = configureStore({
  reducer: {
    issueBooks: issueBooksReducer,
    ai: aiReducer,   // ✅ ADD THIS
  },
});

export default store;
