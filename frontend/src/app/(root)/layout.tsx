import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}
