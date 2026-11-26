import type { SessaoEstudo, TipoConteudo } from "../../services/progresso";

export interface DescricaoRetomada {
  legenda: string;
  titulo: string;
  caractere: string;
  percentual: number | null;
  detalhe: string;
  rota: string;
  rotuloBotao: string;
}

interface ConfiguracaoTipo {
  legenda: string;
  titulo: string;
  caractere: string;
  unidade: string;
  rota: string;
}

const configuracaoPorTipo: Record<TipoConteudo, ConfiguracaoTipo> = {
  HIRAGANA: {
    legenda: "Flashcards · Hiragana",
    titulo: "Leitura dos caracteres",
    caractere: "あ",
    unidade: "hiragana revisados",
    rota: "/flashcards/hiragana",
  },
  KATAKANA: {
    legenda: "Flashcards · Katakana",
    titulo: "Leitura dos caracteres",
    caractere: "ア",
    unidade: "katakana revisados",
    rota: "/flashcards/katakana",
  },
  KANJI: {
    legenda: "Flashcards · Kanji",
    titulo: "Leitura e significado",
    caractere: "漢",
    unidade: "kanji revisados",
    rota: "/flashcards/kanji",
  },
  IMAGEM: {
    legenda: "Flashcards · Palavras com imagem",
    titulo: "Escolha a palavra da imagem",
    caractere: "絵",
    unidade: "palavras revisadas",
    rota: "/flashcards/imagens",
  },
  FRASE: {
    legenda: "Frases",
    titulo: "Complete a frase",
    caractere: "文",
    unidade: "frases concluídas",
    rota: "/frases",
  },
};

export const CONVITE_INICIAL: DescricaoRetomada = {
  legenda: "Primeiro treino",
  titulo: "Você ainda não começou nenhum treino",
  caractere: "始",
  percentual: null,
  detalhe: "Comece pelos hiragana ou escolha outro conteúdo no menu.",
  rota: "/flashcards/hiragana",
  rotuloBotao: "Começar",
};

export function descreverSessao(sessao: SessaoEstudo): DescricaoRetomada {
  const configuracao = configuracaoPorTipo[sessao.tipoConteudo];
  const percentual =
    sessao.totalItens > 0
      ? Math.min(100, Math.round((sessao.posicao / sessao.totalItens) * 100))
      : 0;

  return {
    legenda: configuracao.legenda,
    titulo: configuracao.titulo,
    caractere: configuracao.caractere,
    percentual,
    detalhe: `${percentual}% · ${sessao.posicao} de ${sessao.totalItens} ${configuracao.unidade}`,
    rota: configuracao.rota,
    rotuloBotao: "Continuar",
  };
}
