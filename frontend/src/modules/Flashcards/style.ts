import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";

export const QuizWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export const QuizGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 28px;
`;

export const ScoreCounter = styled.div`
  position: sticky;
  bottom: 24px;
  width: fit-content;
  background-color: ${colors.surface};
  border: 2px solid ${colors.lineStrong};
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.ink};
`;

export const QuizSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const FlashCardShell = styled.button`
  all: unset;
  display: block;
  width: 200px;
  height: 220px;
  cursor: pointer;
  perspective: 1200px;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 4px;
  }
`;

export const FlashCardFlipper = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;

  ${({ $flipped }) =>
    $flipped &&
    css`
      transform: rotateY(180deg);
    `}
`;

export const FlashCardFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  background-color: ${colors.surface};
  border: 3px solid ${colors.lineStrong};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`;

export const FlashCardFaceBack = styled(FlashCardFace)`
  transform: rotateY(180deg);
`;

export const FlashCardCharacter = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 48px;
  color: ${colors.ink};
`;

export const FlashCardReading = styled.span`
  font-size: 16px;
  color: ${colors.indigo};
  font-weight: 500;
`;

export const FlashCardMeaning = styled.span`
  font-size: 13px;
  color: ${colors.inkSoft};
  text-align: center;
`;

export const FlashCardInput = styled.input`
  width: 100%;
  border: 2px solid ${colors.lineStrong};
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 14px;
  text-align: center;
  color: ${colors.ink};
  background-color: ${colors.washi};
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${colors.indigo};
  }
`;

export type ImageOptionState = "idle" | "correct" | "wrong" | "muted";

export const ImageQuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
`;

export const ImageQuizProgress = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${colors.inkSoft};
`;

export const QuizHeaderRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const QuizLengthRow = styled.label`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.inkSoft};
`;

export const QuizLengthSelect = styled.select`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.ink};
  background-color: ${colors.surface};
  border: 2px solid ${colors.lineStrong};
  border-radius: 999px;
  padding: 8px 16px;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${colors.indigo};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;

export const ImageCardShell = styled.div`
  width: 320px;
  height: 300px;
  perspective: 1200px;
`;

export const Illustration = styled.img`
  width: 220px;
  height: 220px;
  object-fit: contain;
`;

export const ImageOptionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 320px;
`;

export const ImageOptionButton = styled.button<{ $state: ImageOptionState }>`
  background-color: ${colors.surface};
  border: 3px solid ${colors.lineStrong};
  border-radius: 999px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: transform 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    border-color: ${colors.indigo};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }

  ${({ $state }) =>
    $state === "correct" &&
    css`
      border-color: ${colors.jade};
      background-color: ${colors.surface};
    `}

  ${({ $state }) =>
    $state === "wrong" &&
    css`
      border-color: ${colors.sealRed};
    `}

  ${({ $state }) =>
    $state === "muted" &&
    css`
      opacity: 0.45;
    `}

  &:disabled {
    cursor: default;
  }
`;

export const ImageOptionKana = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 24px;
  color: ${colors.ink};
`;

export const ImageOptionRomaji = styled.span`
  font-size: 14px;
  color: ${colors.inkSoft};
`;

export const RevealTitle = styled.strong<{ $correct: boolean }>`
  font-size: 16px;
  color: ${({ $correct }) => ($correct ? colors.jade : colors.sealRed)};
`;

export const RevealText = styled.span`
  font-size: 14px;
  color: ${colors.inkSoft};
  text-align: center;
  line-height: 1.5;
`;

export const RevealHighlight = styled.span`
  font-size: 14px;
  color: ${colors.jade};
  font-weight: 600;
  text-align: center;
`;

export const NextQuestionButton = styled.button`
  border: 2px solid ${colors.indigo};
  background-color: ${colors.indigo};
  color: ${colors.surface};
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: ${colors.indigoSoft};
    border-color: ${colors.indigoSoft};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;

export const ImageResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: ${colors.surface};
  border: 3px solid ${colors.lineStrong};
  border-radius: 20px;
  padding: 40px 48px;
`;

export const ImageResultScore = styled.strong`
  font-family: "Shippori Mincho", serif;
  font-size: 44px;
  color: ${colors.indigo};
`;
