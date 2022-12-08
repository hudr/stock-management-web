import Router from "next/router";
import NProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import AppProvider from "../hooks";
import { theme } from "../themes";
import "nprogress/nprogress.css";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
