import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";
import { PrimaryButton, SecondaryButton } from "../../styles/GlobalStyles";

export const ExerciseWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export const ExerciseCard = styled.section`
  width: 100%;
  max-width: 720px;
  background-color: ${colors.surface};
  border: 3px solid ${colors.lineStrong};
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const ExerciseHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: ${colors.inkSoft};
`;

export const ExerciseProgress = styled.span`
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const ExerciseScore = styled.span`
  font-weight: 600;
  color: ${colors.indigo};
`;

export const PromptLabel = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

export const SentenceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 72px;
`;

export const SentenceText = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 28px;
  color: ${colors.ink};
`;

export const WordAnchor = styled.span`
  position: relative;
  display: inline-flex;
`;

export const WordButton = styled.button<{ $open: boolean }>`
  border: none;
  background: none;
  padding: 0;
  font-family: "Shippori Mincho", serif;
  font-size: 28px;
  color: ${colors.ink};
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-thickness: 2px;
  text-decoration-color: ${colors.lineStrong};
  text-underline-offset: 8px;
  transition: color 0.15s ease, text-decoration-color 0.15s ease;

  ${({ $open }) =>
    $open &&
    css`
      color: ${colors.indigo};
      text-decoration-style: solid;
      text-decoration-color: ${colors.indigo};
    `}

  &:hover {
    color: ${colors.indigo};
    text-decoration-color: ${colors.indigo};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 4px;
  }
`;

export const WordPopover = styled.span`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  min-width: 130px;
  max-width: 220px;
  padding: 10px 14px;
  background-color: ${colors.indigo};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: ${colors.indigo};
  }
`;

export const WordRomaji = styled.span`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${colors.surface};
`;

export const WordTranslation = styled.span`
  font-size: 13px;
  line-height: 1.4;
  color: ${colors.washiDark};
  padding-top: 6px;
  border-top: 1px solid ${colors.indigoSoft};
`;

export const BlankSlot = styled.button<{ $filled: boolean; $checked: boolean; $correct: boolean }>`
  min-width: 120px;
  min-height: 52px;
  padding: 8px 18px;
  font-family: "Shippori Mincho", serif;
  font-size: 26px;
  color: ${colors.ink};
  background-color: ${colors.washi};
  border: 2px dashed ${colors.lineStrong};
  border-radius: 14px;
  cursor: pointer;

  ${({ $filled }) =>
    $filled &&
    css`
      border-style: solid;
      background-color: ${colors.surface};
    `}

  ${({ $checked, $correct }) =>
    $checked &&
    css`
      cursor: default;
      border-color: ${$correct ? colors.indigo : colors.sealRed};
      color: ${$correct ? colors.indigo : colors.sealRed};
    `}

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;

export const OptionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const OptionChip = styled.button<{ $selected: boolean }>`
  font-family: "Shippori Mincho", serif;
  font-size: 22px;
  color: ${colors.ink};
  background-color: ${colors.surface};
  border: 2px solid ${colors.lineStrong};
  border-radius: 999px;
  padding: 10px 24px;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;

  ${({ $selected }) =>
    $selected &&
    css`
      border-color: ${colors.indigo};
      color: ${colors.indigo};
    `}

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    border-color: ${colors.indigo};
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;

export const FeedbackBox = styled.div<{ $correct: boolean }>`
  border-left: 4px solid ${({ $correct }) => ($correct ? colors.indigo : colors.sealRed)};
  background-color: ${colors.washi};
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FeedbackTitle = styled.strong<{ $correct: boolean }>`
  font-size: 15px;
  color: ${({ $correct }) => ($correct ? colors.indigo : colors.sealRed)};
`;

export const FeedbackText = styled.span`
  font-size: 14px;
  color: ${colors.inkSoft};
  line-height: 1.5;
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const CheckButton = styled(PrimaryButton)`
  border-radius: 999px;
  padding: 12px 28px;

  &:disabled {
    cursor: default;
    opacity: 0.45;
    background-color: ${colors.lineStrong};
    border-color: ${colors.lineStrong};
  }
`;

export const NextButton = styled(SecondaryButton)`
  border-radius: 999px;
  padding: 12px 28px;
`;

export const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

export const ResultScore = styled.strong`
  font-family: "Shippori Mincho", serif;
  font-size: 40px;
  color: ${colors.indigo};
`;
