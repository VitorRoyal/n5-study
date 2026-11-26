import { useEffect, useState } from "react";
import type { ItemFrase, TokenFrase } from "./dados";
import { PalavraFrase } from "./PalavraFrase";
import {
  CartaoExercicio,
  CabecalhoExercicio,
  ProgressoExercicio,
  PontuacaoExercicio,
  RotuloEnunciado,
  LinhaFrase,
  Lacuna,
  LinhaOpcoes,
  ChipOpcao,
  CaixaFeedback,
  TituloFeedback,
  TextoFeedback,
  LinhaAcoes,
  BotaoVerificar,
  BotaoAvancar,
} from "./style";

export interface ExercicioFraseProps {
  frase: ItemFrase;
  numeroQuestao: number;
  totalQuestoes: number;
  quantidadeAcertos: number;
  ultimaQuestao: boolean;
  aoResponder: (acertou: boolean) => void;
  aoAvancar: () => void;
}

export function ExercicioFrase({
  frase,
  numeroQuestao,
  totalQuestoes,
  quantidadeAcertos,
  ultimaQuestao,
  aoResponder,
  aoAvancar,
}: ExercicioFraseProps) {
  const [opcaoSelecionada, definirOpcaoSelecionada] = useState<string | null>(null);
  const [verificada, definirVerificada] = useState(false);
  const [idPalavraAberta, definirIdPalavraAberta] = useState<string | null>(null);

  useEffect(() => {
    definirOpcaoSelecionada(null);
    definirVerificada(false);
    definirIdPalavraAberta(null);
  }, [frase.id]);

  const acertou = opcaoSelecionada === frase.resposta;

  function tratarAlternanciaPalavra(idPalavra: string) {
    definirIdPalavraAberta((atual) => (atual === idPalavra ? null : idPalavra));
  }

  function renderizarTokens(tokens: TokenFrase[], posicao: string) {
    return tokens.map((token, indice) => {
      const idPalavra = `${posicao}-${indice}`;

      return (
        <PalavraFrase
          key={idPalavra}
          token={token}
          aberta={idPalavraAberta === idPalavra}
          aoAlternar={() => tratarAlternanciaPalavra(idPalavra)}
        />
      );
    });
  }

  function tratarSelecaoOpcao(opcao: string) {
    if (verificada) {
      return;
    }
    definirOpcaoSelecionada((atual) => (atual === opcao ? null : opcao));
  }

  function tratarLimpezaLacuna() {
    if (verificada) {
      return;
    }
    definirOpcaoSelecionada(null);
  }

  function tratarVerificacao() {
    if (verificada || opcaoSelecionada === null) {
      return;
    }
    definirVerificada(true);
    aoResponder(opcaoSelecionada === frase.resposta);
  }

  return (
    <CartaoExercicio>
      <CabecalhoExercicio>
        <ProgressoExercicio>
          Frase {numeroQuestao} de {totalQuestoes}
        </ProgressoExercicio>
        <PontuacaoExercicio>Acertos: {quantidadeAcertos}</PontuacaoExercicio>
      </CabecalhoExercicio>

      <RotuloEnunciado>Complete a frase</RotuloEnunciado>

      <LinhaFrase>
        {renderizarTokens(frase.antes, "antes")}
        <Lacuna
          type="button"
          onClick={tratarLimpezaLacuna}
          $preenchida={opcaoSelecionada !== null}
          $verificada={verificada}
          $correto={acertou}
        >
          {opcaoSelecionada}
        </Lacuna>
        {renderizarTokens(frase.depois, "depois")}
      </LinhaFrase>

      <LinhaOpcoes>
        {frase.opcoes.map((opcao) => (
          <ChipOpcao
            key={opcao}
            type="button"
            disabled={verificada}
            onClick={() => tratarSelecaoOpcao(opcao)}
            $selecionada={verificada ? opcao === frase.resposta : opcao === opcaoSelecionada}
          >
            {opcao}
          </ChipOpcao>
        ))}
      </LinhaOpcoes>

      {verificada && (
        <CaixaFeedback $correto={acertou}>
          <TituloFeedback $correto={acertou}>
            {acertou ? "Correto!" : `Quase! A resposta certa é ${frase.resposta}.`}
          </TituloFeedback>
          <TextoFeedback>{frase.traducao}</TextoFeedback>
          <TextoFeedback>{frase.explicacao}</TextoFeedback>
        </CaixaFeedback>
      )}

      <LinhaAcoes>
        {verificada ? (
          <BotaoAvancar type="button" onClick={aoAvancar}>
            {ultimaQuestao ? "Ver resultado" : "Próxima frase"}
          </BotaoAvancar>
        ) : (
          <BotaoVerificar type="button" disabled={opcaoSelecionada === null} onClick={tratarVerificacao}>
            Verificar
          </BotaoVerificar>
        )}
      </LinhaAcoes>
    </CartaoExercicio>
  );
}
