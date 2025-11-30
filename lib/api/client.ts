// lib/api/client.ts
import axios from 'axios';
import { storage } from '../utils/storage';

const API_URL = 'http://10.0.2.2:5021/'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      await storage.clear();
      // Você pode redirecionar para login aqui se quiser
    }
    return Promise.reject(error);
  }
);