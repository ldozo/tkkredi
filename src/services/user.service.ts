import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import { authStore } from "../stores/auth.store";
import { User } from "../types/user.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const api = axios.create();

// Request interceptor - her istekte token'ı ekle
api.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - hata durumunda token'ı temizle
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStore.clearAuth();
    }
    return Promise.reject(error);
  }
);

export class UserService {
  static async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await api.get<ApiResponse<User[]>>(
        API_CONFIG.ENDPOINTS.USERS.GET_ALL
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
