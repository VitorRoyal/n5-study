import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";

export const ContainerQuiz = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export const GradeQuiz = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 28px;
`;

export const ContadorAcertos = styled.div`
  position: sticky;
  bottom: 24px;
  width: fit-content;
  background-color: ${colors.superficie};
  border: 2px solid ${colors.linhaForte};
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.tinta};
`;

export const SlotQuiz = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const CascaCartao = styled.button`
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
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 4px;
  }
`;

export const GiradorCartao = styled.div<{ $virada: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;

  ${({ $virada }) =>
    $virada &&
    css`
      transform: rotateY(180deg);
    `}
`;

export const FaceCartao = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  background-color: ${colors.superficie};
  border: 3px solid ${colors.linhaForte};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`;

export const VersoCartao = styled(FaceCartao)`
  transform: rotateY(180deg);
`;

export const CaractereCartao = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 48px;
  color: ${colors.tinta};
`;

export const LeituraCartao = styled.span`
  font-size: 16px;
  color: ${colors.indigo};
  font-weight: 500;
`;

export const SignificadoCartao = styled.span`
  font-size: 13px;
  color: ${colors.tintaSuave};
  text-align: center;
`;

export const CampoRespostaCartao = styled.input`
  width: 100%;
  border: 2px solid ${colors.linhaForte};
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 14px;
  text-align: center;
  color: ${colors.tinta};
  background-color: ${colors.washi};
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${colors.indigo};
  }
`;

export type EstadoOpcaoImagem = "ocioso" | "correto" | "errado" | "esmaecido";

export const ContainerQuizImagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
`;

export const ProgressoQuizImagem = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${colors.tintaSuave};
`;

export const LinhaCabecalhoQuiz = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const LinhaTamanhoQuiz = styled.label`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.tintaSuave};
`;

export const SeletorTamanhoQuiz = styled.select`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.tinta};
  background-color: ${colors.superficie};
  border: 2px solid ${colors.linhaForte};
  border-radius: 999px;
  padding: 8px 16px;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${colors.indigo};
  }

  &:focus-visible {
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }
`;

export const CascaCartaoImagem = styled.div`
  width: 320px;
  height: 300px;
  perspective: 1200px;
`;

export const Ilustracao = styled.img`
  width: 220px;
  height: 220px;
  object-fit: contain;
`;

export const ColunaOpcoesImagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 320px;
`;

export const BotaoOpcaoImagem = styled.button<{ $estado: EstadoOpcaoImagem }>`
  background-color: ${colors.superficie};
  border: 3px solid ${colors.linhaForte};
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
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }

  ${({ $estado }) =>
    $estado === "correto" &&
    css`
      border-color: ${colors.jade};
      background-color: ${colors.superficie};
    `}

  ${({ $estado }) =>
    $estado === "errado" &&
    css`
      border-color: ${colors.vermelhoSelo};
    `}

  ${({ $estado }) =>
    $estado === "esmaecido" &&
    css`
      opacity: 0.45;
    `}

  &:disabled {
    cursor: default;
  }
`;

export const KanaOpcaoImagem = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 24px;
  color: ${colors.tinta};
`;

export const RomajiOpcaoImagem = styled.span`
  font-size: 14px;
  color: ${colors.tintaSuave};
`;

export const TituloRevelacao = styled.strong<{ $correto: boolean }>`
  font-size: 16px;
  color: ${({ $correto }) => ($correto ? colors.jade : colors.vermelhoSelo)};
`;

export const TextoRevelacao = styled.span`
  font-size: 14px;
  color: ${colors.tintaSuave};
  text-align: center;
  line-height: 1.5;
`;

export const DestaqueRevelacao = styled.span`
  font-size: 14px;
  color: ${colors.jade};
  font-weight: 600;
  text-align: center;
`;

export const BotaoProximaPergunta = styled.button`
  border: 2px solid ${colors.indigo};
  background-color: ${colors.indigo};
  color: ${colors.superficie};
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: ${colors.indigoSuave};
    border-color: ${colors.indigoSuave};
  }

  &:focus-visible {
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }
`;

export const CartaoResultadoImagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: ${colors.superficie};
  border: 3px solid ${colors.linhaForte};
  border-radius: 20px;
  padding: 40px 48px;
`;

export const PontuacaoResultadoImagem = styled.strong`
  font-family: "Shippori Mincho", serif;
  font-size: 44px;
  color: ${colors.indigo};
`;
