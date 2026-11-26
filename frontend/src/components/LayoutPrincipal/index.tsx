import { Outlet } from "react-router-dom";
import { AreaConteudo } from "../../styles/GlobalStyles";
import { MenuLateral } from "../MenuLateral";
import { Estrutura } from "./style";

export function LayoutPrincipal() {
  return (
    <Estrutura>
      <MenuLateral />
      <AreaConteudo>
        <Outlet />
      </AreaConteudo>
    </Estrutura>
  );
}
