"use client";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "./ui/form";
import {
  Command,
  CommandEmpty,
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import z from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, XIcon } from "lucide-react";
import { imageProvide } from "@/lib/image-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";

type genre = {
  id: number;
  name: string;
};

type casting = {
  id: number;
  name: string;
};

export default function FilmForm() {
  const [isOpenGenre, setOpenGenre] = useState(false);
  const [isOpenCast, setOpenCast] = useState(false);
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<genre[]>([]);
  const [casts, setCast] = useState<casting[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formSchema = z.object({
    title: z.string().min(1, "The title field is required"),
    trailer: z.string(),
    description: z.string(),
    image: imageProvide,
    release_year: z
      .string()
      .max(currentYear, `Year cannot be greater than ${currentYear}`),
    duration: z.string(),
    age_rating: z.enum(["SU", "BO", "13+", "17+", "R", "D"]),
    casting: z.array(z.number()),
    genre: z.array(z.number()),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      trailer: "",
      description: "",
      image: undefined,
      release_year: "",
      duration: "",
      age_rating: "SU",
      casting: [],
      genre: [],
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    try {
const formData = new FormData();

formData.append("title", data.title);
formData.append("trailer", data.trailer);
formData.append("description", data.description);
formData.append("release_year", data.release_year);
formData.append("duration", data.duration);
formData.append("age_rating", data.age_rating);

if (data.image) {
  formData.append("image", data.image);
}

data.genre.forEach((id) => {
  formData.append("genre[]", id.toString());
});

data.casting.forEach((id) => {
  formData.append("casting[]", id.toString());
});

await api.post("/api/film", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

      toast.success("Film berhasil dibuat");
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? err.message ?? "Something wrong";
      toast.error(message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get("/api/genres");
        setGenres(res.data);
      } catch {}
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await api.get("/api/casts");
        setCast(res.data);
      } catch {}
    };
    fetchCast();
  }, []);

  const processFile = (file: File) => {
    form.setValue("image", file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    form.resetField("image");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder="The Notebook"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trailer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trailer</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://www.youtube.com/..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Cover</FormLabel>
                {!imagePreview ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                      isDragging ? "border-primary bg-primary/10" : ""
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, or JPEG (max 10MB)
                    </p>
                    <FormControl>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </FormControl>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={imagePreview || "/placeholder.svg?"}
                        width={1920}
                        height={1080}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="release_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2026" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="minute, ex: 90"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age_rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Rating</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="SU, BO, 13+, 17+, R, D"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <div>
                  {field.value?.map((id) => {
                    const g = genres.find((genre) => genre.id === id);
                    if (!g) return null;

                    return (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1"
                      >
                        {g.name}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => {
                            field.onChange(
                              field.value?.filter((genreId) => genreId !== id),
                            );
                          }}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    );
                  })}

                  <Button
                    onClick={() => setOpenGenre(true)}
                    type="button"
                    variant="outline"
                    size="sm"
                  >
                    + Add
                  </Button>
                  <CommandDialog open={isOpenGenre} onOpenChange={setOpenGenre}>
                    <Command>
                      <CommandInput placeholder="Search genre..." />
                      <CommandEmpty>No genre found.</CommandEmpty>

                      <CommandList>
                        {genres
                          .filter((g) => !field.value?.includes(g.id))
                          .map((g) => (
                            <CommandItem
                              key={g.id}
                              onSelect={() => {
                                field.onChange([...(field.value ?? []), g.id]);
                              }}
                            >
                              {g.name}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </Command>
                  </CommandDialog>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="casting"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celebrity</FormLabel>
                <div>
                  {field.value?.map((id) => {
                    const c = casts.find((cast) => cast.id === id);
                    if (!c) return null;

                    return (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1"
                      >
                        {c.name}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => {
                            field.onChange(
                              field.value?.filter((castId) => castId !== id),
                            );
                          }}
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </Badge>
                    );
                  })}

                  <Button
                    onClick={() => setOpenCast(true)}
                    type="button"
                    variant="outline"
                    size="sm"
                  >
                    + Add
                  </Button>
                  <CommandDialog open={isOpenCast} onOpenChange={setOpenCast}>
                    <Command>
                      <CommandInput placeholder="Search Celebrity..." />
                      <CommandEmpty>No celebrity found.</CommandEmpty>

                      <CommandList>
                        {casts
                          .filter((c) => !field.value?.includes(c.id))
                          .map((c) => (
                            <CommandItem
                              key={c.id}
                              onSelect={() => {
                                field.onChange([...(field.value ?? []), c.id]);
                              }}
                            >
                              {c.name}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </Command>
                  </CommandDialog>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitted}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
