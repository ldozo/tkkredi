export var API_CONFIG = {
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
            GET_BY_ID: function (id) { return "/api/Tasks/".concat(id); },
            CREATE: "/api/Tasks",
            UPDATE: function (id) { return "/api/Tasks/".concat(id); },
            DELETE: function (id) { return "/api/Tasks/".concat(id); },
            GET_MY_TASKS: "/api/Tasks/my-tasks",
            GET_CREATED_TASKS: "/api/Tasks/created",
            GET_DEPARTMENT_TASKS: function (departmentId) {
                return "/api/Tasks/department/".concat(departmentId);
            },
            COMPLETE_TASK: function (id) { return "/api/Tasks/".concat(id, "/complete"); },
            REJECT_TASK: function (id) { return "/api/Tasks/".concat(id, "/reject"); },
        },
    },
};
