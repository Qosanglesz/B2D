'use client';

import Header from "../../../components/homeComponents/Header";
import CampaignCard from "@/components/campaignComponents/CampaignCard";
import React, { useEffect, useState } from "react";

const links = {
    getStarted: "/api/auth/login",
    viewAll: "/campaign",
};

export default function Home() {
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header registerLink={links.getStarted} />
            <div>
                <h1 className="text-2xl font-bold ml-20 my-8">Fundraising Campaign</h1>
                <div className="grid grid-cols-4 mx-5 gap-4">
                    {campaigns.map(campaign => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
                </div>
                <div className="text-center py-10">
                    <a href={links.viewAll} className="text-xl text-white bg-gray-800 hover:bg-gray-900 py-3 px-7 rounded-lg">View All</a>
                </div>
            </div>
        </>
    );
}
