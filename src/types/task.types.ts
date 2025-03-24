export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedToId: string;
  assignedToName: string;
  departmentId: string;
  departmentName: string;
  createdAt: string;
  dueDate: string;
  createdById: string;
  createdByName: string;
}

export interface TaskResponse {
  success: boolean;
  message: string;
  data: Task[];
}
