import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";

export const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  cursor: pointer;
  color: ${colors.inkSoft};
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;

  ${({ $active }) =>
    $active &&
    css`
      color: ${colors.indigo};
      border-bottom-color: ${colors.sealRed};
      font-weight: 700;
    `}

  &:hover {
    color: ${colors.indigo};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;

export const QuizWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export const QuizGrid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: center;
  gap: 28px;
`;

export const ScoreCounter = styled.div`
  position: fixed;
  left: 24px;
  bottom: 24px;
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
