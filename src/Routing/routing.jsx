// import React from "react";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// // Pages
// import LogIn from "../Auth-Module/login";
// import SignUp from "../Auth-Module/signup";
// import ForgotPassword from "../Auth-Module/forgetPassword";
// import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";
// import Dashboard from "../Pages/dashboard";
// import StationTable from "../Pages/table";
// import Welcome from "../Pages/welcomepage";
// import Books from "../Pages/books";
// import IssueBooks from "../Pages/buyBooksTable";
// import BooksList from "../Pages/booksList";
// import Payment from "../Pages/payment";
// import AllBooks from "../Pages/allbooks";
// import About from "../Pages/about";
// import IssueBookForm from "../Pages/issuebooksfrom";
// // import  Footer from '../Pages/footer.jsx'

// // Layout + Routes
// import PrivateRoute from "./privateRoutes";
// import PrivateLayout from "./PrivateLayout";

// export default function Routing() {
//   const location = useLocation();

//   const pageVariants = {
//     initial: { opacity: 0, x: 50 },
//     in: { opacity: 1, x: 0 },
//     out: { opacity: 0, x: -50 },
//   };

//   const pageTransition = { type: "tween", ease: "easeInOut", duration: 0.4 };
//     const publicPaths = ["/", "/signup", "/forgot-password", "/otp-reset-password", "/payment", "/welcome", "/issue-books"];


//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={location.pathname}
//         variants={pageVariants}
//         transition={pageTransition}
//         initial="initial"
//         animate="in"
//         exit="out"
//       >
//         <Routes location={location}>
//           {/* Public Routes */}
//           <Route path="/" element={<LogIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route
//             path="/otp-reset-password"
//             element={<OtpSectionResetPassword />}
//           />

//           {/* Private Layout Routes */}
//           <Route
//             element={
//               <PrivateRoute>
//                 <PrivateLayout />
//               </PrivateRoute>
//             }
//           >
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/table" element={<StationTable />} />
//             <Route path="/welcome" element={<Welcome />} />
//             <Route path="/issue-books" element={<IssueBooks />} />
//             <Route path="/payment" element={<Payment />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/allbooks" element={<AllBooks />} />
//             <Route path="/books" element={<Books />} />
//             <Route path="/categories/:id" element={<BooksList />} />
//             {/* <Route path="/footer" element={<Footer />} /> */}
//             <Route path="/issue-book-form" element={<IssueBookForm />} />
//           </Route>

//           {/* Catch-all */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </motion.div>
//     </AnimatePresence>
//   );
// }


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
      </Route>

      {/* ---------- 404 REDIRECT ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
