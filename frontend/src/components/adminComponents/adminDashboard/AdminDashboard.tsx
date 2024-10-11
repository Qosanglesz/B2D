'use client';

import React, { useState, useEffect } from 'react';
import DashboardData from '../../types/DashboardData';
import InvestmentGraph from './InvestmentGraph';
import StatementCountGraph from './StatementCountGraph';

// app/(admin)/admin/dashboard/page.tsx

interface InvestmentData {
  date: string;
  amount: number;
}

interface StatementCountData {
  date: string;
  count: number;
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalCompanies: 0,
    totalFundsRaised: 0,
  });
  const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);
  const [statementCountData, setStatementCountData] = useState<StatementCountData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
    fetchInvestmentData();
    fetchStatementCountData();
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
    }
  };

  const fetchInvestmentData = async () => {
    try {
      const response = await fetch('/api/investment-last-7-days');
      if (!response.ok) {
        throw new Error('Failed to fetch investment data');
      }
      const data = await response.json();
      setInvestmentData(data);
    } catch (err) {
      setError('Error fetching investment data. Please try again later.');
      console.error(err);
    }
  };

  const fetchStatementCountData = async () => {
    try {
      const response = await fetch('/api/statement-count-last-7-days');
      if (!response.ok) {
        throw new Error('Failed to fetch statement count data');
      }
      const data = await response.json();
      setStatementCountData(data);
    } catch (err) {
      setError('Error fetching statement count data. Please try again later.');
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Companies</h2>
          <p className="text-2xl">{dashboardData.totalCompanies}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Funds Raised</h2>
          <p className="text-2xl">฿{dashboardData.totalFundsRaised.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Investment Over Last 7 Days</h2>
          <div className="bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
            <InvestmentGraph data={investmentData} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Number of Statements Over Last 7 Days</h2>
          <div className="bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
            <StatementCountGraph data={statementCountData} />
          </div>
        </section>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Activity list or table */}
      </section>
    </div>
  );
};

export default AdminDashboard;