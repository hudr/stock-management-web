import Router from "next/router";
import Head from "next/head";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ThemeSwitcher } from "../../components";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Head>
        <title>Entrar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex minH="100vh" align="center" justify="center">
          <Stack mx="auto" maxW="lg" py={12} px={6}>
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={0}
              m="0.5rem 1rem"
            >
              <Heading fontSize="4xl" textAlign="center">
                Entrar
              </Heading>

              <ThemeSwitcher />
            </Stack>
            <Box
              bg={useColorModeValue("#fff", "gray.700")}
              rounded="md"
              boxShadow="sm"
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Senha</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
                    <InputRightElement h="full">
                      <IconButton
                        h="full"
                        variant="unstyled"
                        aria-label="Password Show/Hide"
                        onClick={() =>
                          setShowPassword(() => setShowPassword(!showPassword))
                        }
                      >
                        {showPassword ? (
                          <ViewIcon color="#767676" fontSize="0.8rem" />
                        ) : (
                          <ViewOffIcon color="#767676" fontSize="0.8rem" />
                        )}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    colorScheme="teal"
                    onClick={() => Router.push("/painel")}
                  >
                    Entrar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </main>
    </div>
  );
};

export default Login;
