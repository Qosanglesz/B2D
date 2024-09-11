import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Key Metrics Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Businesses</h2>
          <p className="text-2xl">120</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Investments</h2>
          <p className="text-2xl">45</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Funds Raised</h2>
          <p className="text-2xl">฿500,000</p>
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
