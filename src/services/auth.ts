import { apiRequest, removeStoredToken, writeStoredToken } from "./api";

export type UserRole = "ADMIN" | "ESTUDANTE";

export interface AuthenticatedUser {
  id: number;
  nomeUsuario: string;
  papel: UserRole;
  criadoEm: string;
}

interface LoginResponse {
  token: string;
  tipoToken: string;
  expiraEmSegundos: number;
  usuario: AuthenticatedUser;
}

export async function login(nomeUsuario: string, senha: string): Promise<AuthenticatedUser> {
  const response = await apiRequest<LoginResponse>("/autenticacao/login", {
    method: "POST",
    body: { nomeUsuario, senha },
    authenticated: false,
  });

  writeStoredToken(response.token);

  return response.usuario;
}

export async function register(nomeUsuario: string, senha: string): Promise<AuthenticatedUser> {
  const response = await apiRequest<LoginResponse>("/autenticacao/cadastro", {
    method: "POST",
    body: { nomeUsuario, senha },
    authenticated: false,
  });

  writeStoredToken(response.token);

  return response.usuario;
}

export function fetchCurrentUser(): Promise<AuthenticatedUser> {
  return apiRequest<AuthenticatedUser>("/usuarios/eu");
}

export function clearSession() {
  removeStoredToken();
}
