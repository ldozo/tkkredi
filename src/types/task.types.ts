export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  assignedToName: string;
  departmentId: string;
  departmentName: string;
  createdAt: string;
  dueDate: string;
  createdByName: string;
}

export interface TaskResponse {
  success: boolean;
  message: string;
  data: Task[];
}
