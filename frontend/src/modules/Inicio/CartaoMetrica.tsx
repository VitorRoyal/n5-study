import { Metrica, RotuloMetrica, ValorMetrica, type TomMetrica } from "./style";

export interface CartaoMetricaProps {
  rotulo: string;
  valor: number;
  tom: TomMetrica;
}

export function CartaoMetrica({ rotulo, valor, tom }: CartaoMetricaProps) {
  return (
    <Metrica>
      <RotuloMetrica>{rotulo}</RotuloMetrica>
      <ValorMetrica $tom={tom}>{valor}</ValorMetrica>
    </Metrica>
  );
}
