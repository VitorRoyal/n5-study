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
  {
    id: "img-eki",
    image: "/illustrations/station.svg",
    character: "えき",
    romaji: "eki",
    meaning: "estação de trem",
  },
  {
    id: "img-basutei",
    image: "/illustrations/bus-stop.svg",
    character: "バスてい",
    romaji: "basutei",
    meaning: "ponto de ônibus",
  },
  {
    id: "img-densha",
    image: "/illustrations/train.svg",
    character: "でんしゃ",
    romaji: "densha",
    meaning: "trem",
  },
  {
    id: "img-basu",
    image: "/illustrations/bus.svg",
    character: "バス",
    romaji: "basu",
    meaning: "ônibus",
  },
  {
    id: "img-jitensha",
    image: "/illustrations/bicycle.svg",
    character: "じてんしゃ",
    romaji: "jitensha",
    meaning: "bicicleta",
  },
  {
    id: "img-hikouki",
    image: "/illustrations/airplane.svg",
    character: "ひこうき",
    romaji: "hikouki",
    meaning: "avião",
  },
  {
    id: "img-gakkou",
    image: "/illustrations/school.svg",
    character: "がっこう",
    romaji: "gakkou",
    meaning: "escola",
  },
  {
    id: "img-byouin",
    image: "/illustrations/hospital.svg",
    character: "びょういん",
    romaji: "byouin",
    meaning: "hospital",
  },
  {
    id: "img-ie",
    image: "/illustrations/house.svg",
    character: "いえ",
    romaji: "ie",
    meaning: "casa",
  },
  {
    id: "img-tokei",
    image: "/illustrations/watch.svg",
    character: "とけい",
    romaji: "tokei",
    meaning: "relógio",
  },
  {
    id: "img-denwa",
    image: "/illustrations/telephone.svg",
    character: "でんわ",
    romaji: "denwa",
    meaning: "telefone",
  },
  {
    id: "img-terebi",
    image: "/illustrations/television.svg",
    character: "テレビ",
    romaji: "terebi",
    meaning: "televisão",
  },
  {
    id: "img-pan",
    image: "/illustrations/bread.svg",
    character: "パン",
    romaji: "pan",
    meaning: "pão",
  },
  {
    id: "img-tamago",
    image: "/illustrations/egg.svg",
    character: "たまご",
    romaji: "tamago",
    meaning: "ovo",
  },
  {
    id: "img-gyuunyuu",
    image: "/illustrations/milk.svg",
    character: "ぎゅうにゅう",
    romaji: "gyuunyuu",
    meaning: "leite",
  },
  {
    id: "img-koohii",
    image: "/illustrations/coffee.svg",
    character: "コーヒー",
    romaji: "koohii",
    meaning: "café",
  },
  {
    id: "img-tori",
    image: "/illustrations/bird.svg",
    character: "とり",
    romaji: "tori",
    meaning: "pássaro",
  },
  {
    id: "img-hana",
    image: "/illustrations/flower.svg",
    character: "はな",
    romaji: "hana",
    meaning: "flor",
  },
  {
    id: "img-yama",
    image: "/illustrations/mountain.svg",
    character: "やま",
    romaji: "yama",
    meaning: "montanha",
  },
  {
    id: "img-ki",
    image: "/illustrations/tree.svg",
    character: "き",
    romaji: "ki",
    meaning: "árvore",
  },
  {
    id: "img-kutsu",
    image: "/illustrations/shoe.svg",
    character: "くつ",
    romaji: "kutsu",
    meaning: "sapato",
  },
  {
    id: "img-kaban",
    image: "/illustrations/bag.svg",
    character: "かばん",
    romaji: "kaban",
    meaning: "bolsa",
  },
  {
    id: "img-enpitsu",
    image: "/illustrations/pencil.svg",
    character: "えんぴつ",
    romaji: "enpitsu",
    meaning: "lápis",
  },
  {
    id: "img-shinbun",
    image: "/illustrations/newspaper.svg",
    character: "しんぶん",
    romaji: "shinbun",
    meaning: "jornal",
  },
  {
    id: "img-isu",
    image: "/illustrations/chair.svg",
    character: "いす",
    romaji: "isu",
    meaning: "cadeira",
  },
  {
    id: "img-doa",
    image: "/illustrations/door.svg",
    character: "ドア",
    romaji: "doa",
    meaning: "porta",
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
