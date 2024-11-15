import React from "react";
import { headers } from "next/headers";
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";

interface CancelProps {
    params: { id: string };
    searchParams: { provider: string | null };
}

const Cancel = async ({ params, searchParams }: CancelProps) => {
    const { id: statementId } = params;
    const provider = searchParams.provider;

    try {
        const headersInstance = headers();
        const accesstokenapikey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "";

        // Fetch the access token from the API
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
            method: "GET",
            headers: {
                accesstokenapikey,
            },
        });

        const tokenData = await tokenResponse.json();

        if (provider === "coinbase") {
            // Handle Coinbase cancellation
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/coinbase/cancel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
                body: JSON.stringify({ chargeId: statementId }),
            });
        } else {
            // Handle Stripe cancellation
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statement/${statementId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            });
        }
    } catch (error) {
        console.error("Failed to handle cancelled payment:", error);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 text-center">
                <ExclamationTriangleIcon className="w-20 h-20 text-red-600 mx-auto"/>
                <h1 className="text-4xl font-bold text-red-600">Payment Failed!</h1>
                <p className="text-gray-700 text-lg">
                    We encountered an issue while processing your payment.
                </p>
                <p className="text-gray-500 text-md">
                    Please try again or contact support if the issue persists.
                </p>
                <div className="mt-8 space-y-4">
                    <a
                        className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
                        href="/home"
                    >
                        Go Back
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
