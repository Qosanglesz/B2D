'use client'

import React, {useState} from 'react';
import {Campaign} from '@/types/Campaign';
import {useRouter} from 'next/navigation';
import Image from 'next/image';


const CampaignCard: React.FC<{ campaign: Campaign }> = ({campaign}) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleCardClick = () => {
        if (campaign.id) {
            router.push(`/campaign/${campaign.id}`);
        } else {
            console.error("Invalid campaign id:", campaign.id);
        }
    };

    // Calculate the percentage raised and remaining days
    const percentageRaised = Math.min(100, ((campaign.amountRaised / campaign.targetAmount) * 100)).toFixed(2);
    const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endInDate).getTime() - Date.now()) / (1000 * 3600 * 24)));

    // Format the amounts with thousands separators
    const formattedRaised = Number(campaign.amountRaised).toLocaleString();
    const formattedGoal = Number(campaign.targetAmount).toLocaleString();

    return (
        <div
            className="campaign-card bg-white rounded-lg shadow-md overflow-hidden relative block cursor-pointer transition-shadow duration-300 hover:shadow-lg"
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Upper section - fixed content */}
            <div className="relative">
                <Image
                    src={campaign.pictureFiles[0].url as string}
                    alt={campaign.name}
                    width={720}
                    height={480}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-2xl font-bold truncate">{campaign.name}</h2>
                    <p className="text-base text-gray-600 line-clamp-2">{campaign.description}</p>
                </div>
            </div>

            {/* Always visible basic details */}
            <div className="p-4">
                <p className="text-base font-semibold">Sector: {campaign.sector}</p>
                <p className="text-base">Location: {campaign.location}</p>
            </div>

            {/* Lower section - slides up with additional info on hover */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-white p-4 transition-all duration-300 ease-in-out transform ${
                    isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
            >
                <div className="flex flex-col mb-2">
                    <h2 className="text-2xl font-bold truncate">{campaign.name}</h2>
                    <p className="text-base text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">Raised: ${formattedRaised}</p>
                        <p className="text-lg font-semibold">Goal: ${formattedGoal}</p>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{width: `${percentageRaised}%`}}
                        />
                    </div>
                    <p className="text-sm">{percentageRaised}% of funding goal</p>
                </div>
                <div className="flex justify-between text-base mb-2">
                    <span>{campaign.investors.length} investors</span>
                    <span>{daysRemaining} days remaining</span>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
