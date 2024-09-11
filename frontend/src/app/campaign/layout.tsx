
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'tailwindcss/tailwind.css';

import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "B2DVenture",
  description: "Created by FishermanFriends team",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NavBar name={"B2DVenture"} />
        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
