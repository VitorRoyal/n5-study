import { useState, type ChangeEvent } from "react";
import {
  buildImageQuestions,
  quizLengthOptions,
  defaultQuizLength,
  type ImageQuestion,
} from "./imageData";
import { Subtitle } from "../../styles/GlobalStyles";
import { ImageQuestionCard } from "./ImageQuestionCard";
import {
  ImageQuizWrapper,
  ImageResultCard,
  ImageResultScore,
  RevealText,
  NextQuestionButton,
  ScoreCounter,
  QuizHeaderRow,
  QuizLengthRow,
  QuizLengthSelect,
} from "./style";

export function ImageQuiz() {
  const [quizLength, setQuizLength] = useState(defaultQuizLength);
  const [questions, setQuestions] = useState<ImageQuestion[]>(() =>
    buildImageQuestions(defaultQuizLength)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function startQuiz(length: number) {
    setQuestions(buildImageQuestions(length));
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsFinished(false);
  }

  function handleLengthChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLength = Number(event.target.value);
    setQuizLength(nextLength);
    startQuiz(nextLength);
  }

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

  const header = (
    <QuizHeaderRow>
      <Subtitle>Escolha a palavra que corresponde a imagem.</Subtitle>
      <QuizLengthRow>
        Quantidade de imagens
        <QuizLengthSelect value={quizLength} onChange={handleLengthChange}>
          {quizLengthOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </QuizLengthSelect>
      </QuizLengthRow>
    </QuizHeaderRow>
  );

  if (isFinished) {
    return (
      <>
        {header}
        <ImageQuizWrapper>
          <ImageResultCard>
            <ImageResultScore>
              {correctCount} / {questions.length}
            </ImageResultScore>
            <RevealText>
              Você acertou {correctCount} de {questions.length} imagens.
            </RevealText>
            <NextQuestionButton type="button" onClick={() => startQuiz(quizLength)}>
              Recomeçar
            </NextQuestionButton>
          </ImageResultCard>
        </ImageQuizWrapper>
      </>
    );
  }

  return (
    <>
      {header}
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
