"use client";

import React, {useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";
import axios from "axios";
import IntroHeader from "./IntroHeader";
import CompanyInformation from "./CompanyInformation";
import IntroCarousel from "./IntroCarousel";
import IntroStatistics from "./IntroStatistics";
import {LoadingError} from "./LoadingError";
import PaymentModal from "./PaymentModal";
import {Campaign} from "@/types/Campaign";

interface CampaignContentProps {
    campaign: Campaign | null;
    error: string | null;
}

export default function CampaignContent({campaign, error}: CampaignContentProps) {
    const [investAmountInput, setInvestAmountInput] = useState<number>(0);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
    const {user} = useUser();
    const router = useRouter();

    // Handle input changes for investment amount
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvestAmountInput(Number(e.target.value));
    };

    // Handle invest button click
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
                {user, campaign, amount: investAmountInput}
            );
            const sessionUrl = response.data.sessionUrl;
            router.push(sessionUrl);
        } catch (err) {
            console.error("Error processing card payment", err);
            setIsPaymentModalOpen(false);
        }
    };

    // Handle Crypto payment
    const handleCryptoPayment = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/coinbase`,
                {user, campaign, amount: investAmountInput}
            );
            const hostedUrl = response.data.hostedUrl;
            router.push(hostedUrl);
        } catch (err) {
            console.error("Error processing crypto payment", err);
            setIsPaymentModalOpen(false);
        }
    };

    if (error) {
        return <LoadingError error={error} loading={false}/>;
    }

    return (
        <>
            {campaign ? (
                <div className="flex flex-col space-y-8">
                    <section className="w-full bg-white rounded-lg shadow-sm">
                        <IntroHeader campaign={campaign}/>
                    </section>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <section className="w-full lg:w-2/3">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <IntroCarousel campaign={campaign}/>
                            </div>
                        </section>
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
                    <section className="w-full">
                        <div className="bg-white rounded-lg shadow-sm">
                            <CompanyInformation campaign={campaign}/>
                        </div>
                    </section>
                    <PaymentModal
                        isOpen={isPaymentModalOpen}
                        onClose={() => setIsPaymentModalOpen(false)}
                        campaign={campaign}
                        investmentAmount={investAmountInput}
                        onStripePayment={handleStripePayment}
                        onCryptoPayment={handleCryptoPayment}
                    />
                </div>
            ) : (
                <div className="text-center text-gray-600 py-10">
                    No campaign data available
                </div>
            )}
        </>
    );
}
