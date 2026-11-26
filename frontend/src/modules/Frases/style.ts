import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";
import { BotaoPrimario, BotaoSecundario } from "../../styles/GlobalStyles";

export const ContainerExercicio = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export const CartaoExercicio = styled.section`
  width: 100%;
  max-width: 720px;
  background-color: ${colors.superficie};
  border: 3px solid ${colors.linhaForte};
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const CabecalhoExercicio = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: ${colors.tintaSuave};
`;

export const ProgressoExercicio = styled.span`
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const PontuacaoExercicio = styled.span`
  font-weight: 600;
  color: ${colors.indigo};
`;

export const RotuloEnunciado = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

export const LinhaFrase = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 72px;
`;

export const TextoFrase = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 28px;
  color: ${colors.tinta};
`;

export const AncoraPalavra = styled.span`
  position: relative;
  display: inline-flex;
`;

export const BotaoPalavra = styled.button<{ $aberta: boolean }>`
  border: none;
  background: none;
  padding: 0;
  font-family: "Shippori Mincho", serif;
  font-size: 28px;
  color: ${colors.tinta};
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-thickness: 2px;
  text-decoration-color: ${colors.linhaForte};
  text-underline-offset: 8px;
  transition: color 0.15s ease, text-decoration-color 0.15s ease;

  ${({ $aberta }) =>
    $aberta &&
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
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 4px;
  }
`;

export const BalaoPalavra = styled.span`
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

export const RomajiPalavra = styled.span`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${colors.superficie};
`;

export const TraducaoPalavra = styled.span`
  font-size: 13px;
  line-height: 1.4;
  color: ${colors.washiDark};
  padding-top: 6px;
  border-top: 1px solid ${colors.indigoSuave};
`;

export const Lacuna = styled.button<{ $preenchida: boolean; $verificada: boolean; $correto: boolean }>`
  min-width: 120px;
  min-height: 52px;
  padding: 8px 18px;
  font-family: "Shippori Mincho", serif;
  font-size: 26px;
  color: ${colors.tinta};
  background-color: ${colors.washi};
  border: 2px dashed ${colors.linhaForte};
  border-radius: 14px;
  cursor: pointer;

  ${({ $preenchida }) =>
    $preenchida &&
    css`
      border-style: solid;
      background-color: ${colors.superficie};
    `}

  ${({ $verificada, $correto }) =>
    $verificada &&
    css`
      cursor: default;
      border-color: ${$correto ? colors.indigo : colors.vermelhoSelo};
      color: ${$correto ? colors.indigo : colors.vermelhoSelo};
    `}

  &:focus-visible {
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }
`;

export const LinhaOpcoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const ChipOpcao = styled.button<{ $selecionada: boolean }>`
  font-family: "Shippori Mincho", serif;
  font-size: 22px;
  color: ${colors.tinta};
  background-color: ${colors.superficie};
  border: 2px solid ${colors.linhaForte};
  border-radius: 999px;
  padding: 10px 24px;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;

  ${({ $selecionada }) =>
    $selecionada &&
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
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }
`;

export const CaixaFeedback = styled.div<{ $correto: boolean }>`
  border-left: 4px solid ${({ $correto }) => ($correto ? colors.indigo : colors.vermelhoSelo)};
  background-color: ${colors.washi};
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TituloFeedback = styled.strong<{ $correto: boolean }>`
  font-size: 15px;
  color: ${({ $correto }) => ($correto ? colors.indigo : colors.vermelhoSelo)};
`;

export const TextoFeedback = styled.span`
  font-size: 14px;
  color: ${colors.tintaSuave};
  line-height: 1.5;
`;

export const LinhaAcoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const BotaoVerificar = styled(BotaoPrimario)`
  border-radius: 999px;
  padding: 12px 28px;

  &:disabled {
    cursor: default;
    opacity: 0.45;
    background-color: ${colors.linhaForte};
    border-color: ${colors.linhaForte};
  }
`;

export const BotaoAvancar = styled(BotaoSecundario)`
  border-radius: 999px;
  padding: 12px 28px;
`;

export const CartaoResultado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

export const PontuacaoResultado = styled.strong`
  font-family: "Shippori Mincho", serif;
  font-size: 40px;
  color: ${colors.indigo};
`;
