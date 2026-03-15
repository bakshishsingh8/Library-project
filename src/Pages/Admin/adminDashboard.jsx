// import { Link } from "react-router-dom";

// export default function AdminDashboard() {
//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

//       <Link
//         to="/admin/sell-requests"
//         className="inline-block px-6 py-4 bg-amber-600 text-white rounded-xl shadow hover:bg-amber-700"
//       >
//         Manage Sell Requests
//       </Link>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <Link
        to="/admin/sell-requests"
        className="inline-block px-6 py-4 bg-amber-600 text-white rounded-xl shadow hover:bg-amber-700"
      >
        Manage Sell Requests
      </Link>
    </div>
  );
}
