/* eslint-disable no-shadow */
import { createContext, useState, useContext, useCallback } from "react";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  // Nesta requisição /auth os dados do usuário estão presentes
  // no useAuth passando o { user } assim é possível
  // navegar na aplicação com as permissões que o usuário possui
  // ao entrar na página de perfil uma nova requisição é feita
  // buscando os dados atualizados desse usuário
  // fica a critério da regra de negócio entender quando é necessário
  // fazer uma nova requisição para pegar os dados atualizados
  // do usuário que está navegando e executar alguma ação que dependa disso
  const signIn = useCallback(async ({ email, password }) => {
    const {
      data: { token, user },
    } = await api.post("/users/auth", {
      email,
      password,
    });

    setCookie(undefined, "stock-management.token", token, {
      maxAge: 60 * 60 * 7, // 1 hora
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(user);

    router.push("/painel");
  }, []);

  const signOut = useCallback(() => {
    destroyCookie(undefined, "stock-management.token");

    setUser(null);

    router.push("/entrar");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
