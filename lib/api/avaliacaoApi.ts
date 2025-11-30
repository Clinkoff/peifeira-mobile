// lib/api/avaliacaoApi.ts
import { apiClient } from './client';
import type {
  AvaliacaoResponse,
  CreateAvaliacaoRequest,
  UpdateAvaliacaoRequest,
} from '@/lib/types';

export const avaliacaoApi = {
  // Criar avaliação
  create: async (data: CreateAvaliacaoRequest): Promise<AvaliacaoResponse> => {
    const response = await apiClient.post<AvaliacaoResponse>('/api/avaliacoes', data);
    return response.data;
  },

  // Buscar por ID
  getById: async (id: string): Promise<AvaliacaoResponse> => {
    const response = await apiClient.get<AvaliacaoResponse>(`/api/avaliacoes/${id}`);
    return response.data;
  },

  // Listar todas
  getAll: async (): Promise<AvaliacaoResponse[]> => {
    const response = await apiClient.get<AvaliacaoResponse[]>('/api/avaliacoes');
    return response.data;
  },

  // Listar por equipe
  getByEquipeId: async (equipeId: string): Promise<AvaliacaoResponse[]> => {
    const response = await apiClient.get<AvaliacaoResponse[]>(
      `/api/avaliacoes/equipe/${equipeId}`
    );
    return response.data;
  },

  // Listar minhas avaliações (do professor logado)
  getByAvaliadorId: async (avaliadorId: string): Promise<AvaliacaoResponse[]> => {
    const response = await apiClient.get<AvaliacaoResponse[]>(
      `/api/avaliacoes/avaliador/${avaliadorId}`
    );
    return response.data;
  },

  // Obter média de uma equipe
  getMediaEquipe: async (equipeId: string): Promise<number> => {
    const response = await apiClient.get<{ equipeId: string; media: number }>(
      `/api/avaliacoes/equipe/${equipeId}/media`
    );
    return response.data.media;
  },

  // Obter média geral
  getMediaGeral: async (): Promise<number> => {
    const response = await apiClient.get<{ media: number }>('/api/avaliacoes/media-geral');
    return response.data.media;
  },

  // Listar por faixa de nota
  getByFaixaNota: async (min: number = 0, max: number = 10): Promise<AvaliacaoResponse[]> => {
    const response = await apiClient.get<AvaliacaoResponse[]>(
      `/api/avaliacoes/faixa-nota?min=${min}&max=${max}`
    );
    return response.data;
  },

  // Atualizar
  update: async (id: string, data: UpdateAvaliacaoRequest): Promise<AvaliacaoResponse> => {
    const response = await apiClient.put<AvaliacaoResponse>(`/api/avaliacoes/${id}`, data);
    return response.data;
  },

  // Deletar
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/avaliacoes/${id}`);
  },
};