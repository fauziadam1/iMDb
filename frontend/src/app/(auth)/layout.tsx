"use client";

import { api } from "@/lib/axios";
import { PropsWithChildren } from "react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAuthUser } from "@/lib/auth";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-10" />
      </div>
    );

  return children;
}
