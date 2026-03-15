

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// API.interceptors.request.use((req) => {
//   // 🔴 CHANGE THIS LINE:
//   // FROM: const token = localStorage.getItem("token");
//   // TO:
//   const token = localStorage.getItem("authToken"); 
  
//   // Debug log to confirm it's working
//   console.log("🔑 Interceptor attaching token:", token); 

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// // ... keep the rest of your API calls ...
// export const getAllUsers = () => API.get("/admin/users");
// export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

// export default API;



import axios from "axios";

const API = axios.create({
  // Ensure this matches your backend URL
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken"); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ---------------- ADMIN API ----------------

export const getAllUsers = () => API.get("/admin/users");
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

// ✅ NEW: Update User (for Editing Name/Role)
export const updateUser = (id, userData) => API.put(`/admin/users/${id}`, userData);

export const adminDashboard = () => API.get("/admin/dashboard");

export default API;