"use client";

import Link from 'next/link';
import React, { useState } from 'react';

// export interface FundraisingCampaign {
//   id: number;
//   name: string;
//   goal: number;
//   raised: number;
//   status: string;
//   description: string;
//   urlPicture: string;
// }
export interface FundraisingCampaign {
  id: number;
  name: string;
  goal: number;
  raised: number;
  status: string;
  description: string;
  urlPicture: string;
  companyName: string;
  website: string;
  founderName: string;
  email: string;
  linkedInProfile: string;
  companyStage: string;
  industry: string;
  sector: string;
  amountRaised: number;
  targetAmount: number;
  teamSize: number;
  headquartersLocation: string;
  productAvailable: boolean;
}

export const initialCampaigns: FundraisingCampaign[] = [
  {
    id: 1,
    name: 'Tech Innovation',
    goal: 500000,
    raised: 200000,
    status: 'Active',
    description: 'A tech startup focused on innovation.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'Tech Innovators Inc.',
    website: 'https://techinnovators.com',
    founderName: 'Alice Smith',
    email: 'alice@techinnovators.com',
    linkedInProfile: 'https://linkedin.com/in/alicesmith',
    companyStage: 'Growth',
    industry: 'Technology',
    sector: 'Software',
    amountRaised: 200000,
    targetAmount: 500000,
    teamSize: 50,
    headquartersLocation: 'San Francisco, CA',
    productAvailable: true
  },
  {
    id: 2,
    name: 'Green Energy',
    goal: 300000,
    raised: 150000,
    status: 'Active',
    description: 'A startup focused on renewable energy solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'Green Energy Solutions',
    website: 'https://greenenergy.com',
    founderName: 'Bob Johnson',
    email: 'bob@greenenergy.com',
    linkedInProfile: 'https://linkedin.com/in/bobjohnson',
    companyStage: 'Startup',
    industry: 'Energy',
    sector: 'Renewable',
    amountRaised: 150000,
    targetAmount: 300000,
    teamSize: 30,
    headquartersLocation: 'Austin, TX',
    productAvailable: true
  },
  {
    id: 3,
    name: 'AI Startups',
    goal: 400000,
    raised: 220000,
    status: 'Active',
    description: 'A startup focused on AI solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'AI Innovators',
    website: 'https://aiinnovators.com',
    founderName: 'Charlie Brown',
    email: 'charlie@aiinnovators.com',
    linkedInProfile: 'https://linkedin.com/in/charliebrown',
    companyStage: 'Seed',
    industry: 'Artificial Intelligence',
    sector: 'Machine Learning',
    amountRaised: 220000,
    targetAmount: 400000,
    teamSize: 20,
    headquartersLocation: 'New York, NY',
    productAvailable: false
  },
  {
    id: 4,
    name: 'FinTech Solutions',
    goal: 600000,
    raised: 450000,
    status: 'Closed',
    description: 'A startup focused on financial technology solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'FinTech Innovators',
    website: 'https://fintechinnovators.com',
    founderName: 'Dana White',
    email: 'dana@fintechinnovators.com',
    linkedInProfile: 'https://linkedin.com/in/danawhite',
    companyStage: 'Expansion',
    industry: 'Finance',
    sector: 'FinTech',
    amountRaised: 450000,
    targetAmount: 600000,
    teamSize: 100,
    headquartersLocation: 'Chicago, IL',
    productAvailable: true
  },
  {
    id: 5,
    name: 'Education Platforms',
    goal: 500000,
    raised: 320000,
    status: 'Active',
    description: 'A startup focused on online education platforms.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'EduTech Solutions',
    website: 'https://edutech.com',
    founderName: 'Eve Adams',
    email: 'eve@edutech.com',
    linkedInProfile: 'https://linkedin.com/in/evadams',
    companyStage: 'Growth',
    industry: 'Education',
    sector: 'E-Learning',
    amountRaised: 320000,
    targetAmount: 500000,
    teamSize: 40,
    headquartersLocation: 'Boston, MA',
    productAvailable: true
  },
  {
    id: 6,
    name: 'Smart Cities',
    goal: 700000,
    raised: 500000,
    status: 'Active',
    description: 'A startup focused on smart city solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'Smart City Innovators',
    website: 'https://smartcity.com',
    founderName: 'Frank Green',
    email: 'frank@smartcity.com',
    linkedInProfile: 'https://linkedin.com/in/frankgreen',
    companyStage: 'Mature',
    industry: 'Urban Development',
    sector: 'Smart Cities',
    amountRaised: 500000,
    targetAmount: 700000,
    teamSize: 150,
    headquartersLocation: 'Los Angeles, CA',
    productAvailable: true
  }
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
