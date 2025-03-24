import { makeAutoObservable, runInAction } from "mobx";
import { TaskService } from "../services/task.service";
import { Priority, Task, TaskStatus } from "../types/task.types";

export class TaskStore {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  loading: boolean = false;
  error: string | null = null;
  currentTab: string = "all";
  filters: {
    status: string;
    priority: string;
    department: string;
    assignedTo: string;
  } = {
    status: "all",
    priority: "all",
    department: "all",
    assignedTo: "all",
  };
  success = false;

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

  setCurrentTab = (tab: string) => {
    this.currentTab = tab;
  };

  setFilters = (filters: Partial<typeof this.filters>) => {
    this.filters = { ...this.filters, ...filters };
  };

  setSuccess = (success: boolean) => {
    this.success = success;
  };

  getStatusLabel = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.Created:
        return "Oluşturuldu";
      case TaskStatus.Assigned:
        return "Atandı";
      case TaskStatus.InProgress:
        return "Devam Ediyor";
      case TaskStatus.Completed:
        return "Tamamlandı";
      case TaskStatus.Rejected:
        return "Reddedildi";
      default:
        return "Bilinmiyor";
    }
  };

  getStatusColor = (
    status: TaskStatus
  ):
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" => {
    switch (status) {
      case TaskStatus.Created:
        return "default";
      case TaskStatus.Assigned:
        return "info";
      case TaskStatus.InProgress:
        return "warning";
      case TaskStatus.Completed:
        return "success";
      case TaskStatus.Rejected:
        return "error";
      default:
        return "default";
    }
  };

  getStatusText = (status: string | number): string => {
    const statusNum = Number(status);
    switch (statusNum) {
      case TaskStatus.Created:
        return "Oluşturuldu";
      case TaskStatus.Assigned:
        return "Atandı";
      case TaskStatus.InProgress:
        return "Devam Ediyor";
      case TaskStatus.Completed:
        return "Tamamlandı";
      case TaskStatus.Rejected:
        return "Reddedildi";
      default:
        return "Bilinmiyor";
    }
  };

  getPriorityLabel = (priority: Priority): string => {
    switch (priority) {
      case Priority.Low:
        return "Düşük";
      case Priority.Medium:
        return "Orta";
      case Priority.High:
        return "Yüksek";
      case Priority.Critical:
        return "Kritik";
      default:
        return "Bilinmiyor";
    }
  };

  getPriorityColor = (
    priority: Priority
  ):
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" => {
    switch (priority) {
      case Priority.Low:
        return "default";
      case Priority.Medium:
        return "info";
      case Priority.High:
        return "warning";
      case Priority.Critical:
        return "error";
      default:
        return "default";
    }
  };

  getPriorityText = (priority: string | number): string => {
    const priorityNum = Number(priority);
    switch (priorityNum) {
      case Priority.Critical:
        return "Kritik";
      case Priority.High:
        return "Yüksek";
      case Priority.Medium:
        return "Orta";
      case Priority.Low:
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

  createTask = async (data: any) => {
    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
      this.setSuccess(false);
    });

    try {
      const response = await TaskService.createTask(data);

      if (response.success) {
        await this.fetchTasks();
        runInAction(() => {
          this.setSuccess(true);
        });
        return true;
      } else {
        runInAction(() => {
          this.setError(
            response.message || "Görev oluşturulurken bir hata oluştu"
          );
        });
        return false;
      }
    } catch (err: any) {
      runInAction(() => {
        this.setError(
          err.response?.data?.message || "Görev oluşturulurken bir hata oluştu"
        );
        console.error("Error creating task:", err);
      });
      return false;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  updateTask = async (taskId: string, data: any) => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await TaskService.updateTask(taskId, data);
      let success = false;

      runInAction(() => {
        if (response.success) {
          // Mevcut task listesini güncelle
          this.fetchTasks();
          success = true;
        } else {
          this.setError(
            response.message || "Görev güncellenirken bir hata oluştu"
          );
        }
      });

      return success;
    } catch (err: any) {
      runInAction(() => {
        this.setError(
          err.response?.data?.message || "Görev güncellenirken bir hata oluştu"
        );
        console.error("Error updating task:", err);
      });
      return false;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  approveTask = async (taskId: string) => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await TaskService.approveTask(taskId);
      let success = false;

      runInAction(() => {
        if (response.success) {
          // Mevcut task listesini güncelle
          this.fetchTasks();
          success = true;
        } else {
          this.setError(
            response.message || "Görev tamamlanırken bir hata oluştu"
          );
        }
      });

      return success;
    } catch (err: any) {
      runInAction(() => {
        this.setError(
          err.response?.data?.message || "Görev tamamlanırken bir hata oluştu"
        );
        console.error("Error approving task:", err);
      });
      return false;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  rejectTask = async (taskId: string) => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await TaskService.rejectTask(taskId);
      let success = false;

      runInAction(() => {
        if (response.success) {
          // Mevcut task listesini güncelle
          this.fetchTasks();
          success = true;
        } else {
          this.setError(
            response.message || "Görev reddedilirken bir hata oluştu"
          );
        }
      });

      return success;
    } catch (err: any) {
      runInAction(() => {
        this.setError(
          err.response?.data?.message || "Görev reddedilirken bir hata oluştu"
        );
        console.error("Error rejecting task:", err);
      });
      return false;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  deleteTask = async (taskId: string) => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await TaskService.deleteTask(taskId);
      let success = false;

      runInAction(() => {
        if (response.success) {
          // Mevcut task listesini güncelle
          this.fetchTasks();
          success = true;
        } else {
          this.setError(response.message || "Görev silinirken bir hata oluştu");
        }
      });

      return success;
    } catch (err: any) {
      runInAction(() => {
        this.setError(
          err.response?.data?.message || "Görev silinirken bir hata oluştu"
        );
        console.error("Error deleting task:", err);
      });
      return false;
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

  getFilteredTasks() {
    return this.tasks.filter((task) => {
      const matchesStatus =
        this.filters.status === "all" ||
        task.status === Number(this.filters.status);
      const matchesPriority =
        this.filters.priority === "all" ||
        task.priority === Number(this.filters.priority);
      const matchesDepartment =
        this.filters.department === "all" ||
        task.departmentId === this.filters.department;
      const matchesAssignedTo =
        this.filters.assignedTo === "all" ||
        task.assignedToId === this.filters.assignedTo;

      return (
        matchesStatus &&
        matchesPriority &&
        matchesDepartment &&
        matchesAssignedTo
      );
    });
  }

  getTasksByStatus(status: TaskStatus) {
    return this.tasks.filter((task) => task.status === Number(status));
  }

  getTaskCounts() {
    return {
      all: this.tasks.length,
      created: this.getTasksByStatus(TaskStatus.Created).length,
      assigned: this.getTasksByStatus(TaskStatus.Assigned).length,
      inProgress: this.getTasksByStatus(TaskStatus.InProgress).length,
      completed: this.getTasksByStatus(TaskStatus.Completed).length,
      rejected: this.getTasksByStatus(TaskStatus.Rejected).length,
    };
  }
}

export const taskStore = new TaskStore();
