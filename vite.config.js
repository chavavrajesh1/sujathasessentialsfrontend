import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/", // ⭐ FIX FOR VERCEL REFRESH + ASSET 404

  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "https://sujathas-essentials-backend.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: "dist",
  },
});
