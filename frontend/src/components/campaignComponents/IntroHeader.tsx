import React from 'react';
import {Campaign} from '@/types/Campaign';
import Image from 'next/image';

interface IntroHeaderProps {
    campaign: Campaign;
}

const IntroHeader: React.FC<IntroHeaderProps> = ({campaign}) => {
    return (
        <div className="p-4 sm:p-6 mb-3 sm:mb-5 mt-4 sm:mt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                {/* Logo Container */}
                <div className="flex-shrink-0">
                    <Image
                        width={300}
                        height={300}
                        src={campaign.pictureFiles[0].url as string}
                        alt={`${campaign.companyName} logo`}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border border-gray-300"
                        priority // Add priority for faster loading of above-the-fold image
                    />
                </div>

                {/* Text Content */}
                <div className="flex-grow">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 break-words">
                        {campaign.companyName}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-2 break-words">
                        {campaign.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IntroHeader;