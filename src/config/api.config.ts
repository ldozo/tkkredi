export const API_CONFIG = {
  BASE_URL: "http://167.86.125.48:8045",
  TIMEOUT: 30000,
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/Users/login",
      LOGOUT: "/api/Users/logout",
    },
    USERS: {
      BASE: "/api/Users",
      GET_ALL: "/api/Users",
    },
    TASKS: {
      BASE: "/api/Tasks",
      GET_ALL: "/api/Tasks",
      GET_BY_ID: (id: string) => `/api/Tasks/${id}`,
      CREATE: "/api/Tasks",
      UPDATE: (id: string) => `/api/Tasks/${id}`,
      DELETE: (id: string) => `/api/Tasks/${id}`,
      GET_MY_TASKS: "/api/Tasks/my-tasks",
      GET_CREATED_TASKS: "/api/Tasks/created",
      GET_DEPARTMENT_TASKS: (departmentId: string) =>
        `/api/Tasks/department/${departmentId}`,
      COMPLETE_TASK: (id: string) => `/api/Tasks/${id}/complete`,
      REJECT_TASK: (id: string) => `/api/Tasks/${id}/reject`,
    },
  },
};
