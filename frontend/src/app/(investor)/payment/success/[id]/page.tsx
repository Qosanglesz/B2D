'use client';

import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

interface SuccessProps {
    params: { id: string };
}

const Success: React.FC<SuccessProps> = ({params}) => {
    const {id: statementId} = params;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/payment/statement/${statementId}`
                );
                const {status} = response.data;

                if (status !== "complete") {
                    router.push(`http://localhost:3000/payment/cancel/${statementId}`);
                } else {
                    setLoading(false);
                }

            } catch (error) {
                console.error("Failed to fetch payment status:", error);
                router.push(`http://localhost:3000/home`); //redirect if cant fetch api

            }
        };

        checkStatus();
    }, [statementId, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-4xl">Loading...</p>
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
