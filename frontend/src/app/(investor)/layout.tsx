

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'tailwindcss/tailwind.css';

import Footer from "../../components/navAndFooter/Footer";
import NavBar from "../../components/navAndFooter/NavBar";



const inter = Inter({ subsets: ["latin"] });

const links = {
    home: "/home",
    about: "https://github.com/Qosanglesz/B2D/wiki",
    campaigns: "/campaign",
    contact: "https://github.com/Qosanglesz/B2D",
    register: "/register",
    login: "/login",
};

export const metadata: Metadata = {
    title: "B2DVenture",
    description: "Created by FishermanFriends team",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <NavBar name={"B2DVenture"} links={links}/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
