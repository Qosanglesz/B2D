

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en"> 
      <body className={inter.className}>
        <NavBar name={"B2DVenture"}/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
