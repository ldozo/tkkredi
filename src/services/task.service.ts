import { API_CONFIG } from "../config/api.config";
import { authStore } from "../stores/auth.store";
import { TaskResponse } from "../types/task.types";
import api from "./api";

interface CreateTaskRequest {
  title: string;
  description: string;
  priority: number;
  departmentId: string;
  assignedToId: string;
  dueDate?: string;
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

  updateTask: async (
    taskId: string,
    data: CreateTaskRequest
  ): Promise<TaskResponse> => {
    try {
      const user = authStore.getUser();
      if (!user) throw new Error("Kullanıcı bulunamadı");

      const requestData = {
        id: taskId,
        title: data.title,
        description: data.description,
        priority: data.priority,
        departmentId: data.departmentId,
        assignedToId: data.assignedToId,
        dueDate: data.dueDate,
        userId: user.id, // Güncelleyen kullanıcının ID'si
      };

      const response = await api.put<TaskResponse>(
        API_CONFIG.ENDPOINTS.TASKS.UPDATE(taskId),
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

  deleteTask: async (taskId: string): Promise<TaskResponse> => {
    try {
      const response = await api.delete<TaskResponse>(
        API_CONFIG.ENDPOINTS.TASKS.DELETE(taskId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
