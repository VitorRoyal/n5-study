import { ErroApi, requisicaoApi, requisicaoApiOuNulo } from "./api";

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
    return await requisicaoApi<ResumoProgresso>("/progresso/resumo");
  } catch (erro) {
    if (erro instanceof ErroApi) {
      return RESUMO_VAZIO;
    }
    throw erro;
  }
}

export async function buscarSessao(): Promise<SessaoEstudo | null> {
  try {
    return await requisicaoApiOuNulo<SessaoEstudo>("/progresso/sessao");
  } catch (erro) {
    if (erro instanceof ErroApi) {
      return null;
    }
    throw erro;
  }
}

export function registrarResposta(resposta: NovaResposta): Promise<RespostaRegistrada> {
  return requisicaoApi<RespostaRegistrada>("/progresso/respostas", {
    method: "POST",
    body: resposta,
  });
}

export function salvarSessao(sessao: AtualizacaoSessao): Promise<SessaoEstudo> {
  return requisicaoApi<SessaoEstudo>("/progresso/sessao", {
    method: "PUT",
    body: sessao,
  });
}

export function registrarRespostaEmSegundoPlano(resposta: NovaResposta): void {
  void registrarResposta(resposta).catch(() => undefined);
}

export function salvarSessaoEmSegundoPlano(sessao: AtualizacaoSessao): void {
  void salvarSessao(sessao).catch(() => undefined);
}
