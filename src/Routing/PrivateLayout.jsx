import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Layout/sidebar";
import Header from "../Layout/header";

const PrivateLayout = () => {
  const location = useLocation();

  // States
  const [sidebarHovered, setSidebarHovered] = React.useState(false);
  const [headerHeight, setHeaderHeight] = React.useState(65);
  const [globalSearch, setGlobalSearch] = React.useState("");
  const [selectedLetter, setSelectedLetter] = React.useState("");
  const [issueBooks, setIssueBooks] = React.useState([]);

  // Paths where Header & Sidebar should NOT be shown
  const hiddenLayoutPaths = ["/issue-books","/issue-book-form", "/payment", "/welcome", "/combined-orders" ,"/combined-payment"];

  // Check if the current path is one of the hidden ones
  const hideLayout = hiddenLayoutPaths.includes(location.pathname);

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

        {/* Render the current page */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
