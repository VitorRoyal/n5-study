import { ApiError, apiRequest, apiRequestOrNull } from "./api";

export type TipoConteudo = "HIRAGANA" | "KATAKANA" | "KANJI" | "IMAGEM" | "FRASE";

export interface ResumoPorTipo {
  tipoConteudo: TipoConteudo;
  acertos: number;
  erros: number;
  revisados: number;
}

export interface ResumoProgresso {
  totalAcertos: number;
  totalErros: number;
  palavrasRevisadas: number;
  sequenciaAtual: number;
  melhorSequencia: number;
  porTipo: ResumoPorTipo[];
}

export interface SessaoEstudo {
  tipoConteudo: TipoConteudo;
  itemId: string;
  posicao: number;
  totalItens: number;
  atualizadoEm: string;
}

export interface RespostaRegistrada {
  id: number;
  tipoConteudo: TipoConteudo;
  itemId: string;
  acertou: boolean;
  respondidoEm: string;
}

export interface NovaResposta {
  tipoConteudo: TipoConteudo;
  itemId: string;
  acertou: boolean;
}

export interface AtualizacaoSessao {
  tipoConteudo: TipoConteudo;
  itemId: string;
  posicao: number;
  totalItens: number;
}

export const RESUMO_VAZIO: ResumoProgresso = {
  totalAcertos: 0,
  totalErros: 0,
  palavrasRevisadas: 0,
  sequenciaAtual: 0,
  melhorSequencia: 0,
  porTipo: [],
};

export async function buscarResumo(): Promise<ResumoProgresso> {
  try {
    return await apiRequest<ResumoProgresso>("/progresso/resumo");
  } catch (erro) {
    if (erro instanceof ApiError) {
      return RESUMO_VAZIO;
    }
    throw erro;
  }
}

export async function buscarSessao(): Promise<SessaoEstudo | null> {
  try {
    return await apiRequestOrNull<SessaoEstudo>("/progresso/sessao");
  } catch (erro) {
    if (erro instanceof ApiError) {
      return null;
    }
    throw erro;
  }
}

export function registrarResposta(resposta: NovaResposta): Promise<RespostaRegistrada> {
  return apiRequest<RespostaRegistrada>("/progresso/respostas", {
    method: "POST",
    body: resposta,
  });
}

export function salvarSessao(sessao: AtualizacaoSessao): Promise<SessaoEstudo> {
  return apiRequest<SessaoEstudo>("/progresso/sessao", {
    method: "PUT",
    body: sessao,
  });
}
