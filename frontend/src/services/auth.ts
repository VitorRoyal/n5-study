import { requisicaoApi, removerTokenArmazenado, gravarTokenArmazenado } from "./api";

export type PapelUsuario = "ADMIN" | "ESTUDANTE";

export interface UsuarioAutenticado {
  id: number;
  nomeUsuario: string;
  papel: PapelUsuario;
  criadoEm: string;
}

interface RespostaLogin {
  token: string;
  tipoToken: string;
  expiraEmSegundos: number;
  usuario: UsuarioAutenticado;
}

export async function login(nomeUsuario: string, senha: string): Promise<UsuarioAutenticado> {
  const resposta = await requisicaoApi<RespostaLogin>("/autenticacao/login", {
    method: "POST",
    body: { nomeUsuario, senha },
    autenticada: false,
  });

  gravarTokenArmazenado(resposta.token);

  return resposta.usuario;
}

export async function registrar(nomeUsuario: string, senha: string): Promise<UsuarioAutenticado> {
  const resposta = await requisicaoApi<RespostaLogin>("/autenticacao/cadastro", {
    method: "POST",
    body: { nomeUsuario, senha },
    autenticada: false,
  });

  gravarTokenArmazenado(resposta.token);

  return resposta.usuario;
}

export function buscarUsuarioAtual(): Promise<UsuarioAutenticado> {
  return requisicaoApi<UsuarioAutenticado>("/usuarios/eu");
}

export function limparSessao() {
  removerTokenArmazenado();
}
