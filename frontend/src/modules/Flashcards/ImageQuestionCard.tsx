import { useEffect, useRef, useState } from "react";
import type { ImageCard, ImageQuestion } from "./imageData";
import {
  FlashCardFlipper,
  FlashCardFace,
  FlashCardFaceBack,
  FlashCardCharacter,
  FlashCardReading,
  ImageQuizWrapper,
  ImageQuizProgress,
  ImageCardShell,
  Illustration,
  ImageOptionsColumn,
  ImageOptionButton,
  ImageOptionKana,
  ImageOptionRomaji,
  RevealTitle,
  RevealText,
  RevealHighlight,
  NextQuestionButton,
  type ImageOptionState,
} from "./style";

export interface ImageQuestionCardProps {
  question: ImageQuestion;
  questionNumber: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  onAnswered: (isCorrect: boolean) => void;
  onNext: () => void;
}

type AnswerStatus = "idle" | "correct" | "wrong";

const REVEAL_DURATION_MS = 2000;
const FLIP_TRANSITION_MS = 600;

export function ImageQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  isLastQuestion,
  onAnswered,
  onNext,
}: ImageQuestionCardProps) {
  const [status, setStatus] = useState<AnswerStatus>("idle");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const pendingTimeoutRef = useRef<number | null>(null);

  function clearPendingTimeout() {
    if (pendingTimeoutRef.current !== null) {
      window.clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    setStatus("idle");
    setSelectedId(null);
    setIsFlipped(false);
    clearPendingTimeout();
  }, [question.card.id]);

  useEffect(() => {
    return () => {
      clearPendingTimeout();
    };
  }, []);

  const selectedCard = question.options.find((option) => option.id === selectedId) ?? null;

  function resolveOptionState(option: ImageCard): ImageOptionState {
    if (status === "idle") {
      return "idle";
    }
    if (option.id === question.card.id) {
      return "correct";
    }
    if (option.id === selectedId) {
      return "wrong";
    }
    return "muted";
  }

  function handleSelect(option: ImageCard) {
    if (status !== "idle") {
      return;
    }

    const isCorrect = option.id === question.card.id;
    setSelectedId(option.id);
    setStatus(isCorrect ? "correct" : "wrong");
    setIsFlipped(true);
    onAnswered(isCorrect);

    if (!isCorrect) {
      return;
    }

    pendingTimeoutRef.current = window.setTimeout(() => {
      setIsFlipped(false);
      pendingTimeoutRef.current = window.setTimeout(() => {
        onNext();
      }, FLIP_TRANSITION_MS);
    }, REVEAL_DURATION_MS);
  }

  return (
    <ImageQuizWrapper>
      <ImageQuizProgress>
        Imagem {questionNumber} de {totalQuestions}
      </ImageQuizProgress>

      <ImageCardShell>
        <FlashCardFlipper $flipped={isFlipped}>
          <FlashCardFace>
            <Illustration src={question.card.image} alt={question.card.meaning} />
          </FlashCardFace>
          <FlashCardFaceBack>
            {status === "wrong" && selectedCard ? (
              <>
                <RevealTitle $correct={false}>Resposta errada</RevealTitle>
                <FlashCardCharacter>{selectedCard.character}</FlashCardCharacter>
                <RevealText>
                  {selectedCard.romaji} significa {selectedCard.meaning}.
                </RevealText>
                <RevealHighlight>
                  A resposta certa é {question.card.character} ({question.card.romaji}) ={" "}
                  {question.card.meaning}.
                </RevealHighlight>
              </>
            ) : (
              <>
                <RevealTitle $correct>Correto!</RevealTitle>
                <FlashCardCharacter>{question.card.character}</FlashCardCharacter>
                <FlashCardReading>{question.card.romaji}</FlashCardReading>
                <RevealText>{question.card.meaning}</RevealText>
              </>
            )}
          </FlashCardFaceBack>
        </FlashCardFlipper>
      </ImageCardShell>

      <ImageOptionsColumn>
        {question.options.map((option) => (
          <ImageOptionButton
            key={option.id}
            type="button"
            disabled={status !== "idle"}
            onClick={() => handleSelect(option)}
            $state={resolveOptionState(option)}
          >
            <ImageOptionKana>{option.character}</ImageOptionKana>
            <ImageOptionRomaji>({option.romaji})</ImageOptionRomaji>
          </ImageOptionButton>
        ))}
      </ImageOptionsColumn>

      {status === "wrong" && (
        <NextQuestionButton type="button" onClick={onNext}>
          {isLastQuestion ? "Ver resultado" : "Próxima imagem"}
        </NextQuestionButton>
      )}
    </ImageQuizWrapper>
  );
}
