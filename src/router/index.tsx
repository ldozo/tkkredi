import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/login";
import Tasks from "@/pages/tasks";
import Users from "@/pages/users/index";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/tasks" replace />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);
