// src/components/homeComponents/FeatureCards.tsx

import React from 'react';

const features = [
    { value: '500+', label: 'Startups Registered' },
    { value: '$50M+', label: 'Invested Money' },
    { value: '100K+', label: 'Investors Profile' },
    { value: '10K+', label: 'Successful Campaigns' },
];

const FeatureCards: React.FC = () => {
    // Create an interleaved array with the 'separator' placeholders
    const interleavedFeatures = features.flatMap((feature, index) => [
        feature,
        // Add 'separator' between features, but not after the last
        // Filter out any null values
        index < features.length - 1 ? 'separator' : null,
    ]).filter(Boolean);

    return (
        <div className="flex justify-between items-center py-8 w-full"> {/* Use justify-between and full width */}
            {interleavedFeatures.map((item, index) => (
                <React.Fragment key={index}>
                    {typeof item === 'string' && item === 'separator' ? (
                        // Render thin line for 'separator'
                        <div className="h-16 w-px bg-gray-200 mx-4"></div>
                    ) : (
                        // Render feature card
                        <div className="flex flex-col items-center text-black p-6 flex-grow"> {/* Add flex-grow to spread out */}
                            <p className="text-2xl font-bold">{item.value}</p> {/* Smaller number */}
                            <p className="text-sm text-center text-gray-500">{item.label}</p> {/* Gray text for label */}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default FeatureCards;
