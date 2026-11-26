import type { Medalha as MedalhaDados } from "./medalhas";
import { DescricaoMedalha, Medalha, NomeMedalha, SeloMedalha } from "./style";

export interface CartaoMedalhaProps {
  medalha: MedalhaDados;
}

export function CartaoMedalha({ medalha }: CartaoMedalhaProps) {
  const bloqueada = !medalha.conquistada;

  return (
    <Medalha $bloqueada={bloqueada}>
      <SeloMedalha $bloqueada={bloqueada}>{medalha.caractere}</SeloMedalha>
      <NomeMedalha>{medalha.nome}</NomeMedalha>
      <DescricaoMedalha>{medalha.descricao}</DescricaoMedalha>
    </Medalha>
  );
}
