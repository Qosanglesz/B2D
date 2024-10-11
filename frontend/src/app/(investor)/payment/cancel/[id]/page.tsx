"use client"

import React, {useEffect} from "react";
import axios from "axios";


interface SuccessProps {
    params: { id: string };
}

const Success: React.FC<SuccessProps> = ({params}) => {
    const {id: statementId} = params;

    useEffect(() => {
        const deleteOpenStatus = async () => {
            try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/statement/${statementId}`
                );

            } catch (error) {
                console.error("Failed to fetch payment status:", error);

            }
        };

        deleteOpenStatus();
    }, [statementId]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4">
                    Payment fail!
                </h1>
                <p className="text-lg text-gray-700 mb-2">
                    Try to re create payment request.
                </p>
            </div>
        </div>
    );
};

export default Success;
