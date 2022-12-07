import Head from "next/head";
import Router from "next/router";
import { Button } from "@chakra-ui/react";

const Home = () => (
  <div>
    <Head>
      <title>Início</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Início</h1>

      <Button colorScheme="teal" onClick={() => Router.push("/entrar")}>
        Entrar
      </Button>
    </main>
  </div>
);

export default Home;
