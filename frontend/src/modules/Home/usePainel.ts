import { useEffect, useState } from "react";
import {
  RESUMO_VAZIO,
  buscarResumo,
  buscarSessao,
  type ResumoProgresso,
  type SessaoEstudo,
} from "../../services/progresso";

export interface EstadoPainel {
  resumo: ResumoProgresso;
  sessao: SessaoEstudo | null;
  carregando: boolean;
}

export function usePainel(): EstadoPainel {
  const [estado, setEstado] = useState<EstadoPainel>({
    resumo: RESUMO_VAZIO,
    sessao: null,
    carregando: true,
  });

  useEffect(() => {
    let ativo = true;

    Promise.all([buscarResumo(), buscarSessao()])
      .then(([resumo, sessao]) => {
        if (ativo) {
          setEstado({ resumo, sessao, carregando: false });
        }
      })
      .catch(() => {
        if (ativo) {
          setEstado({ resumo: RESUMO_VAZIO, sessao: null, carregando: false });
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  return estado;
}
