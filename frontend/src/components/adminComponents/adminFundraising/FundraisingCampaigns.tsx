"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

const FundraisingCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/campaigns');
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        // Sort campaigns by ID from less to more
        const sortedCampaigns = data.sort((a: FundraisingCampaign, b: FundraisingCampaign) => a.id - b.id);
        setCampaigns(sortedCampaigns);
      } catch (err) {
        setError('Error fetching campaigns. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Fundraising Campaigns</h1>
      {campaigns.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID</th>
                <th className="py-2 px-4 border-b text-center">Company Name</th>
                <th className="py-2 px-4 border-b text-center">Goal</th>
                <th className="py-2 px-4 border-b text-center">Raised</th>
                <th className="py-2 px-4 border-b text-center">Status</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="py-2 px-4 border-b text-center">{campaign.id}</td>
                  <td className="py-2 px-4 border-b text-center">{campaign.companyName}</td>
                  <td className="py-2 px-4 border-b text-center">${campaign.targetAmount.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b text-center">${campaign.amountRaised.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b text-center">{campaign.status}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link href={`/admin/fundraising/${campaign.id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No campaigns found.</div>
      )}
    </div>
  );
};

export default FundraisingCampaigns;