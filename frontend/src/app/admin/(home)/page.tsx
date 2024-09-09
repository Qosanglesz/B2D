// app/admin/layout.tsx
import React from "react";
import AdminDashboard from "../components/Dashboard";
import FundraisingCampaigns from "../components/FundraisingCampaigns";
import UserManagement from "../components/UserManagement";
import ReportsAndAnalytics from "../components/ReportAndAnalytics";
export default function AdminLayout() {
  return (
    <div>
        {/* Header Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl font-bold mb-6">Stake your claim</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          At b2s venture, our innovative investment platform connects visionary startups with a network of trusted investors. 
          By leveraging cutting-edge technology, we provide secure and streamlined access to funding, 
          facilitating primary issuance, secondary trading, and comprehensive support for businesses looking 
          to thrive in the ever-evolving world of finance.
          </p>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
            Get in touch
          </button>
        </section>
              {/* Icons Section */}
              <section className="flex justify-center space-x-8 py-12">
          <img src="https://picsum.photos/200/300/?blur" alt="icon1" className="w-16 h-16" />
          <img src="https://picsum.photos/200/300/?blur" alt="icon2" className="w-16 h-16" />
          <img src="https://picsum.photos/200/300/?blur" alt="icon3" className="w-16 h-16" />
        </section>

        {/* Infrastructure Snapshot Section */}
        <section className="bg-white py-16">
          {/* <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Infrastructure snapshot:</h2>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-semibold text-blue-500">3M+</p>
              <p className="text-md text-gray-800">Global investor community</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-semibold text-blue-500">2000+</p>
              <p className="text-md text-gray-800">Private ventures funded</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-semibold text-blue-500">$2.6B+</p>
              <p className="text-md text-gray-800">Capital raised</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-semibold text-blue-500">31</p>
              <p className="text-md text-gray-800">Unicorns in portfolio</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-semibold text-blue-500">150</p>
              <p className="text-md text-gray-800">Countries</p>
            </div>
          </div>
        </section>
        <AdminDashboard />
        <FundraisingCampaigns />
        <UserManagement />
        <ReportsAndAnalytics />
    </div>
  ); 
}



