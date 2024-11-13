import React from 'react';
import {Campaign} from '@/types/Campaign';

interface IntroStatisticsProps {
    campaign: Pick<Campaign, 'amountRaised' | 'targetAmount' | 'investors' | 'endInDate' | 'companyName'>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    investmentAmountInput: number;
    handleInvestButton: () => void;
}

const IntroStatistics: React.FC<IntroStatisticsProps> = ({
    campaign,
    handleInputChange,
    investmentAmountInput,
    handleInvestButton
}) => {
    // Existing calculations remain the same
    const percentageRaised = Math.floor((campaign.amountRaised / campaign.targetAmount) * 100);
    const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endInDate).getTime() - Date.now()) / (1000 * 3600 * 24)));
    const isOverGoal = campaign.amountRaised > campaign.targetAmount;

    const formatAmount = (amount: number): string => {
        if (amount >= 1_000_000) {
            const millionValue = amount / 1_000_000;
            return millionValue % 1 === 0 ? `${millionValue}M` : `${millionValue.toFixed(1)}M`;
        } else if (amount >= 1_000) {
            const thousandValue = amount / 1_000;
            return thousandValue % 1 === 0 ? `${thousandValue}K` : `${thousandValue.toFixed(1)}K`;
        }
        return `${amount}`;
    };

    const targetAmountFormatted = formatAmount(campaign.targetAmount);
    const amountRaisedFormatted = campaign.amountRaised.toLocaleString();

    return (
        <div className="text-left p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            {/* Amount Raised Section */}
            <div className="mb-4 sm:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                    ${amountRaisedFormatted}
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-2">
                    {percentageRaised}% raised of ${targetAmountFormatted} goal
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-300 rounded-full h-2 sm:h-2.5 mb-4 sm:mb-8">
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${isOverGoal ? 'bg-red-600' : 'bg-blue-600'}`}
                        style={{width: `${Math.min(percentageRaised, 100)}%`}}
                    />
                </div>
            </div>

            <hr className="border-gray-200 my-4 sm:my-5"/>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* Investors Count */}
                <div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                        {campaign.investors.length}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500">
                        Investors
                    </p>
                </div>

                {/* Days Remaining */}
                <div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                        {daysRemaining} days
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500">
                        Left to invest
                    </p>
                </div>
            </div>

            <hr className="border-gray-200 my-4 sm:my-5"/>

            {/* Investment Input Section */}
            <div className="space-y-4">
                <label 
                    htmlFor="investmentAmountInput" 
                    className="block text-base sm:text-lg font-medium text-gray-700"
                >
                    How much money do you want to invest?
                </label>
                <input
                    id="investmentAmountInput"
                    type="number"
                    value={investmentAmountInput !== undefined ? investmentAmountInput : ''}
                    onChange={handleInputChange}
                    min="0"
                    max={campaign.targetAmount}
                    step="1"
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             text-sm sm:text-base"
                />
                <p className="text-xs sm:text-sm text-gray-500">
                    Current value: {investmentAmountInput} U.S. dollar
                </p>
            </div>

            {/* Investment Button */}
            <button
                className="mt-6 w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 
                         text-base sm:text-lg rounded-lg hover:bg-blue-700 
                         transition-colors duration-200 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleInvestButton}
            >
                Invest in {campaign.companyName}
            </button>
        </div>
    );
};

export default IntroStatistics;