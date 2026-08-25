export interface ImageCard {
  id: string;
  image: string;
  character: string;
  romaji: string;
  meaning: string;
}

export interface ImageQuestion {
  card: ImageCard;
  options: ImageCard[];
}

const OPTIONS_PER_QUESTION = 3;

export const imageCards: ImageCard[] = [
  {
    id: "img-ringo",
    image: "/illustrations/apple.svg",
    character: "りんご",
    romaji: "ringo",
    meaning: "maçã",
  },
  {
    id: "img-mikan",
    image: "/illustrations/tangerine.svg",
    character: "みかん",
    romaji: "mikan",
    meaning: "tangerina, laranja",
  },
  {
    id: "img-neko",
    image: "/illustrations/cat.svg",
    character: "ねこ",
    romaji: "neko",
    meaning: "gato",
  },
  {
    id: "img-inu",
    image: "/illustrations/dog.svg",
    character: "いぬ",
    romaji: "inu",
    meaning: "cachorro",
  },
  {
    id: "img-mizu",
    image: "/illustrations/water.svg",
    character: "みず",
    romaji: "mizu",
    meaning: "água",
  },
  {
    id: "img-keeki",
    image: "/illustrations/cake.svg",
    character: "ケーキ",
    romaji: "keeki",
    meaning: "bolo",
  },
  {
    id: "img-sakana",
    image: "/illustrations/fish.svg",
    character: "さかな",
    romaji: "sakana",
    meaning: "peixe",
  },
  {
    id: "img-kuruma",
    image: "/illustrations/car.svg",
    character: "くるま",
    romaji: "kuruma",
    meaning: "carro",
  },
  {
    id: "img-hon",
    image: "/illustrations/book.svg",
    character: "ほん",
    romaji: "hon",
    meaning: "livro",
  },
  {
    id: "img-kasa",
    image: "/illustrations/umbrella.svg",
    character: "かさ",
    romaji: "kasa",
    meaning: "guarda-chuva",
  },
];

function shuffle<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  return shuffled;
}

export function buildImageQuestions(): ImageQuestion[] {
  return shuffle(imageCards).map((card) => {
    const distractors = shuffle(imageCards.filter((candidate) => candidate.id !== card.id)).slice(
      0,
      OPTIONS_PER_QUESTION - 1
    );

    return {
      card,
      options: shuffle([card, ...distractors]),
    };
  });
}
