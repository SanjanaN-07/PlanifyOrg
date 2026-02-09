import axios from 'axios';

// ✅ Base URL for API (Render backend)
const API_URL =
  process.env.REACT_APP_API_URL || 'https://planifyorg.onrender.com';

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// =======================
// AUTH SERVICES
// =======================
export const authService = {
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);

    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);

    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// =======================
// TASK SERVICES
// =======================
export const taskService = {
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/api/tasks?${params}`);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/api/tasks/stats');
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/api/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/api/tasks/${id}`, taskData);
    return response.data;
  },

  toggleTask: async (id) => {
    const response = await api.patch(`/api/tasks/${id}/toggle`);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  },
};

// =======================
// USER SERVICES
// =======================
export const userService = {
  getProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/api/users/profile', userData);
    return response.data;
  },
};

export default api;
