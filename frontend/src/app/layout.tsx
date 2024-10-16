import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'tailwindcss/tailwind.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextUIProvider } from "@nextui-org/react";
// import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "B2DVenture",
  description: "Created by FishermanFriends team",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
        <UserProvider>
              <body className={inter.className}>
                  {children}
              </body>
        </UserProvider>
    </html>
  );
}
