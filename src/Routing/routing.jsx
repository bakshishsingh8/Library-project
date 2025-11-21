
// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// // Pages
// import LogIn from "../Auth-Module/login";
// import SignUp from "../Auth-Module/signup";
// import ForgotPassword from "../Auth-Module/forgetPassword";
// import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";
// import Dashboard from "../Pages/dashboard";
// import StationTable from "../Pages/table.jsx";
// import Welcome from "../Pages/welcomepage.jsx";
// import Books from "../Pages/books";
// import IssueBooks from "../Pages/IssueBooks";
// import BooksList from "../Pages/booksList";
// import Payment from "../Pages/payment";
// import AllBooks from "../Pages/allbooks.jsx";
// import About from "../Pages/about.jsx";

// // Layout
// import Sidebar from "../Layout/sidebar.jsx";
// import Header from "../Layout/header.jsx";
// import PrivateRoute from "./privateRoutes";

// export default function Routing() {
//   const location = useLocation();
//   const [issueBooks, setIssueBooks] = React.useState([]);
//   const [sidebarHovered, setSidebarHovered] = React.useState(false);
//   const [headerHeight, setHeaderHeight] = React.useState(65);

//   // ✨ GLOBAL SEARCH AND FILTER STATES
//   const [globalSearch, setGlobalSearch] = React.useState("");
//   const [selectedLetter, setSelectedLetter] = React.useState("");

//   // Public route paths
//   const publicPaths = ["/", "/signup", "/forgot-password", "/otp-reset-password", "/payment", "/welcome", "/issue-books"];

//   // Check if the current path is public
//   const isPublicRoute = publicPaths.includes(location.pathname);

//   const pageVariants = {
//     initial: { opacity: 0, x: 50 },
//     in: { opacity: 1, x: 0 },
//     out: { opacity: 0, x: -50 },
//   };

//   const pageTransition = { type: "tween", ease: "easeInOut", duration: 0.4 };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar (only for private routes) */}
//       {!isPublicRoute && (
//         <div
//           onMouseEnter={() => setSidebarHovered(true)}
//           onMouseLeave={() => setSidebarHovered(false)}
//         >
//           <Sidebar hovered={sidebarHovered} />
//         </div>
//       )}

//       {/* Header + Pages */}
//       <div className="flex-1 flex flex-col">
//         {/* Header (RENDERED ONCE GLOBALLY FOR PRIVATE ROUTES) */}
//         {!isPublicRoute && (
//           <Header
//             sidebarOpen={sidebarHovered}
//             setHeaderHeight={setHeaderHeight}
//             // ✅ PASS GLOBAL STATE AND SETTERS TO HEADER
//             search={globalSearch}
//             setSearch={setGlobalSearch}
//             selectedLetter={selectedLetter}
//             setSelectedLetter={setSelectedLetter}
//             issueBooks={issueBooks}
//           />
//         )}

//         {/* Page content */}
//         <div
//           className="flex-1 overflow-auto bg-gray-50"
//           style={{ paddingTop: !isPublicRoute ? headerHeight : 0 }}
//         >
//           {/* ✨ ANIMATION WRAPPER ADDED HERE ✨ */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={location.pathname} // Key is crucial for AnimatePresence
//               variants={pageVariants}
//               transition={pageTransition}
//               initial="initial"
//               animate="in"
//               exit="out"
//             >
//               <Routes location={location}> {/* 'location' prop is also crucial */}
//                 {/* Public Routes */}
//                 {/* <Route path="/" element={<LogIn />} /> */}
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 <Route path="/otp-reset-password" element={<OtpSectionResetPassword />} />
//               </Routes>
//             </motion.div>
//           </AnimatePresence>
//           <Routes location={location}>
//             {/* Private Routes - Receiving Global State */}
//             <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//             <Route path="/table" element={<PrivateRoute><StationTable /></PrivateRoute>} />
//             <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
//             <Route path="/issue-books" element={<PrivateRoute><IssueBooks issueBooks={issueBooks} setIssueBooks={setIssueBooks} /></PrivateRoute>} />
//             <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
//             <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
//             {/* <Route path="/categories/:categoryId/book/:bookId" element={<BookDetails />} /> */}
//             <Route path="/allbooks" element={<PrivateRoute><AllBooks /></PrivateRoute>} />

//             <Route
//               path="/books"
//               element={
//                 <PrivateRoute>
//                   <Books
//                     // ✅ PASS GLOBAL STATE TO BOOKS PAGE
//                     search={globalSearch}
//                     selectedLetter={selectedLetter}
//                     setSearch={setGlobalSearch}
//                     setSelectedLetter={setSelectedLetter}
//                   />
//                 </PrivateRoute>
//               }
//             />

//             <Route
//               path="/categories/:id"
//               element={
//                 <PrivateRoute>
//                   <BooksList
//                     issueBooks={issueBooks}
//                     setIssueBooks={setIssueBooks}
//                     // ✅ PASS GLOBAL STATE TO BOOKSLIST PAGE
//                     search={globalSearch}
//                     selectedLetter={selectedLetter}
//                     setSearch={setGlobalSearch}
//                     setSelectedLetter={setSelectedLetter}
//                   />
//                 </PrivateRoute>
//               }
//             />

//             {/* Fallback */}
//             <Route path="*" element={<LogIn />} />
//           </Routes>

//           {/* ✨ END OF ANIMATION WRAPPER ✨ */}
//         </div>
//       </div>
//     </div>
//   );
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// // Pages
// import LogIn from "../Auth-Module/login";
// import SignUp from "../Auth-Module/signup";
// import ForgotPassword from "../Auth-Module/forgetPassword";
// import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";
// import Dashboard from "../Pages/dashboard";
// import StationTable from "../Pages/table.jsx";
// import Welcome from "../Pages/welcomepage.jsx";
// import Books from "../Pages/books";
// import IssueBooks from "../Pages/IssueBooks";
// import BooksList from "../Pages/booksList";
// import Payment from "../Pages/payment";
// import AllBooks from "../Pages/allbooks.jsx";
// import About from "../Pages/about.jsx";

// // Layout
// import Sidebar from "../Layout/sidebar.jsx";
// import Header from "../Layout/header.jsx";
// import PrivateRoute from "./privateRoutes";

// export default function Routing() {
//   const location = useLocation();

//   // States
//   const [issueBooks, setIssueBooks] = React.useState([]);
//   const [sidebarHovered, setSidebarHovered] = React.useState(false);
//   const [headerHeight, setHeaderHeight] = React.useState(65);

//   // Global Search and Filters
//   const [globalSearch, setGlobalSearch] = React.useState("");
//   const [selectedLetter, setSelectedLetter] = React.useState("");

//   // Define public paths
//   const publicPaths = [
//     "/",
//     "/signup",
//     "/forgot-password",
//     "/otp-reset-password",
//   ];

//   // Check if current route is public
//   const isPublicRoute = publicPaths.includes(location.pathname);

//   // Page Animation Config
//   const pageVariants = {
//     initial: { opacity: 0, x: 50 },
//     in: { opacity: 1, x: 0 },
//     out: { opacity: 0, x: -50 },
//   };

//   const pageTransition = { type: "tween", ease: "easeInOut", duration: 0.4 };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar (Visible only for private routes) */}
//       {!isPublicRoute && (
//         <div
//           onMouseEnter={() => setSidebarHovered(true)}
//           onMouseLeave={() => setSidebarHovered(false)}
//         >
//           <Sidebar hovered={sidebarHovered} />
//         </div>
//       )}

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header (Visible only for private routes) */}
//         {!isPublicRoute && (
//           <Header
//             sidebarOpen={sidebarHovered}
//             setHeaderHeight={setHeaderHeight}
//             search={globalSearch}
//             setSearch={setGlobalSearch}
//             selectedLetter={selectedLetter}
//             setSelectedLetter={setSelectedLetter}
//             issueBooks={issueBooks}
//           />
//         )}

//         {/* Page Content */}
//         <div
//           className="flex-1 overflow-auto bg-gray-50"
//           style={{ paddingTop: !isPublicRoute ? headerHeight : 0 }}
//         >
//           {/* Animate Only the Page Content */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={location.pathname}
//               variants={pageVariants}
//               transition={pageTransition}
//               initial="initial"
//               animate="in"
//               exit="out"
//             >
//               <Routes location={location}>
//                 {/* Public Routes */}
//                 <Route path="/" element={<LogIn />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 <Route
//                   path="/otp-reset-password"
//                   element={<OtpSectionResetPassword />}
//                 />

//                 {/* Private Routes */}
//                 <Route
//                   path="/dashboard"
//                   element={
//                     <PrivateRoute>
//                       <Dashboard />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/table"
//                   element={
//                     <PrivateRoute>
//                       <StationTable />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/welcome"
//                   element={
//                     <PrivateRoute>
//                       <Welcome />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/issue-books"
//                   element={
//                     <PrivateRoute>
//                       <IssueBooks
//                         issueBooks={issueBooks}
//                         setIssueBooks={setIssueBooks}
//                       />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/payment"
//                   element={
//                     <PrivateRoute>
//                       <Payment />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/about"
//                   element={
//                     <PrivateRoute>
//                       <About />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/allbooks"
//                   element={
//                     <PrivateRoute>
//                       <AllBooks />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/books"
//                   element={
//                     <PrivateRoute>
//                       <Books
//                         search={globalSearch}
//                         selectedLetter={selectedLetter}
//                         setSearch={setGlobalSearch}
//                         setSelectedLetter={setSelectedLetter}
//                       />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/categories/:id"
//                   element={
//                     <PrivateRoute>
//                       <BooksList
//                         issueBooks={issueBooks}
//                         setIssueBooks={setIssueBooks}
//                         search={globalSearch}
//                         selectedLetter={selectedLetter}
//                         setSearch={setGlobalSearch}
//                         setSelectedLetter={setSelectedLetter}
//                       />
//                     </PrivateRoute>
//                   }
//                 />

//                 {/* Redirect unknown routes to login */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import LogIn from "../Auth-Module/login";
import SignUp from "../Auth-Module/signup";
import ForgotPassword from "../Auth-Module/forgetPassword";
import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";
import Dashboard from "../Pages/dashboard";
import StationTable from "../Pages/table";
import Welcome from "../Pages/welcomepage";
import Books from "../Pages/books";
import IssueBooks from "../Pages/IssueBooks";
import BooksList from "../Pages/booksList";
import Payment from "../Pages/payment";
import AllBooks from "../Pages/allbooks";
import About from "../Pages/about";

// Layout + Routes
import PrivateRoute from "./privateRoutes";
import PrivateLayout from "./PrivateLayout";

export default function Routing() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
  };

  const pageTransition = { type: "tween", ease: "easeInOut", duration: 0.4 };
    const publicPaths = ["/", "/signup", "/forgot-password", "/otp-reset-password", "/payment", "/welcome", "/issue-books"];


  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        transition={pageTransition}
        initial="initial"
        animate="in"
        exit="out"
      >
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/otp-reset-password"
            element={<OtpSectionResetPassword />}
          />

          {/* Private Layout Routes */}
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
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
