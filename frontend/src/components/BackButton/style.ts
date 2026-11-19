import styled from "styled-components";
import { colors } from "../../styles/colors";

export const BackButtonBase = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  color: ${colors.inkSoft};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 2px;
  transition: color 0.15s ease, background-color 0.15s ease;

  &:hover {
    color: ${colors.sealRed};
    background-color: ${colors.washiDark};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;
