// /src/components/homeComponents/CampaignGrid.tsx

import React from 'react';
import { FundraisingCampaign } from '@/types/Campaign';
import CampaignCard from '@/components/campaignComponents/CampaignCard';


// Define the props expected by the CampaignGrid component
interface CampaignGridProps {
    // campaigns: Array of campaigns to display
    campaigns: FundraisingCampaign[];
}


// CampaignGrid component that renders a grid of CampaignCard components
export const CampaignGrid: React.FC<CampaignGridProps> = ({ campaigns }) => {

    return (
        // Responsive grid layout for displaying campaign cards:
        
        // - grid-cols-1: On small screens (default), the grid will have 1 column.
        // - sm:grid-cols-2: On small to medium screens, the grid will adjust to 2 columns.
        // - lg:grid-cols-3: On large screens, the grid will have 3 columns.
        
        // - gap-6: Adds consistent spacing (gap) of `1.5rem` (24px) between grid items.
        
        // This setup ensures that the campaign cards are laid out responsively, adjusting based on the screen size to improve user experience on different devices.
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Iterate over the campaigns array and render a CampaignCard for each campaign */}
            {campaigns.map(campaign => (
                // Key uses `_id` if available, or falls back to `id` to ensure a unique key is provided.
                <CampaignCard key={campaign._id?.toString() || campaign.id} campaign={campaign} />
            ))}
        </div>
    );

};
