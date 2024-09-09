'use client';

import React, { useState } from 'react';
import { initialCampaigns, FundraisingCampaign } from '../../../components/FundraisingCampaigns';

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
    // Remove the campaign with the given id
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
  };

  if (!campaign) {
    return <div>Campaign not found or has been deleted</div>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <img src={campaign.urlPicture} alt={campaign.name} className="w-64 h-64 mx-auto object-cover mb-6 rounded-lg" />
          <h2 className="text-4xl font-bold mb-4">{campaign.name}</h2>
          <p className="text-lg mb-2">{campaign.description}</p>
          <p className="text-xl font-semibold">Goal: {campaign.goal.toLocaleString()}</p>
          <p className="text-xl font-semibold">Raised: {campaign.raised.toLocaleString()}</p>
          <p className={`text-xl font-semibold mt-4 ${campaign.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
            Status: {campaign.status}
          </p>
          
          {/* Add Delete Button */}
          <button 
            onClick={handleDelete} 
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
            Delete Campaign
          </button>
        </div>
      </section>
    </div>
  );
}
