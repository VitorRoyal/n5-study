import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAutenticacao } from "../../contexts/contextoAutenticacao";
import { TelaCarregamento } from "./style";

export interface RotaProtegidaProps {
  children: ReactNode;
}

export function RotaProtegida({ children }: RotaProtegidaProps) {
  const { usuario, carregando } = useAutenticacao();

  if (carregando) {
    return <TelaCarregamento>Carregando...</TelaCarregamento>;
  }

  if (usuario === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
