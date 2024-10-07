import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SuccessProps {
    params: { id: string };
}

const Success: React.FC<SuccessProps> = ({ params }) => {
    const { id: statementId } = params;

    // TODO Delete Statement that status open at this page

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
