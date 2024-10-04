"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

type SortField = 'id' | 'amountRaised' | 'targetAmount' | 'companyName';
type SortOrder = 'asc' | 'desc';

const FundraisingCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/campaigns');
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      const data = await response.json();
      setCampaigns(data);
    } catch (err) {
      setError('Error fetching campaigns. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sortCampaigns = (field: SortField) => {
    const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedCampaigns = [...campaigns].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setCampaigns(sortedCampaigns);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

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
                <th className="py-2 px-4 border-b text-center cursor-pointer" onClick={() => sortCampaigns('id')}>
                  ID {getSortIcon('id')}
                </th>
                <th className="py-2 px-4 border-b text-center cursor-pointer" onClick={() => sortCampaigns('companyName')}>
                  Company Name {getSortIcon('companyName')}
                </th>
                <th className="py-2 px-4 border-b text-center cursor-pointer" onClick={() => sortCampaigns('targetAmount')}>
                  Goal {getSortIcon('targetAmount')}
                </th>
                <th className="py-2 px-4 border-b text-center cursor-pointer" onClick={() => sortCampaigns('amountRaised')}>
                  Raised {getSortIcon('amountRaised')}
                </th>
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