import { useAuth } from "../../contexts/authContext";
import { Subtitle } from "../../styles/GlobalStyles";
import { BlocoRetomada } from "./BlocoRetomada";
import { CartaoMedalha } from "./CartaoMedalha";
import { CartaoMetrica } from "./CartaoMetrica";
import { derivarMedalhas } from "./medalhas";
import { CONVITE_INICIAL, descreverSessao } from "./retomada";
import { ListaMedalhas, Metricas, Saudacao, TituloSecao } from "./style";
import { usePainel } from "./usePainel";

export function Home() {
  const { user } = useAuth();
  const { resumo, sessao, carregando } = usePainel();

  return (
    <>
      <Saudacao>Olá, {user?.nomeUsuario}</Saudacao>
      <Subtitle>O que você gostaria de estudar hoje?</Subtitle>

      <Metricas>
        <CartaoMetrica rotulo="Acertos" valor={resumo.totalAcertos} tom="sucesso" />
        <CartaoMetrica rotulo="Erros" valor={resumo.totalErros} tom="erro" />
        <CartaoMetrica rotulo="Palavras revisadas" valor={resumo.palavrasRevisadas} tom="neutro" />
        <CartaoMetrica rotulo="Sequência atual" valor={resumo.sequenciaAtual} tom="destaque" />
      </Metricas>

      <TituloSecao>Continue de onde parou</TituloSecao>
      {!carregando && (
        <BlocoRetomada
          descricao={sessao === null ? CONVITE_INICIAL : descreverSessao(sessao)}
        />
      )}

      <TituloSecao>Suas medalhas</TituloSecao>
      <ListaMedalhas>
        {derivarMedalhas(resumo).map((medalha) => (
          <CartaoMedalha key={medalha.id} medalha={medalha} />
        ))}
      </ListaMedalhas>
    </>
  );
}
