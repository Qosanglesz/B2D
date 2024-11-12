// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'tailwindcss/tailwind.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextUIProvider } from "@nextui-org/react";
import { LoadingProvider } from '@/components/providers/loading-provider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "B2DVenture",
  description: "Created by FishermanFriends team",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <LoadingProvider>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </LoadingProvider>
        </UserProvider>
      </body>
    </html>
  );
}
