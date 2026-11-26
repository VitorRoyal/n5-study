import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Titulo, Subtitulo } from "../../styles/GlobalStyles";
import { useAutenticacao } from "../../contexts/contextoAutenticacao";
import { ErroApi } from "../../services/api";
import {
  LayoutLogin,
  PainelMarca,
  SeloMarca,
  NomeMarca,
  PainelFormulario,
  ConteudoFormulario,
  CabecalhoFormulario,
  FormularioLogin,
  RotuloCampo,
  CampoTexto,
  BotaoEnviar,
  BotaoAlternarModo,
  MensagemErro,
  NotaRodape,
} from "./style";

type ModoFormulario = "login" | "registrar";

function resolverMensagemErro(erro: unknown) {
  if (erro instanceof ErroApi) {
    if (erro.detalhes.length > 0) {
      return erro.detalhes.join(" ");
    }
    return erro.message;
  }

  return "Algo deu errado. Tente novamente.";
}

export function Login() {
  const { usuario, entrar, cadastrar } = useAutenticacao();
  const [modo, definirModo] = useState<ModoFormulario>("login");
  const [nomeUsuario, definirNomeUsuario] = useState("");
  const [senha, definirSenha] = useState("");
  const [mensagemErro, definirMensagemErro] = useState<string | null>(null);
  const [enviando, definirEnviando] = useState(false);

  if (usuario !== null) {
    return <Navigate to="/" replace />;
  }

  function alternarModo() {
    definirMensagemErro(null);
    if (modo === "login") {
      definirModo("registrar");
      return;
    }
    definirModo("login");
  }

  async function tratarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    definirMensagemErro(null);
    definirEnviando(true);

    try {
      if (modo === "login") {
        await entrar(nomeUsuario, senha);
      } else {
        await cadastrar(nomeUsuario, senha);
      }
    } catch (erro) {
      definirMensagemErro(resolverMensagemErro(erro));
    } finally {
      definirEnviando(false);
    }
  }

  return (
    <LayoutLogin>
      <PainelMarca>
        <SeloMarca>字</SeloMarca>
        <NomeMarca>Nihon GO</NomeMarca>
      </PainelMarca>

      <PainelFormulario>
        <ConteudoFormulario>
          <CabecalhoFormulario>
            <Titulo as="h2">{modo === "login" ? "Entrar" : "Criar conta"}</Titulo>
            <Subtitulo>
              {modo === "login"
                ? "Entre para continuar seus estudos."
                : "Crie sua conta para comecar a estudar."}
            </Subtitulo>
          </CabecalhoFormulario>

          <FormularioLogin onSubmit={tratarEnvio}>
            <RotuloCampo>
              Usuario
              <CampoTexto
                type="text"
                value={nomeUsuario}
                onChange={(evento) => definirNomeUsuario(evento.target.value)}
                autoComplete="username"
                spellCheck={false}
                required
              />
            </RotuloCampo>

            <RotuloCampo>
              Senha
              <CampoTexto
                type="password"
                value={senha}
                onChange={(evento) => definirSenha(evento.target.value)}
                autoComplete={modo === "login" ? "current-password" : "new-password"}
                required
              />
            </RotuloCampo>

            {mensagemErro !== null && <MensagemErro>{mensagemErro}</MensagemErro>}

            <BotaoEnviar type="submit" disabled={enviando}>
              {modo === "login" ? "Entrar" : "Criar conta"}
            </BotaoEnviar>
          </FormularioLogin>

          <BotaoAlternarModo type="button" onClick={alternarModo}>
            {modo === "login"
              ? "Ainda nao tem conta? Cadastre-se"
              : "Ja tem conta? Voltar para o login"}
          </BotaoAlternarModo>

          <NotaRodape>Conta inicial de administrador: admin</NotaRodape>
        </ConteudoFormulario>
      </PainelFormulario>
    </LayoutLogin>
  );
}
