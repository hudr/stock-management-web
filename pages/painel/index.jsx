import Head from "next/head";
import { HStack, Heading } from "@chakra-ui/react";
import { ThemeSwitcher } from "../../components";

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Painel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HStack>
          <Heading fontSize="4xl">Painel</Heading>
          <ThemeSwitcher />
        </HStack>
      </main>
    </div>
  );
};

export default Dashboard;
