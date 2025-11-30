// lib/hooks/useEquipes.ts
import { useQuery } from '@tanstack/react-query';
import { equipeApi } from '@/lib/api/equipeApi';

export function useEquipes() {
  // Query: Todas as equipes
  const equipesQuery = useQuery({
    queryKey: ['equipes'],
    queryFn: equipeApi.getAll,
  });

  // Query: Equipes ativas
  const equipesAtivasQuery = useQuery({
    queryKey: ['equipes-ativas'],
    queryFn: equipeApi.getActive,
  });

  // Query: Equipes com projeto (que podem ser avaliadas)
  const equipesComProjetoQuery = useQuery({
    queryKey: ['equipes-com-projeto'],
    queryFn: equipeApi.getComProjeto,
  });

  // Query: Equipe por ID
  const useEquipeById = (id: string) =>
    useQuery({
      queryKey: ['equipe', id],
      queryFn: () => equipeApi.getById(id),
      enabled: !!id,
    });

  return {
    equipes: equipesQuery.data || [],
    isLoadingEquipes: equipesQuery.isLoading,

    equipesAtivas: equipesAtivasQuery.data || [],
    isLoadingAtivas: equipesAtivasQuery.isLoading,

    equipesComProjeto: equipesComProjetoQuery.data || [],
    isLoadingComProjeto: equipesComProjetoQuery.isLoading,

    useEquipeById,
  };
}