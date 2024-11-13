'use client';

import React, { useEffect, useState } from "react";
import { Campaign } from '@/types/Campaign';
import Header from "@/components/homeComponents/Header";
import { LoadingError } from '@/components/homeComponents/LoadingError'; // Import the LoadingError component
import { CampaignGrid } from '@/components/homeComponents/CampaignGrid'; // Import the CampaignGrid component
import { ViewAllButton } from '@/components/homeComponents/ViewAllButton'; // Import the ViewAllButton component
import HeroSectionHome from '@/components/homeComponents/HeroSectionHome'; // Import HeroSectionHome component
import FeatureCards from '@/components/homeComponents/FeatureCards'; // Import FeatureCards component

// Define the links for authentication and viewing all campaigns
const links = {
    getStarted: "/api/auth/login", // Login link
    viewAll: "/campaign", // Link to view all campaigns
};

export default function Home() {
    // State to hold the fetched campaigns
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    
    // State to manage loading and error status
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the campaigns when the component mounts
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                // Fetch access token
                const tokenResponse = await fetch("/api/accesstoken", {
                    method: "GET",
                    headers: {
                        accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY // Ensure the correct header key and fallback for missing env variable
                    }
                });

                // Parse the token response
                const tokenData = await tokenResponse.json();
                if (!tokenResponse.ok || !tokenData.access_token) {
                    throw new Error("Failed to retrieve access token");
                }
                // Fetch campaigns using the retrieved access token
                const response = await fetch('/api/campaigns', {
                    cache: "no-store",
                    headers: {
                        authorization: `Bearer ${tokenData.access_token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns');
                }

                const data: Campaign[] = await response.json();
                setCampaigns(data); // Update state with fetched campaigns

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false); // Stop loading after fetching is complete
            }
        };

        fetchCampaigns();
    }, []);

    // Randomly shuffle the campaigns array and limit to 3 campaigns
    const randomCampaigns = campaigns
        .sort(() => Math.random() - 0.5) // Shuffle the campaigns
        .slice(0, 4);  // Take the first 4 shuffled campaigns

    return (
        <>
            <LoadingError loading={loading} error={error} />

            {/* Only render the content below if not loading and no error */}
            {!loading && !error && (
                <>
                    <HeroSectionHome registerLink={links.getStarted} />
                    <div className="max-w-7xl mx-auto">
                        <FeatureCards />
                        <h1 className="text-4xl font-bold py-8">Fundraising Campaigns</h1>
                        <CampaignGrid campaigns={randomCampaigns} />
                        <ViewAllButton viewAllLink={links.viewAll} />
                    </div>
                </>
            )}
        </>
    );
}
