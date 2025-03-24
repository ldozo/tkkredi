export enum TaskStatus {
  Created = 0,
  Assigned = 1,
  InProgress = 2,
  Completed = 3,
  Rejected = 4,
}

export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3,
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  dueDate: string;
  completedDate: string | null;
  status: TaskStatus;
  priority: Priority;
  createdById: string;
  createdByName: string;
  assignedToId: string;
  assignedToName: string;
  departmentId: string;
  departmentName: string;
}

export interface TaskResponse {
  success: boolean;
  message?: string;
  data?: Task[];
}
