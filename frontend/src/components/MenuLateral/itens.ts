export type NomeIcone =
  | "inicio"
  | "flashcards"
  | "provas"
  | "frases"
  | "progresso"
  | "medalhas"
  | "sair";

export interface SubitemMenu {
  rotulo: string;
  rota: string | null;
}

export interface ItemMenu {
  rotulo: string;
  icone: NomeIcone;
  rota: string | null;
  acao?: "sair";
  subitens?: SubitemMenu[];
}

export interface GrupoMenu {
  titulo: string;
  itens: ItemMenu[];
}

export const caminhosIcones: Record<NomeIcone, string> = {
  inicio: "M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  flashcards: "M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM8 9h8M8 13h5",
  provas: "M6 3h12v18l-6-4-6 4z",
  frases: "M4 5h16M4 10h16M4 15h10",
  progresso: "M4 19V9M10 19V4M16 19v-7M22 19H2",
  medalhas: "M12 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM8 14l-2 7 6-3 6 3-2-7",
  sair: "M15 5V3H4v18h11v-2M19 12H9m10 0l-3-3m3 3l-3 3",
};

export const gruposMenu: GrupoMenu[] = [
  {
    titulo: "Estudar",
    itens: [
      { rotulo: "Início", icone: "inicio", rota: "/" },
      {
        rotulo: "Flashcards",
        icone: "flashcards",
        rota: null,
        subitens: [
          { rotulo: "Hiragana", rota: "/flashcards/hiragana" },
          { rotulo: "Katakana", rota: "/flashcards/katakana" },
          { rotulo: "Kanji", rota: "/flashcards/kanji" },
          { rotulo: "Palavras com imagem", rota: "/flashcards/imagens" },
        ],
      },
      {
        rotulo: "Provas",
        icone: "provas",
        rota: null,
        subitens: [
          { rotulo: "JLPT N5", rota: null },
          { rotulo: "JLPT N4", rota: null },
        ],
      },
      { rotulo: "Frases", icone: "frases", rota: "/frases" },
    ],
  },
  {
    titulo: "Minha conta",
    itens: [
      { rotulo: "Meu progresso", icone: "progresso", rota: null },
      { rotulo: "Medalhas", icone: "medalhas", rota: null },
      { rotulo: "Sair", icone: "sair", rota: null, acao: "sair" },
    ],
  },
];
