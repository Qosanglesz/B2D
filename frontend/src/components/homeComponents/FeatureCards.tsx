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
    return (
        <div className="w-full py-8 px-4">
            {/* Container for all features */}
            <div className="max-w-6xl mx-auto">
                {/* Grid container */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="relative flex flex-col items-center text-black p-4 md:p-6"
                        >
                            {/* Feature content */}
                            <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                                {feature.value}
                            </p>
                            <p className="text-xs md:text-sm text-center text-gray-500">
                                {feature.label}
                            </p>
                            
                            {/* Vertical separator - only show between items */}
                            {index < features.length - 1 && (
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gray-200" />
                            )}
                            
                            {/* Horizontal separator for mobile - only show between rows */}
                            {index < features.length - 2 && (
                                <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gray-200" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureCards;