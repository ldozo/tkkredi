import { makeAutoObservable, runInAction } from "mobx";
import { TaskService } from "../services/task.service";
import { Task } from "../types/task.types";

interface CreateTaskRequest {
  title: string;
  description: string;
  priority: number;
  departmentId: string;
  assignedToId: string;
}

export class TaskStore {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTasks = (tasks: Task[]) => {
    this.tasks = tasks;
  };

  setSelectedTask = (task: Task | null) => {
    this.selectedTask = task;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  getStatusColor = (
    status: string | number
  ): "warning" | "success" | "error" | "info" | "default" => {
    const statusNum = Number(status);
    switch (statusNum) {
      case 1: // Tamamlandı
        return "success";
      case 2: // Reddedildi
        return "error";
      case 0: // Beklemede
        return "warning";
      default:
        return "default";
    }
  };

  getStatusText = (status: string | number): string => {
    const statusNum = Number(status);
    switch (statusNum) {
      case 1:
        return "Tamamlandı";
      case 2:
        return "Reddedildi";
      case 0:
        return "Beklemede";
      default:
        return "Bilinmiyor";
    }
  };

  getPriorityColor = (
    priority: string | number
  ): "error" | "warning" | "info" | "default" => {
    const priorityNum = Number(priority);
    switch (priorityNum) {
      case 2: // Yüksek
        return "error";
      case 1: // Orta
        return "warning";
      case 0: // Düşük
        return "info";
      default:
        return "default";
    }
  };

  getPriorityText = (priority: string | number): string => {
    const priorityNum = Number(priority);
    switch (priorityNum) {
      case 2:
        return "Yüksek";
      case 1:
        return "Orta";
      case 0:
        return "Düşük";
      default:
        return "Bilinmiyor";
    }
  };

  fetchTasks = async () => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await TaskService.getTasks();
      runInAction(() => {
        if (response.success && response.data) {
          this.setTasks(response.data);
        } else {
          this.setError(
            response.message || "Görevler yüklenirken bir hata oluştu"
          );
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.setError(
          err.response?.data?.message || "Görevler yüklenirken bir hata oluştu"
        );
        console.error("Error fetching tasks:", err);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  createTask = async (data: CreateTaskRequest) => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await TaskService.createTask(data);
      if (response.success) {
        await this.fetchTasks(); // Listeyi yenile
        return true;
      } else {
        this.setError(
          response.message || "Görev oluşturulurken bir hata oluştu"
        );
        return false;
      }
    } catch (err: any) {
      this.setError(
        err.response?.data?.message || "Görev oluşturulurken bir hata oluştu"
      );
      console.error("Error creating task:", err);
      return false;
    } finally {
      this.setLoading(false);
    }
  };

  viewTask = (taskId: string) => {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.setSelectedTask(task);
    }
  };

  approveTask = async (taskId: string) => {
    try {
      const response = await TaskService.approveTask(taskId);
      if (response.success) {
        await this.fetchTasks(); // Listeyi yenile
      } else {
        this.setError(response.message || "Görev onaylanırken bir hata oluştu");
      }
    } catch (err) {
      this.setError("Görev onaylanırken bir hata oluştu");
      console.error("Error approving task:", err);
    }
  };

  rejectTask = async (taskId: string) => {
    try {
      const response = await TaskService.rejectTask(taskId);
      if (response.success) {
        await this.fetchTasks(); // Listeyi yenile
      } else {
        this.setError(
          response.message || "Görev reddedilirken bir hata oluştu"
        );
      }
    } catch (err) {
      this.setError("Görev reddedilirken bir hata oluştu");
      console.error("Error rejecting task:", err);
    }
  };
}

export const taskStore = new TaskStore();
