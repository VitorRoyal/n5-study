import styled from "styled-components";
import { colors } from "../../styles/colors";

export const CardsRow = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

export const Eyebrow = styled.span`
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.sealRed};
  font-weight: 500;
`;
