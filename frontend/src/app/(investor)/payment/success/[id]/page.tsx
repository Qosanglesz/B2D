import React from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';


interface SuccessProps {
    params: { id: string };
    searchParams: { provider?: string };
}

export default async function Success({ params, searchParams }: SuccessProps) {
    const { id: statementId } = params;
    const provider = searchParams.provider;

    let paymentStatus = "";

    try {
        // Fetch the access token
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
            headers: { accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "" },
            cache: "no-store" // Avoid SSR caching
        });
        const { access_token } = await tokenResponse.json();

        // Check payment status based on provider
        if (provider === 'coinbase') {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/coinbase?chargeId=${statementId}`,
                {
                    headers: { authorization: `Bearer ${access_token}` }
                }
            );
            paymentStatus = response.data.status;

            if (paymentStatus !== "COMPLETED") {
                return redirect(`/payment/cancel/${statementId}?provider=coinbase`);
            }
        } else {
            // Assuming provider is Stripe if not Coinbase
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/statement/${statementId}`,
                {
                    headers: { authorization: `Bearer ${access_token}` }
                }
            );
            paymentStatus = response.data.status;

            if (paymentStatus !== "complete") {
                return redirect(`/payment/cancel/${statementId}?provider=stripe`);
            }
        }

    } catch (error) {
        console.error("Failed to fetch payment status:", error);
        return redirect(`/home`);
    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                        <p> Have a great day!  </p>
                        <div className="py-10 text-center">
                            <a href="/campaign" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
