import { useAuth } from "../../contexts/authContext";
import { LoggedUserName, LogoutButtonBase, LogoutWrapper } from "./style";

export function LogoutButton() {
  const { user, signOut } = useAuth();

  if (user === null) {
    return null;
  }

  return (
    <LogoutWrapper>
      <LoggedUserName>{user.nomeUsuario}</LoggedUserName>
      <LogoutButtonBase type="button" onClick={signOut}>
        Sair
      </LogoutButtonBase>
    </LogoutWrapper>
  );
}
