import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Estrutura = styled.div`
  display: grid;
  grid-template-columns: 252px minmax(0, 1fr);
  min-height: 100vh;
  background-color: ${colors.washi};
`;
