import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { API_CONFIG } from "./src/config/api.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: API_CONFIG.BASE_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("Proxy Request:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("Proxy Response:", proxyRes.statusCode, req.url);
          });
          proxy.on("error", (err, req, res) => {
            console.log("Proxy Error:", err);
          });
        },
      },
    },
  },
});
