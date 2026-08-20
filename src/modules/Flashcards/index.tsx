import { useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { BackButton } from "../../components/BackButton";
import { PageWrapper, ContentArea, Subtitle } from "../../styles/GlobalStyles";
import { TabButton, QuizWrapper, QuizGrid, ScoreCounter } from "./style";
import {
  flashcardsByCategory,
  categoryLabels,
  type FlashcardCategory,
  type FlashcardItem,
} from "./data";
import { FlashCardItem } from "./FlashCardItem";

const categories: FlashcardCategory[] = ["hiragana", "katakana", "kanji"];
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

export function Flashcards() {
  const [activeCategory, setActiveCategory] = useState<FlashcardCategory>("hiragana");
  const [deck, setDeck] = useState<FlashcardItem[]>(() =>
    shuffleCards(flashcardsByCategory.hiragana)
  );
  const [slotPointers, setSlotPointers] = useState<number[]>(createInitialPointers);
  const [correctCount, setCorrectCount] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function handleCategoryChange(category: FlashcardCategory) {
    setActiveCategory(category);
    setDeck(shuffleCards(flashcardsByCategory[category]));
    setSlotPointers(createInitialPointers());
  }

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
    <PageWrapper>
      <Navbar
        title="Flashcards"
        left={<BackButton />}
        right={categories.map((category) => (
          <TabButton
            key={category}
            type="button"
            $active={activeCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            {categoryLabels[category]}
          </TabButton>
        ))}
      />
      <ContentArea>
        <Subtitle>
          {activeCategory === "kanji"
            ? "Digite a leitura ou o significado de cada card para avancar para o proximo."
            : "Digite a leitura de cada card para avancar para o proximo."}
        </Subtitle>
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
      </ContentArea>
      <ScoreCounter>Acertos: {correctCount}</ScoreCounter>
    </PageWrapper>
  );
}
