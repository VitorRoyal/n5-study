import type { ReactNode } from "react";
import { Nav, NavSlot, NavTitle } from "./style";

export interface NavbarProps {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}

export function Navbar({ title, left, right }: NavbarProps) {
  return (
    <Nav>
      <NavSlot>
        {left}
        <NavTitle>{title}</NavTitle>
      </NavSlot>
      <NavSlot>{right}</NavSlot>
    </Nav>
  );
}
