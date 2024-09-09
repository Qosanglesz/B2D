"use client";

import Link from 'next/link';
import React, { useState } from 'react';

export interface FundraisingCampaign {
  id: number;
  name: string;
  goal: number;
  raised: number;
  status: string;
  description: string;
  urlPicture: string;
}

export const initialCampaigns: FundraisingCampaign[] = [
  {
    id: 1,
    name: 'Tech Innovation',
    goal: 500000,
    raised: 200000,
    status: 'Active',
    description: 'A tech startup focused on innovation.',
    urlPicture : "https://picsum.photos/200/300"
  },
  {
    id: 2,
    name: 'Green Energy',
    goal: 300000,
    raised: 150000,
    status: 'Active',
    description: 'A startup focused on renewable energy solutions.',
    urlPicture : "https://picsum.photos/200/300"
  },
  // Add more sample campaigns as needed
  // For demonstration purposes, add more than 5 to test pagination
  {
    id: 3,
    name: 'AI Startups',
    goal: 400000,
    raised: 220000,
    status: 'Active',
    description: 'A startup focused on AI solutions.',
    urlPicture : "https://picsum.photos/200/300"
  },
  {
    id: 4,
    name: 'FinTech Solutions',
    goal: 600000,
    raised: 450000,
    status: 'Closed',
    description: 'A startup focused on financial technology solutions.',
    urlPicture : "https://picsum.photos/200/300"
  },
  {
    id: 5,
    name: 'Education Platforms',
    goal: 500000,
    raised: 320000,
    status: 'Active',
    description: 'A startup focused on online education platforms.',
    urlPicture : "https://picsum.photos/200/300"
  },
  {
    id: 6,
    name: 'Smart Cities',
    goal: 700000,
    raised: 500000,
    status: 'Active',
    description: 'A startup focused on smart city solutions.',
    urlPicture : "https://picsum.photos/200/300"
  },
];

const FundraisingCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(initialCampaigns);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  // Get the current campaigns to display based on pagination
  const currentCampaigns = campaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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
            {currentCampaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="py-2 px-4 border-b text-center">{campaign.id}</td>
                <td className="py-2 px-4 border-b text-center">{campaign.name}</td>
                <td className="py-2 px-4 border-b text-center">{campaign.goal}</td>
                <td className="py-2 px-4 border-b text-center">{campaign.raised}</td>
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

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FundraisingCampaigns;
