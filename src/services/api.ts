import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import { authStore } from "../stores/auth.store";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Token varsa ekle
    const token = authStore.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş
      authStore.clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
