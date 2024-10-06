// frontend\src\app\campaign\[id]\page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import IntroHeader from '@/components/campaignComponents/IntroHeader';
import CompanyInformation from '@/components/campaignComponents/CompanyInformation';
import IntroCarousel from '@/components/campaignComponents/IntroCarousel';
import IntroStatistics from '@/components/campaignComponents/IntroStatistics';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

interface CampaignProps {
  params: { id: string };
}

export default function CampaignPage({ params }: CampaignProps) {
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
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-screen-xl p-0">
        <div className="grid grid-cols-6">
          {/* IntroHeader at the top */}
          <div className="col-span-6 p-2">
            <IntroHeader campaign={campaign} />
          </div>

          {/* Carousel middle to the left */}
          {/* p-3 aligned with Search in NavBar above */}
          <div className="col-span-4 row-span-3 p-3">
            <IntroCarousel campaign={campaign} />
          </div>

          {/* Stats middle to the right */}
          <div className="col-span-2 row-span-3 p-10">
            <IntroStatistics campaign={campaign} />
          </div>
          {/* Company Information at the bottom */}
          <div className="col-span-6 p-3 mt-6 mb-10 rounded-lg">
            <CompanyInformation campaign={campaign} />
          </div>
        </div>
      </div>
    </div>
  );
}
