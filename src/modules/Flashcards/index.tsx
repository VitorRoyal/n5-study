import { useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { BackButton } from "../../components/BackButton";
import { PageWrapper, ContentArea, Subtitle } from "../../styles/GlobalStyles";
import { TabButton, QuizWrapper, QuizGrid, ScoreCounter } from "./style";
import {
  flashcardsByCategory,
  tabLabels,
  type FlashcardCategory,
  type FlashcardItem,
  type FlashcardTab,
} from "./data";
import { FlashCardItem } from "./FlashCardItem";
import { ImageQuiz } from "./ImageQuiz";

const tabs: FlashcardTab[] = ["hiragana", "katakana", "kanji", "images"];
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

function buildSubtitle(tab: FlashcardCategory) {
  if (tab === "kanji") {
    return "Digite a leitura ou o significado de cada card para avancar para o proximo.";
  }
  return "Digite a leitura de cada card para avancar para o proximo.";
}

export function Flashcards() {
  const [activeTab, setActiveTab] = useState<FlashcardTab>("hiragana");
  const [deck, setDeck] = useState<FlashcardItem[]>(() =>
    shuffleCards(flashcardsByCategory.hiragana)
  );
  const [slotPointers, setSlotPointers] = useState<number[]>(createInitialPointers);
  const [correctCount, setCorrectCount] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function handleTabChange(tab: FlashcardTab) {
    setActiveTab(tab);

    if (tab === "images") {
      return;
    }

    setDeck(shuffleCards(flashcardsByCategory[tab]));
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
        right={tabs.map((tab) => (
          <TabButton
            key={tab}
            type="button"
            $active={activeTab === tab}
            onClick={() => handleTabChange(tab)}
          >
            {tabLabels[tab]}
          </TabButton>
        ))}
      />
      <ContentArea>
        {activeTab === "images" ? (
          <ImageQuiz />
        ) : (
          <>
            <Subtitle>{buildSubtitle(activeTab)}</Subtitle>
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
        )}
      </ContentArea>
    </PageWrapper>
  );
}
