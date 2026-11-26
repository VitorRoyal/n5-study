import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { ItemFlashcard } from "./dados";
import {
  SlotQuiz,
  CascaCartao,
  GiradorCartao,
  FaceCartao,
  VersoCartao,
  CaractereCartao,
  LeituraCartao,
  SignificadoCartao,
  CampoRespostaCartao,
} from "./style";

export interface CartaoFlashcardProps {
  item: ItemFlashcard;
  aoAcertar: () => void;
  refCampo: (element: HTMLInputElement | null) => void;
  ehUltimoSlot: boolean;
  aoVoltarAoPrimeiro: () => void;
}

const DURACAO_REVELACAO_MS = 2000;
const DURACAO_VIRADA_MS = 600;

function normalizarResposta(valor: string) {
  return valor
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function coletarAlternativas(origem: string) {
  return [origem, ...origem.split(/[/,]/)]
    .map((alternativa) => normalizarResposta(alternativa))
    .filter((alternativa) => alternativa.length > 0);
}

function respostaEstaCorreta(valor: string, item: ItemFlashcard) {
  const normalizada = normalizarResposta(valor);
  if (!normalizada) {
    return false;
  }

  const aceitas = [
    ...coletarAlternativas(item.leitura),
    ...(item.significado ? coletarAlternativas(item.significado) : []),
  ];

  return aceitas.includes(normalizada);
}

export function CartaoFlashcard({ item, aoAcertar, refCampo, ehUltimoSlot, aoVoltarAoPrimeiro }: CartaoFlashcardProps) {
  const [valor, definirValor] = useState("");
  const [virada, definirVirada] = useState(false);
  const avancandoRef = useRef(false);
  const temporizadorPendenteRef = useRef<number | null>(null);

  function limparTemporizadorPendente() {
    if (temporizadorPendenteRef.current !== null) {
      window.clearTimeout(temporizadorPendenteRef.current);
      temporizadorPendenteRef.current = null;
    }
  }

  useEffect(() => {
    definirValor("");
    definirVirada(false);
    avancandoRef.current = false;
    limparTemporizadorPendente();
  }, [item.id]);

  useEffect(() => {
    return () => {
      limparTemporizadorPendente();
    };
  }, []);

  function tratarMudanca(evento: ChangeEvent<HTMLInputElement>) {
    const proximoValor = evento.target.value;
    definirValor(proximoValor);

    if (avancandoRef.current) {
      return;
    }

    if (!respostaEstaCorreta(proximoValor, item)) {
      return;
    }

    avancandoRef.current = true;
    definirVirada(true);

    temporizadorPendenteRef.current = window.setTimeout(() => {
      definirVirada(false);
      temporizadorPendenteRef.current = window.setTimeout(() => {
        aoAcertar();
      }, DURACAO_VIRADA_MS);
    }, DURACAO_REVELACAO_MS);
  }

  function tratarCliqueCartao() {
    if (avancandoRef.current) {
      return;
    }
    definirVirada((atual) => !atual);
  }

  function tratarTeclaCampo(evento: KeyboardEvent<HTMLInputElement>) {
    if (ehUltimoSlot && evento.key === "Tab" && !evento.shiftKey) {
      evento.preventDefault();
      aoVoltarAoPrimeiro();
    }
  }

  return (
    <SlotQuiz>
      <CascaCartao type="button" tabIndex={-1} onClick={tratarCliqueCartao}>
        <GiradorCartao $virada={virada}>
          <FaceCartao>
            <CaractereCartao>{item.caractere}</CaractereCartao>
          </FaceCartao>
          <VersoCartao>
            <CaractereCartao>{item.caractere}</CaractereCartao>
            <LeituraCartao>{item.leitura}</LeituraCartao>
            {item.significado && <SignificadoCartao>{item.significado}</SignificadoCartao>}
          </VersoCartao>
        </GiradorCartao>
      </CascaCartao>
      <CampoRespostaCartao
        ref={refCampo}
        type="text"
        value={valor}
        onChange={tratarMudanca}
        onKeyDown={tratarTeclaCampo}
        placeholder="Resposta"
        autoComplete="off"
        spellCheck={false}
      />
    </SlotQuiz>
  );
}
