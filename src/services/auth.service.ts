import { ApiResponse } from "../types/api.types";
import api from "./api";

export interface LoginRequest {
  email: string;
}

export interface LoginData {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    departmentId: string;
    departmentName: string;
  };
}

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginData>> => {
    const response = await api.post("/api/Users/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/api/Users/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};
