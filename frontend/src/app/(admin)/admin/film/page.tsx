"use client";

import { api } from "@/lib/axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns-film";

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

export default function AdminFilmPage() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await api.get("/api/films");
        setFilms(res.data);
      } catch {}
    };
    fetchFilms();
  }, []);

  return (
    <div className="px-10 py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Data Films</h1>
      <DataTable columns={columns} data={films} />
    </div>
  );
}
