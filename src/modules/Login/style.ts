import styled from "styled-components";
import { colors } from "../../styles/colors";
import { PrimaryButton } from "../../styles/GlobalStyles";

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background-color: ${colors.washi};
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: ${colors.surface};
  border: 3px solid ${colors.lineStrong};
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LoginStamp = styled.span`
  align-self: center;
  width: 56px;
  height: 56px;
  border: 2px solid ${colors.sealRed};
  border-radius: 50%;
  color: ${colors.sealRed};
  font-family: "Shippori Mincho", serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.inkSoft};
`;

export const TextField = styled.input`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 15px;
  color: ${colors.ink};
  background-color: ${colors.washi};
  border: 2px solid ${colors.lineStrong};
  border-radius: 999px;
  padding: 11px 18px;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${colors.indigo};
  }
`;

export const SubmitButton = styled(PrimaryButton)`
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 15px;

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background-color: ${colors.lineStrong};
    border-color: ${colors.lineStrong};
  }
`;

export const ToggleModeButton = styled.button`
  border: none;
  background: none;
  color: ${colors.indigo};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: ${colors.sealRed};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 2px;
  }
`;

export const ErrorMessage = styled.p`
  border-left: 4px solid ${colors.sealRed};
  background-color: ${colors.washi};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.5;
  color: ${colors.sealRed};
`;

export const FooterNote = styled.p`
  font-size: 12px;
  color: ${colors.inkSoft};
  text-align: center;
  line-height: 1.5;
`;
