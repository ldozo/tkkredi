import MainLayout from "@/layouts/MainLayout";
import DepartmentTasks from "@/pages/department-tasks";
import Login from "@/pages/login";
import MyTasks from "@/pages/my-tasks";
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
        element: <Navigate to="/my-tasks" replace />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/department-tasks",
        element: <DepartmentTasks />,
      },
      {
        path: "/my-tasks",
        element: <MyTasks />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);
