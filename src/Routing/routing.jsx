import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// Pages
import LogIn from "../Auth-Module/login";
import SignUp from "../Auth-Module/signup";
import ForgotPassword from "../Auth-Module/forgetPassword";
import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";
import Dashboard from "../Pages/dashboard";
import StationTable from "../Pages/table";
import Welcome from "../Pages/welcomepage";
import Books from "../Pages/books";
import IssueBooks from "../Pages/buyBooksTable";
import BooksList from "../Pages/booksList";
import Payment from "../Pages/payment";
import AllBooks from "../Pages/allbooks";
import About from "../Pages/about";
import IssueBookForm from "../Pages/issuebookstable";
import Setting from "../Pages/setting";
import SellBooks from "../Pages/SellBooks.jsx";

// Layout
import PrivateRoute from "./privateRoutes";
import PrivateLayout from "./PrivateLayout";
import CombinedOrderView from "../common-payment/CombinedOrderView.jsx";
import CombinedPayment from "../common-payment/CombinedPayment.jsx";

export default function Routing() {
  const location = useLocation();

  return (
    <Routes location={location}>

      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-reset-password" element={<OtpSectionResetPassword />} />

      {/* ---------- PRIVATE ROUTES ---------- */}
      <Route
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<StationTable />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/issue-books" element={<IssueBooks />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/about" element={<About />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/books" element={<Books />} />
        <Route path="/categories/:id" element={<BooksList />} />
        <Route path="/issue-book-form" element={<IssueBookForm />} />
        <Route path="/combined-orders" element={<CombinedOrderView />} />
        <Route path="/combined-payment" element={<CombinedPayment />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/sell-books" element={<SellBooks />} />
      </Route>

      {/* ---------- 404 REDIRECT ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
