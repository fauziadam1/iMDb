"use client";

import { api } from "@/lib/axios";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns-cast";

type Film = {
  id: string;
  title: string;
};

type Cast = {
  id: string;
  name: string;
  films: Film[];
};

export default function AdminFilmPage() {
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await api.get("/api/casts");
        setCast(res.data);
      } catch {}
    };
    fetchCast();
  }, []);

  return (
    <div className="px-10 py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Data Celebrity</h1>
      <DataTable columns={columns} data={cast} />
    </div>
  );
}
