import React from "react";
import 'tailwindcss/tailwind.css';
import AdminNavBar from "../components/NavBar";
import AdminFooter from "../components/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminNavBar />
      <main>
        {children}
      </main>
      <AdminFooter />
    </div>
  );
}