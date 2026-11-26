import type { ResumoProgresso } from "../../services/progresso";

export interface Medalha {
  id: string;
  caractere: string;
  nome: string;
  descricao: string;
  conquistada: boolean;
}

interface RegraMedalha {
  id: string;
  caractere: string;
  nome: string;
  descricao: string;
  meta: number;
  unidade: string;
  valorAtual: (resumo: ResumoProgresso) => number;
}

const regrasMedalhas: RegraMedalha[] = [
  {
    id: "primeiro-passo",
    caractere: "一",
    nome: "Primeiro passo",
    descricao: "Primeira resposta certa",
    meta: 1,
    unidade: "acertos",
    valorAtual: (resumo) => resumo.totalAcertos,
  },
  {
    id: "em-sequencia",
    caractere: "五",
    nome: "Em sequência",
    descricao: "5 acertos seguidos",
    meta: 5,
    unidade: "acertos seguidos",
    valorAtual: (resumo) => resumo.melhorSequencia,
  },
  {
    id: "imparavel",
    caractere: "十",
    nome: "Imparável",
    descricao: "10 acertos seguidos",
    meta: 10,
    unidade: "acertos seguidos",
    valorAtual: (resumo) => resumo.melhorSequencia,
  },
  {
    id: "centenario",
    caractere: "百",
    nome: "Centenário",
    descricao: "100 acertos no total",
    meta: 100,
    unidade: "acertos no total",
    valorAtual: (resumo) => resumo.totalAcertos,
  },
];

export function derivarMedalhas(resumo: ResumoProgresso): Medalha[] {
  return regrasMedalhas.map((regra) => {
    const faltam = regra.meta - regra.valorAtual(resumo);
    const conquistada = faltam <= 0;

    return {
      id: regra.id,
      caractere: regra.caractere,
      nome: regra.nome,
      descricao:
        conquistada || regra.meta === 1
          ? regra.descricao
          : `Faltam ${faltam} ${regra.unidade}`,
      conquistada,
    };
  });
}
