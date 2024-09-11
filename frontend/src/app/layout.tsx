

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'tailwindcss/tailwind.css';

import Header from "@/components/homeComponents/Header";
import CampaignCardOld from "@/components/campaignComponents/CampaignCardOld";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "B2DVenture",
  description: "Created by FishermanFriends team",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
