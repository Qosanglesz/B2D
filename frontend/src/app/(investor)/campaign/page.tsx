// page.tsx
import React from 'react';
import { mockCampaignsData } from '@/components/campaigncomponents/TempCampaignData';
import CampaignCard from '@/components/campaigncomponents/CapaignCard';

export default function CampaignPage() {
  if (!mockCampaignsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="campaign-list container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Live opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(mockCampaignsData.campaigns).map(([key, campaign]) => (
          <CampaignCard key={key} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}