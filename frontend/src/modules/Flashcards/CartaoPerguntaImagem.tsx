import { useEffect, useRef, useState } from "react";
import type { CartaoImagem, PerguntaImagem } from "./dadosImagens";
import {
  GiradorCartao,
  FaceCartao,
  VersoCartao,
  CaractereCartao,
  LeituraCartao,
  ContainerQuizImagem,
  ProgressoQuizImagem,
  CascaCartaoImagem,
  Ilustracao,
  ColunaOpcoesImagem,
  BotaoOpcaoImagem,
  KanaOpcaoImagem,
  RomajiOpcaoImagem,
  TituloRevelacao,
  TextoRevelacao,
  DestaqueRevelacao,
  BotaoProximaPergunta,
  type EstadoOpcaoImagem,
} from "./style";

export interface CartaoPerguntaImagemProps {
  pergunta: PerguntaImagem;
  numeroQuestao: number;
  totalQuestoes: number;
  ultimaQuestao: boolean;
  aoResponder: (acertou: boolean) => void;
  aoAvancar: () => void;
}

type SituacaoResposta = "ocioso" | "correto" | "errado";

const DURACAO_REVELACAO_MS = 2000;
const DURACAO_VIRADA_MS = 600;

export function CartaoPerguntaImagem({
  pergunta,
  numeroQuestao,
  totalQuestoes,
  ultimaQuestao,
  aoResponder,
  aoAvancar,
}: CartaoPerguntaImagemProps) {
  const [situacao, definirSituacao] = useState<SituacaoResposta>("ocioso");
  const [idSelecionado, definirIdSelecionado] = useState<string | null>(null);
  const [virada, definirVirada] = useState(false);
  const temporizadorPendenteRef = useRef<number | null>(null);

  function limparTemporizadorPendente() {
    if (temporizadorPendenteRef.current !== null) {
      window.clearTimeout(temporizadorPendenteRef.current);
      temporizadorPendenteRef.current = null;
    }
  }

  useEffect(() => {
    definirSituacao("ocioso");
    definirIdSelecionado(null);
    definirVirada(false);
    limparTemporizadorPendente();
  }, [pergunta.cartao.id]);

  useEffect(() => {
    return () => {
      limparTemporizadorPendente();
    };
  }, []);

  const cartaoSelecionado = pergunta.opcoes.find((opcao) => opcao.id === idSelecionado) ?? null;

  function resolverEstadoOpcao(opcao: CartaoImagem): EstadoOpcaoImagem {
    if (situacao === "ocioso") {
      return "ocioso";
    }
    if (opcao.id === pergunta.cartao.id) {
      return "correto";
    }
    if (opcao.id === idSelecionado) {
      return "errado";
    }
    return "esmaecido";
  }

  function tratarSelecao(opcao: CartaoImagem) {
    if (situacao !== "ocioso") {
      return;
    }

    const acertou = opcao.id === pergunta.cartao.id;
    definirIdSelecionado(opcao.id);
    definirSituacao(acertou ? "correto" : "errado");
    definirVirada(true);
    aoResponder(acertou);

    if (!acertou) {
      return;
    }

    temporizadorPendenteRef.current = window.setTimeout(() => {
      definirVirada(false);
      temporizadorPendenteRef.current = window.setTimeout(() => {
        aoAvancar();
      }, DURACAO_VIRADA_MS);
    }, DURACAO_REVELACAO_MS);
  }

  return (
    <ContainerQuizImagem>
      <ProgressoQuizImagem>
        Imagem {numeroQuestao} de {totalQuestoes}
      </ProgressoQuizImagem>

      <CascaCartaoImagem>
        <GiradorCartao $virada={virada}>
          <FaceCartao>
            <Ilustracao src={pergunta.cartao.imagem} alt={pergunta.cartao.significado} />
          </FaceCartao>
          <VersoCartao>
            {situacao === "errado" && cartaoSelecionado ? (
              <>
                <TituloRevelacao $correto={false}>Resposta errada</TituloRevelacao>
                <CaractereCartao>{cartaoSelecionado.caractere}</CaractereCartao>
                <TextoRevelacao>
                  {cartaoSelecionado.romaji} significa {cartaoSelecionado.significado}.
                </TextoRevelacao>
                <DestaqueRevelacao>
                  A resposta certa é {pergunta.cartao.caractere} ({pergunta.cartao.romaji}) ={" "}
                  {pergunta.cartao.significado}.
                </DestaqueRevelacao>
              </>
            ) : (
              <>
                <TituloRevelacao $correto>Correto!</TituloRevelacao>
                <CaractereCartao>{pergunta.cartao.caractere}</CaractereCartao>
                <LeituraCartao>{pergunta.cartao.romaji}</LeituraCartao>
                <TextoRevelacao>{pergunta.cartao.significado}</TextoRevelacao>
              </>
            )}
          </VersoCartao>
        </GiradorCartao>
      </CascaCartaoImagem>

      <ColunaOpcoesImagem>
        {pergunta.opcoes.map((opcao) => (
          <BotaoOpcaoImagem
            key={opcao.id}
            type="button"
            disabled={situacao !== "ocioso"}
            onClick={() => tratarSelecao(opcao)}
            $estado={resolverEstadoOpcao(opcao)}
          >
            <KanaOpcaoImagem>{opcao.caractere}</KanaOpcaoImagem>
            <RomajiOpcaoImagem>({opcao.romaji})</RomajiOpcaoImagem>
          </BotaoOpcaoImagem>
        ))}
      </ColunaOpcoesImagem>

      {situacao === "errado" && (
        <BotaoProximaPergunta type="button" onClick={aoAvancar}>
          {ultimaQuestao ? "Ver resultado" : "Próxima imagem"}
        </BotaoProximaPergunta>
      )}
    </ContainerQuizImagem>
  );
}
