import { AxiosError } from "axios";
import { API_CONFIG } from "../config/api.config";
import { authStore } from "../stores/auth.store";
import { User } from "../types/user.types";
import api from "./api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class UserService {
  static async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await api.get<ApiResponse<User[]>>(
        API_CONFIG.ENDPOINTS.USERS.GET_ALL
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        authStore.clearAuth();
      }
      throw error;
    }
  }
}
