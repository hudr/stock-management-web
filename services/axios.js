import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

// API com ctx, usar nas chamadas SSR
export const getAPIClient = (ctx) => {
  const { "stock-management.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_REACT_APP_API_URL || "http://localhost:3333",
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        destroyCookie(undefined, "stock-management.token");
      }
      return Promise.reject(error);
    }
  );

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return api;
};
