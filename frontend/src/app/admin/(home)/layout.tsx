import React from "react";
import 'tailwindcss/tailwind.css';
import AdminDashboard from "../components/Dashboard";
import AdminNavBar from "../components/NavBar";
import AdminFooter from "../components/Footer";
import FundraisingCampaigns from "../components/FundraisingCampaigns";
import UserManagement from "../components/UserManagement";
import ReportsAndAnalytics from "../components/ReportAndAnalytics";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminNavBar />
      <main>
        <AdminDashboard />
        <FundraisingCampaigns />
        <UserManagement />
        <ReportsAndAnalytics />
        {children}
      </main>
      <AdminFooter />
    </div>
  );
}