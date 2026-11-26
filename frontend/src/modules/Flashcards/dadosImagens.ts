export interface CartaoImagem {
  id: string;
  imagem: string;
  caractere: string;
  romaji: string;
  significado: string;
}

export interface PerguntaImagem {
  cartao: CartaoImagem;
  opcoes: CartaoImagem[];
}

const OPCOES_POR_PERGUNTA = 3;

export const cartoesImagem: CartaoImagem[] = [
  {
    id: "img-ringo",
    imagem: "/illustrations/apple.svg",
    caractere: "りんご",
    romaji: "ringo",
    significado: "maçã",
  },
  {
    id: "img-mikan",
    imagem: "/illustrations/tangerine.svg",
    caractere: "みかん",
    romaji: "mikan",
    significado: "tangerina, laranja",
  },
  {
    id: "img-neko",
    imagem: "/illustrations/cat.svg",
    caractere: "ねこ",
    romaji: "neko",
    significado: "gato",
  },
  {
    id: "img-inu",
    imagem: "/illustrations/dog.svg",
    caractere: "いぬ",
    romaji: "inu",
    significado: "cachorro",
  },
  {
    id: "img-mizu",
    imagem: "/illustrations/water.svg",
    caractere: "みず",
    romaji: "mizu",
    significado: "água",
  },
  {
    id: "img-keeki",
    imagem: "/illustrations/cake.svg",
    caractere: "ケーキ",
    romaji: "keeki",
    significado: "bolo",
  },
  {
    id: "img-sakana",
    imagem: "/illustrations/fish.svg",
    caractere: "さかな",
    romaji: "sakana",
    significado: "peixe",
  },
  {
    id: "img-kuruma",
    imagem: "/illustrations/car.svg",
    caractere: "くるま",
    romaji: "kuruma",
    significado: "carro",
  },
  {
    id: "img-hon",
    imagem: "/illustrations/book.svg",
    caractere: "ほん",
    romaji: "hon",
    significado: "livro",
  },
  {
    id: "img-kasa",
    imagem: "/illustrations/umbrella.svg",
    caractere: "かさ",
    romaji: "kasa",
    significado: "guarda-chuva",
  },
  {
    id: "img-eki",
    imagem: "/illustrations/station.svg",
    caractere: "えき",
    romaji: "eki",
    significado: "estação de trem",
  },
  {
    id: "img-basutei",
    imagem: "/illustrations/bus-stop.svg",
    caractere: "バスてい",
    romaji: "basutei",
    significado: "ponto de ônibus",
  },
  {
    id: "img-densha",
    imagem: "/illustrations/train.svg",
    caractere: "でんしゃ",
    romaji: "densha",
    significado: "trem",
  },
  {
    id: "img-basu",
    imagem: "/illustrations/bus.svg",
    caractere: "バス",
    romaji: "basu",
    significado: "ônibus",
  },
  {
    id: "img-jitensha",
    imagem: "/illustrations/bicycle.svg",
    caractere: "じてんしゃ",
    romaji: "jitensha",
    significado: "bicicleta",
  },
  {
    id: "img-hikouki",
    imagem: "/illustrations/airplane.svg",
    caractere: "ひこうき",
    romaji: "hikouki",
    significado: "avião",
  },
  {
    id: "img-gakkou",
    imagem: "/illustrations/school.svg",
    caractere: "がっこう",
    romaji: "gakkou",
    significado: "escola",
  },
  {
    id: "img-byouin",
    imagem: "/illustrations/hospital.svg",
    caractere: "びょういん",
    romaji: "byouin",
    significado: "hospital",
  },
  {
    id: "img-ie",
    imagem: "/illustrations/house.svg",
    caractere: "いえ",
    romaji: "ie",
    significado: "casa",
  },
  {
    id: "img-tokei",
    imagem: "/illustrations/watch.svg",
    caractere: "とけい",
    romaji: "tokei",
    significado: "relógio",
  },
  {
    id: "img-denwa",
    imagem: "/illustrations/telephone.svg",
    caractere: "でんわ",
    romaji: "denwa",
    significado: "telefone",
  },
  {
    id: "img-terebi",
    imagem: "/illustrations/television.svg",
    caractere: "テレビ",
    romaji: "terebi",
    significado: "televisão",
  },
  {
    id: "img-pan",
    imagem: "/illustrations/bread.svg",
    caractere: "パン",
    romaji: "pan",
    significado: "pão",
  },
  {
    id: "img-tamago",
    imagem: "/illustrations/egg.svg",
    caractere: "たまご",
    romaji: "tamago",
    significado: "ovo",
  },
  {
    id: "img-gyuunyuu",
    imagem: "/illustrations/milk.svg",
    caractere: "ぎゅうにゅう",
    romaji: "gyuunyuu",
    significado: "leite",
  },
  {
    id: "img-koohii",
    imagem: "/illustrations/coffee.svg",
    caractere: "コーヒー",
    romaji: "koohii",
    significado: "café",
  },
  {
    id: "img-tori",
    imagem: "/illustrations/bird.svg",
    caractere: "とり",
    romaji: "tori",
    significado: "pássaro",
  },
  {
    id: "img-hana",
    imagem: "/illustrations/flower.svg",
    caractere: "はな",
    romaji: "hana",
    significado: "flor",
  },
  {
    id: "img-yama",
    imagem: "/illustrations/mountain.svg",
    caractere: "やま",
    romaji: "yama",
    significado: "montanha",
  },
  {
    id: "img-ki",
    imagem: "/illustrations/tree.svg",
    caractere: "き",
    romaji: "ki",
    significado: "árvore",
  },
  {
    id: "img-kutsu",
    imagem: "/illustrations/shoe.svg",
    caractere: "くつ",
    romaji: "kutsu",
    significado: "sapato",
  },
  {
    id: "img-kaban",
    imagem: "/illustrations/bag.svg",
    caractere: "かばん",
    romaji: "kaban",
    significado: "bolsa",
  },
  {
    id: "img-enpitsu",
    imagem: "/illustrations/pencil.svg",
    caractere: "えんぴつ",
    romaji: "enpitsu",
    significado: "lápis",
  },
  {
    id: "img-shinbun",
    imagem: "/illustrations/newspaper.svg",
    caractere: "しんぶん",
    romaji: "shinbun",
    significado: "jornal",
  },
  {
    id: "img-isu",
    imagem: "/illustrations/chair.svg",
    caractere: "いす",
    romaji: "isu",
    significado: "cadeira",
  },
  {
    id: "img-doa",
    imagem: "/illustrations/door.svg",
    caractere: "ドア",
    romaji: "doa",
    significado: "porta",
  },
  {
    id: "img-kagi",
    imagem: "/illustrations/key.svg",
    caractere: "かぎ",
    romaji: "kagi",
    significado: "chave",
  },
  {
    id: "img-mado",
    imagem: "/illustrations/window.svg",
    caractere: "まど",
    romaji: "mado",
    significado: "janela",
  },
  {
    id: "img-kamera",
    imagem: "/illustrations/camera.svg",
    caractere: "カメラ",
    romaji: "kamera",
    significado: "câmera",
  },
  {
    id: "img-tegami",
    imagem: "/illustrations/letter.svg",
    caractere: "てがみ",
    romaji: "tegami",
    significado: "carta",
  },
  {
    id: "img-ginkou",
    imagem: "/illustrations/bank.svg",
    caractere: "ぎんこう",
    romaji: "ginkou",
    significado: "banco",
  },
  {
    id: "img-yuki",
    imagem: "/illustrations/snow.svg",
    caractere: "ゆき",
    romaji: "yuki",
    significado: "neve",
  },
  {
    id: "img-tsuki",
    imagem: "/illustrations/moon.svg",
    caractere: "つき",
    romaji: "tsuki",
    significado: "lua",
  },
  {
    id: "img-uma",
    imagem: "/illustrations/horse.svg",
    caractere: "うま",
    romaji: "uma",
    significado: "cavalo",
  },
  {
    id: "img-buta",
    imagem: "/illustrations/pig.svg",
    caractere: "ぶた",
    romaji: "buta",
    significado: "porco",
  },
  {
    id: "img-gohan",
    imagem: "/illustrations/rice.svg",
    caractere: "ごはん",
    romaji: "gohan",
    significado: "arroz cozido, refeição",
  },
  {
    id: "img-sushi",
    imagem: "/illustrations/sushi.svg",
    caractere: "すし",
    romaji: "sushi",
    significado: "sushi",
  },
  {
    id: "img-ocha",
    imagem: "/illustrations/tea.svg",
    caractere: "おちゃ",
    romaji: "ocha",
    significado: "chá",
  },
  {
    id: "img-pasokon",
    imagem: "/illustrations/laptop.svg",
    caractere: "パソコン",
    romaji: "pasokon",
    significado: "computador",
  },
  {
    id: "img-boushi",
    imagem: "/illustrations/cap.svg",
    caractere: "ぼうし",
    romaji: "boushi",
    significado: "chapéu, boné",
  },
];

export const opcoesTamanhoQuiz = [10, 25, 50];

export const tamanhoQuizPadrao = 10;

function embaralhar<T>(itens: T[]) {
  const embaralhado = [...itens];

  for (let indice = embaralhado.length - 1; indice > 0; indice -= 1) {
    const alvo = Math.floor(Math.random() * (indice + 1));
    [embaralhado[indice], embaralhado[alvo]] = [embaralhado[alvo], embaralhado[indice]];
  }

  return embaralhado;
}

export function montarPerguntasImagem(length: number): PerguntaImagem[] {
  return embaralhar(cartoesImagem)
    .slice(0, Math.min(length, cartoesImagem.length))
    .map((cartao) => {
      const outros = cartoesImagem.filter((candidato) => candidato.id !== cartao.id);
      const distratores = embaralhar(outros).slice(0, OPCOES_POR_PERGUNTA - 1);

      return {
        cartao,
        opcoes: embaralhar([cartao, ...distratores]),
      };
    });
}
