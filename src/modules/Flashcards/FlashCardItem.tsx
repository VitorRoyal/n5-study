import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FlashcardItem } from "./data";
import {
  QuizSlot,
  FlashCardShell,
  FlashCardFlipper,
  FlashCardFace,
  FlashCardFaceBack,
  FlashCardCharacter,
  FlashCardReading,
  FlashCardMeaning,
  FlashCardInput,
} from "./style";

export interface FlashCardItemProps {
  item: FlashcardItem;
  onCorrect: () => void;
  inputRef: (element: HTMLInputElement | null) => void;
  isLastSlot: boolean;
  onWrapToFirst: () => void;
}

const REVEAL_DURATION_MS = 2000;
const FLIP_TRANSITION_MS = 600;

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function collectAlternatives(source: string) {
  return [source, ...source.split(/[/,]/)]
    .map((alternative) => normalizeAnswer(alternative))
    .filter((alternative) => alternative.length > 0);
}

function isCorrectAnswer(value: string, item: FlashcardItem) {
  const normalized = normalizeAnswer(value);
  if (!normalized) {
    return false;
  }

  const accepted = [
    ...collectAlternatives(item.reading),
    ...(item.meaning ? collectAlternatives(item.meaning) : []),
  ];

  return accepted.includes(normalized);
}

export function FlashCardItem({ item, onCorrect, inputRef, isLastSlot, onWrapToFirst }: FlashCardItemProps) {
  const [value, setValue] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const isAdvancingRef = useRef(false);
  const pendingTimeoutRef = useRef<number | null>(null);

  function clearPendingTimeout() {
    if (pendingTimeoutRef.current !== null) {
      window.clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    setValue("");
    setIsFlipped(false);
    isAdvancingRef.current = false;
    clearPendingTimeout();
  }, [item.id]);

  useEffect(() => {
    return () => {
      clearPendingTimeout();
    };
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (isAdvancingRef.current) {
      return;
    }

    if (!isCorrectAnswer(nextValue, item)) {
      return;
    }

    isAdvancingRef.current = true;
    setIsFlipped(true);

    pendingTimeoutRef.current = window.setTimeout(() => {
      setIsFlipped(false);
      pendingTimeoutRef.current = window.setTimeout(() => {
        onCorrect();
      }, FLIP_TRANSITION_MS);
    }, REVEAL_DURATION_MS);
  }

  function handleCardClick() {
    if (isAdvancingRef.current) {
      return;
    }
    setIsFlipped((current) => !current);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (isLastSlot && event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      onWrapToFirst();
    }
  }

  return (
    <QuizSlot>
      <FlashCardShell type="button" tabIndex={-1} onClick={handleCardClick}>
        <FlashCardFlipper $flipped={isFlipped}>
          <FlashCardFace>
            <FlashCardCharacter>{item.character}</FlashCardCharacter>
          </FlashCardFace>
          <FlashCardFaceBack>
            <FlashCardCharacter>{item.character}</FlashCardCharacter>
            <FlashCardReading>{item.reading}</FlashCardReading>
            {item.meaning && <FlashCardMeaning>{item.meaning}</FlashCardMeaning>}
          </FlashCardFaceBack>
        </FlashCardFlipper>
      </FlashCardShell>
      <FlashCardInput
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Resposta"
        autoComplete="off"
        spellCheck={false}
      />
    </QuizSlot>
  );
}
