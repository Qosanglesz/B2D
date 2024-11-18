import React from "react";
import AdminNavBar from "@/components/adminComponents/adminNavAndFooter/NavBar";
import AdminFooter from "@/components/adminComponents/adminNavAndFooter/Footer";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <AdminNavBar/>
            <main className="flex-1">
                {children}
            </main>
            <AdminFooter/>
        </div>
    );
}