import Router from "next/router";
import NProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../themes";
import "nprogress/nprogress.css";
import "../styles/globals.css";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
