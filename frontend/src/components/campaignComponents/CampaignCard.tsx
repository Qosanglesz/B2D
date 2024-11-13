'use client'

import React, { useState } from 'react';
import { Campaign } from '@/types/Campaign';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardBody, Progress, Chip } from "@nextui-org/react";
import { 
    CalendarDays, 
    Users2, 
    MapPin, 
    Building2, 
    Target, 
    TrendingUp,
    Clock,
    DollarSign,
    Award,
    ChevronRight
} from "lucide-react";

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
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
        <Card 
            className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group"
            isPressable
            onPress={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Upper section - fixed content */}
            <CardBody className="p-0">
                {/* Image Section */}
                <div className="relative">
                    <div className="relative w-full pt-[60%] group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src={campaign.pictureFiles[0].url as string}
                            alt={campaign.name}
                            fill
                            className="object-cover"
                        />
                        <Chip 
                            className="absolute top-2 right-2" 
                            color="primary" 
                            variant="shadow"
                            startContent={<Award className="w-3 h-3" />}
                        >
                            {campaign.sector}
                        </Chip>
                    </div>
                </div>

                {/* Title and Description */}
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h2 className="text-xl sm:text-2xl font-bold truncate">
                            {campaign.name}
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-default-500 line-clamp-2 mt-1">
                        {campaign.description}
                    </p>
                </div>

                {/* Basic Details */}
                <div className="px-4 pb-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary" />
                            <span className="text-sm sm:text-base font-semibold">
                                Sector:
                            </span>
                            <span className="text-sm sm:text-base text-default-500">
                                {campaign.sector}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm sm:text-base font-semibold">
                                Location:
                            </span>
                            <span className="text-sm sm:text-base text-default-500">
                                {campaign.location}
                            </span>
                        </div>
                    </div>
                </div>
            </CardBody>

            {/* Lower section - slides up with additional info on hover */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm 
                           p-4 transition-all duration-300 ease-in-out transform
                           ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            >
                <div className="flex flex-col gap-3">
                    {/* Campaign Title and Description */}
                    <div className="flex items-start gap-2">
                        <Target className="w-5 h-5 text-primary mt-1" />
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold truncate">
                                {campaign.name}
                            </h2>
                            <p className="text-sm sm:text-base text-default-500 line-clamp-2 mt-1">
                                {campaign.description}
                            </p>
                        </div>
                    </div>

                    {/* Funding Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-success" />
                                <p className="text-sm sm:text-base font-semibold">
                                    ${formattedRaised}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Target className="w-4 h-4 text-primary" />
                                <p className="text-sm sm:text-base text-default-500">
                                    ${formattedGoal}
                                </p>
                            </div>
                        </div>
                        <Progress 
                            value={Number(percentageRaised)} 
                            color="primary"
                            size="sm"
                            radius="full"
                            classNames={{
                                base: "max-w-full",
                                track: "drop-shadow-md border",
                                indicator: "bg-gradient-to-r from-primary to-primary-500",
                            }}
                        />
                        <p className="text-xs text-default-500 text-right flex items-center justify-end gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {percentageRaised}% of funding goal
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                            <Users2 className="w-4 h-4 text-primary" />
                            <span>{campaign.investors.length} investors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-warning" />
                            <span>{daysRemaining} days left</span>
                        </div>
                    </div>

                    {/* View Details Indicator */}
                    <div className="flex items-center justify-end text-primary text-sm mt-1">
                        View Details 
                        <ChevronRight className="w-4 h-4 animate-bounce-x" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CampaignCard;