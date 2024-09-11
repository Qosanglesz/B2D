'use client';

import React, { useState } from 'react';
import { initialCampaigns } from '../../../../../components/adminComponents/TempdataAdmin/initialCampaigns';
import { FundraisingCampaign } from '../../../../../components/adminComponents/TempdataAdmin/FundraisingCampaign';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(initialCampaigns);
  const campaignId = Number(params.id);
  const campaign = campaigns.find((campaign: FundraisingCampaign) => campaign.id === campaignId);

  const handleDelete = () => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
  };

  if (!campaign) {
    return <div className="text-center text-red-500">Campaign not found or has been deleted</div>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center bg-white shadow-lg rounded-lg p-8">
          <img
            src={campaign.urlPicture || ''}
            alt={campaign.name}
            className="w-64 h-64 mx-auto object-cover mb-6 rounded-lg shadow-md"
          />
          <h2 className="text-4xl font-bold mb-4">{campaign.name}</h2>
          <p className="text-lg mb-2">{campaign.description}</p>
          <p className="text-xl font-semibold">Goal: {campaign.goal.toLocaleString()}</p>
          <p className="text-xl font-semibold">Raised: {campaign.raised.toLocaleString()}</p>
          <p className={`text-xl font-semibold mt-4 ${campaign.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
            Status: {campaign.status}
          </p>
          <p className="text-lg mt-4">Company Name: {campaign.companyName}</p>
          <p className="text-lg">Website: {campaign.website}</p>
          <p className="text-lg">Founder Name: {campaign.founderName}</p>
          <p className="text-lg">Email: {campaign.email}</p>
          <p className="text-lg">LinkedIn Profile: {campaign.linkedInProfile}</p>
          <p className="text-lg">Company Stage: {campaign.companyStage}</p>
          <p className="text-lg">Industry: {campaign.industry}</p>
          <p className="text-lg">Sector: {campaign.sector}</p>
          <p className="text-lg">Amount Raised: {campaign.amountRaised.toLocaleString()}</p>
          <p className="text-lg">Target Amount: {campaign.targetAmount.toLocaleString()}</p>
          <p className="text-lg">Team Size: {campaign.teamSize}</p>
          <p className="text-lg">Headquarters Location: {campaign.headquartersLocation}</p>
          <p className="text-lg">Product Available: {campaign.productAvailable ? 'Yes' : 'No'}</p>

          <Link href={`/admin/fundraising/${campaignId}/edit`}>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Edit Campaign
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="mt-6 ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Delete Campaign
          </button>
        </div>
      </section>
    </div>
  );
}