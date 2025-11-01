import axios from "axios";

// ✅ FIXED - Use correct backend URL without /api at the end
const API_BASE_URL = "https://stackmentor-backend-corq.onrender.com/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - Render server might be sleeping");
    }
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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

// Admin APIs
export const getDashboardStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getAllUsers = async (page = 1, limit = 10) => {
  const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await api.get(`/admin/users/search?query=${query}`);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

export const updateUserAccess = async (userId, data) => {
  const response = await api.put(`/admin/users/${userId}/access`, data);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getAllPayments = async (page = 1, limit = 10) => {
  const response = await api.get(`/admin/payments?page=${page}&limit=${limit}`);
  return response.data;
};

// Content APIs
export const getCourseContent = async (course) => {
  const response = await api.get(`/content/${course}`);
  return response.data;
};

export const getContentById = async (contentId) => {
  const response = await api.get(`/content/single/${contentId}`);
  return response.data;
};

export const getContentByCategory = async (course, category) => {
  const response = await api.get(`/content/${course}/${category}`);
  return response.data;
};

export const createContent = async (contentData) => {
  const response = await api.post("/content", contentData);
  return response.data;
};

export const updateContent = async (contentId, contentData) => {
  const response = await api.put(`/content/${contentId}`, contentData);
  return response.data;
};

export const deleteContent = async (contentId) => {
  const response = await api.delete(`/content/${contentId}`);
  return response.data;
};

// Contact
export const sendContactEmail = async (data) => {
  const response = await api.post("/send-mail", {
    to: "c08445333@gmail.com",
    subject: `Contact Form: ${data.fullName}`,
    message: `From: ${data.fullName} (${data.email})\n\n${data.message}`,
  });
  return response.data;
};

// Certificates
export const getUserCertificate = async () => {
  const response = await api.get("/certificates/my-certificate");
  return response.data;
};

export const generateCertificate = async () => {
  const response = await api.post("/certificates/generate");
  return response.data;
};

export const verifyCertificate = async (certificateNumber) => {
  const response = await api.get(`/certificates/verify/${certificateNumber}`);
  return response.data;
};

// Payment History
export const getUserPaymentHistory = async () => {
  const response = await api.get("/content/payments/history");
  return response.data;
};

// Tutor
export const getTutorStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export default api;
