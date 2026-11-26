import { Titulo } from "../../styles/GlobalStyles";
import { rotulosAbas, type AbaFlashcard } from "./dados";
import { QuizImagens } from "./QuizImagens";
import { TreinoCartas } from "./TreinoCartas";

export interface FlashcardsProps {
  aba: AbaFlashcard;
}

export function Flashcards({ aba }: FlashcardsProps) {
  return (
    <>
      <Titulo>{rotulosAbas[aba]}</Titulo>
      {aba === "imagens" ? <QuizImagens /> : <TreinoCartas key={aba} categoria={aba} />}
    </>
  );
}
