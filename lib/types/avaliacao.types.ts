// lib/types/avaliacao.types.ts

export interface Avaliacao {
  id: string;
  isActive: boolean;
  equipeId: string; // ← EQUIPE, não Projeto!
  avaliadorId: string; // ← PerfilProfessorId
  
  // Definição do problema (0-5) - 2 critérios
  relevanciaProblema: number;
  fundamentacaoProblema: number;
  
  // Defesa da solução (0-5) - 2 critérios
  focoSolucao: number;
  viabilidadeSolucao: number;
  
  // Apresentação (0-5) - 6 critérios
  clarezaApresentacao: number;
  dominioAssunto: number;
  transmissaoInformacoes: number;
  padronizacaoApresentacao: number;
  linguagemTempo: number;
  qualidadeRespostas: number;
  
  pontuacaoTotal?: number; // Soma de todos (máx 50)
  notaFinal?: number; // Nota de 0-10 (calculada automaticamente)
  comentarios?: string;
  
  criadoEm: string;
  alteradoEm?: string;
}

export interface AvaliacaoResponse extends Avaliacao {
  nomeEquipe?: string;
  nomeAvaliador?: string;
}

export interface CreateAvaliacaoRequest {
  equipeId: string;
  avaliadorId: string;
  
  // Definição do problema (0-5)
  relevanciaProblema: number;
  fundamentacaoProblema: number;
  
  // Defesa da solução (0-5)
  focoSolucao: number;
  viabilidadeSolucao: number;
  
  // Apresentação (0-5)
  clarezaApresentacao: number;
  dominioAssunto: number;
  transmissaoInformacoes: number;
  padronizacaoApresentacao: number;
  linguagemTempo: number;
  qualidadeRespostas: number;
  
  comentarios?: string;
}

export interface UpdateAvaliacaoRequest {
  // Definição do problema (0-5)
  relevanciaProblema: number;
  fundamentacaoProblema: number;
  
  // Defesa da solução (0-5)
  focoSolucao: number;
  viabilidadeSolucao: number;
  
  // Apresentação (0-5)
  clarezaApresentacao: number;
  dominioAssunto: number;
  transmissaoInformacoes: number;
  padronizacaoApresentacao: number;
  linguagemTempo: number;
  qualidadeRespostas: number;
  
  comentarios?: string;
}