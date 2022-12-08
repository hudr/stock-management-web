import Head from "next/head";
import { parseCookies } from "nookies";
import { Heading } from "@chakra-ui/react";
import { DashboardLayout } from "../../layouts";

const Roles = () => {
  return (
    <>
      <Head>
        <title>Cargos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading fontSize="3xl">Cargos</Heading>
    </>
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

Roles.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Roles;
