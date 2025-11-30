
export enum UserRole {
  Admin = 'Admin',
  Professor = 'Professor',
  Aluno = 'Aluno',
  Coordenador = 'Coordenador',
}

export interface PerfilAluno {
  id?: string;
  usuarioId?: string;
  curso: string;
  turno: string;
  isActive?: boolean;
}

export interface PerfilProfessor {
  id?: string;
  usuarioId?: string;
  departamento: string;
  titulacao: string;
  areaEspecializacao: string;
  isActive?: boolean;
}

export interface Usuario {
  id: string;
  matricula: string;
  nome: string;
  email: string;
  role: UserRole;
  senhaHash?: string;
  isActive?: boolean;
  criadoEm?: string;
  alteradoEm?: string;
  perfilAluno?: PerfilAluno;
  perfilProfessor?: PerfilProfessor;
}

export interface UsuarioWithDetails extends Usuario {
  totalProjetos?: number;
}