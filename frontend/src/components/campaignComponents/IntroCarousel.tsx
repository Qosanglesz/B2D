// src/components/campaignComponents/IntroCarousel.tsx

import React from 'react';
import { Carousel, Flowbite } from 'flowbite-react';
import Image from 'next/image';
import { Campaign } from '@/types/Campaign';
import type { CustomFlowbiteTheme } from 'flowbite-react';


// Interface for component props, expecting a Campaign object
interface IntroCarouselProps {
  campaign: Campaign;
}


// Define a custom Flowbite theme to customize carousel behavior and appearance
const customTheme: CustomFlowbiteTheme = {
  carousel: {
    root: {
      base: 'relative h-full w-full',
      // Hide the left and right control arrows
      leftControl: 'hidden',
      rightControl: 'hidden',
    },
    indicators: {
      active: {
        off: 'bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800',
        on: 'bg-white dark:bg-gray-800',
      },
      base: 'h-3 w-3 rounded-full',
      wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3',
    },
    item: {
      base: 'absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2',
      wrapper: {
        off: 'w-full flex-shrink-0 transform cursor-default snap-center',
        on: 'w-full flex-shrink-0 transform cursor-grab snap-center',
      },
    },
    control: {
      base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
      icon: 'h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6',
    },
    scrollContainer: {
      // Ensure the carousel container has overflow hidden and uses smooth scrolling
      base: 'flex h-full snap-mandatory overflow-hidden scroll-smooth',
      snap: 'snap-x',
    },
  },
};


// Main IntroCarousel component
const IntroCarousel: React.FC<IntroCarouselProps> = ({ campaign }) => {
  return (
    // Apply custom Flowbite theme to the carousel
    <Flowbite theme={{ theme: customTheme }}>
      <div className="h-[500px]">
        {/* 5-second interval between slides. */}
        <Carousel slideInterval={5000}>
          {campaign.pictureFiles.map((picture, index) => (
            <div key={index} className="w-full h-96 lg:h-[32rem]">
              {/* 
              Dynamically sets the image source from the pictureFiles array
              Dynamically generates alt text for each image 
              */}
              <Image
                width={1280}
                height={720}
                src={picture.url as string}
                alt={`Campaign image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </Flowbite>
  );
};


export default IntroCarousel;
