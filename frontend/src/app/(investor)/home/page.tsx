// /src/app/(investor)/home/page.tsx

// Use client-side rendering for this page
'use client';

import React, { useEffect, useState } from "react";
import { FundraisingCampaign } from '@/components/types/Campaign';
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
    const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
    
    // State to manage loading and error status
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the campaigns when the component mounts
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                // Fetch campaigns from the API endpoint
                const response = await fetch('/api/campaigns'); // Ensure that this API endpoint exists
                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns'); // Throw error if fetch fails
                }

                // Parse the response data as an array of FundraisingCampaign objects
                const data: FundraisingCampaign[] = await response.json();
                setCampaigns(data); // Update state with fetched campaigns

            } catch (err: unknown) {
                // Handle any errors that occur during the fetch
                if (err instanceof Error) {
                    setError(err.message); // Set error message if it's an Error object
                } else {
                    setError('An unknown error occurred'); // Set a default error message for unknown errors
                }
            } finally {
                // Stop loading after fetching is complete, whether successful or failed
                setLoading(false);
            }
        };

        fetchCampaigns(); // Call the function to fetch campaigns

    }, []); // Only run this effect once on component mount

    // Randomly shuffle the campaigns array and limit to 3 campaigns
    const randomCampaigns = campaigns
        .sort(() => Math.random() - 0.5) // Shuffle the campaigns
        .slice(0, 3);  // Take the first 3 shuffled campaigns

    return (
        <>
            {/* Use LoadingError to show either a spinner or an error message */}
            <LoadingError loading={loading} error={error} />

            {/* Only render the content below if not loading and no error */}
            {!loading && !error && (
                <>
                    {/* Render the Header with a link to register
                    <Header registerLink={links.getStarted} /> */}

                    {/* Render the Hero Section with Carousel */}
                    <HeroSectionHome registerLink={links.getStarted} /> {/* Added HeroSectionHome component */}

                    <div className="max-w-6xl mx-auto px-4">
                        {/* Render the FeatureCards component here */}
                        <FeatureCards />

                        <h1 className="text-4xl font-bold py-8">
                            Fundraising Campaigns
                        </h1>

                        {/* Render the campaign grid with random campaigns */}
                        <CampaignGrid campaigns={randomCampaigns} />

                        {/* Render the "View All" button */}
                        <ViewAllButton viewAllLink={links.viewAll} />
                    </div>
                </>
            )}
        </>
    );
}
