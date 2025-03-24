import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

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
        target: "http://167.86.125.48:8045",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("Proxy Request URL:", req.url);
            console.log("Proxy Request Method:", req.method);
            console.log("Proxy Request Headers:", proxyReq.getHeaders());
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("Proxy Response Status:", proxyRes.statusCode);
            console.log("Original Request URL:", req.url);
          });
          proxy.on("error", (err, req, res) => {
            console.log("Proxy Error:", err);
          });
        },
      },
    },
  },
});
