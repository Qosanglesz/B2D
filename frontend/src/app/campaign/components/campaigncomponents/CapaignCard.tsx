'use client'

import React, { useState } from 'react';
import { mockCampaignsData } from '../TempCampaignData';

interface CampaignCardProps {
  campaign: mockCampaignsData[string];
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="campaign-card bg-white rounded-lg shadow-md overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={campaign.photo} alt={campaign.companyName} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 flex space-x-2">
        </div>
        <div className="absolute top-2 right-2">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        {/* Upper section - fixed content */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{campaign.companyName}</h2>
          <p className="text-gray-600">{campaign.description}</p>
        </div>
        
        {/* Lower section - content that changes on hover */}
        <div className="relative" style={{ height: '80px' }}> {/* Adjust height as needed */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex flex-wrap gap-2 mb-2">
              {campaign.businessOverview.sectors.split(", ").map((sector, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{sector}</span>
              ))}
            </div>
            <p className="text-sm text-gray-500">{campaign.businessOverview.location}</p>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${80}%` }}></div>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>{campaign.fundsRaised} raised</span>
              <span>80 % mock!!!</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{campaign.investors} investors</span>
              <span>10000 days left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;