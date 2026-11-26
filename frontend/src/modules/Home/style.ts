import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";
import { PrimaryButton, Title } from "../../styles/GlobalStyles";

export type TomMetrica = "sucesso" | "erro" | "neutro" | "destaque";

const tonsMetrica: Record<TomMetrica, string> = {
  sucesso: colors.jade,
  erro: colors.sealRed,
  neutro: colors.indigo,
  destaque: colors.gold,
};

const cartaoBase = css`
  background-color: ${colors.surface};
  border: 3px solid ${colors.lineStrong};
  border-radius: 18px;
`;

export const Saudacao = styled(Title)`
  font-size: 34px;
`;

export const TituloSecao = styled.h2`
  font-size: 19px;
  font-weight: 700;
  margin: 34px 0 14px;
`;

export const Metricas = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 26px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Metrica = styled.div`
  ${cartaoBase}
  padding: 18px 20px;
`;

export const RotuloMetrica = styled.span`
  font-size: 12px;
  color: ${colors.inkSoft};
  letter-spacing: 0.04em;
`;

export const ValorMetrica = styled.b<{ $tom: TomMetrica }>`
  display: block;
  font-family: "Shippori Mincho", serif;
  font-size: 36px;
  margin-top: 6px;
  line-height: 1;
  color: ${({ $tom }) => tonsMetrica[$tom]};
`;

export const Retomada = styled.div`
  ${cartaoBase}
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IlustracaoRetomada = styled.div`
  width: 62px;
  height: 62px;
  flex: none;
  border-radius: 14px;
  background-color: ${colors.washiDark};
  color: ${colors.ink};
  font-family: "Shippori Mincho", serif;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LegendaRetomada = styled.div`
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${colors.inkSoft};
`;

export const TituloRetomada = styled.div`
  font-family: "Shippori Mincho", serif;
  font-size: 21px;
  margin-top: 3px;
`;

export const Barra = styled.div`
  height: 7px;
  max-width: 330px;
  margin-top: 11px;
  background-color: ${colors.washiDark};
  border-radius: 999px;
  overflow: hidden;
`;

export const Preenchimento = styled.i<{ $percentual: number }>`
  display: block;
  height: 100%;
  width: ${({ $percentual }) => $percentual}%;
  background-color: ${colors.indigo};
`;

export const DetalheRetomada = styled.div`
  font-size: 12px;
  color: ${colors.inkSoft};
  margin-top: 6px;
`;

export const BotaoContinuar = styled(PrimaryButton)`
  margin-left: auto;
  flex: none;
  border-width: 2px;
  border-radius: 999px;
  padding: 11px 26px;
  font-weight: 600;
`;

export const ListaMedalhas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export const Medalha = styled.div<{ $bloqueada: boolean }>`
  ${cartaoBase}
  width: 152px;
  padding: 16px;
  text-align: center;

  ${({ $bloqueada }) =>
    $bloqueada &&
    css`
      opacity: 0.52;
    `}
`;

export const SeloMedalha = styled.div<{ $bloqueada: boolean }>`
  width: 52px;
  height: 52px;
  margin: 0 auto 10px;
  border-radius: 50%;
  border: 2px solid ${colors.gold};
  color: ${colors.gold};
  font-family: "Shippori Mincho", serif;
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $bloqueada }) =>
    $bloqueada &&
    css`
      border-style: dashed;
      border-color: ${colors.lineStrong};
      color: ${colors.lineStrong};
    `}
`;

export const NomeMedalha = styled.b`
  display: block;
  font-size: 13px;
`;

export const DescricaoMedalha = styled.span`
  display: block;
  margin-top: 3px;
  font-size: 11px;
  line-height: 1.4;
  color: ${colors.inkSoft};
`;
