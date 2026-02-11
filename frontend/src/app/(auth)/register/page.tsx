import { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register Page",
};

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <RegisterForm />
    </div>
  );
}
