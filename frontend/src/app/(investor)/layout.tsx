"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import NavBar from "../../components/navAndFooter/NavBar";
import Footer from "@/components/navAndFooter/Footer";

const links = {
    home: "/home",
    about: "https://github.com/Qosanglesz/B2D/wiki",
    campaigns: "/campaign",
    contact: "https://github.com/Qosanglesz/B2D",
    signIn: "/api/auth/login",
    logout: "/api/auth/logout",
    portfolio: "/portfolio",
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { user, error, isLoading } = useUser();

    return (
        <>
            <NavBar name={"B2DVenture"} links={links} isAuth={!!user} />
                {children}
            <Footer />
        </>
    );
}
