import React from "react";
import 'tailwindcss/tailwind.css';
import AdminNavBar from "../../../components/adminComponents/adminNavAndFooter/NavBar";
import AdminFooter from "../../../components/adminComponents/adminNavAndFooter/Footer";

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