import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import NextLink from "next/link";
import {
  Text,
  Link,
  Box,
  Card,
  Stack,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ThemeSwitcher } from "../../components";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleShowPassword = () => setShow(!show);

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ThemeSwitcher />
        <Box
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Card
            w="45rem"
            display="flex"
            flexDirection="column"
            borderRadius="2rem"
            p="3.2rem"
          >
            <Text
              textAlign="center"
              fontSize="2.4rem"
              fontWeight="bold"
              mb="3.2rem"
              color="#707693"
            >
              LOGO
            </Text>
            <Stack spacing="1.6rem" mb="3.2rem">
              <Text textAlign="center" fontSize="2.4rem" fontWeight="bold">
                Bem-vindo
              </Text>
              <Text fontSize="1.6rem" textAlign="center" fontWeight="400">
                Insira seus dados para acessar sua conta.
              </Text>
            </Stack>

            <Stack spacing="2.4rem" mb="3.2rem">
              <FormControl>
                <FormLabel fontSize="1.2rem" fontWeight="600">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="1.2rem" fontWeight="600">
                  Senha
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="off"
                  />
                  <InputRightElement h="full">
                    <IconButton
                      h="full"
                      variant="unstyled"
                      onClick={handleShowPassword}
                      aria-label="Password Show/Hide"
                      icon={
                        show ? (
                          <AiFillEyeInvisible
                            color="#767676"
                            fontSize="1.4rem"
                          />
                        ) : (
                          <AiFillEye color="#767676" fontSize="1.4rem" />
                        )
                      }
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>

            <Stack
              spacing={0}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <NextLink href="#" legacyBehavior passHref>
                <Link fontSize="1.4rem" fontWeight="500">
                  Esqueci minha senha
                </Link>
              </NextLink>

              <Button
                variant="rounded"
                onClick={() => Router.push("/dashboard")}
              >
                {" "}
                Entrar
              </Button>
            </Stack>
          </Card>
        </Box>
      </main>
    </div>
  );
};

export default Login;
