import { Outlet } from "react-router-dom";
import { ContentArea } from "../../styles/GlobalStyles";
import { MenuLateral } from "../MenuLateral";
import { Estrutura } from "./style";

export function LayoutPrincipal() {
  return (
    <Estrutura>
      <MenuLateral />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </Estrutura>
  );
}
