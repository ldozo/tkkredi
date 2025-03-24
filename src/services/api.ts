import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import { authStore } from "../stores/auth.store";
import { loaderStore } from "../stores/loader.store";

const api = axios.create({
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Loader'ı göster
    loaderStore.showLoader();

    // Token varsa ekle
    const token = authStore.getToken();
    if (token) {
      console.log("Token being sent:", token);
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Request URL:", config.url);
    }
    return config;
  },
  (error) => {
    // Hata durumunda loader'ı gizle
    loaderStore.hideLoader();
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Başarılı yanıtta loader'ı gizle
    loaderStore.hideLoader();
    return response;
  },
  (error) => {
    // Hata durumunda loader'ı gizle
    loaderStore.hideLoader();

    console.log(
      "Response Error:",
      error.response?.status,
      error.response?.data
    );
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş
      authStore.clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
