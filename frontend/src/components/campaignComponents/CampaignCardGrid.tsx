import React from 'react';
import {Campaign} from '@/types/Campaign';
import CampaignCard from '@/components/campaignComponents/CampaignCard';


interface CampaignGridProps {
    campaigns: Campaign[];
}


export const CampaignGrid: React.FC<CampaignGridProps> = ({campaigns}) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Iterate over the campaigns array and render a CampaignCard for each campaign */}
            {campaigns.map(campaign => (
                // Key uses `_id` if available, or falls back to `id` to ensure a unique key is provided.
                <CampaignCard key={campaign._id?.toString() || campaign.id} campaign={campaign}/>
            ))}
        </div>
    );

};
