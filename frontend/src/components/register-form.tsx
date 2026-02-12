"use client";

import z, { set } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "./ui/form";
import { useState } from "react";
import { api } from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordValidation } from "@/lib/password-validation";

export function RegisterForm() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  const formSchema = z
    .object({
      username: z.string().trim().min(1, "The name field is required"),
      email: z.string().email(),
      password: PasswordValidation,
      password_confirmation: z
        .string()
        .trim()
        .min(1, "The confirm password field is required"),
    })
    .refine((values) => values.password === values.password_confirmation, {
      message: "The confirm password does not match",
      path: ["password_confirmation"],
    });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);
    try {
      await api.get("/sanctum/csrf-cookie");
      await new Promise((resolve) => setTimeout(resolve, 100));
      await api.post("/api/register", data);

      toast.success("Registrasi berhasil");
      setLoading(false);
      router.refresh();
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.respone?.data?.message ?? err.message ?? "Registration failed";
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="w-100 border py-8 px-10 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Sign Up</h1>
              <p className="text-xs text-gray-500">
                Welcome to iMDb kawe super
              </p>
            </div>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Your strong password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Don't forget the password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {Loading ? <Spinner /> : ""}
                Register
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
