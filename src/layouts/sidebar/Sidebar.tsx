import { authService } from "@/services/auth.service";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HEADER_HEIGHT } from "../header/Header";

const drawerWidth = 280;
const miniDrawerWidth = 80;

interface SidebarProps {
  open: boolean;
}

const menuItems = [
  {
    title: "Oluşturduğum Görevler",
    path: "/my-tasks",
    icon: <AssignmentIcon />,
  },
  {
    title: "Departman Görevleri",
    path: "/department-tasks",
    icon: <GroupWorkIcon />,
  },
  {
    title: "Tüm Görevler",
    path: "/tasks",
    icon: <ListAltIcon />,
  },
  {
    title: "Kullanıcılar",
    path: "/users",
    icon: <PeopleIcon />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await authService.logout();
      if (response.success) {
        navigate("/login");
      } else {
        console.error("Logout failed:", response.message);
        // Hata durumunda da kullanıcıyı çıkış yaptır
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Hata durumunda da kullanıcıyı çıkış yaptır
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : miniDrawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : miniDrawerWidth,
          boxSizing: "border-box",
          bgcolor: "#0B5D1E",
          color: "white",
          overflowX: "hidden",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          mt: `${HEADER_HEIGHT}px`,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          border: "none",
        },
      }}
    >
      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  transition: "margin-right 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.title}
                  sx={{
                    whiteSpace: "nowrap",
                    opacity: open ? 1 : 0,
                    transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: "auto", mb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                transition: "margin-right 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Çıkış Yap"
                sx={{
                  whiteSpace: "nowrap",
                  opacity: open ? 1 : 0,
                  transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
