import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { api } from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function GenreForm() {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().trim().min(1, "The name filed is required"),
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
      await api.post("/api/genre", data);

      toast.success("Genre berhasil ditambah");
      setIsLoading(false);

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
                  <Input type="text" placeholder="Genre Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? <Spinner /> : ""} Add</Button>
        </div>
      </form>
    </Form>
  );
}
