import { makeAutoObservable, runInAction } from "mobx";
import { TaskService } from "../services/task.service";
import { Task } from "../types/task.types";

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
    status: string
  ): "warning" | "success" | "error" | "info" | "default" => {
    const statusStr = String(status).toLowerCase();
    switch (statusStr) {
      case "completed":
        return "success";
      case "in progress":
        return "info";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  getPriorityColor = (
    priority: string
  ): "error" | "warning" | "success" | "default" => {
    const priorityStr = String(priority).toLowerCase();
    switch (priorityStr) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
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

  viewTask = (taskId: string) => {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.setSelectedTask(task);
    }
  };

  approveTask = async (taskId: string) => {
    try {
      // TODO: Implement approve task logic with API call
      console.log("Approve task:", taskId);
    } catch (err) {
      console.error("Error approving task:", err);
    }
  };

  rejectTask = async (taskId: string) => {
    try {
      // TODO: Implement reject task logic with API call
      console.log("Reject task:", taskId);
    } catch (err) {
      console.error("Error rejecting task:", err);
    }
  };
}

export const taskStore = new TaskStore();
