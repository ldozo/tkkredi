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
    if (response.data.success) {
      authStore.setToken(response.data.data.token);
      authStore.setUser(response.data.data.user);
    }
    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post("/api/Users/logout");
    if (response.data.success) {
      authStore.clearAuth();
    }
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<LoginData["user"]>> => {
    const response = await api.get("/api/auth/me");
    if (response.data.success) {
      authStore.setUser(response.data.data);
    }
    return response.data;
  },
};
