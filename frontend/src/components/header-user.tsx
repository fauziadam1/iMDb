import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Spinner } from "./ui/spinner";
import CelebsForm from "./casting-form";
import {
  LogOutIcon,
  UserIcon,
  Plus,
  Sparkle,
  Clapperboard,
  Heart,
  PackageOpen,
  Trash,
} from "lucide-react";
import GenreForm from "./genre-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import FilmForm from "./film-form";

type genre = {
  id: number;
  name: string;
};

export default function HeaderUser({
  user,
}: {
  user: {
    username: string;
    email: string;
    role: string;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);
  const [genres, setGenres] = useState<genre[]>([]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/logout/");

      toast.success("Logout success");
      window.location.href = "/";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err?.response?.message ?? err.message ?? "Logout failed";
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

  const handleDelete = async (id: number) => {
    setLoadingDeleteId(id);
    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const res = await api.delete(`api/genres/${id}`);
          setGenres((prev) => prev.filter((genre) => genre.id !== id));
          toast.success("Genre berhasil dihapus");
        } catch (err: any) {
          const message =
            err?.response?.message ?? err.message ?? "Delete failed";
          toast.error(message);
        }
      };
      fetchGenres();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarFallback className="font-semibold ">
            {user.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -translate-x-5">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Plus />
                Add
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                      Admin Usage
                    </DropdownMenuLabel>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Clapperboard />
                      <Dialog>
                        <DialogTrigger>Films</DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Add Film</DialogTitle>
                          </DialogHeader>
                          <FilmForm/>
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Sparkle />
                      <Dialog>
                        <DialogTrigger>Celebs</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Celebrity</DialogTitle>
                          </DialogHeader>
                          <CelebsForm />
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Heart />
                      <Dialog>
                        <DialogTrigger>Genres</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Genre</DialogTitle>
                          </DialogHeader>
                          <GenreForm />
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
          {user?.role === "admin" && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PackageOpen />
                Show
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                      See Data
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link href={"/admin/film"}>Films</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/admin/cast"}>Celebs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Genres</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                              Genres
                            </DropdownMenuLabel>
                            {genres.map((genre) => {
                              return (
                                <DropdownMenuItem
                                  key={genre.id}
                                  onSelect={(e) => e.preventDefault()}
                                  className="flex items-center justify-between"
                                >
                                  {genre.name}
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDelete(genre.id);
                                    }}
                                    className="rounded-full w-6 h-6 p-1 bg-red-200 hover:bg-red-300"
                                    variant="destructive"
                                    size="icon"
                                  >
                                    {loadingDeleteId === genre.id ? (
                                      <Spinner />
                                    ) : (
                                      <Trash className="text-red-600" />
                                    )}
                                  </Button>
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="cursor-pointer"
        >
          {isLoading ? <Spinner /> : <LogOutIcon />}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
