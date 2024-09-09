"use client";

import React from 'react';
import { initialCampaigns, FundraisingCampaign } from '../../../components/FundraisingCampaigns';

interface PageProps {
  params: {
    id: string;
  };
}
export default function Page({ params }: PageProps) {
  // Convert `params.id` to a number since campaign IDs are numbers
  const campaignId = Number(params.id);

  // Find the specific campaign based on the id from the params
  const campaign = initialCampaigns.find((campaign: FundraisingCampaign) => campaign.id === campaignId);
// console.log(`camepaign = ${campaign}`);
//     console.log(`idpara = ${params.id}`);
  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div>
      <h1>Fundraising Campaigns</h1>
      <div key={campaign.id}>
        <img src={campaign.urlPicture} alt={campaign.name} />
        <h2>{campaign.name}</h2>
        <p>{campaign.description}</p>
        <p>Goal: {campaign.goal}</p>
        <p>Raised: {campaign.raised}</p>
        <p>Status: {campaign.status}</p>
      </div>
    </div>
  );
}
