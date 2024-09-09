"use client";

import React, { useState } from 'react';


interface FundraisingCampaign {
  id: number;
  name: string;
  goal: number;
  raised: number;
  status: string;
}

const initialCampaigns: FundraisingCampaign[] = [
  // Sample data, replace with real data from your API
  {
    id: 1,
    name: 'Tech Innovation',
    goal: 500000,
    raised: 200000,
    status: 'Active',
  },
  // Add more sample campaigns as needed
];

const FundraisingCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(initialCampaigns);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Fundraising Campaigns</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Name Company</th>
              <th className="py-2 px-4 border-b text-center">Goal</th>
              <th className="py-2 px-4 border-b text-center">Raised</th>
              <th className="py-2 px-4 border-b text-center">Status</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign.id}>
                <td className="py-2 px-4 border-b text-center">{campaign.id}</td>
                <td className="py-2 px-4 border-b text-center">{campaign.name}</td>
                <td className="py-2 px-4 border-b text-center">{campaign.goal}</td>
                <td className="py-2 px-4 border-b text-center">{campaign.raised}</td>
                <td className="py-2 px-4 border-b text-center">{campaign.status}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundraisingCampaigns;
