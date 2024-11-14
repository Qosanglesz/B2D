'use client';

import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface CancelProps {
    params: { id: string };
}

const Cancel: React.FC<CancelProps> = ({ params }) => {
    const { id: statementId } = params;
    const searchParams = useSearchParams();
    const provider = searchParams.get('provider'); // 'stripe' or 'coinbase'

    useEffect(() => {
        const handleCancelledPayment = async () => {
            try {
                const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
                    method: "GET",
                    headers: {
                        accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
                    }
                })
                const tokenData = await tokenResponse.json()

                if (provider === 'coinbase') {
                    // Handle Coinbase cancellation
                    await axios.post(
                        `/api/payment/coinbase/cancel`,
                        { chargeId: statementId },
                        {
                            headers: {
                                authorization: `Bearer ${tokenData.access_token}`,
                            }
                        }
                    );
                } else {
                    // Your existing Stripe cancellation logic
                    await axios.delete(
                        `/api/statement/${statementId}`,
                        {
                            headers: {
                                authorization: `Bearer ${tokenData.access_token}`,
                            }
                        }
                    );
                }
            } catch (error) {
                console.error("Failed to handle cancelled payment:", error);
            }
        };

        handleCancelledPayment();
    }, [statementId, provider]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4">
                    Payment Failed!
                </h1>
                <p className="text-lg text-gray-700 mb-2">
                    Try to recreate payment request.
                </p>
            </div>
        </div>
    );
};

export default Cancel;