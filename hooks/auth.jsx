/* eslint-disable no-shadow */
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    async function recoverUserInformation() {
      const { "stock-management.token": token } = parseCookies();

      if (token) {
        const {
          data: { user },
        } = await api.get("/users/show");
        setUser(user);
      }
    }

    recoverUserInformation();
  }, [router]);

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
