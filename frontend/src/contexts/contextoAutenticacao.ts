import { createContext, useContext } from "react";
import type { UsuarioAutenticado } from "../services/auth";

export interface ValorContextoAutenticacao {
  usuario: UsuarioAutenticado | null;
  carregando: boolean;
  entrar: (nomeUsuario: string, senha: string) => Promise<void>;
  cadastrar: (nomeUsuario: string, senha: string) => Promise<void>;
  sair: () => void;
}

export const ContextoAutenticacao = createContext<ValorContextoAutenticacao | null>(null);

export function useAutenticacao(): ValorContextoAutenticacao {
  const contexto = useContext(ContextoAutenticacao);

  if (contexto === null) {
    throw new Error("useAutenticacao precisa ser usado dentro de ProvedorAutenticacao");
  }

  return contexto;
}
