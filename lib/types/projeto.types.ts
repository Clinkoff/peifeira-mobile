// lib/types/projeto.types.ts

export type StatusProjeto = 1 | 2 | 3 | 4 | 5;

export const StatusProjetoLabels: Record<StatusProjeto, string> = {
  1: 'Em Andamento',
  2: 'Concluído',
  3: 'Cancelado',
  4: 'Aprovado',
  5: 'Reprovado',
};

// Para mobile, vamos usar cores simples
export const StatusProjetoColors: Record<StatusProjeto, string> = {
  1: '#3B82F6', // Azul - Em Andamento
  2: '#10B981', // Verde - Concluído
  3: '#EF4444', // Vermelho - Cancelado
  4: '#059669', // Verde escuro - Aprovado
  5: '#F97316', // Laranja - Reprovado
};

export interface Projeto {
  id: string;
  isActive: boolean;
  disciplinaPIId: string;
  equipeId: string;
  titulo: string;
  desafioProposto: string;
  status: StatusProjeto;
  
  // Dados da empresa/local (opcionais)
  nomeEmpresa?: string;
  enderecoCompleto?: string;
  cidade?: string;
  redeSocial?: string;
  contato?: string;
  
  // Dados do responsável na empresa (opcionais)
  nomeResponsavel?: string;
  cargoResponsavel?: string;
  telefoneResponsavel?: string;
  emailResponsavel?: string;
  redesSociaisResponsavel?: string;
  
  // Dados relacionados
  nomeEquipe?: string;
  nomeDisciplinaPI?: string;
  quantidadeMembros?: number;
  criadoEm?: string;
  alteradoEm?: string;
}

export interface LiderProjetoInfo {
  id: string;
  nome: string;
  email: string;
}

export interface MembroProjetoInfo {
  id: string;
  nome: string;
  email: string;
}

export interface EquipeProjetoInfo {
  id: string;
  nome: string;
  lider?: LiderProjetoInfo;
  membros: MembroProjetoInfo[];
}

export interface DisciplinaPIProjetoInfo {
  id: string;
  nome: string;
  professor?: string;
}

export interface AvaliacaoResumo {
  id: string;
  nota: number;
  avaliador: string;
  dataAvaliacao: string;
}

export interface ProjetoDetail extends Projeto {
  equipe?: EquipeProjetoInfo;
  disciplinaPI?: DisciplinaPIProjetoInfo;
  avaliacoes?: AvaliacaoResumo[];
}

// Helper para converter retorno do backend
export function parseProjetoStatus(status: string | number): StatusProjeto {
  if (typeof status === 'number') return status as StatusProjeto;
  if (!isNaN(Number(status))) {
    return Number(status) as StatusProjeto;
  }
  
  const s = status.toLowerCase();
  if (s === 'emandamento') return 1;
  if (s === 'concluido') return 2;
  if (s === 'cancelado') return 3;
  if (s === 'aprovado') return 4;
  if (s === 'reprovado') return 5;

  return 1;
}