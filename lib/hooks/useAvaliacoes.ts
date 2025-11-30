// lib/hooks/useAvaliacoes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { avaliacaoApi } from '@/lib/api/avaliacaoApi';
import type { CreateAvaliacaoRequest, UpdateAvaliacaoRequest } from '@/lib/types';
import { useAuth } from './useAuth';

export function useAvaliacoes() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const avaliadorId = user?.perfilProfessor?.id;

  // Query: Todas as avaliações
  const avaliacoesQuery = useQuery({
    queryKey: ['avaliacoes'],
    queryFn: avaliacaoApi.getAll,
  });

  // Query: Minhas avaliações (do professor logado)
  const minhasAvaliacoesQuery = useQuery({
    queryKey: ['minhas-avaliacoes', avaliadorId],
    queryFn: () => avaliacaoApi.getByAvaliadorId(avaliadorId!),
    enabled: !!avaliadorId,
  });

  // Query: Avaliações por equipe
  const useAvaliacoesByEquipe = (equipeId: string) =>
    useQuery({
      queryKey: ['avaliacoes-equipe', equipeId],
      queryFn: () => avaliacaoApi.getByEquipeId(equipeId),
      enabled: !!equipeId,
    });

  // Query: Avaliação por ID
  const useAvaliacaoById = (id: string) =>
    useQuery({
      queryKey: ['avaliacao', id],
      queryFn: () => avaliacaoApi.getById(id),
      enabled: !!id,
    });

  // Query: Média de uma equipe
  const useMediaEquipe = (equipeId: string) =>
    useQuery({
      queryKey: ['media-equipe', equipeId],
      queryFn: () => avaliacaoApi.getMediaEquipe(equipeId),
      enabled: !!equipeId,
    });

  // Query: Média geral
  const mediaGeralQuery = useQuery({
    queryKey: ['media-geral'],
    queryFn: avaliacaoApi.getMediaGeral,
  });

  // Mutation: Criar avaliação
  const createMutation = useMutation({
    mutationFn: (data: CreateAvaliacaoRequest) => avaliacaoApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avaliacoes'] });
      queryClient.invalidateQueries({ queryKey: ['minhas-avaliacoes'] });
      queryClient.invalidateQueries({ queryKey: ['avaliacoes-equipe'] });
      queryClient.invalidateQueries({ queryKey: ['media-equipe'] });
      queryClient.invalidateQueries({ queryKey: ['media-geral'] });
    },
  });

  // Mutation: Atualizar avaliação
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAvaliacaoRequest }) =>
      avaliacaoApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avaliacoes'] });
      queryClient.invalidateQueries({ queryKey: ['minhas-avaliacoes'] });
      queryClient.invalidateQueries({ queryKey: ['avaliacao'] });
      queryClient.invalidateQueries({ queryKey: ['media-equipe'] });
    },
  });

  // Mutation: Deletar avaliação
  const deleteMutation = useMutation({
    mutationFn: (id: string) => avaliacaoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avaliacoes'] });
      queryClient.invalidateQueries({ queryKey: ['minhas-avaliacoes'] });
    },
  });

  return {
    // Queries
    avaliacoes: avaliacoesQuery.data || [],
    isLoadingAvaliacoes: avaliacoesQuery.isLoading,

    minhasAvaliacoes: minhasAvaliacoesQuery.data || [],
    isLoadingMinhasAvaliacoes: minhasAvaliacoesQuery.isLoading,

    mediaGeral: mediaGeralQuery.data || 0,
    isLoadingMediaGeral: mediaGeralQuery.isLoading,

    // Query hooks individuais
    useAvaliacoesByEquipe,
    useAvaliacaoById,
    useMediaEquipe,

    // Mutations
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,

    // Status
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}