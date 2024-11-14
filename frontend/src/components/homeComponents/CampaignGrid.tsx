import React from 'react';
import { Campaign } from '@/types/Campaign';
import CampaignCard from '@/components/campaignComponents/CampaignCard';

interface CampaignGridProps {
    campaigns: Campaign[];
}

export const CampaignGrid: React.FC<CampaignGridProps> = ({ campaigns }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {campaigns.map(campaign => (
                <CampaignCard key={campaign._id?.toString()} campaign={campaign} />
            ))}
        </div>
    );
};