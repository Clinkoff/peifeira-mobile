export interface Criterio {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'problema' | 'solucao' | 'apresentacao';
  maxPontos: number;
}

export const CRITERIOS: Criterio[] = [
  {
    id: 'relevanciaProblema',
    nome: 'Relevância do Problema',
    descricao: 'O problema identificado é relevante e atual?',
    categoria: 'problema',
    maxPontos: 5,
  },
  {
    id: 'fundamentacaoProblema',
    nome: 'Fundamentação do Problema',
    descricao: 'O problema está bem fundamentado com dados e análises?',
    categoria: 'problema',
    maxPontos: 5,
  },
  {
    id: 'focoSolucao',
    nome: 'Foco da Solução',
    descricao: 'A solução proposta está focada no problema apresentado?',
    categoria: 'solucao',
    maxPontos: 5,
  },
  {
    id: 'viabilidadeSolucao',
    nome: 'Viabilidade da Solução',
    descricao: 'A solução é viável e pode ser implementada?',
    categoria: 'solucao',
    maxPontos: 5,
  },
  {
    id: 'clarezaApresentacao',
    nome: 'Clareza da Apresentação',
    descricao: 'A apresentação é clara e organizada?',
    categoria: 'apresentacao',
    maxPontos: 5,
  },
  {
    id: 'dominioAssunto',
    nome: 'Domínio do Assunto',
    descricao: 'A equipe demonstra domínio sobre o assunto apresentado?',
    categoria: 'apresentacao',
    maxPontos: 5,
  },
  {
    id: 'transmissaoInformacoes',
    nome: 'Transmissão de Informações',
    descricao: 'As informações são transmitidas de forma eficaz?',
    categoria: 'apresentacao',
    maxPontos: 5,
  },
  {
    id: 'padronizacaoApresentacao',
    nome: 'Padronização da Apresentação',
    descricao: 'A apresentação segue um padrão visual adequado?',
    categoria: 'apresentacao',
    maxPontos: 5,
  },
  {
    id: 'linguagemTempo',
    nome: 'Linguagem e Tempo',
    descricao: 'A linguagem é adequada e o tempo foi bem gerenciado?',
    categoria: 'apresentacao',
    maxPontos: 5,
  },
  {
    id: 'qualidadeRespostas',
    nome: 'Qualidade das Respostas',
    descricao: 'As respostas às perguntas foram satisfatórias?',
    categoria: 'apresentacao',
    maxPontos: 5,
  },
];

export const CATEGORIAS = {
  problema: {
    nome: 'Definição do Problema',
    cor: '#F59E0B', // Laranja
    maxPontos: 10,
  },
  solucao: {
    nome: 'Defesa da Solução',
    cor: '#3B82F6', // Azul
    maxPontos: 10,
  },
  apresentacao: {
    nome: 'Apresentação',
    cor: '#8B5CF6', // Roxo
    maxPontos: 30,
  },
};

export const PONTUACAO_MAXIMA = 50;
export const NOTA_MAXIMA = 10;

// Helper para calcular nota final
export function calcularNotaFinal(pontuacaoTotal: number): number {
  return Math.round((pontuacaoTotal / PONTUACAO_MAXIMA) * NOTA_MAXIMA * 100) / 100;
}

// Helper para obter cor da nota
export function getCorNota(nota: number): string {
  if (nota >= 9) return '#10B981'; // Verde escuro - Excelente
  if (nota >= 7) return '#3B82F6'; // Azul - Bom
  if (nota >= 5) return '#F59E0B'; // Laranja - Regular
  return '#EF4444'; // Vermelho - Insuficiente
}

// Helper para obter label da nota
export function getLabelNota(nota: number): string {
  if (nota >= 9) return 'Excelente';
  if (nota >= 7) return 'Bom';
  if (nota >= 5) return 'Regular';
  return 'Insuficiente';
}