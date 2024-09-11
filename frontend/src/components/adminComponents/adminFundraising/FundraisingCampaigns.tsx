"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { initialCampaigns } from '../TempdataAdmin/initialCampaigns'; // Adjust the path as necessary
import { FundraisingCampaign } from '../TempdataAdmin/FundraisingCampaign'; // Adjust the path as necessary

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
    <div className="p-6 min-h-screen">
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