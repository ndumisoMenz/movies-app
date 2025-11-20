import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useStore from "../store/useStore";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Flex,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();

  // Zustand actions
  const loginRequest = useStore((state) => state.loginRequest);
  const setAuth = useStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signIn, isPending, isError } = useMutation({
    mutationFn: loginRequest, // calls backend /auth/login

    onSuccess: (data) => {
      // Backend returns: { user, accessToken, refreshToken, message }
      setAuth({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      navigate("/mylist", { replace: true });
    },

    onError: (err) => {
      console.error("Login error:", err);
    },
  });

  const handleSubmit = () => signIn({ email, password });

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.900" color="white">
      <Container maxW="md" py={12} px={6}>
        <Heading mb={8} textAlign="center">
          Sign Into Your Account
        </Heading>

        <Box rounded="lg" bg="gray.700" p={8} shadow="lg">
          {isError && (
            <Box mb={3} color="red.300" textAlign="center">
              Invalid email or password
            </Box>
          )}

          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                bg="gray.800"
                borderColor="gray.600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                bg="gray.800"
                borderColor="gray.600"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              isDisabled={!email || password.length < 6}
              isLoading={isPending}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <Text align="center" fontSize="sm">
              Don&apos;t have an account?{" "}
              <ChakraLink as={Link} to="/register" color="blue.300">
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
