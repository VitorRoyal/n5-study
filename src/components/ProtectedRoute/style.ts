import styled from "styled-components";
import { colors } from "../../styles/colors";

export const LoadingScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.washi};
  color: ${colors.inkSoft};
  font-size: 15px;
`;
