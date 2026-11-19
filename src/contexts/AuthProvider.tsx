import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { readStoredToken } from "../services/api";
import {
  clearSession,
  fetchCurrentUser,
  login,
  register,
  type AuthenticatedUser,
} from "../services/auth";
import { AuthContext, type AuthContextValue } from "./authContext";

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (readStoredToken() === null) {
      setIsLoading(false);
      return;
    }

    let isActive = true;

    fetchCurrentUser()
      .then((loadedUser) => {
        if (isActive) {
          setUser(loadedUser);
        }
      })
      .catch(() => {
        clearSession();
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const signIn = useCallback(async (nomeUsuario: string, senha: string) => {
    setUser(await login(nomeUsuario, senha));
  }, []);

  const signUp = useCallback(async (nomeUsuario: string, senha: string) => {
    setUser(await register(nomeUsuario, senha));
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, signIn, signUp, signOut }),
    [user, isLoading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
