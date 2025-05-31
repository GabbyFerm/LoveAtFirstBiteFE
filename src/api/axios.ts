import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7211/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the token to each request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
