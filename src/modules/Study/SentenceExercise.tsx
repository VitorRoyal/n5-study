import { useEffect, useState } from "react";
import type { SentenceItem, SentenceToken } from "./data";
import { SentenceWord } from "./SentenceWord";
import {
  ExerciseCard,
  ExerciseHeader,
  ExerciseProgress,
  ExerciseScore,
  PromptLabel,
  SentenceRow,
  BlankSlot,
  OptionsRow,
  OptionChip,
  FeedbackBox,
  FeedbackTitle,
  FeedbackText,
  ActionsRow,
  CheckButton,
  NextButton,
} from "./style";

export interface SentenceExerciseProps {
  sentence: SentenceItem;
  questionNumber: number;
  totalQuestions: number;
  correctCount: number;
  isLastQuestion: boolean;
  onAnswered: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function SentenceExercise({
  sentence,
  questionNumber,
  totalQuestions,
  correctCount,
  isLastQuestion,
  onAnswered,
  onNext,
}: SentenceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [openWordId, setOpenWordId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(null);
    setIsChecked(false);
    setOpenWordId(null);
  }, [sentence.id]);

  const isCorrect = selectedOption === sentence.answer;

  function handleToggleWord(wordId: string) {
    setOpenWordId((current) => (current === wordId ? null : wordId));
  }

  function renderTokens(tokens: SentenceToken[], position: string) {
    return tokens.map((token, index) => {
      const wordId = `${position}-${index}`;

      return (
        <SentenceWord
          key={wordId}
          token={token}
          isOpen={openWordId === wordId}
          onToggle={() => handleToggleWord(wordId)}
        />
      );
    });
  }

  function handleSelectOption(option: string) {
    if (isChecked) {
      return;
    }
    setSelectedOption((current) => (current === option ? null : option));
  }

  function handleClearSlot() {
    if (isChecked) {
      return;
    }
    setSelectedOption(null);
  }

  function handleCheck() {
    if (isChecked || selectedOption === null) {
      return;
    }
    setIsChecked(true);
    onAnswered(selectedOption === sentence.answer);
  }

  return (
    <ExerciseCard>
      <ExerciseHeader>
        <ExerciseProgress>
          Frase {questionNumber} de {totalQuestions}
        </ExerciseProgress>
        <ExerciseScore>Acertos: {correctCount}</ExerciseScore>
      </ExerciseHeader>

      <PromptLabel>Complete a frase</PromptLabel>

      <SentenceRow>
        {renderTokens(sentence.before, "before")}
        <BlankSlot
          type="button"
          onClick={handleClearSlot}
          $filled={selectedOption !== null}
          $checked={isChecked}
          $correct={isCorrect}
        >
          {selectedOption}
        </BlankSlot>
        {renderTokens(sentence.after, "after")}
      </SentenceRow>

      <OptionsRow>
        {sentence.options.map((option) => (
          <OptionChip
            key={option}
            type="button"
            disabled={isChecked}
            onClick={() => handleSelectOption(option)}
            $selected={isChecked ? option === sentence.answer : option === selectedOption}
          >
            {option}
          </OptionChip>
        ))}
      </OptionsRow>

      {isChecked && (
        <FeedbackBox $correct={isCorrect}>
          <FeedbackTitle $correct={isCorrect}>
            {isCorrect ? "Correto!" : `Quase! A resposta certa é ${sentence.answer}.`}
          </FeedbackTitle>
          <FeedbackText>{sentence.translation}</FeedbackText>
          <FeedbackText>{sentence.explanation}</FeedbackText>
        </FeedbackBox>
      )}

      <ActionsRow>
        {isChecked ? (
          <NextButton type="button" onClick={onNext}>
            {isLastQuestion ? "Ver resultado" : "Próxima frase"}
          </NextButton>
        ) : (
          <CheckButton type="button" disabled={selectedOption === null} onClick={handleCheck}>
            Verificar
          </CheckButton>
        )}
      </ActionsRow>
    </ExerciseCard>
  );
}
