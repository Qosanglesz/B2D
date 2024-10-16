import React from 'react';

interface Feature {
    value: string;
    label: string;
}

const features: Feature[] = [
    {value: '500+', label: 'Startups Registered'},
    {value: '\$50M+', label: 'Invested Money'},
    {value: '100K+', label: 'Investors Profile'},
    {value: '10K+', label: 'Successful Campaigns'},
];

const FeatureCards: React.FC = () => {
    // Create an interleaved array with the 'separator' placeholders
    const interleavedFeatures = features.flatMap((feature, index) => [
        feature,
        // Add 'separator' between features, but not after the last
        index < features.length - 1 ? 'separator' : null,
    ]).filter((item): item is Feature | 'separator' => item !== null);

    return (
        <div className="flex justify-between items-center py-8 w-full">
            {interleavedFeatures.map((item, index) => (
                <React.Fragment key={index}>
                    {item === 'separator' ? (
                        // Render thin line for 'separator'
                        <div className="h-16 w-px bg-gray-200 mx-4"></div>
                    ) : (
                        // Render feature card
                        <div className="flex flex-col items-center text-black p-6 flex-grow">
                            <p className="text-2xl font-bold">{item.value}</p>
                            <p className="text-sm text-center text-gray-500">{item.label}</p>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default FeatureCards;
