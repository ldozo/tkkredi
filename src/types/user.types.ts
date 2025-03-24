export interface User {
  id: string;
  email: string;
  name: string;
  departmentId: string;
  departmentName: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User[];
}
