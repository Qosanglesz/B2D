import React from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

interface IntroStatisticsProps {
  campaign: Pick<FundraisingCampaign, 'amountRaised' | 'targetAmount' | 'investors' | 'endInDate' | 'companyName'>; // Add companyName to the campaign prop
}

const IntroStatistics: React.FC<IntroStatisticsProps> = ({ campaign }) => {
  // Calculate the percentage raised and remaining days
  const percentageRaised = Math.floor((campaign.amountRaised / campaign.targetAmount) * 100); // No decimals
  const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endInDate).getTime() - Date.now()) / (1000 * 3600 * 24)));

  // Format target amount to M (millions) or K (thousands)
  const formatAmount = (amount: number): string => {
    if (amount >= 1_000_000) {
      const millionValue = amount / 1_000_000;
      // Show one decimal if not zero
      return millionValue % 1 === 0 ? `${millionValue}M` : `${millionValue.toFixed(1)}M`;
    } else if (amount >= 1_000) {
      const thousandValue = amount / 1_000;
      // Show one decimal if not zero
      return thousandValue % 1 === 0 ? `${thousandValue}K` : `${thousandValue.toFixed(1)}K`;
    }
    // Return the amount as is for values less than a thousand
    return `${amount}`;
  };

  // Format the target amount
  const targetAmountFormatted = formatAmount(campaign.targetAmount);

  // Format the amount raised with a thousand separator
  const amountRaisedFormatted = campaign.amountRaised.toLocaleString(); // Add thousand separator

  // Determine if the progress bar should be red (if amount raised exceeds target)
  const isOverGoal = campaign.amountRaised > campaign.targetAmount;

  return (
    <div className="text-left">
      <p className="text-5xl font-bold text-gray-800 mb-2">
        {/* Display formatted raised amount with thousand separator */}
        ${amountRaisedFormatted}
      </p>
      
      {/* Progress Bar */}
      <p className="text-xl text-gray-500 mb-2">
        {percentageRaised}% raised of ${targetAmountFormatted} funding goal
      </p>

      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-8">
        <div
          // Change color to red if raised amount > goal
          className={`h-2.5 rounded-full ${isOverGoal ? 'bg-red-600' : 'bg-blue-600'}`}
          // Ensure it doesn't exceed 100%
          style={{ width: `${Math.min(percentageRaised, 100)}%` }}
        />
      </div>
      
{/* Gray line separator */}
<hr className="border-gray-300 mb-5" />

      {/* Number of investors */}
      <p className="text-5xl font-bold text-gray-800 mb-2">{campaign.investors.length}</p>
      {/* "Investors" label */}
      <p className="text-xl text-gray-500 mb-6">Investors</p>
      
      {/* Gray line separator */}
      <hr className="border-gray-300 mb-5" />

      {/* Days remaining */}
      <p className="text-5xl font-bold text-gray-800 mb-1">{daysRemaining} days</p>
      {/* "Left to invest" label */}
      <p className="text-xl text-gray-500 mb-10">Left to invest</p>
      
      {/* Adjusted button styling */}
      <button className="bg-blue-600 text-white py-3 px-6 text-lg rounded-lg hover:bg-blue-500 transition-all block mx-auto w-full">
        Invest in {campaign.companyName}  {/* Updated button text */}
      </button>
    </div>
  );
};

export default IntroStatistics;
