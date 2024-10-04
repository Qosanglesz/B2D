// page.tsx
'use client';

import React from 'react';
import { mockCampaignsData } from '@/components/campaignComponents/TempCampaignData';
import CampaignCard from '@/components/campaignComponents/CampaignCard';
import { useState, useEffect } from 'react';

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchCampaigns = async () => {
          try {
              const response = await fetch('/api/campaigns'); // Update this with your actual API endpoint
              if (!response.ok) {
                  throw new Error('Failed to fetch campaigns');
              }
              const data = await response.json();
              setCampaigns(data); // Assuming the API response is an array of campaigns
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchCampaigns();
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    <div className="campaign-list container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Live opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
      </div>
    </div>
  );
}