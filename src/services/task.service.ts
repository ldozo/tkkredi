import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import { authStore } from "../stores/auth.store";
import { TaskResponse } from "../types/task.types";

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

export const TaskService = {
  getTasks: async (): Promise<TaskResponse> => {
    try {
      const response = await api.get<TaskResponse>(
        API_CONFIG.ENDPOINTS.TASKS.GET_ALL
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
