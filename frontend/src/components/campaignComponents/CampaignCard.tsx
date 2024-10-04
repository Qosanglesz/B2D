'use client'

import React, { useState } from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const CampaignCard: React.FC<{ campaign: FundraisingCampaign }> = ({ campaign }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleCardClick = () => {
    router.push(`/campaign/${campaign.id}`); // Navigate to the campaign page
  };

  return (
    <div
      className="campaign-card bg-white rounded-lg shadow-md overflow-hidden relative block cursor-pointer" // Added cursor-pointer
      onClick={handleCardClick} // Handle click event
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Upper section - fixed content */}
      <div className="relative">
        <img src={campaign.urlPicture} alt={campaign.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{campaign.name}</h2>
          <p className="text-base text-gray-600">{campaign.description}</p>
        </div>
      </div>

      {/* Always visible basic details */}
      <div className="p-4">
        <p className="text-base font-semibold">Industry: {campaign.industry}</p>
        <p className="text-base">Sector: {campaign.sector}</p>
        <p className="text-sm text-gray-500">HQ: {campaign.headquartersLocation}</p>
        <p className="text-sm text-gray-500">Location: {campaign.location}</p>
      </div>

      {/* Lower section - slides up with additional info on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white p-4 transition-all duration-300 ease-in-out transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Added more related information */}
        <p className="text-base font-semibold mb-2">Founder: {campaign.founderName}</p>
        <p className="text-base mb-2">Stage: {campaign.companyStage}</p>
        <p className="text-base mb-2">Incorporation Date: {campaign.incorporationDate}</p>
        <p className="text-base mb-4">Team Size: {campaign.teamSize}</p>

        <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(campaign.amountRaised / campaign.targetAmount) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-base mb-2">
          <span>${campaign.amountRaised} raised of ${campaign.targetAmount}</span>
          <span>Status: {campaign.status}</span>
        </div>
        <div className="flex justify-between text-base">
          <span>{campaign.investors.length} investors</span>
          <span>{campaign.endInDate}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
