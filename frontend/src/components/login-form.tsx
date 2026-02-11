"use client";

import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "./ui/form";
import { Spinner } from "./ui/spinner";

export function LoginForm() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  const formSchema = z.object({
    username: z.string().trim().min(1, "The name field is required"),
    password: z.string().trim().min(1, "The password field is required"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);
    try {
      await api.get("/sanctum/csrf-cookie");
      await new Promise((resolve) => setTimeout(resolve, 100));
      await api.post("/api/login", data);

      toast.success("Login berhasil");
      router.refresh();
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? err.message ?? "Login gagal";
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
              <h1 className="text-2xl font-bold">Sign In</h1>
              <p className="text-xs text-gray-500">
                Sign in to your account to continue
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className=""
                disabled={form.formState.isSubmitting}
              >
                {Loading ? <Spinner /> : ""} Login
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
