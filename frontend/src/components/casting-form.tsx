"use client";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "./ui/form";
import z from "zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

export default function CelebsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().trim().min(1, "The name field is required"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    try {
      await api.post("/api/cast", data);

      toast.success("Celebrity berhasil ditambah");
      setIsLoading(false);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.message ?? err.message ?? "Something wrong";
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Sydney Sweeney" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? <Spinner /> : ""} Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
