import styled from "styled-components";
import { colors } from "../../styles/colors";

export const CardButton = styled.button`
  position: relative;
  width: 320px;
  height: 220px;
  background-color: ${colors.surface};
  border: 2px solid ${colors.ink};
  border-radius: 2px;
  padding: 28px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 6px 6px 0 ${colors.lineStrong};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: 4px;
  }
`;

export const CardStamp = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 34px;
  height: 34px;
  border: 2px solid ${colors.sealRed};
  border-radius: 50%;
  color: ${colors.sealRed};
  font-family: "Shippori Mincho", serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 24px;
  font-weight: 700;
  color: ${colors.ink};
`;

export const CardDescription = styled.span`
  font-size: 14px;
  color: ${colors.inkSoft};
`;
