import styled from "styled-components";
import { colors } from "../../styles/colors";
import { PrimaryButton } from "../../styles/GlobalStyles";

export const LoginLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandPanel = styled.aside`
  background-color: ${colors.washiDark};
  border-right: 3px solid ${colors.lineStrong};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 48px 32px;

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 3px solid ${colors.lineStrong};
    gap: 20px;
    padding: 40px 24px;
  }
`;

export const BrandStamp = styled.span`
  width: 104px;
  height: 104px;
  border: 3px solid ${colors.sealRed};
  border-radius: 50%;
  color: ${colors.sealRed};
  font-family: "Shippori Mincho", serif;
  font-size: 46px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    width: 76px;
    height: 76px;
    font-size: 34px;
  }
`;

export const BrandName = styled.h1`
  font-family: "Shippori Mincho", serif;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${colors.ink};
  text-align: center;

  @media (max-width: 900px) {
    font-size: 32px;
  }
`;

export const FormPanel = styled.main`
  background-color: ${colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
`;

export const FormContent = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
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
  align-self: flex-start;
  border: none;
  background: none;
  color: ${colors.indigo};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;

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
  line-height: 1.5;
`;
