import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { colors } from "../../styles/colors";

export const Menu = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: ${colors.surface};
  border-right: 3px solid ${colors.lineStrong};
  padding: 22px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Marca = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 20px;
`;

export const Selo = styled.div`
  width: 38px;
  height: 38px;
  flex: none;
  border: 2px solid ${colors.sealRed};
  border-radius: 50%;
  color: ${colors.sealRed};
  font-family: "Shippori Mincho", serif;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NomeMarca = styled.b`
  font-family: "Shippori Mincho", serif;
  font-size: 19px;
  letter-spacing: 0.02em;
`;

export const Grupo = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TituloGrupo = styled.h4`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.lineStrong};
  font-weight: 700;
  padding: 0 20px 7px;
`;

const itemBase = css`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 20px;
  border: none;
  border-left: 3px solid transparent;
  background: none;
  font-size: 14px;
  text-align: left;
  color: ${colors.inkSoft};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: ${colors.washi};
  }

  &:focus-visible {
    outline: 2px solid ${colors.sealRed};
    outline-offset: -2px;
  }
`;

const itemAtivo = css`
  background-color: ${colors.washiDark};
  border-left-color: ${colors.sealRed};
  color: ${colors.ink};
  font-weight: 700;
`;

export const ItemLink = styled(NavLink)`
  ${itemBase}

  &.active {
    ${itemAtivo}
  }
`;

export const ItemBotao = styled.button`
  ${itemBase}
`;

export const ItemDesativado = styled.span`
  ${itemBase}
  cursor: not-allowed;
  opacity: 0.55;

  &:hover {
    background-color: transparent;
  }
`;

export const Icone = styled.svg`
  width: 17px;
  height: 17px;
  flex: none;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.7;
`;

export const Seta = styled.span<{ $aberto: boolean }>`
  margin-left: auto;
  font-size: 10px;
  color: ${colors.lineStrong};
  transition: transform 0.15s ease;

  ${({ $aberto }) =>
    !$aberto &&
    css`
      transform: rotate(-90deg);
    `}
`;

export const EtiquetaEmBreve = styled.span`
  margin-left: auto;
  font-size: 9px;
  background-color: ${colors.washiDark};
  color: ${colors.inkSoft};
  padding: 2px 7px;
  border-radius: 999px;
  letter-spacing: 0.06em;
`;

export const Submenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const subitemBase = css`
  font-size: 13px;
  padding: 7px 20px 7px 48px;
`;

export const SubitemLink = styled(ItemLink)`
  ${subitemBase}

  &:hover {
    color: ${colors.indigo};
  }
`;

export const SubitemDesativado = styled(ItemDesativado)`
  ${subitemBase}
  padding-right: 16px;
`;
