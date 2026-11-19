import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Title, Subtitle } from "../../styles/GlobalStyles";
import { useAuth } from "../../contexts/authContext";
import { ApiError } from "../../services/api";
import {
  LoginWrapper,
  LoginCard,
  LoginStamp,
  LoginHeader,
  LoginForm,
  FieldLabel,
  TextField,
  SubmitButton,
  ToggleModeButton,
  ErrorMessage,
  FooterNote,
} from "./style";

type FormMode = "login" | "register";

function resolveErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.details.length > 0) {
      return error.details.join(" ");
    }
    return error.message;
  }

  return "Algo deu errado. Tente novamente.";
}

export function Login() {
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<FormMode>("login");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  function toggleMode() {
    setErrorMessage(null);
    if (mode === "login") {
      setMode("register");
      return;
    }
    setMode("login");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await signIn(nomeUsuario, senha);
      } else {
        await signUp(nomeUsuario, senha);
      }
    } catch (error) {
      setErrorMessage(resolveErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LoginWrapper>
      <LoginCard>
        <LoginStamp>字</LoginStamp>
        <LoginHeader>
          <Title>N5 Study</Title>
          <Subtitle>
            {mode === "login"
              ? "Entre para continuar seus estudos."
              : "Crie sua conta para comecar a estudar."}
          </Subtitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FieldLabel>
            Usuario
            <TextField
              type="text"
              value={nomeUsuario}
              onChange={(event) => setNomeUsuario(event.target.value)}
              autoComplete="username"
              spellCheck={false}
              required
            />
          </FieldLabel>

          <FieldLabel>
            Senha
            <TextField
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
          </FieldLabel>

          {errorMessage !== null && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {mode === "login" ? "Entrar" : "Criar conta"}
          </SubmitButton>
        </LoginForm>

        <ToggleModeButton type="button" onClick={toggleMode}>
          {mode === "login"
            ? "Ainda nao tem conta? Cadastre-se"
            : "Ja tem conta? Voltar para o login"}
        </ToggleModeButton>

        <FooterNote>Conta inicial de administrador: admin</FooterNote>
      </LoginCard>
    </LoginWrapper>
  );
}
