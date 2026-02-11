import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useStore from "../store/useStore";

const Login = ({ closeModal, openRegisterModal }) => {
  const loginRequest = useStore((state) => state.loginRequest);
  const setAuth = useStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signIn, isPending, isError } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      if (closeModal) closeModal();
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back
        </h1>

        {isError && (
          <div className="mb-4 text-red-400 text-center">
            Invalid email or password
          </div>
        )}

        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => signIn({ email, password })}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <button
            onClick={openRegisterModal}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;


