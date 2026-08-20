export interface SentenceToken {
  text: string;
  romaji?: string;
  translation?: string;
}

export interface SentenceItem {
  id: string;
  before: SentenceToken[];
  after: SentenceToken[];
  answer: string;
  options: string[];
  translation: string;
  explanation: string;
}

export const sentences: SentenceItem[] = [
  {
    id: "st-1",
    before: [{ text: "わたし", romaji: "watashi", translation: "eu" }],
    after: [
      { text: "がくせい", romaji: "gakusei", translation: "estudante" },
      { text: "です", romaji: "desu", translation: "é (verbo de ligação)" },
      { text: "。" },
    ],
    answer: "は",
    options: ["は", "を", "に", "で"],
    translation: "Eu sou estudante.",
    explanation: "A partícula は marca o tema da frase.",
  },
  {
    id: "st-2",
    before: [{ text: "ほん", romaji: "hon", translation: "livro" }],
    after: [{ text: "よみます", romaji: "yomimasu", translation: "leio, ler" }, { text: "。" }],
    answer: "を",
    options: ["を", "は", "が", "へ"],
    translation: "Eu leio um livro.",
    explanation: "A partícula を marca o objeto direto da ação.",
  },
  {
    id: "st-3",
    before: [{ text: "がっこう", romaji: "gakkou", translation: "escola" }],
    after: [{ text: "いきます", romaji: "ikimasu", translation: "vou, ir" }, { text: "。" }],
    answer: "に",
    options: ["に", "を", "で", "と"],
    translation: "Eu vou para a escola.",
    explanation: "A partícula に indica o destino de um movimento.",
  },
  {
    id: "st-4",
    before: [{ text: "うち", romaji: "uchi", translation: "casa" }],
    after: [
      { text: "テレビ", romaji: "terebi", translation: "televisão" },
      { text: "を", romaji: "o", translation: "partícula de objeto direto" },
      { text: "みます", romaji: "mimasu", translation: "vejo, assistir" },
      { text: "。" },
    ],
    answer: "で",
    options: ["で", "に", "を", "は"],
    translation: "Eu vejo televisão em casa.",
    explanation: "A partícula で indica o lugar onde a ação acontece.",
  },
  {
    id: "st-5",
    before: [{ text: "ともだち", romaji: "tomodachi", translation: "amigo" }],
    after: [
      { text: "はなします", romaji: "hanashimasu", translation: "converso, falar" },
      { text: "。" },
    ],
    answer: "と",
    options: ["と", "を", "に", "が"],
    translation: "Eu converso com um amigo.",
    explanation: "A partícula と indica com quem a ação é realizada.",
  },
  {
    id: "st-6",
    before: [{ text: "しちじ", romaji: "shichiji", translation: "sete horas" }],
    after: [
      { text: "おきます", romaji: "okimasu", translation: "acordo, levantar" },
      { text: "。" },
    ],
    answer: "に",
    options: ["に", "で", "から", "を"],
    translation: "Eu acordo às sete horas.",
    explanation: "A partícula に marca o horário em que algo acontece.",
  },
  {
    id: "st-7",
    before: [
      { text: "わたし", romaji: "watashi", translation: "eu" },
      { text: "は", romaji: "wa", translation: "partícula de tema" },
      { text: "くだもの", romaji: "kudamono", translation: "fruta" },
    ],
    after: [
      { text: "すき", romaji: "suki", translation: "gostar, do agrado" },
      { text: "です", romaji: "desu", translation: "é (verbo de ligação)" },
      { text: "。" },
    ],
    answer: "が",
    options: ["が", "を", "に", "へ"],
    translation: "Eu gosto de frutas.",
    explanation: "Com すきです, aquilo de que se gosta é marcado por が.",
  },
  {
    id: "st-8",
    before: [
      { text: "まいあさ", romaji: "maiasa", translation: "toda manhã" },
      { text: "コーヒー", romaji: "koohii", translation: "café" },
      { text: "を", romaji: "o", translation: "partícula de objeto direto" },
    ],
    after: [{ text: "。" }],
    answer: "のみます",
    options: ["のみます", "たべます", "みます", "かきます"],
    translation: "Toda manhã eu bebo café.",
    explanation: "のみます significa beber, o verbo usado para bebidas.",
  },
  {
    id: "st-9",
    before: [
      { text: "きょうしつ", romaji: "kyoushitsu", translation: "sala de aula" },
      { text: "に", romaji: "ni", translation: "partícula de lugar" },
      { text: "せんせい", romaji: "sensei", translation: "professor" },
    ],
    after: [
      { text: "います", romaji: "imasu", translation: "há, estar (seres vivos)" },
      { text: "。" },
    ],
    answer: "が",
    options: ["が", "を", "で", "と"],
    translation: "Há um professor na sala de aula.",
    explanation: "Em frases de existência com います, o sujeito é marcado por が.",
  },
  {
    id: "st-10",
    before: [
      { text: "あたらしい", romaji: "atarashii", translation: "novo" },
      { text: "くつ", romaji: "kutsu", translation: "sapato" },
      { text: "を", romaji: "o", translation: "partícula de objeto direto" },
    ],
    after: [{ text: "。" }],
    answer: "かいます",
    options: ["かいます", "ききます", "いきます", "ねます"],
    translation: "Eu vou comprar sapatos novos.",
    explanation: "かいます significa comprar.",
  },
];
