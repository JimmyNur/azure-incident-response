import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  
  // Farmer
  getProfile: () => apiClient.get('/farmer/profile'),
  updateProfile: (data: any) => apiClient.put('/farmer/profile', data),
  
  // AI Analysis
  analyzeLeaf: (formData: FormData) =>
    apiClient.post('/ai/analyze-leaf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  // Analytics
  getFieldHealth: (farmId: string, startDate?: string, endDate?: string) =>
    apiClient.get('/analytics/field-health', {
      params: { farm_id: farmId, start_date: startDate, end_date: endDate },
    }),
  
  // Market
  getMarketPrices: (crop?: string, region?: string, days?: number) =>
    apiClient.get('/market/prices', {
      params: { crop, region, days },
    }),
  
  // Reports
  generateReport: (data: any) =>
    apiClient.post('/reports/generate', data),
  getReportStatus: (reportId: string) =>
    apiClient.get(`/reports/${reportId}/status`),
  listReports: (farmId?: string) =>
    apiClient.get('/reports', { params: { farm_id: farmId } }),
};

export default apiClient;
