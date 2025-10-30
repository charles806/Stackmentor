import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Payment APIs
export const initializePayment = async (paymentData) => {
  const response = await api.post("/payments/initialize", paymentData);
  return response.data;
};

export const verifyPayment = async (reference) => {
  const response = await api.get(`/payments/verify/${reference}`);
  return response.data;
};

// User APIs
export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const checkUserAccess = async () => {
  const response = await api.get("/users/check-access");
  return response.data;
};

export default api;
