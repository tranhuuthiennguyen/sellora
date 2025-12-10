import { createFileRoute } from "@tanstack/react-router";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  const { register } = useAuth();
  return (
    <AuthLayout title="Sign up">
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

      {/* Email */}
      <label className="text-sm text-neutral-300" htmlFor="email">
        Email
      </label>
      <Input
        id="email"
        type="email"
        className="bg-black border-neutral-700 mt-1 mb-4"
      />

      {/* Password */}
      <label className="text-sm text-neutral-300" htmlFor="password">
        Password
      </label>
      <Input
        id="password"
        type="password"
        className="bg-black border-neutral-700 mt-1 mb-6"
      />

      {/* Signup */}
      <Button className="w-full bg-neutral-200 text-black hover:bg-white">
        Create account
      </Button>
    </AuthLayout>
  );
}
