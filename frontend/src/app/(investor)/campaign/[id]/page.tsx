'use client';

import React, { useState, useEffect } from 'react';
import IntroHeader from '@/components/campaignComponents/IntroHeader';
import CompanyInformation from '@/components/campaignComponents/CompanyInformation';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

interface HomeProps {
  params: { id: string };
}

export default function Home({ params }: HomeProps) {
  const [campaign, setCampaign] = useState<FundraisingCampaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const campaignId = params.id;

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!campaignId) {
        setError('No campaign ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/campaign/${campaignId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch campaign data');
        }
        const data: FundraisingCampaign = await response.json();
        setCampaign(data);
      } catch (err) {
        setError('Error fetching campaign data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  if (!campaign) return <div className="flex justify-center items-center h-screen">No campaign data found</div>;

  return (
    <div className="min-h-screen p-8 w-full">
      {/* Header Section */}
      <IntroHeader
        logo={campaign.urlPicture}
        companyName={campaign.companyName}
        description={campaign.description}
      />

      {/* Campaign Summary */}
      <div className="grid grid-cols-2 gap-6 m-4">
        <div className="">
          <img
            src={campaign.urlPicture}
            alt="Company logo"
            className="w-full h-48 lg:h-64 object-cover rounded-lg"
          />
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-gray-800 mb-4">
            Funds Raised: ${campaign.amountRaised}
          </p>
          <p className="text-2xl text-gray-600 mb-2">
            Target: ${campaign.targetAmount}
          </p>
          <p className="text-xl text-gray-500 mb-4">
            {campaign.investors.length} Investors
          </p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
            Invest Now
          </button>
          <p className="text-xl text-gray-500 mt-4">End in {new Date(campaign.endInDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="mt-12">
        <CompanyInformation campaign={campaign}/>
      </div>
    </div>
  );
}