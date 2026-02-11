import { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login Page",
};

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
}
