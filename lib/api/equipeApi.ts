// lib/api/equipeApi.ts
import { apiClient } from './client';
import type { EquipeResponse, EquipeDetailResponse } from '@/lib/types/equipe.types';

export const equipeApi = {
  // Listar todas equipes
  getAll: async (): Promise<EquipeResponse[]> => {
    const response = await apiClient.get<EquipeResponse[]>('/api/equipes');
    return response.data;
  },

  // Listar apenas ativas
  getActive: async (): Promise<EquipeResponse[]> => {
    const response = await apiClient.get<EquipeResponse[]>('/api/equipes/ativas');
    return response.data;
  },

  // Buscar por ID com detalhes
  getById: async (id: string): Promise<EquipeDetailResponse> => {
    const response = await apiClient.get<EquipeDetailResponse>(`/api/equipes/${id}`);
    return response.data;
  },

  // Listar equipes com projeto (que podem ser avaliadas)
  getComProjeto: async (): Promise<EquipeResponse[]> => {
    const response = await apiClient.get<EquipeResponse[]>('/api/equipes/com-projeto');
    return response.data;
  },
};