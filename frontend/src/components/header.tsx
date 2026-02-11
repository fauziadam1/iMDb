"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SearchBar } from "./searchbar";
import HeaderUser from "./header-user";
import { useAuthUser } from "@/lib/auth";

export function Header() {
  const { user } = useAuthUser();

  return (
    <div className="flex items-center justify-center gap-5 py-4 border-b ">
      <div className="-space-y-1">
        <h1 className="text-xl font-bold">iMDb</h1>
        <p className="text-[10px] text-gray-500">kawe super</p>
      </div>
      <SearchBar />
      <div>
        {user ? (
          <HeaderUser user={user} />
        ) : (
          <div className="space-x-2">
            <Link href={"/login"}>
              <Button className="rounded-xl cursor-pointer">Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button className="rounded-xl cursor-pointer" variant="outline">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
