import { useState, type ChangeEvent } from "react";
import {
  montarPerguntasImagem,
  opcoesTamanhoQuiz,
  tamanhoQuizPadrao,
  type PerguntaImagem,
} from "./dadosImagens";
import { Subtitulo } from "../../styles/GlobalStyles";
import { CartaoPerguntaImagem } from "./CartaoPerguntaImagem";
import {
  registrarRespostaEmSegundoPlano,
  salvarSessaoEmSegundoPlano,
} from "../../services/progresso";
import {
  ContainerQuizImagem,
  CartaoResultadoImagem,
  PontuacaoResultadoImagem,
  TextoRevelacao,
  BotaoProximaPergunta,
  ContadorAcertos,
  LinhaCabecalhoQuiz,
  LinhaTamanhoQuiz,
  SeletorTamanhoQuiz,
} from "./style";

export function QuizImagens() {
  const [tamanhoQuiz, definirTamanhoQuiz] = useState(tamanhoQuizPadrao);
  const [perguntas, definirPerguntas] = useState<PerguntaImagem[]>(() =>
    montarPerguntasImagem(tamanhoQuizPadrao)
  );
  const [indiceAtual, definirIndiceAtual] = useState(0);
  const [quantidadeAcertos, definirQuantidadeAcertos] = useState(0);
  const [finalizado, definirFinalizado] = useState(false);

  function iniciarQuiz(length: number) {
    definirPerguntas(montarPerguntasImagem(length));
    definirIndiceAtual(0);
    definirQuantidadeAcertos(0);
    definirFinalizado(false);
  }

  function tratarMudancaTamanho(evento: ChangeEvent<HTMLSelectElement>) {
    const proximoTamanho = Number(evento.target.value);
    definirTamanhoQuiz(proximoTamanho);
    iniciarQuiz(proximoTamanho);
  }

  function tratarResposta(acertou: boolean) {
    if (acertou) {
      definirQuantidadeAcertos((atual) => atual + 1);
    }

    registrarRespostaEmSegundoPlano({
      tipoConteudo: "IMAGEM",
      itemId: perguntas[indiceAtual].cartao.id,
      acertou,
    });
    salvarSessaoEmSegundoPlano({
      tipoConteudo: "IMAGEM",
      itemId: perguntas[indiceAtual].cartao.id,
      posicao: indiceAtual + 1,
      totalItens: perguntas.length,
    });
  }

  function tratarAvanco() {
    if (indiceAtual === perguntas.length - 1) {
      definirFinalizado(true);
      return;
    }
    definirIndiceAtual((atual) => atual + 1);
  }

  const cabecalho = (
    <LinhaCabecalhoQuiz>
      <Subtitulo>Escolha a palavra que corresponde a imagem.</Subtitulo>
      <LinhaTamanhoQuiz>
        Quantidade de imagens
        <SeletorTamanhoQuiz value={tamanhoQuiz} onChange={tratarMudancaTamanho}>
          {opcoesTamanhoQuiz.map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </SeletorTamanhoQuiz>
      </LinhaTamanhoQuiz>
    </LinhaCabecalhoQuiz>
  );

  if (finalizado) {
    return (
      <>
        {cabecalho}
        <ContainerQuizImagem>
          <CartaoResultadoImagem>
            <PontuacaoResultadoImagem>
              {quantidadeAcertos} / {perguntas.length}
            </PontuacaoResultadoImagem>
            <TextoRevelacao>
              Você acertou {quantidadeAcertos} de {perguntas.length} imagens.
            </TextoRevelacao>
            <BotaoProximaPergunta type="button" onClick={() => iniciarQuiz(tamanhoQuiz)}>
              Recomeçar
            </BotaoProximaPergunta>
          </CartaoResultadoImagem>
        </ContainerQuizImagem>
      </>
    );
  }

  return (
    <>
      {cabecalho}
      <CartaoPerguntaImagem
        key={perguntas[indiceAtual].cartao.id}
        pergunta={perguntas[indiceAtual]}
        numeroQuestao={indiceAtual + 1}
        totalQuestoes={perguntas.length}
        ultimaQuestao={indiceAtual === perguntas.length - 1}
        aoResponder={tratarResposta}
        aoAvancar={tratarAvanco}
      />
      <ContadorAcertos>Acertos: {quantidadeAcertos}</ContadorAcertos>
    </>
  );
}
