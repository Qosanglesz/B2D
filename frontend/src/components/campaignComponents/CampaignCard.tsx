'use client'

import React, { useState } from 'react';

interface CampaignCardProps {
  campaign: {
    _id: string;
    name: string;
    description: string;
    urlPicture: string;
    amountRaised: number;
    targetAmount: number;
    status: string;
    investors: string[];
    website: string;
    // Add other properties as needed
  };
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="campaign-card bg-white rounded-lg shadow-md overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Upper section - fixed content */}
      <div className="relative">
        <img src={campaign.urlPicture} alt={campaign.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">{campaign.name}</h2>
          <p className="text-gray-600">{campaign.description}</p>
        </div>
      </div>
      
      {/* Lower section - content that changes on hover */}
      <div className="p-4 transition-all duration-300 min-h-[100px]"> {/* Set a minimum height */}
        {/* Show details when not hovered */}
        {!isHovered ? (
          <div className="flex flex-col">
            <p className="text-lg font-semibold">${campaign.amountRaised} raised</p>
            <a href={campaign.website} className="text-blue-500 hover:underline">Visit Website</a>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(campaign.amountRaised / campaign.targetAmount) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>${campaign.amountRaised} raised of ${campaign.targetAmount}</span>
              <span>Status: {campaign.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{campaign.investors.length} investors</span>
              {/* Replace with actual time left if available */}
              <span>10000 days left</span> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
