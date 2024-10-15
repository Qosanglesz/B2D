// src/app/(investor)/campaign/page.tsx

'use client';

import React, { useEffect, useState } from "react";
import { CampaignGrid } from '@/components/campaignComponents/CampaignCardGrid'; // Import the CampaignGrid component
import { LoadingError }  from '@/components/campaignComponents/LoadingError'; // Import the LoadingError component
import { FundraisingCampaign } from '@/components/types/Campaign'; // Import the FundraisingCampaign type


// CampaignPage component handles fetching campaign data and rendering it
export default function CampaignPage() {

    // Local state to store the campaigns fetched from the API
    const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);

    // Loading state to indicate if data is being fetched
    const [loading, setLoading] = useState(true);

    // Error state to store any error message encountered during fetching
    const [error, setError] = useState<string | null>(null);


    // Fetch the campaign data from the API endpoint when the component mounts
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                // Make a request to the API to get the campaigns
                const response = await fetch('/api/campaigns'); // Ensure this endpoint is correct in your API setup
                
                // If the response status is not OK, throw an error
                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns');
                }

                // Parse the response JSON and update the campaigns state
                const data: FundraisingCampaign[] = await response.json();
                setCampaigns(data);
            } catch (err) {
                // Handle any errors encountered during fetching
                if (err instanceof Error) {
                    setError(err.message); // Set the error message
                } else {
                    setError('An unknown error occurred'); // Fallback for unknown errors
                }
            } finally {
                // Set loading to false once the fetching process is complete
                setLoading(false);
            }
        };

        // Call the fetchCampaigns function to initiate the API request
        fetchCampaigns();
    }, []); // Empty dependency array ensures this runs once on component mount


    // Return the main content of the page, showing the loading spinner, error message, or campaign grid
    return (
        // max-w-6xl px-4 mx-auto to make it aligned with the Navbar
        <div className="campaign-list container max-w-6xl px-4 mx-auto py-8 min-h-screen">
            {/* Page title */}
            <h1 className="text-3xl font-bold mb-6">
                Live Opportunities
            </h1>
            
            {/* Render LoadingError to show spinner or error message based on the state */}
            <LoadingError loading={loading} error={error} />

            {/* Only render the CampaignGrid if data is loaded successfully without errors */}
            {!loading && !error && 
                <CampaignGrid campaigns={campaigns} 
            />}
        </div>
    );
}
