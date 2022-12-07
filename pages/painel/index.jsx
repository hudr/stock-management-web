import Head from "next/head";
import { parseCookies } from "nookies";
import { HStack, VStack, Heading, Button } from "@chakra-ui/react";
import { ThemeSwitcher } from "../../components";
import { useAuth } from "../../hooks/auth";

const Dashboard = () => {
  const { user, signOut } = useAuth();

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
        <VStack>
          <Heading fontSize="xl">Olá, {user?.name}!</Heading>
          <Button colorScheme="red" onClick={signOut}>
            Sair
          </Button>
        </VStack>
      </main>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { "stock-management.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/entrar",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
