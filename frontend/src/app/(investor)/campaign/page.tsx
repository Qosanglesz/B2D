'use client';

import React, {useEffect, useState} from "react";

import CampaignCard from '@/components/campaignComponents/CampaignCard';
import {Spinner} from "@nextui-org/react";


export default function CampaignPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('/api/campaigns'); // Update this with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns');
                }
                const data = await response.json();
                setCampaigns(data); // Assuming the API response is an array of campaigns
            } catch (err) {
                setError(err.message);
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

    return (
        <div className="campaign-list container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Live Opportunities</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign._id} campaign={campaign}/> // Ensure each card has a unique key
                ))}
            </div>
        </div>
    );
}
