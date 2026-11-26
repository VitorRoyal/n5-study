import { useNavigate } from "react-router-dom";
import type { DescricaoRetomada } from "./retomada";
import {
  Barra,
  BotaoContinuar,
  DetalheRetomada,
  IlustracaoRetomada,
  LegendaRetomada,
  Preenchimento,
  Retomada,
  TituloRetomada,
} from "./style";

export interface BlocoRetomadaProps {
  descricao: DescricaoRetomada;
}

export function BlocoRetomada({ descricao }: BlocoRetomadaProps) {
  const navegar = useNavigate();

  return (
    <Retomada>
      <IlustracaoRetomada>{descricao.caractere}</IlustracaoRetomada>
      <div>
        <LegendaRetomada>{descricao.legenda}</LegendaRetomada>
        <TituloRetomada>{descricao.titulo}</TituloRetomada>
        {descricao.percentual !== null && (
          <Barra>
            <Preenchimento $percentual={descricao.percentual} />
          </Barra>
        )}
        <DetalheRetomada>{descricao.detalhe}</DetalheRetomada>
      </div>
      <BotaoContinuar type="button" onClick={() => navegar(descricao.rota)}>
        {descricao.rotuloBotao}
      </BotaoContinuar>
    </Retomada>
  );
}
