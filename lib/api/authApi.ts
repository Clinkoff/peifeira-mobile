// lib/api/authApi.ts
import { apiClient } from './client';
import type { LoginRequest, LoginResponse, Usuario } from '@/lib/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
    return response.data;
  },

  getMe: async (): Promise<Usuario> => {
    const response = await apiClient.get<Usuario>('/api/auth/me');
    return response.data;
  },
};