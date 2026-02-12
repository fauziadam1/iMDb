"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Genre = {
  id: number;
  name: string;
};

type Casting = {
  id: number;
  name: string;
};

type Film = {
  id: string;
  title: string;
  trailer: string;
  image: string;
  description: string;
  release_year: number;
  rating: string;
  age_rating: string;
  duration: number;
  genres: Genre[];
  castings: Casting[];
};

export const columns: ColumnDef<Film>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "image",
    header: "Cover",
  },
  {
    accessorKey: "trailer",
    header: "Trailer",
  },
  {
    accessorKey: "release_year",
    header: "Release Year",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "age_rating",
    header: "Age Rating",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "genres",
    header: "Genres",
    cell: ({ row }) => {
      const genres = row.original.genres ?? [];

      return (
        <div className="flex flex-wrap gap-1">
          {genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "casting",
    header: "Casting",
    cell: ({ row }) => {
      const casts = row.original.castings ?? [];

      return (
        <div className="flex flex-wrap gap-1">
          {casts.map((cast) => (
            <Badge key={cast.id} variant="secondary">
              {cast.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const film = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
