import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import { authStore } from "../stores/auth.store";
import { TaskResponse } from "../types/task.types";

const api = axios.create();

// Request interceptor - her istekte token'ı ekle
api.interceptors.request.use((config) => {
  console.log("Task Request Config:", config);
  const token = authStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - hata durumunda token'ı temizle
api.interceptors.response.use(
  (response) => {
    console.log("Task Response:", response);
    return response;
  },
  (error) => {
    console.log("Task Response Error:", error);
    if (error.response?.status === 401) {
      authStore.clearToken();
    }
    return Promise.reject(error);
  }
);

export const TaskService = {
  getTasks: async (): Promise<TaskResponse> => {
    try {
      console.log("Making request to:", API_CONFIG.ENDPOINTS.TASKS.GET_ALL);
      const response = await api.get(API_CONFIG.ENDPOINTS.TASKS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error("Error in getTasks:", error);
      throw error;
    }
  },
};
