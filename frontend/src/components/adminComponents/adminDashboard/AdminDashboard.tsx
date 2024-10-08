'use client';

import React, { useState, useEffect } from 'react';
import DashboardData from '../../types/DashboardData';

// interface DashboardData {
//   totalCompanies: number;
//   totalFundsRaised: number;
// }

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalCompanies: 0,
    totalFundsRaised: 0,
    // totalInvestments: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/summarizeCampaigns');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError('Error fetching dashboard data. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Key Metrics Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Companies</h2>
          <p className="text-2xl">{dashboardData.totalCompanies}</p>
        </div>
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Investments</h2>
          <p className="text-2xl">{dashboardData.totalInvestments}</p>
        </div> */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Funds Raised</h2>
          <p className="text-2xl">฿{dashboardData.totalFundsRaised.toLocaleString()}</p>
        </div>
      </div>
      {/* Recent Activity Section */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Activity list or table */}
      </section>
    </div>
  );
};

export default AdminDashboard;