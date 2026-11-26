import type { TokenFrase } from "./dados";
import {
  TextoFrase,
  AncoraPalavra,
  BotaoPalavra,
  BalaoPalavra,
  RomajiPalavra,
  TraducaoPalavra,
} from "./style";

export interface PalavraFraseProps {
  token: TokenFrase;
  aberta: boolean;
  aoAlternar: () => void;
}

export function PalavraFrase({ token, aberta, aoAlternar }: PalavraFraseProps) {
  if (!token.traducao) {
    return <TextoFrase>{token.texto}</TextoFrase>;
  }

  return (
    <AncoraPalavra>
      <BotaoPalavra type="button" onClick={aoAlternar} $aberta={aberta}>
        {token.texto}
      </BotaoPalavra>
      {aberta && (
        <BalaoPalavra role="tooltip">
          {token.romaji && <RomajiPalavra>{token.romaji}</RomajiPalavra>}
          <TraducaoPalavra>{token.traducao}</TraducaoPalavra>
        </BalaoPalavra>
      )}
    </AncoraPalavra>
  );
}
