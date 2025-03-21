import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../../assets/logo.png";

export const HEADER_HEIGHT = 64;

interface HeaderProps {
  onLogoutClick: () => void;
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onLogoutClick,
  onSidebarToggle,
  isSidebarOpen,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        color: "text.primary",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        height: HEADER_HEIGHT,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ height: HEADER_HEIGHT }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onSidebarToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 40,
              height: 40,
              objectFit: "contain",
              mr: 1,
            }}
          />
          <Typography
            variant="caption"
            sx={{ fontSize: "0.7rem", color: "text.secondary" }}
          >
            Görev Yönetim Sistemi
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="large" color="inherit">
          <NotificationsIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: 2,
            cursor: "pointer",
          }}
          onClick={onLogoutClick}
        >
          <Avatar sx={{ bgcolor: "#0B5D1E" }}>NU</Avatar>
          <Typography variant="subtitle2">nur0ucar</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
