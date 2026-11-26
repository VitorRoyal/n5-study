import { useState } from "react";
import { Titulo, Subtitulo } from "../../styles/GlobalStyles";
import { frases, type ItemFrase } from "./dados";
import { ExercicioFrase } from "./ExercicioFrase";
import {
  registrarRespostaEmSegundoPlano,
  salvarSessaoEmSegundoPlano,
} from "../../services/progresso";
import {
  ContainerExercicio,
  CartaoExercicio,
  CartaoResultado,
  PontuacaoResultado,
  RotuloEnunciado,
  TextoFeedback,
  LinhaAcoes,
  BotaoVerificar,
} from "./style";

function embaralharFrases(itens: ItemFrase[]) {
  const embaralhado = [...itens];

  for (let indice = embaralhado.length - 1; indice > 0; indice -= 1) {
    const alvo = Math.floor(Math.random() * (indice + 1));
    [embaralhado[indice], embaralhado[alvo]] = [embaralhado[alvo], embaralhado[indice]];
  }

  return embaralhado;
}

export function Frases() {
  const [baralho, definirBaralho] = useState<ItemFrase[]>(() => embaralharFrases(frases));
  const [indiceAtual, definirIndiceAtual] = useState(0);
  const [quantidadeAcertos, definirQuantidadeAcertos] = useState(0);
  const [finalizado, definirFinalizado] = useState(false);

  function tratarResposta(acertou: boolean) {
    if (acertou) {
      definirQuantidadeAcertos((atual) => atual + 1);
    }

    registrarRespostaEmSegundoPlano({
      tipoConteudo: "FRASE",
      itemId: baralho[indiceAtual].id,
      acertou,
    });
    salvarSessaoEmSegundoPlano({
      tipoConteudo: "FRASE",
      itemId: baralho[indiceAtual].id,
      posicao: indiceAtual + 1,
      totalItens: baralho.length,
    });
  }

  function tratarAvanco() {
    if (indiceAtual === baralho.length - 1) {
      definirFinalizado(true);
      return;
    }
    definirIndiceAtual((atual) => atual + 1);
  }

  function tratarReinicio() {
    definirBaralho(embaralharFrases(frases));
    definirIndiceAtual(0);
    definirQuantidadeAcertos(0);
    definirFinalizado(false);
  }

  return (
    <>
      <Titulo>Frases</Titulo>
      <Subtitulo>
        Complete as frases escolhendo a palavra correta. Clique em uma palavra sublinhada para
        ver a tradução.
      </Subtitulo>
      <ContainerExercicio>
        {finalizado ? (
          <CartaoExercicio>
            <CartaoResultado>
              <RotuloEnunciado>Exercício concluído</RotuloEnunciado>
              <PontuacaoResultado>
                {quantidadeAcertos} / {baralho.length}
              </PontuacaoResultado>
              <TextoFeedback>
                Você acertou {quantidadeAcertos} de {baralho.length} frases.
              </TextoFeedback>
            </CartaoResultado>
            <LinhaAcoes>
              <BotaoVerificar type="button" onClick={tratarReinicio}>
                Recomeçar
              </BotaoVerificar>
            </LinhaAcoes>
          </CartaoExercicio>
        ) : (
          <ExercicioFrase
            key={baralho[indiceAtual].id}
            frase={baralho[indiceAtual]}
            numeroQuestao={indiceAtual + 1}
            totalQuestoes={baralho.length}
            quantidadeAcertos={quantidadeAcertos}
            ultimaQuestao={indiceAtual === baralho.length - 1}
            aoResponder={tratarResposta}
            aoAvancar={tratarAvanco}
          />
        )}
      </ContainerExercicio>
    </>
  );
}
