// src/app/(investor)/campaign/[id]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

import axios from "axios";
import Stripe from 'stripe';

// Import components for campaign details
import IntroHeader from '@/components/campaignComponents/IntroHeader';
import CompanyInformation from '@/components/campaignComponents/CompanyInformation';
import IntroCarousel from '@/components/campaignComponents/IntroCarousel';
import IntroStatistics from '@/components/campaignComponents/IntroStatistics';
import { LoadingError } from '@/components/campaignComponents/LoadingError'; // New LoadingError component
import { FundraisingCampaign } from '@/types/Campaign'; // FundraisingCampaign type
import { Spinner } from "@nextui-org/react";


// Props interface for CampaignPage component
// Campaign ID passed as a parameter
interface CampaignProps {
    params: { id: string }; 
}


// Main CampaignPage component
export default function CampaignPage({ params }: CampaignProps) {

    // State variables to manage campaign data, loading state, and error message
    const [campaign, setCampaign] = useState<FundraisingCampaign | null>(null); // Campaign data
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error message

    // Extract campaign ID from props
    const campaignId = params.id;

    // Get user information using Auth0 hook
    const { user } = useUser();

    // State for investment amount input
    const [investAmountInput, setInvestAmountInput] = useState<number>(0); 

    // Handle input changes for investment amount
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvestAmountInput(Number(e.target.value)); // Update investment amount
    };

    // Initialize Stripe instance with publishable key
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string); 
    const router = useRouter(); // Get router instance for navigation

    // Function to handle investment button click
    const handleInvestButton = async () => {

        // Prepare data to send to backend
        const bodyData = {
            user,
            campaign,
            amount: investAmountInput
        };
        

        try {
            // Send POST request to create a Stripe checkout session
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/checkout`, bodyData);
            const sessionUrl = response.data.sessionUrl; // Get session URL from response
            router.push(sessionUrl); // Redirect to Stripe checkout page
        } catch (err) {
            setError('Error processing payment'); // Handle any errors during the request
            console.error(err);
        }
    };


    // Fetch campaign data based on campaign ID
    useEffect(() => {
        const fetchCampaign = async () => {

            if (!campaignId) {
                setError('No campaign ID provided'); // Set error if ID is missing
                setIsLoading(false);
                return;
            }


            // Fetch campaign data
            try {
                const response = await fetch(`/api/campaign/${campaignId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign data'); // Handle non-OK response
                }
                const data: FundraisingCampaign = await response.json(); // Parse JSON response
                setCampaign(data); // Update campaign state with fetched data
            } catch (err) {
                setError('Error fetching campaign data'); // Handle errors
                console.error(err);
            } finally {
                setIsLoading(false); // Set loading to false regardless of outcome
            }
        };

        fetchCampaign(); // Call fetch function
    }, [campaignId]); // Dependency array to re-run on campaignId change


    // Render loading, error, or campaign content
    return (
        // max-w-6xl px-4 mx-auto to make it aligned with the Navbar
        <div className="min-h-screen max-w-6xl px-4 mx-auto flex justify-center">

            {/* Use the LoadingError component to handle loading and error states */}
            <LoadingError loading={isLoading} error={error} />

            {/* Return null if still loading or there is an error */}
            {isLoading || error ? null : (
                <div className="w-full max-w-screen-xl p-0">
                    <div className="grid grid-cols-6">

                        {/* Header for the campaign */}
                        <div className="col-span-6 p-2">
                            <IntroHeader campaign={campaign} />
                        </div>

                        {/* Carousel for campaign images */}
                        <div className="col-span-4 row-span-3 p-3">
                            <IntroCarousel campaign={campaign} />
                        </div>

                        {/* Statistics of the campaign */}
                        <div className="col-span-2 row-span-3 p-10">
                            <IntroStatistics
                                campaign={campaign}
                                handleInputChange={handleInputChange}
                                investmentAmountInput={investAmountInput}
                                handleInvestButton={handleInvestButton}
                            />
                        </div>

                        {/* Company info for the campaign */}
                        <div className="col-span-6 p-3 mt-6 mb-10 rounded-lg">
                            <CompanyInformation campaign={campaign} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
