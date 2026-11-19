import { createContext, useContext } from "react";
import type { AuthenticatedUser } from "../services/auth";

export interface AuthContextValue {
  user: AuthenticatedUser | null;
  isLoading: boolean;
  signIn: (nomeUsuario: string, senha: string) => Promise<void>;
  signUp: (nomeUsuario: string, senha: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth precisa ser usado dentro de AuthProvider");
  }

  return context;
}
