'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import axios from "axios";

// Import components
import IntroHeader from '@/components/campaignComponents/IntroHeader';
import CompanyInformation from '@/components/campaignComponents/CompanyInformation';
import IntroCarousel from '@/components/campaignComponents/IntroCarousel';
import IntroStatistics from '@/components/campaignComponents/IntroStatistics';
import { LoadingError } from '@/components/campaignComponents/LoadingError';
import PaymentModal from '@/components/campaignComponents/PaymentModal';
import { Campaign } from '@/types/Campaign';


interface CampaignProps {
    params: { id: string }; 
}

export default function CampaignPage({ params }: CampaignProps) {
    // Existing state
    const [campaign, setCampaign] = useState<Campaign>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [investAmountInput, setInvestAmountInput] = useState<number>(0);
    
    // New state for payment modal
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

    const campaignId = params.id;
    const { user } = useUser();
    const router = useRouter();

    // Handle input changes for investment amount
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvestAmountInput(Number(e.target.value));
    };

    // Modified to open payment modal instead of direct payment
    const handleInvestButton = () => {
        if (!user) {
            router.push('/api/auth/login');
            return;
        }
        setIsPaymentModalOpen(true);
    };

    // Handle Stripe payment
    const handleStripePayment = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/checkout`,
                {
                    user,
                    campaign,
                    amount: investAmountInput
                }
            );
            const sessionUrl = response.data.sessionUrl;
            router.push(sessionUrl);
        } catch (err) {
            setError('Error processing card payment');
            console.error(err);
            setIsPaymentModalOpen(false);
        }
    };

    // Handle Crypto payment
    const handleCryptoPayment = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/coinbase`,
                {
                    user,
                    campaign,
                    amount: investAmountInput
                }
            );
            const { hostedUrl } = response.data;
            router.push(hostedUrl);
        } catch (err) {
            setError('Error processing crypto payment');
            console.error(err);
            setIsPaymentModalOpen(false);
        }
    };

    // Fetch campaign data
    useEffect(() => {
        const fetchCampaign = async () => {
            if (!campaignId) {
                setError('No campaign ID provided');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/campaign/${campaignId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign data');
                }
                const data: Campaign = await response.json();
                setCampaign(data);
            } catch (err) {
                setError('Error fetching campaign data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaign();
    }, [campaignId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <LoadingError loading={isLoading} error={error} />

                {!isLoading && !error && campaign && (
                    <div className="flex flex-col space-y-8">
                        {/* Header Section */}
                        <section className="w-full bg-white rounded-lg shadow-sm">
                            <IntroHeader campaign={campaign} />
                        </section>

                        {/* Main Content Section */}
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column - Carousel */}
                            <section className="w-full lg:w-2/3">
                                <div className="bg-white rounded-lg shadow-sm p-4">
                                    <IntroCarousel campaign={campaign} />
                                </div>
                            </section>

                            {/* Right Column - Statistics */}
                            <section className="w-full lg:w-1/3">
                                <div className="lg:sticky lg:top-8">
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <IntroStatistics
                                            campaign={campaign}
                                            handleInputChange={handleInputChange}
                                            investmentAmountInput={investAmountInput}   
                                            handleInvestButton={handleInvestButton}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Company Information Section */}
                        <section className="w-full">
                            <div className="bg-white rounded-lg shadow-sm">
                                <CompanyInformation campaign={campaign} />
                            </div>
                        </section>

                        {/* Payment Modal */}
                        <PaymentModal
                            isOpen={isPaymentModalOpen}
                            onClose={() => setIsPaymentModalOpen(false)}
                            campaign={campaign}
                            investmentAmount={investAmountInput}
                            onStripePayment={handleStripePayment}
                            onCryptoPayment={handleCryptoPayment}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}