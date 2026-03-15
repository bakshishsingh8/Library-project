// import React from "react";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// // Pages
// import LogIn from "../Auth-Module/login";
// import SignUp from "../Auth-Module/signup";
// import ForgotPassword from "../Auth-Module/forgetPassword";
// import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";
// // import Dashboard from "../Pages/dashboard";
// import StationTable from "../Pages/table";
// import Welcome from "../Pages/welcomepage";
// import Books from "../Pages/books";
// import IssueBooks from "../Pages/buyBooksTable";
// import BooksList from "../Pages/booksList";
// import Payment from "../Pages/payment";
// import AllBooks from "../Pages/allbooks";
// import About from "../Pages/about";
// import IssueBookForm from "../Pages/issuebookstable";
// // import Setting from "../Pages/setting";
// import SellBooks from "../Pages/SellBooks.jsx";
// import HelpSupport from "../Pages/help&support.jsx";
// import PrivacySecurity from "../Pages/privacy&securty.jsx";

// // Layout
// import PrivateRoute from "./privateRoutes";
// import PrivateLayout from "./PrivateLayout";
// import CombinedOrderView from "../common-payment/CombinedOrderView.jsx";
// import CombinedPayment from "../common-payment/CombinedPayment.jsx";

// //admin penal 
// // Admin Pages
// import AdminDashboard from "../Pages/Admin/adminDashboard.jsx";
// import SellRequests from "../Pages/Admin/sellRequests";
// import Dashboard from "../Pages/Admin/AdminPages/dashboard.jsx";
// import AdminLayout from "../Pages/Admin/AdminLayout";



// // Admin Route Guard
// import AdminRoute from "./adminRouting.jsx";


// export default function Routing() {
//   const location = useLocation();

//   return (
//     <Routes location={location}>

//       {/* ---------- PUBLIC ROUTES ---------- */}
//       <Route path="/" element={<LogIn />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/otp-reset-password" element={<OtpSectionResetPassword />} />

//       {/* ---------- PRIVATE ROUTES ---------- */}
//       <Route
//         element={
//           <PrivateRoute>
//             <PrivateLayout />
//           </PrivateRoute>
//         }
//       >
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         <Route path="/table" element={<StationTable />} />
//         <Route path="/welcome" element={<Welcome />} />
//         <Route path="/issue-books" element={<IssueBooks />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/allbooks" element={<AllBooks />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/categories/:id" element={<BooksList />} />
//         <Route path="/issue-book-form" element={<IssueBookForm />} />
//         <Route path="/combined-orders" element={<CombinedOrderView />} />
//         <Route path="/combined-payment" element={<CombinedPayment />} />
//         {/* <Route path="/settings" element={<Setting />} /> */}
//         <Route path="/sell-books" element={<SellBooks />} />
//         <Route path="/help&support" element={<HelpSupport />} />
//         <Route path="/privacy&security" element={<PrivacySecurity />} />

//         {/* ----- ADMIN ROUTES ----- */}

//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* <Route path="/adashboard" element={<Dashboard />} /> */}

//         {/* ADMIN ROUTES */}
//         <Route path="/admin" element={<AdminLayout />}>
//           {/* <Route index element={<Dashboard />} /> */}
//           <Route path="sell-requests" element={<SellRequests />} />
//         </Route>


//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />

//         {/* <Route
//           path="/admin/sell-requests"
//           element={
//             <AdminRoute>
//               <SellRequests />
//             </AdminRoute>
//           }
//         /> */}
//       </Route>

//       {/* ---------- 404 REDIRECT ---------- */}
//       <Route path="*" element={<Navigate to="/" replace />} />

//     </Routes>
//   );
// }

import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// ---------- AUTH PAGES ----------
import LogIn from "../Auth-Module/login";
import SignUp from "../Auth-Module/signup";
import ForgotPassword from "../Auth-Module/forgetPassword";
import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";

// ---------- USER PAGES ----------
import StationTable from "../Pages/table";
import Welcome from "../Pages/welcomepage";
import Books from "../Pages/books";
import IssueBooks from "../Pages/buyBooksTable";
import BooksList from "../Pages/booksList";
import Payment from "../Pages/payment";
import AllBooks from "../Pages/allbooks";
import About from "../Pages/about";
import IssueBookForm from "../Pages/issuebookstable";
import SellBooks from "../Pages/SellBooks.jsx";
import HelpSupport from "../Pages/help&support.jsx";
import PrivacySecurity from "../Pages/privacy&securty.jsx";
import UserProfile from "../Pages/UserProfile.jsx";

// ---------- COMMON ----------
import PrivateRoute from "./privateRoutes";
import PrivateLayout from "./PrivateLayout";
import CombinedOrderView from "../common-payment/CombinedOrderView.jsx";
import CombinedPayment from "../common-payment/CombinedPayment.jsx";

// ---------- ADMIN ----------
import AdminRoute from "./adminRouting.jsx";
import AdminLayout from "../Pages/Admin/AdminLayout";
import Dashboard from "../Pages/Admin/AdminPages/dashboard.jsx";
import SellRequests from "../Pages/Admin/sellRequests";
import Users from "../Pages/Admin/AdminPages/Users.jsx";
import AdminProfile from "../Pages/Admin/AdminPages/AdminProfile";

export default function Routing() {
  const location = useLocation();

  return (
    <Routes location={location}>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-reset-password" element={<OtpSectionResetPassword />} />

      {/* ================= USER PANEL ================= */}
      <Route
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/table" element={<StationTable />} />
        <Route path="/books" element={<Books />} />
        <Route path="/issue-books" element={<IssueBooks />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/about" element={<About />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/categories/:id" element={<BooksList />} />
        <Route path="/issue-book-form" element={<IssueBookForm />} />
        <Route path="/combined-orders" element={<CombinedOrderView />} />
        <Route path="/combined-payment" element={<CombinedPayment />} />
        <Route path="/sell-books" element={<SellBooks />} />
        <Route path="/help&support" element={<HelpSupport />} />
        <Route path="/privacy&security" element={<PrivacySecurity />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Route>

      {/* ================= ADMIN PANEL ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="sell-requests" element={<SellRequests />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

