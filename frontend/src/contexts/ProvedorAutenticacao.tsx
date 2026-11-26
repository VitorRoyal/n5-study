import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { lerTokenArmazenado } from "../services/api";
import {
  limparSessao,
  buscarUsuarioAtual,
  login,
  registrar,
  type UsuarioAutenticado,
} from "../services/auth";
import { ContextoAutenticacao, type ValorContextoAutenticacao } from "./contextoAutenticacao";

export interface ProvedorAutenticacaoProps {
  children: ReactNode;
}

export function ProvedorAutenticacao({ children }: ProvedorAutenticacaoProps) {
  const [usuario, definirUsuario] = useState<UsuarioAutenticado | null>(null);
  const [carregando, definirCarregando] = useState(true);

  useEffect(() => {
    if (lerTokenArmazenado() === null) {
      definirCarregando(false);
      return;
    }

    let ativo = true;

    buscarUsuarioAtual()
      .then((usuarioCarregado) => {
        if (ativo) {
          definirUsuario(usuarioCarregado);
        }
      })
      .catch(() => {
        limparSessao();
      })
      .finally(() => {
        if (ativo) {
          definirCarregando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  const entrar = useCallback(async (nomeUsuario: string, senha: string) => {
    definirUsuario(await login(nomeUsuario, senha));
  }, []);

  const cadastrar = useCallback(async (nomeUsuario: string, senha: string) => {
    definirUsuario(await registrar(nomeUsuario, senha));
  }, []);

  const sair = useCallback(() => {
    limparSessao();
    definirUsuario(null);
  }, []);

  const valor = useMemo<ValorContextoAutenticacao>(
    () => ({ usuario, carregando, entrar, cadastrar, sair }),
    [usuario, carregando, entrar, cadastrar, sair]
  );

  return <ContextoAutenticacao.Provider value={valor}>{children}</ContextoAutenticacao.Provider>;
}
