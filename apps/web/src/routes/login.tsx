import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      navigate({ to: "/dashboard" });
    } else {
      setErrorMsg(result.message || "Login failed");
    }
  };
  return (
    <AuthLayout title="Log in">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Social Buttons */}
        <div className="space-y-3 mb-8">
          <Button className="w-full bg-[#4267B2] hover:bg-[#365899]">
            Facebook
          </Button>

          <Button className="w-full bg-[#DB4437] hover:bg-[#C23321]">
            Google
          </Button>

          <Button className="w-full bg-[#635BFF] hover:bg-[#5548f7]">
            Stripe
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-neutral-700" />
          <span className="text-neutral-400 text-sm">or</span>
          <div className="h-px flex-1 bg-neutral-700" />
        </div>

        {errorMsg && <p className="text-red-400 text-sm mb-4">{errorMsg}</p>}

        {/* Email */}
        <label className="text-sm text-neutral-300" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black border-neutral-700 mt-1 mb-4"
        />

        {/* Password */}
        <label className="text-sm text-neutral-300" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black border-neutral-700 mt-1 mb-6"
        />

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <a
            href="#"
            className="text-neutral-400 underline text-sm hover:text-white"
          >
            Forgot your password?
          </a>
        </div>

        {/* Login */}
        <Button
          type="submit"
          className="w-full bg-neutral-200 text-black hover:bg-white"
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}
