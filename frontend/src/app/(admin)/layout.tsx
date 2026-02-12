"use client";

import { useAuthUser } from "@/lib/auth";
import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Header } from "@/components/header";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuthUser();

  if (user && user.role !== "admin") {
    return notFound();
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-10" />
      </div>
    );

  return (
    <>
      <Header />
      {children}
    </>
  );
}
