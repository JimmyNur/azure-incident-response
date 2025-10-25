import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
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
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      await AsyncStorage.removeItem('auth_token');
      // Navigate to login screen
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
  listReports: (farmId?: string) =>
    apiClient.get('/reports', { params: { farm_id: farmId } }),
};

export default apiClient;
