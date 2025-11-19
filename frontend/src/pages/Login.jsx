import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useNavigate } from "react-router-dom";
import {
  Box, Flex, Container, Stack, FormControl, FormLabel,
  Input, Button, Heading, Text, Link as ChakraLink
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signIn, isPending, isError } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("Login error:", err);
    },
  });

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container maxW="md" py={12} px={6}>
        <Heading mb={8}>Sign into your account</Heading>
        <Box rounded="lg" bg="gray.700" p={8}>
          {isError && <Box mb={3} color="red.400">Invalid email or password</Box>}
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && signIn({ email, password })}
              />
            </FormControl>
            <Button
              isDisabled={!email || password.length < 6}
              isLoading={isPending}
              onClick={() => signIn({ email, password })}
            >
              Sign in
            </Button>
            <Text align="center" fontSize="sm">
              Don't have an account?{" "}
              <ChakraLink as={Link} to="/register">Sign up</ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
