import { Title } from "../../styles/GlobalStyles";
import { tabLabels, type FlashcardTab } from "./data";
import { ImageQuiz } from "./ImageQuiz";
import { TreinoCartas } from "./TreinoCartas";

export interface FlashcardsProps {
  tab: FlashcardTab;
}

export function Flashcards({ tab }: FlashcardsProps) {
  return (
    <>
      <Title>{tabLabels[tab]}</Title>
      {tab === "images" ? <ImageQuiz /> : <TreinoCartas key={tab} category={tab} />}
    </>
  );
}
