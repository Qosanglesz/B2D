'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";

interface SuccessProps {
    params: { id: string };
}

const Success: React.FC<SuccessProps> = ({ params }) => {
    const { id: statementId } = params;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);

    // Get payment provider from URL query
    const provider = searchParams.get('provider') as string | null;

    useEffect(() => {
        const checkStatus = async () => {
            try {
                let response;

                // Check payment status based on provider
                if (provider === 'coinbase') {
                    response = await axios.get(
                        `/api/payment/coinbase?chargeId=${statementId}`
                    );

                    if (response.data.status !== "COMPLETED") {
                        router.push(`/payment/cancel/${statementId}?provider=coinbase`);
                        return;
                    } else {
                    // Assuming this is your existing Stripe check
                    response = await axios.get(
                        `/api/payment/statement/${statementId}`
                    );

                    if (response.data.status !== "complete") {
                        router.push(`/payment/cancel/${statementId}?provider=stripe`);
                        return;
                    }
                }

                setLoading(false);

            } catch (error) {
                console.error("Failed to fetch payment status:", error);
                router.push(`/home`);
            }
        };

        checkStatus();
    }, [statementId, provider, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-green-600 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-lg text-gray-700 mb-2">
                    Thank you for your investment. Your payment has been processed
                    successfully.
                </p>
            </div>
        </div>
    );
};

export default Success;
