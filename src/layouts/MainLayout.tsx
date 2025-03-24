import Header, { HEADER_HEIGHT } from "@/layouts/header/Header";
import Sidebar from "@/layouts/sidebar/Sidebar";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header
        onLogoutClick={handleLogout}
        onSidebarToggle={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar open={isSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: `${HEADER_HEIGHT}px`,
          bgcolor: "background.default",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          maxWidth: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
