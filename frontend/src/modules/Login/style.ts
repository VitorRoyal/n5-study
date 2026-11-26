import styled from "styled-components";
import { colors } from "../../styles/colors";
import { BotaoPrimario } from "../../styles/GlobalStyles";

export const LayoutLogin = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const PainelMarca = styled.aside`
  background-color: ${colors.washiDark};
  border-right: 3px solid ${colors.linhaForte};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 48px 32px;

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 3px solid ${colors.linhaForte};
    gap: 20px;
    padding: 40px 24px;
  }
`;

export const SeloMarca = styled.span`
  width: 104px;
  height: 104px;
  border: 3px solid ${colors.vermelhoSelo};
  border-radius: 50%;
  color: ${colors.vermelhoSelo};
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

export const NomeMarca = styled.h1`
  font-family: "Shippori Mincho", serif;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${colors.tinta};
  text-align: center;

  @media (max-width: 900px) {
    font-size: 32px;
  }
`;

export const PainelFormulario = styled.main`
  background-color: ${colors.superficie};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
`;

export const ConteudoFormulario = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CabecalhoFormulario = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormularioLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RotuloCampo = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.tintaSuave};
`;

export const CampoTexto = styled.input`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 15px;
  color: ${colors.tinta};
  background-color: ${colors.washi};
  border: 2px solid ${colors.linhaForte};
  border-radius: 999px;
  padding: 11px 18px;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${colors.indigo};
  }
`;

export const BotaoEnviar = styled(BotaoPrimario)`
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 15px;

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background-color: ${colors.linhaForte};
    border-color: ${colors.linhaForte};
  }
`;

export const BotaoAlternarModo = styled.button`
  align-self: flex-start;
  border: none;
  background: none;
  color: ${colors.indigo};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;

  &:hover {
    color: ${colors.vermelhoSelo};
  }

  &:focus-visible {
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }
`;

export const MensagemErro = styled.p`
  border-left: 4px solid ${colors.vermelhoSelo};
  background-color: ${colors.washi};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.5;
  color: ${colors.vermelhoSelo};
`;

export const NotaRodape = styled.p`
  font-size: 12px;
  color: ${colors.tintaSuave};
  line-height: 1.5;
`;
