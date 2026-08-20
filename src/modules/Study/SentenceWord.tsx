import type { SentenceToken } from "./data";
import {
  SentenceText,
  WordAnchor,
  WordButton,
  WordPopover,
  WordRomaji,
  WordTranslation,
} from "./style";

export interface SentenceWordProps {
  token: SentenceToken;
  isOpen: boolean;
  onToggle: () => void;
}

export function SentenceWord({ token, isOpen, onToggle }: SentenceWordProps) {
  if (!token.translation) {
    return <SentenceText>{token.text}</SentenceText>;
  }

  return (
    <WordAnchor>
      <WordButton type="button" onClick={onToggle} $open={isOpen}>
        {token.text}
      </WordButton>
      {isOpen && (
        <WordPopover role="tooltip">
          {token.romaji && <WordRomaji>{token.romaji}</WordRomaji>}
          <WordTranslation>{token.translation}</WordTranslation>
        </WordPopover>
      )}
    </WordAnchor>
  );
}
