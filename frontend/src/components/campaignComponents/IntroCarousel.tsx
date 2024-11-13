import React from 'react';
import { Carousel, Flowbite } from 'flowbite-react';
import Image from 'next/image';
import { Campaign } from '@/types/Campaign';
import type { CustomFlowbiteTheme } from 'flowbite-react';

interface IntroCarouselProps {
  campaign: Campaign;
}

const customTheme: CustomFlowbiteTheme = {
  carousel: {
    root: {
      base: 'relative w-full h-full',
      leftControl: 'hidden',
      rightControl: 'hidden',
    },
    indicators: {
      active: {
        off: 'bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800',
        on: 'bg-white dark:bg-gray-800',
      },
      base: 'h-2 w-2 sm:h-3 sm:w-3 rounded-full',
      wrapper: 'absolute bottom-3 sm:bottom-5 left-1/2 flex -translate-x-1/2 space-x-2 sm:space-x-3',
    },
    item: {
      base: 'relative w-full h-full', // Changed from absolute positioning
      wrapper: {
        off: 'w-full h-full flex-shrink-0 transform cursor-default snap-center',
        on: 'w-full h-full flex-shrink-0 transform cursor-grab snap-center',
      },
    },
    scrollContainer: {
      base: 'flex h-full snap-mandatory overflow-hidden scroll-smooth',
      snap: 'snap-x',
    },
  },
};

const IntroCarousel: React.FC<IntroCarouselProps> = ({ campaign }) => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="relative w-full h-full bg-gray-100 rounded-lg">
        <div className="aspect-[16/9] sm:aspect-[4/3] lg:aspect-[3/2] w-full h-[300px] sm:h-[400px] lg:h-[500px]">
          <Carousel 
            slideInterval={5000} 
            className="absolute inset-0 rounded-lg overflow-hidden"
          >
            {campaign.pictureFiles.map((picture, index) => (
              <div 
                key={index} 
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={picture.url as string}
                    alt={`Campaign image ${index + 1}`}
                    fill
                    className="object-contain lg:object-cover"
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 75vw,
                           66vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </Flowbite>
  );
};

export default IntroCarousel;