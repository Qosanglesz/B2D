'use client';

import React, { useEffect, useState } from 'react';
import CampaignCard from '@/components/campaignComponents/CampaignCard';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns'); // Update this with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data: FundraisingCampaign[] = await response.json();
        setCampaigns(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
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
      <h1 className="text-3xl font-bold mb-6">Live Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id?.toString()} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}