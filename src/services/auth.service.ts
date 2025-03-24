import { authStore } from "../stores/auth.store";
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

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post("/api/Users/logout");
    if (response.data.success) {
      authStore.clearToken();
      localStorage.removeItem("user");
    }
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<LoginData["user"]>> => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};
