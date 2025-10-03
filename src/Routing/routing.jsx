// export default Routing;
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

// Auth Pages
import LogIn from "../Auth-Module/login";
import SignUp from "../Auth-Module/signup";
import ForgotPassword from "../Auth-Module/forgetPassword";
import OtpSectionResetPassword from "../Auth-Module/otpSection-ResetPassword";

// Private Pages
import Dashboard from "../Pages/dashboard";
import Books from "../Pages/books";
import IssueBooks from "../Pages/IssueBooks";
import BooksList from "../Pages/booksList";

// Layout & Private Route
import PrivateRoute from "./privateRoutes";
import Header from "../Layout/header";
import Sidebar from "../Layout/sidebar";

function Routing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const location = useLocation();
  const hideLayout = ["/", "/signup", "/forgot-password", "/otp-reset-password"].includes(location.pathname);

  // Close sidebar on public pages
  useEffect(() => {
    if (hideLayout) setSidebarOpen(false);
  }, [location.pathname]);

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0, rotateY: 90 },
    in: { opacity: 1, rotateY: 0 },
    out: { opacity: 0, rotateY: -90 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {!hideLayout && <Header toggleSidebar={toggleSidebar} />}

      <div className="flex flex-1">
        {/* Sidebar */}
        {!hideLayout && <Sidebar isOpen={sidebarOpen} />}

        {/* Page Content */}
        <div
          className={`flex-1 min-h-screen ml-0 transition-all duration-300 ${
            sidebarOpen ? "md:ml-64" : "md:ml-0"
          } overflow-hidden`}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LogIn />
                  </motion.div>
                }
              />
              <Route
                path="/signup"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <SignUp />
                  </motion.div>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ForgotPassword />
                  </motion.div>
                }
              />
              <Route
                path="/otp-reset-password"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <OtpSectionResetPassword />
                  </motion.div>
                }
              />

              {/* Private Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <Dashboard />
                    </motion.div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/books"
                element={
                  <PrivateRoute>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <Books />
                    </motion.div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/issue-books"
                element={
                  <PrivateRoute>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <IssueBooks />
                    </motion.div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/categories/:id"
                element={
                  <PrivateRoute>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <BooksList />
                    </motion.div>
                  </PrivateRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<LogIn />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Routing;
