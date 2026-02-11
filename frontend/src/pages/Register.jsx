import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../lib/api";

const Register = ({ closeModal, openLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Close modal after successful registration
      if (closeModal) closeModal();

      // Optionally switch to login modal
      if (openLoginModal) openLoginModal();
    },
  });

  const handleSubmit = () => {
    createAccount({ email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create an Account
        </h1>

        {isError && (
          <div className="mb-4 text-red-400 text-center">
            {error?.message || "An error occurred"}
          </div>
        )}

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Must be at least 6 characters long.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSubmit()
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={
              !email ||
              password.length < 6 ||
              password !== confirmPassword ||
              isPending
            }
            className={`w-full py-3 rounded-lg font-semibold transition
              ${
                !email ||
                password.length < 6 ||
                password !== confirmPassword ||
                isPending
                  ? "bg-blue-400 cursor-not-allowed opacity-60"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              text-white
            `}
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        {/* Switch to Login */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => {
              if (closeModal) closeModal();
              if (openLoginModal) openLoginModal();
            }}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;

