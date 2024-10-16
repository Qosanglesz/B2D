// components/campaignComponents/IntroHeader.tsx

import React from 'react';
import { Campaign } from '@/types/Campaign'; // Adjust the path as necessary
import { UploadThingPictureFile } from '@/types/UploadThingPictureFile';

import Image from 'next/image';

interface IntroHeaderProps {
  campaign: Campaign;
}

const IntroHeader: React.FC<IntroHeaderProps> = ({ campaign }) => {
  return (
    <div className="p-6 mb-5 mt-8">
      <div className="flex items-center space-x-4">
        <Image
          width={80}
          height={80}
          src={campaign.pictureFiles[0].url as string} // Adjust the path as necessary
          alt={`${campaign.companyName} logo`}
          className="w-20 h-20 object-cover rounded-full border border-gray-300" // Increased size
        />
        <div>
          <h2 className="text-6xl font-semibold text-gray-900">{campaign.companyName}</h2> {/* Increased font size */}
          <p className="text-xl text-gray-700 mt-2">{campaign.description}</p> {/* Increased font size */}
        </div>
      </div>
    </div>
  );
};

export default IntroHeader;
