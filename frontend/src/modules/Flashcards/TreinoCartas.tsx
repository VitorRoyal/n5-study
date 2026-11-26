import { useRef, useState } from "react";
import { Subtitle } from "../../styles/GlobalStyles";
import { QuizWrapper, QuizGrid, ScoreCounter } from "./style";
import { flashcardsByCategory, type FlashcardCategory, type FlashcardItem } from "./data";
import { FlashCardItem } from "./FlashCardItem";

const SLOT_COUNT = 5;

function createInitialPointers() {
  return Array.from({ length: SLOT_COUNT }, (_, index) => index);
}

function shuffleCards(cards: FlashcardItem[]) {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  return shuffled;
}

function buildSubtitle(category: FlashcardCategory) {
  if (category === "kanji") {
    return "Digite a leitura ou o significado de cada card para avancar para o proximo.";
  }
  return "Digite a leitura de cada card para avancar para o proximo.";
}

export interface TreinoCartasProps {
  category: FlashcardCategory;
}

export function TreinoCartas({ category }: TreinoCartasProps) {
  const [deck] = useState<FlashcardItem[]>(() => shuffleCards(flashcardsByCategory[category]));
  const [slotPointers, setSlotPointers] = useState<number[]>(createInitialPointers);
  const [correctCount, setCorrectCount] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function handleCorrect(slotIndex: number) {
    setSlotPointers((current) =>
      current.map((pointer, index) => (index === slotIndex ? pointer + SLOT_COUNT : pointer))
    );
    setCorrectCount((current) => current + 1);
  }

  function focusFirstInput() {
    inputRefs.current[0]?.focus();
  }

  return (
    <>
      <Subtitle>{buildSubtitle(category)}</Subtitle>
      <QuizWrapper>
        <QuizGrid>
          {slotPointers.map((pointer, slotIndex) => (
            <FlashCardItem
              key={slotIndex}
              item={deck[pointer % deck.length]}
              onCorrect={() => handleCorrect(slotIndex)}
              inputRef={(element) => {
                inputRefs.current[slotIndex] = element;
              }}
              isLastSlot={slotIndex === SLOT_COUNT - 1}
              onWrapToFirst={focusFirstInput}
            />
          ))}
        </QuizGrid>
      </QuizWrapper>
      <ScoreCounter>Acertos: {correctCount}</ScoreCounter>
    </>
  );
}
