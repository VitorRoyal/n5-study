import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { colors } from "./colors";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-color: ${colors.washi};
    color: ${colors.tinta};
    font-family: "Zen Kaku Gothic New", sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    font-family: "Shippori Mincho", serif;
    color: ${colors.tinta};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: "Zen Kaku Gothic New", sans-serif;
  }
`;

export const AreaConteudo = styled.main`
  padding: 40px 44px 56px;
`;

export const Titulo = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

export const Subtitulo = styled.p`
  font-size: 15px;
  color: ${colors.tintaSuave};
  margin-top: 8px;
`;

export const BotaoPrimario = styled.button`
  border: 1px solid ${colors.indigo};
  background-color: ${colors.indigo};
  color: ${colors.superficie};
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 2px;
  cursor: ponteiro;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: ${colors.indigoSuave};
    border-color: ${colors.indigoSuave};
  }

  &:focus-visible {
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }
`;

export const BotaoSecundario = styled.button`
  border: 1px solid ${colors.linhaForte};
  background-color: transparent;
  color: ${colors.tinta};
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 2px;
  cursor: ponteiro;
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${colors.indigo};
    color: ${colors.indigo};
  }

  &:focus-visible {
    outline: 2px solid ${colors.vermelhoSelo};
    outline-offset: 2px;
  }
`;
