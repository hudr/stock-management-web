import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks/auth";
import { ThemeSwitcher } from "../../components";

const schema = Yup.object({
  email: Yup.string()
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail inválido")
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: Yup.string()
    .matches(/^(?!\s+$).*/, "Senha inválida")
    .required("Senha obrigatória")
    .min(6, "Mínimo de 6 dígitos"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data) => {
    try {
      setLoading(true);

      await signIn({
        email: data.email.toLowerCase(),
        password: data.password,
      });
    } catch (err) {
      const { error } = err.response.data;

      toast({
        description: `${error} 😥`,
        status: "error",
        position: "bottom",
        variant: "solid",
        duration: 5000,
        isClosable: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Router.prefetch("/painel");
  }, []);

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
              <form onSubmit={handleSubmit(handleSignIn)}>
                <Stack spacing={4}>
                  <FormControl id="email" isInvalid={!!errors.email?.message}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...register("email")}
                      type="email"
                      autoComplete="off"
                    />
                    {!!errors.email?.message && (
                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="password"
                    isInvalid={!!errors.password?.message}
                  >
                    <FormLabel>Senha</FormLabel>
                    <InputGroup>
                      <Input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                      />
                      <InputRightElement h="full">
                        <IconButton
                          h="full"
                          variant="unstyled"
                          aria-label="Password Show/Hide"
                          onClick={() =>
                            setShowPassword(() =>
                              setShowPassword(!showPassword)
                            )
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
                    {!!errors.password?.message && (
                      <FormErrorMessage>
                        {errors.password?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      colorScheme="teal"
                    >
                      Entrar
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </main>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { "stock-management.token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/painel",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
