import { authService } from "@/services/auth.service";
import { authStore } from "@/stores/auth.store";
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
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export const HEADER_HEIGHT = 64;

interface HeaderProps {
  onLogoutClick: () => void;
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = observer(
  ({ onLogoutClick, onSidebarToggle, isSidebarOpen }) => {
    const navigate = useNavigate();
    const user = authStore.getUser();

    const getInitials = (name: string | undefined | null) => {
      if (!name) return "?";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    };

    const handleLogout = async () => {
      try {
        const response = await authService.logout();
        if (response.success) {
          authStore.clearAuth();
          onLogoutClick();
          navigate("/login");
        } else {
          console.error("Logout failed:", response.message);
          authStore.clearAuth();
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
        authStore.clearAuth();
        navigate("/login");
      }
    };

    if (!user) return null;

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
            onClick={handleLogout}
          >
            <Avatar
              sx={{
                bgcolor: "#0B5D1E",
                width: 32,
                height: 32,
                fontSize: "0.75rem",
              }}
            >
              {getInitials(user.name)}
            </Avatar>
            <Typography variant="subtitle2">
              {user.name || "Kullanıcı"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
);

export default Header;
