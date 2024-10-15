// components/campaignComponents/IntroCarousel.tsx

import React from 'react';
import { FundraisingCampaign } from '@/components/types/Campaign';
import Image from 'next/image';

interface IntroCarouselProps {
  campaign: FundraisingCampaign;
}

const IntroCarousel: React.FC<IntroCarouselProps> = ({ campaign }) => {
  return (
    <div className="w-full">
      <Image
        src={campaign.urlPicture}
        alt="Company logo"
        className="w-full h-96 lg:h-[32rem] object-cover rounded-lg" // Increased height values
      />
    </div>
  );
};

export default IntroCarousel;
