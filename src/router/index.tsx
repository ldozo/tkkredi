import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/login";
import Tasks from "@/pages/tasks";
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
        index: true,
        element: <Navigate to="/my-tasks" replace />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "department-tasks",
        element: <Tasks />,
      },
      {
        path: "my-tasks",
        element: <Tasks />,
      },
    ],
  },
]);
