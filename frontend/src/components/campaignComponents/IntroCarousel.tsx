// src/components/campaignComponents/IntroCarousel.tsx

import React from 'react';
import { Campaign } from '@/types/Campaign';


import Image from 'next/image';

interface IntroCarouselProps {
  campaign: Campaign;
}

const IntroCarousel: React.FC<IntroCarouselProps> = ({ campaign }) => {
  return (
    <div className="w-full">
      <Image
        width={1280}
        height={720}
        src={campaign.pictureFiles[0].url as string}
        alt="Company logo"
        className="w-full h-96 lg:h-[32rem] object-cover rounded-lg" // Increased height values
      />
    </div>
  );
};

export default IntroCarousel;
