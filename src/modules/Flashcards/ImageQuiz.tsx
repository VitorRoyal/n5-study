import { useState } from "react";
import { buildImageQuestions, type ImageQuestion } from "./imageData";
import { ImageQuestionCard } from "./ImageQuestionCard";
import {
  ImageQuizWrapper,
  ImageResultCard,
  ImageResultScore,
  RevealText,
  NextQuestionButton,
  ScoreCounter,
} from "./style";

export function ImageQuiz() {
  const [questions, setQuestions] = useState<ImageQuestion[]>(buildImageQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function handleAnswered(isCorrect: boolean) {
    if (isCorrect) {
      setCorrectCount((current) => current + 1);
    }
  }

  function handleNext() {
    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((current) => current + 1);
  }

  function handleRestart() {
    setQuestions(buildImageQuestions());
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <ImageQuizWrapper>
        <ImageResultCard>
          <ImageResultScore>
            {correctCount} / {questions.length}
          </ImageResultScore>
          <RevealText>
            Você acertou {correctCount} de {questions.length} imagens.
          </RevealText>
          <NextQuestionButton type="button" onClick={handleRestart}>
            Recomeçar
          </NextQuestionButton>
        </ImageResultCard>
      </ImageQuizWrapper>
    );
  }

  return (
    <>
      <ImageQuestionCard
        key={questions[currentIndex].card.id}
        question={questions[currentIndex]}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        isLastQuestion={currentIndex === questions.length - 1}
        onAnswered={handleAnswered}
        onNext={handleNext}
      />
      <ScoreCounter>Acertos: {correctCount}</ScoreCounter>
    </>
  );
}
