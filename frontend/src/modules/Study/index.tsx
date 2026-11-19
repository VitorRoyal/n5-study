import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { BackButton } from "../../components/BackButton";
import { PageWrapper, ContentArea, Subtitle } from "../../styles/GlobalStyles";
import { sentences, type SentenceItem } from "./data";
import { SentenceExercise } from "./SentenceExercise";
import {
  ExerciseWrapper,
  ExerciseCard,
  ResultCard,
  ResultScore,
  PromptLabel,
  FeedbackText,
  ActionsRow,
  CheckButton,
} from "./style";

function shuffleSentences(items: SentenceItem[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  return shuffled;
}

export function Study() {
  const [deck, setDeck] = useState<SentenceItem[]>(() => shuffleSentences(sentences));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function handleAnswered(isCorrect: boolean) {
    if (isCorrect) {
      setCorrectCount((current) => current + 1);
    }
  }

  function handleNext() {
    if (currentIndex === deck.length - 1) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((current) => current + 1);
  }

  function handleRestart() {
    setDeck(shuffleSentences(sentences));
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsFinished(false);
  }

  return (
    <PageWrapper>
      <Navbar title="Estudo" left={<BackButton />} />
      <ContentArea>
        <Subtitle>
          Complete as frases escolhendo a palavra correta. Clique em uma palavra sublinhada para
          ver a tradução.
        </Subtitle>
        <ExerciseWrapper>
          {isFinished ? (
            <ExerciseCard>
              <ResultCard>
                <PromptLabel>Exercício concluído</PromptLabel>
                <ResultScore>
                  {correctCount} / {deck.length}
                </ResultScore>
                <FeedbackText>
                  Você acertou {correctCount} de {deck.length} frases.
                </FeedbackText>
              </ResultCard>
              <ActionsRow>
                <CheckButton type="button" onClick={handleRestart}>
                  Recomeçar
                </CheckButton>
              </ActionsRow>
            </ExerciseCard>
          ) : (
            <SentenceExercise
              key={deck[currentIndex].id}
              sentence={deck[currentIndex]}
              questionNumber={currentIndex + 1}
              totalQuestions={deck.length}
              correctCount={correctCount}
              isLastQuestion={currentIndex === deck.length - 1}
              onAnswered={handleAnswered}
              onNext={handleNext}
            />
          )}
        </ExerciseWrapper>
      </ContentArea>
    </PageWrapper>
  );
}
