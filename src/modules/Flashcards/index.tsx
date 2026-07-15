import { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { BackButton } from "../../components/BackButton";
import { PageWrapper, ContentArea, Subtitle } from "../../styles/GlobalStyles";
import { TabButton, QuizWrapper, QuizGrid, ScoreCounter } from "./style";
import { flashcardsByCategory, categoryLabels, type FlashcardCategory } from "./data";
import { FlashCardItem } from "./FlashCardItem";

const categories: FlashcardCategory[] = ["hiragana", "katakana", "kanji"];
const SLOT_COUNT = 5;

function createInitialPointers() {
  return Array.from({ length: SLOT_COUNT }, (_, index) => index);
}

export function Flashcards() {
  const [activeCategory, setActiveCategory] = useState<FlashcardCategory>("hiragana");
  const [slotPointers, setSlotPointers] = useState<number[]>(createInitialPointers);
  const [correctCount, setCorrectCount] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const items = flashcardsByCategory[activeCategory];

  useEffect(() => {
    setSlotPointers(createInitialPointers());
  }, [activeCategory]);

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
            onClick={() => setActiveCategory(category)}
          >
            {categoryLabels[category]}
          </TabButton>
        ))}
      />
      <ContentArea>
        <Subtitle>Digite a leitura de cada card para avancar para o proximo.</Subtitle>
        <QuizWrapper>
          <QuizGrid>
            {slotPointers.map((pointer, slotIndex) => (
              <FlashCardItem
                key={slotIndex}
                item={items[pointer % items.length]}
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
