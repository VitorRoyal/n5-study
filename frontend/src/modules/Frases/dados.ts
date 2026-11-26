export interface TokenFrase {
  texto: string;
  romaji?: string;
  traducao?: string;
}

export interface ItemFrase {
  id: string;
  antes: TokenFrase[];
  depois: TokenFrase[];
  resposta: string;
  opcoes: string[];
  traducao: string;
  explicacao: string;
}

export const frases: ItemFrase[] = [
  {
    id: "st-1",
    antes: [{ texto: "わたし", romaji: "watashi", traducao: "eu" }],
    depois: [
      { texto: "がくせい", romaji: "gakusei", traducao: "estudante" },
      { texto: "です", romaji: "desu", traducao: "é (verbo de ligação)" },
      { texto: "。" },
    ],
    resposta: "は",
    opcoes: ["は", "を", "に", "で"],
    traducao: "Eu sou estudante.",
    explicacao: "A partícula は marca o tema da frase.",
  },
  {
    id: "st-2",
    antes: [{ texto: "ほん", romaji: "hon", traducao: "livro" }],
    depois: [{ texto: "よみます", romaji: "yomimasu", traducao: "leio, ler" }, { texto: "。" }],
    resposta: "を",
    opcoes: ["を", "は", "が", "へ"],
    traducao: "Eu leio um livro.",
    explicacao: "A partícula を marca o objeto direto da ação.",
  },
  {
    id: "st-3",
    antes: [{ texto: "がっこう", romaji: "gakkou", traducao: "escola" }],
    depois: [{ texto: "いきます", romaji: "ikimasu", traducao: "vou, ir" }, { texto: "。" }],
    resposta: "に",
    opcoes: ["に", "を", "で", "と"],
    traducao: "Eu vou para a escola.",
    explicacao: "A partícula に indica o destino de um movimento.",
  },
  {
    id: "st-4",
    antes: [{ texto: "うち", romaji: "uchi", traducao: "casa" }],
    depois: [
      { texto: "テレビ", romaji: "terebi", traducao: "televisão" },
      { texto: "を", romaji: "o", traducao: "partícula de objeto direto" },
      { texto: "みます", romaji: "mimasu", traducao: "vejo, assistir" },
      { texto: "。" },
    ],
    resposta: "で",
    opcoes: ["で", "に", "を", "は"],
    traducao: "Eu vejo televisão em casa.",
    explicacao: "A partícula で indica o lugar onde a ação acontece.",
  },
  {
    id: "st-5",
    antes: [{ texto: "ともだち", romaji: "tomodachi", traducao: "amigo" }],
    depois: [
      { texto: "はなします", romaji: "hanashimasu", traducao: "converso, falar" },
      { texto: "。" },
    ],
    resposta: "と",
    opcoes: ["と", "を", "に", "が"],
    traducao: "Eu converso com um amigo.",
    explicacao: "A partícula と indica com quem a ação é realizada.",
  },
  {
    id: "st-6",
    antes: [{ texto: "しちじ", romaji: "shichiji", traducao: "sete horas" }],
    depois: [
      { texto: "おきます", romaji: "okimasu", traducao: "acordo, levantar" },
      { texto: "。" },
    ],
    resposta: "に",
    opcoes: ["に", "で", "から", "を"],
    traducao: "Eu acordo às sete horas.",
    explicacao: "A partícula に marca o horário em que algo acontece.",
  },
  {
    id: "st-7",
    antes: [
      { texto: "わたし", romaji: "watashi", traducao: "eu" },
      { texto: "は", romaji: "wa", traducao: "partícula de tema" },
      { texto: "くだもの", romaji: "kudamono", traducao: "fruta" },
    ],
    depois: [
      { texto: "すき", romaji: "suki", traducao: "gostar, do agrado" },
      { texto: "です", romaji: "desu", traducao: "é (verbo de ligação)" },
      { texto: "。" },
    ],
    resposta: "が",
    opcoes: ["が", "を", "に", "へ"],
    traducao: "Eu gosto de frutas.",
    explicacao: "Com すきです, aquilo de que se gosta é marcado por が.",
  },
  {
    id: "st-8",
    antes: [
      { texto: "まいあさ", romaji: "maiasa", traducao: "toda manhã" },
      { texto: "コーヒー", romaji: "koohii", traducao: "café" },
      { texto: "を", romaji: "o", traducao: "partícula de objeto direto" },
    ],
    depois: [{ texto: "。" }],
    resposta: "のみます",
    opcoes: ["のみます", "たべます", "みます", "かきます"],
    traducao: "Toda manhã eu bebo café.",
    explicacao: "のみます significa beber, o verbo usado para bebidas.",
  },
  {
    id: "st-9",
    antes: [
      { texto: "きょうしつ", romaji: "kyoushitsu", traducao: "sala de aula" },
      { texto: "に", romaji: "ni", traducao: "partícula de lugar" },
      { texto: "せんせい", romaji: "sensei", traducao: "professor" },
    ],
    depois: [
      { texto: "います", romaji: "imasu", traducao: "há, estar (seres vivos)" },
      { texto: "。" },
    ],
    resposta: "が",
    opcoes: ["が", "を", "で", "と"],
    traducao: "Há um professor na sala de aula.",
    explicacao: "Em frases de existência com います, o sujeito é marcado por が.",
  },
  {
    id: "st-10",
    antes: [
      { texto: "あたらしい", romaji: "atarashii", traducao: "novo" },
      { texto: "くつ", romaji: "kutsu", traducao: "sapato" },
      { texto: "を", romaji: "o", traducao: "partícula de objeto direto" },
    ],
    depois: [{ texto: "。" }],
    resposta: "かいます",
    opcoes: ["かいます", "ききます", "いきます", "ねます"],
    traducao: "Eu vou comprar sapatos novos.",
    explicacao: "かいます significa comprar.",
  },
];
