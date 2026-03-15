// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function AdminRoute({ children }) {
//   const { userData, loading } = useAuth();

//   if (loading) return null;

//   if (!userData || userData.role !== "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { userData, loading } = useAuth();

  if (loading) {
    return <p className="p-6">Checking admin access...</p>;
  }

  if (!userData || userData.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// import { Routes, Route } from "react-router-dom";
// import AdminDashboard from "../Pages/Admin/adminDashboard";
// import SellRequests from "../Pages/Admin/sellRequests";

// export default function AdminRouting() {
//   return (
//     <Routes>
//       <Route path="/admin" element={<AdminDashboard />} />
//       <Route path="/admin/sell-requests" element={<SellRequests />} />
//     </Routes>
//   );
// }
