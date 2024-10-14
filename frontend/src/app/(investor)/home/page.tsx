'use client';


import React, {useEffect, useState} from "react";

import {FundraisingCampaign} from '@/components/types/Campaign';
import Header from "@/components/homeComponents/Header";
import CampaignCard from "@/components/campaignComponents/CampaignCard";
import {Spinner} from "@nextui-org/react";


const links = {
    getStarted: "/api/auth/login",
    viewAll: "/campaign",
};

export default function Home() {
    const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('/api/campaigns'); // Update this with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns');
                }
                const data: FundraisingCampaign[] = await response.json();
                setCampaigns(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner size="lg"/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const randomCampaigns = campaigns
        .sort(() => Math.random() - 0.5)  // Shuffle array
        .slice(0, 4);

    return (
        <>
            <Header registerLink={links.getStarted}/>
            <div>
                <h1 className="text-2xl font-bold ml-20 my-8">Fundraising Campaign</h1>
                <div className="grid grid-cols-4 mx-5 gap-4">
                    {randomCampaigns.map(campaign => (
                        <CampaignCard key={campaign._id?.toString()} campaign={campaign}/>
                    ))}
                </div>
                <div className="text-center py-10">
                    <a href={links.viewAll}
                       className="text-xl text-white bg-gray-800 hover:bg-gray-900 py-3 px-7 rounded-lg">View All</a>
                </div>
            </div>
        </>
    );
}