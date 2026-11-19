import styled from "styled-components";
import { colors } from "../../styles/colors";

export const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LoggedUserName = styled.span`
  font-size: 13px;
  color: ${colors.inkSoft};
`;

export const LogoutButtonBase = styled.button`
  border: 1px solid ${colors.lineStrong};
  background: none;
  color: ${colors.ink};
  font-size: 13px;
  font-weight: 500;
  padding: 7px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: ${colors.sealRed};
    border-color: ${colors.sealRed};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;
