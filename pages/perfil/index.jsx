import Head from "next/head";
import { parseCookies } from "nookies";
import {
  Heading,
  Text,
  Card,
  CardHeader,
  Flex,
  Avatar,
  HStack,
  Box,
  CardBody,
  Badge,
  Image,
} from "@chakra-ui/react";
import { DashboardLayout } from "../../layouts";
import { getAPIClient } from "../../services/axios";

const Profile = ({ user }) => {
  return (
    <>
      <Head>
        <title>Perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading fontSize="3xl">Perfil</Heading>

      <Card maxW="md" mt="1rem">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={user?.name} src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">{user?.name}</Heading>
                <HStack mt="0.5rem" spacing="0.2rem">
                  {user.roles.map((role) => (
                    <Badge colorScheme="teal">{role.name}</Badge>
                  ))}
                </HStack>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text>
        </CardBody>
        <Image
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />
      </Card>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);

  const { "stock-management.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/entrar",
        permanent: false,
      },
    };
  }

  const {
    data: { user },
  } = await apiClient.get("/users/show");

  return {
    props: { user },
  };
};

Profile.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Profile;
