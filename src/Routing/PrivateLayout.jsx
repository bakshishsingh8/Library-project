import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Layout/sidebar";
import Header from "../Layout/header";
import { AnimatePresence, motion } from "framer-motion";

const PrivateLayout = () => {
  const location = useLocation();

  // States
  const [sidebarHovered, setSidebarHovered] = React.useState(false);
  const [headerHeight, setHeaderHeight] = React.useState(65);
  const [globalSearch, setGlobalSearch] = React.useState("");
  const [selectedLetter, setSelectedLetter] = React.useState("");
  const [issueBooks, setIssueBooks] = React.useState([]);

  // Paths where Header & Sidebar should NOT be shown
  const hiddenLayoutPaths = ["/issue-books", "/payment", "/welcome"];

  // Check if the current path is one of the hidden ones
  const hideLayout = hiddenLayoutPaths.includes(location.pathname);

  // Animation for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -40 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar (shown only when not hidden) */}
      {!hideLayout && (
        <div
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          <Sidebar hovered={sidebarHovered} />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header (shown only when not hidden) */}
        {!hideLayout && (
          <Header
            sidebarOpen={sidebarHovered}
            setHeaderHeight={setHeaderHeight}
            search={globalSearch}
            setSearch={setGlobalSearch}
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
            issueBooks={issueBooks}
          />
        )}

        {/* Page content */}
        <div
          className="flex-1 overflow-auto bg-gray-50"
          style={{ paddingTop: !hideLayout ? headerHeight : 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              transition={pageTransition}
              initial="initial"
              animate="in"
              exit="out"
            >
              <Outlet
                context={{
                  globalSearch,
                  setGlobalSearch,
                  selectedLetter,
                  setSelectedLetter,
                  issueBooks,
                  setIssueBooks,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
