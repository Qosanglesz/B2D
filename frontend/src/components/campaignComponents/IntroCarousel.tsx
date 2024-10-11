// components/campaignComponents/IntroCarousel.tsx

import React from 'react';
import { FundraisingCampaign } from '@/components/types/Campaign';

interface IntroCarouselProps {
  campaign: Pick<FundraisingCampaign, 'urlPicture'>;
}

const IntroCarousel: React.FC<IntroCarouselProps> = ({ campaign }) => {
  return (
    <div className="w-full">
      <img
        src={campaign.urlPicture}
        alt="Company logo"
        className="w-full h-96 lg:h-[32rem] object-cover rounded-lg" // Increased height values
      />
    </div>
  );
};

export default IntroCarousel;
