const urlApiAmbiente: unknown = import.meta.env.VITE_API_URL;

export const URL_BASE_API =
  typeof urlApiAmbiente === "string" && urlApiAmbiente.length > 0
    ? urlApiAmbiente
    : "http://localhost:8080/api/v1";

const CHAVE_ARMAZENAMENTO_TOKEN = "n5study.token";

export class ErroApi extends Error {
  readonly status: number;
  readonly detalhes: string[];

  constructor(status: number, message: string, detalhes: string[]) {
    super(message);
    this.name = "ErroApi";
    this.status = status;
    this.detalhes = detalhes;
  }
}

export function lerTokenArmazenado(): string | null {
  try {
    return window.localStorage.getItem(CHAVE_ARMAZENAMENTO_TOKEN);
  } catch {
    return null;
  }
}

export function gravarTokenArmazenado(token: string) {
  try {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO_TOKEN, token);
  } catch {
    return;
  }
}

export function removerTokenArmazenado() {
  try {
    window.localStorage.removeItem(CHAVE_ARMAZENAMENTO_TOKEN);
  } catch {
    return;
  }
}

interface CorpoErro {
  mensagem?: string;
  detalhes?: string[];
}

interface OpcoesRequisicao {
  method?: "GET" | "POST" | "PUT";
  body?: unknown;
  autenticada?: boolean;
}

async function enviarRequisicao(caminho: string, opcoes: OpcoesRequisicao): Promise<Response> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (opcoes.autenticada !== false) {
    const token = lerTokenArmazenado();
    if (token !== null) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let resposta: Response;

  try {
    resposta = await fetch(`${URL_BASE_API}${caminho}`, {
      method: opcoes.method ?? "GET",
      headers,
      body: opcoes.body === undefined ? undefined : JSON.stringify(opcoes.body),
    });
  } catch {
    throw new ErroApi(0, "Nao foi possivel conectar ao servidor.", []);
  }

  if (!resposta.ok) {
    throw await montarErroApi(resposta);
  }

  return resposta;
}

export async function requisicaoApi<T>(caminho: string, opcoes: OpcoesRequisicao = {}): Promise<T> {
  const resposta = await enviarRequisicao(caminho, opcoes);

  return (await resposta.json()) as T;
}

export async function requisicaoApiOuNulo<T>(
  caminho: string,
  opcoes: OpcoesRequisicao = {}
): Promise<T | null> {
  const resposta = await enviarRequisicao(caminho, opcoes);

  if (resposta.status === 204) {
    return null;
  }

  return (await resposta.json()) as T;
}

async function montarErroApi(resposta: Response): Promise<ErroApi> {
  let conteudoErro: CorpoErro = {};

  try {
    conteudoErro = (await resposta.json()) as CorpoErro;
  } catch {
    conteudoErro = {};
  }

  return new ErroApi(
    resposta.status,
    conteudoErro.mensagem ?? "Nao foi possivel completar a requisicao.",
    conteudoErro.detalhes ?? []
  );
}
