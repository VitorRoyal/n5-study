import { useRef, useState } from "react";
import { Subtitulo } from "../../styles/GlobalStyles";
import { ContainerQuiz, GradeQuiz, ContadorAcertos } from "./style";
import { flashcardsPorCategoria, type CategoriaFlashcard, type ItemFlashcard } from "./dados";
import { CartaoFlashcard } from "./CartaoFlashcard";

const QUANTIDADE_SLOTS = 5;

function criarPonteirosIniciais() {
  return Array.from({ length: QUANTIDADE_SLOTS }, (_, indice) => indice);
}

function embaralharCartoes(cartoes: ItemFlashcard[]) {
  const embaralhado = [...cartoes];

  for (let indice = embaralhado.length - 1; indice > 0; indice -= 1) {
    const alvo = Math.floor(Math.random() * (indice + 1));
    [embaralhado[indice], embaralhado[alvo]] = [embaralhado[alvo], embaralhado[indice]];
  }

  return embaralhado;
}

function montarSubtitulo(categoria: CategoriaFlashcard) {
  if (categoria === "kanji") {
    return "Digite a leitura ou o significado de cada card para avancar para o proximo.";
  }
  return "Digite a leitura de cada card para avancar para o proximo.";
}

export interface TreinoCartasProps {
  categoria: CategoriaFlashcard;
}

export function TreinoCartas({ categoria }: TreinoCartasProps) {
  const [baralho] = useState<ItemFlashcard[]>(() => embaralharCartoes(flashcardsPorCategoria[categoria]));
  const [ponteirosSlots, definirPonteirosSlots] = useState<number[]>(criarPonteirosIniciais);
  const [quantidadeAcertos, definirQuantidadeAcertos] = useState(0);
  const refsCampos = useRef<Array<HTMLInputElement | null>>([]);

  function tratarAcerto(indiceSlot: number) {
    definirPonteirosSlots((atual) =>
      atual.map((ponteiro, indice) => (indice === indiceSlot ? ponteiro + QUANTIDADE_SLOTS : ponteiro))
    );
    definirQuantidadeAcertos((atual) => atual + 1);
  }

  function focarPrimeiroCampo() {
    refsCampos.current[0]?.focus();
  }

  return (
    <>
      <Subtitulo>{montarSubtitulo(categoria)}</Subtitulo>
      <ContainerQuiz>
        <GradeQuiz>
          {ponteirosSlots.map((ponteiro, indiceSlot) => (
            <CartaoFlashcard
              key={indiceSlot}
              item={baralho[ponteiro % baralho.length]}
              aoAcertar={() => tratarAcerto(indiceSlot)}
              refCampo={(elemento) => {
                refsCampos.current[indiceSlot] = elemento;
              }}
              ehUltimoSlot={indiceSlot === QUANTIDADE_SLOTS - 1}
              aoVoltarAoPrimeiro={focarPrimeiroCampo}
            />
          ))}
        </GradeQuiz>
      </ContainerQuiz>
      <ContadorAcertos>Acertos: {quantidadeAcertos}</ContadorAcertos>
    </>
  );
}
