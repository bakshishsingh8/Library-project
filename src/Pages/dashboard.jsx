function Dashboard() {
  return (
    <div className="p-9 pt-6  bg-amber-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the Library Dashboard! Here you can manage books, users, and view reports.</p>
    </div>
  );
}
export default Dashboard;


// dashboard.js
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <button
//         onClick={handleLogout}
//         className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Dashboard;
