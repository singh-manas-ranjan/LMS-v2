import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ weight: "600", subsets: ["latin"] });

import { ChakraProviders } from "./ChakraProviders";
import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          <title>Learnopia</title>
        </head>
        <body className={inter.className}>
          <ChakraProviders>
            <StoreProvider>{children}</StoreProvider>
          </ChakraProviders>
        </body>
      </html>
    </SessionProvider>
  );
}
