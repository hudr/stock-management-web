import Head from "next/head";
import Router from "next/router";
import { Button } from "@chakra-ui/react";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Home</h1>

      <Button colorScheme="teal" onClick={() => Router.push("/login")}>
        Entrar
      </Button>
    </main>
  </div>
);

export default Home;
