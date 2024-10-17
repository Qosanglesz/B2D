"use client"

import React from 'react';

const SuccessPage: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Create form successfully!
                </h1>
                <p className="text-lg text-gray-700 mb-2">
                    <a href={"/campaign"}>Your campaigns will show at campaigns page</a>
                </p>
            </div>
        </div>
    );
};

export default SuccessPage;
