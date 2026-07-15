import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 40px;
  background-color: ${colors.surface};
  border-bottom: 2px solid ${colors.ink};
`;

export const NavSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavTitle = styled.span`
  font-family: "Shippori Mincho", serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
`;
