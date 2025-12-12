import axios from "axios";

const api = axios.create({
  baseURL: "https://sujathas-essentials-backend.onrender.com/api",
  withCredentials: true,
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const token = JSON.parse(userInfo).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
