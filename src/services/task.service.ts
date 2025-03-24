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

interface CreateTaskRequest {
  title: string;
  description: string;
  priority: number;
  departmentId: string;
  assignedToId: string;
}

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

  createTask: async (data: CreateTaskRequest): Promise<TaskResponse> => {
    try {
      const user = authStore.getUser();
      if (!user) throw new Error("Kullanıcı bulunamadı");

      const requestData = {
        ...data,
        createdById: user.id,
      };

      const response = await api.post<TaskResponse>(
        API_CONFIG.ENDPOINTS.TASKS.CREATE,
        requestData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  approveTask: async (taskId: string): Promise<TaskResponse> => {
    try {
      const response = await api.post<TaskResponse>(
        API_CONFIG.ENDPOINTS.TASKS.COMPLETE_TASK(taskId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rejectTask: async (taskId: string): Promise<TaskResponse> => {
    try {
      const response = await api.post<TaskResponse>(
        API_CONFIG.ENDPOINTS.TASKS.REJECT_TASK(taskId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
