export declare const API_CONFIG: {
    BASE_URL: string;
    TIMEOUT: number;
    HEADERS: {
        "Content-Type": string;
        Accept: string;
    };
    ENDPOINTS: {
        AUTH: {
            LOGIN: string;
            LOGOUT: string;
        };
        USERS: {
            BASE: string;
            GET_ALL: string;
        };
        TASKS: {
            BASE: string;
            GET_ALL: string;
            GET_BY_ID: (id: string) => string;
            CREATE: string;
            UPDATE: (id: string) => string;
            DELETE: (id: string) => string;
            GET_MY_TASKS: string;
            GET_CREATED_TASKS: string;
            GET_DEPARTMENT_TASKS: (departmentId: string) => string;
            COMPLETE_TASK: (id: string) => string;
            REJECT_TASK: (id: string) => string;
        };
    };
};
