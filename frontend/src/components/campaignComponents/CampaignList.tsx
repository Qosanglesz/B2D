import React from 'react';
import { CampaignData } from './TempCampaignData'; // Assuming you've defined the interface in a separate file
import CampaignCard from './CampaignCard'; // Assuming you've defined the CampaignCard component in a separate file

interface CampaignListProps {
  campaignData: CampaignData;
}

const CampaignList: React.FC<CampaignListProps> = ({ campaignData }) => {
  return (
    <div className="campaign-list">
      <h1 className="text-3xl font-bold mb-6">Live opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignData && Object.entries(campaignData).map(([key, campaign]) => (
          <CampaignCard key={key} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default CampaignList;