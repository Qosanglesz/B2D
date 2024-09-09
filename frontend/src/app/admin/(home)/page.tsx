// app/admin/layout.tsx
import React from "react";
import AdminDashboard from "../components/Dashboard";
import FundraisingCampaigns from "../components/FundraisingCampaigns";
import UserManagement from "../components/UserManagement";
import ReportsAndAnalytics from "../components/ReportAndAnalytics";
export default function AdminLayout() {
  return (
    <div>
        <AdminDashboard />
        <FundraisingCampaigns />
        <UserManagement />
        <ReportsAndAnalytics />
    </div>
  ); 
}



